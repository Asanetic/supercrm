'use client';
//hive / data utils
import { mosyPostFormData, mosyGetData, mosyUrlParam, mosyUpdateUrlParam , deleteUrlParam, magicRandomStr, mosyGetLSData  } from '../../../MosyUtils/hiveUtils';

//action modals 
import { MosyNotify , closeMosyModal, MosyAlertCard } from '../../../MosyUtils/ActionModals';

//filter util
import { MosySecureFilterEngine } from '../../DataControl/MosyFilterEngine';

//custom event manager 
import { customEventHandler } from '../../DataControl/customDataFunction';

//routes manager
///handle routes 
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();

//insert data
export async function insertExpectedRevenue() {
 //console.log(`Form expected_revenue insert sent `)

  return await mosyPostFormData({
    formId: 'expected_revenue_profile_form',
    url: apiRoutes.expectedrevenue.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateExpectedRevenue() {

  //console.log(`Form expected_revenue update sent `)

  return await mosyPostFormData({
    formId: 'expected_revenue_profile_form',
    url: apiRoutes.expectedrevenue.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateExpectedRevenueFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('expected_revenue_mosy_action');
 
 //console.log(`Form expected_revenue submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_expected_revenue') {

      actionMessage ='Record added succesfully!';

      result = await insertExpectedRevenue();
    }

    if (actionType === 'update_expected_revenue') {

      actionMessage ='Record updated succesfully!';

      result = await updateExpectedRevenue();
    }

    if (result?.status === 'success') {
      
      const expected_revenueUptoken = btoa(result.expected_revenue_dataNode || '');

      //set id key
      setters.setExpectedRevenueUptoken(expected_revenueUptoken);
      
      //update url with new expected_revenueUptoken
      mosyUpdateUrlParam('expected_revenue_dataNode', expected_revenueUptoken)

      setters.setExpectedRevenueActionStatus('update_expected_revenue')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: expected_revenueUptoken,
        actionName : actionType,
        actionType : 'expected_revenue_form_submission'
      };
            
      
    } else {
      MosyNotify({message:result.message, icon:'times-circle', iconColor :'text-danger'})
      
      return {
        status: 'error',
        message: result,
        actionName: actionType,
        newToken: null
      };
      
    }

  } catch (error) {
    console.error('Form error:', error);
    
      MosyNotify({message:result.message, icon:'times-circle', iconColor :'text-danger'})
    
      return {
        status: 'error',
        message: result,
        actionName: actionType,
        newToken: null
      };
      
  } 
}


export async function initExpectedRevenueProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Expected Revenue' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.expectedrevenue.base,
      params: { 
      ...rawQstr,
      src : btoa(`initExpectedRevenueProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('expectedrevenue Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching expectedrevenue data:', response.message);  // Handle error
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteExpectedRevenue(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.expectedrevenue.delete,
        params: { 
          _expected_revenue_delete_record: (token), 
          },
      });

      console.log('Token DeleteExpectedRevenue '+token)
      if (response.status === 'success') {

        closeMosyModal();

        return response; // Return the data
      } else {
        console.error('Error deleting systemusers data:', response.message);
        
        closeMosyModal();

        MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})

        return response; // Safe fallback
      }
    } catch (err) {
      console.error('Error:', err);
      closeMosyModal();
      
      return []; //  Even safer fallback
    }

}


export async function getExpectedRevenueListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qexpected_revenue_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.expectedrevenue.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getExpectedRevenueListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('expectedrevenue Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching expectedrevenue data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadExpectedRevenueListData(customQueryStr, setters) {

    const gftExpectedRevenue = MosySecureFilterEngine('expected_revenue');
    let finalFilterStr = (gftExpectedRevenue);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setExpectedRevenueLoading(true);
    
    const expectedRevenueListData = await getExpectedRevenueListData(finalFilterStr);
    
    setters.setExpectedRevenueLoading(false)
    setters.setExpectedRevenueListData(expectedRevenueListData?.data)

    setters.setExpectedRevenueListPageCount(expectedRevenueListData?.pagination?.page_count)


    return expectedRevenueListData

}
  
  
export async function expectedRevenueProfileData(customQueryStr, setters, router, customProfileData={}) {

    const expectedRevenueTokenId = mosyUrlParam('expected_revenue_dataNode');
    
    const deleteParam = mosyUrlParam('expected_revenue_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedExpectedRevenueToken = '0';
    if (expectedRevenueTokenId) {
      
      decodedExpectedRevenueToken = atob(expectedRevenueTokenId); // Decode the record_id
      setters.setExpectedRevenueUptoken(expectedRevenueTokenId);
      setters.setExpectedRevenueActionStatus('update_expected_revenue');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawExpectedRevenueQueryStr ={Node:btoa(decodedExpectedRevenueToken)}
    if(customQueryStr!='')
    {
      // if no expected_revenue_dataNode set , use customQueryStr
      if (!expectedRevenueTokenId) {
       rawExpectedRevenueQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initExpectedRevenueProfileData(rawExpectedRevenueQueryStr)

    if(deleteParam){
      popDeleteDialog(expectedRevenueTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setExpectedRevenueNode(finalProfileData)
    
    
}
  
  

export function InteprateExpectedRevenueEvent(data) {
     
  //console.log(' ExpectedRevenue Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_expected_revenue){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ExpectedRevenueProfileTray')

    
    mosyUpdateUrlParam('expected_revenue_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setExpectedRevenueCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ExpectedRevenueProfileTray')

    
    mosyUpdateUrlParam('expected_revenue_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_expected_revenue){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add expected_revenue `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ExpectedRevenueProfileTray')
      }
    }
     
  }

  if(childActionName.update_expected_revenue){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update expected_revenue `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ExpectedRevenueProfileTray')
        
      }
    }
  }

  if(childActionName.delete_expected_revenue){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../expectedrevenue/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteExpectedRevenue(deleteToken).then(response=>{
  
        if(response.status!='error')
        {
          childSetters?.setSnackMessage("Record deleted succesfully!")
          childSetters?.setParentUseEffectKey(magicRandomStr());
          childSetters?.setLocalEventSignature(magicRandomStr());

          if(router){
            router.push(`${afterDeleteUrl}?snack_alert=Record Deleted successfully!`)
          }
       }
      })
  
    },
  
    onNo: () => {
  
      // Remove the param from the URL
       closeMosyModal()
       deleteUrlParam('expected_revenue_delete');
        
    }
  
  });

}