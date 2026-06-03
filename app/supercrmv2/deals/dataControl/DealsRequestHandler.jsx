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
export async function insertDeals() {
 //console.log(`Form deals insert sent `)

  return await mosyPostFormData({
    formId: 'deals_profile_form',
    url: apiRoutes.deals.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateDeals() {

  //console.log(`Form deals update sent `)

  return await mosyPostFormData({
    formId: 'deals_profile_form',
    url: apiRoutes.deals.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateDealsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('deals_mosy_action');
 
 //console.log(`Form deals submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_deals') {

      actionMessage ='Record added succesfully!';

      result = await insertDeals();
    }

    if (actionType === 'update_deals') {

      actionMessage ='Record updated succesfully!';

      result = await updateDeals();
    }

    if (result?.status === 'success') {
      
      const dealsUptoken = btoa(result.deals_dataNode || '');

      //set id key
      setters.setDealsUptoken(dealsUptoken);
      
      //update url with new dealsUptoken
      mosyUpdateUrlParam('deals_dataNode', dealsUptoken)

      setters.setDealsActionStatus('update_deals')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: dealsUptoken,
        actionName : actionType,
        actionType : 'deals_form_submission'
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


export async function initDealsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Deals' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.deals.base,
      params: { 
      ...rawQstr,
      src : btoa(`initDealsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('deals Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching deals data:', response.message);  // Handle error
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


export async function DeleteDeals(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.deals.delete,
        params: { 
          _deals_delete_record: (token), 
          },
      });

      console.log('Token DeleteDeals '+token)
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


export async function getDealsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qdeals_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.deals.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getDealsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('deals Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching deals data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadDealsListData(customQueryStr, setters) {

    const gftDeals = MosySecureFilterEngine('deals');
    let finalFilterStr = (gftDeals);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setDealsLoading(true);
    
    const dealsListData = await getDealsListData(finalFilterStr);
    
    setters.setDealsLoading(false)
    setters.setDealsListData(dealsListData?.data)

    setters.setDealsListPageCount(dealsListData?.pagination?.page_count)


    return dealsListData

}
  
  
export async function dealsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const dealsTokenId = mosyUrlParam('deals_dataNode');
    
    const deleteParam = mosyUrlParam('deals_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedDealsToken = '0';
    if (dealsTokenId) {
      
      decodedDealsToken = atob(dealsTokenId); // Decode the record_id
      setters.setDealsUptoken(dealsTokenId);
      setters.setDealsActionStatus('update_deals');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawDealsQueryStr ={Node:btoa(decodedDealsToken)}
    if(customQueryStr!='')
    {
      // if no deals_dataNode set , use customQueryStr
      if (!dealsTokenId) {
       rawDealsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initDealsProfileData(rawDealsQueryStr)

    if(deleteParam){
      popDeleteDialog(dealsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setDealsNode(finalProfileData)
    
    
}
  
  

export function InteprateDealsEvent(data) {
     
  //console.log(' Deals Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_deals){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('DealsProfileTray')

    
    mosyUpdateUrlParam('deals_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setDealsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('DealsProfileTray')

    
    mosyUpdateUrlParam('deals_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_deals){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add deals `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('DealsProfileTray')
      }
    }
     
  }

  if(childActionName.update_deals){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update deals `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('DealsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_deals){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../deals/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteDeals(deleteToken).then(response=>{
  
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
       deleteUrlParam('deals_delete');
        
    }
  
  });

}