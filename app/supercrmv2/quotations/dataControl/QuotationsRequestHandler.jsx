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
export async function insertQuotations() {
 //console.log(`Form quotations insert sent `)

  return await mosyPostFormData({
    formId: 'quotations_profile_form',
    url: apiRoutes.quotations.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateQuotations() {

  //console.log(`Form quotations update sent `)

  return await mosyPostFormData({
    formId: 'quotations_profile_form',
    url: apiRoutes.quotations.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateQuotationsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('quotations_mosy_action');
 
 //console.log(`Form quotations submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_quotations') {

      actionMessage ='Record added succesfully!';

      result = await insertQuotations();
    }

    if (actionType === 'update_quotations') {

      actionMessage ='Record updated succesfully!';

      result = await updateQuotations();
    }

    if (result?.status === 'success') {
      
      const quotationsUptoken = btoa(result.quotations_dataNode || '');

      //set id key
      setters.setQuotationsUptoken(quotationsUptoken);
      
      //update url with new quotationsUptoken
      mosyUpdateUrlParam('quotations_dataNode', quotationsUptoken)

      setters.setQuotationsActionStatus('update_quotations')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: quotationsUptoken,
        actionName : actionType,
        actionType : 'quotations_form_submission'
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


export async function initQuotationsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Quotations' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.quotations.base,
      params: { 
      ...rawQstr,
      src : btoa(`initQuotationsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('quotations Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching quotations data:', response.message);  // Handle error
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


export async function DeleteQuotations(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.quotations.delete,
        params: { 
          _quotations_delete_record: (token), 
          },
      });

      console.log('Token DeleteQuotations '+token)
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


export async function getQuotationsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qquotations_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.quotations.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getQuotationsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('quotations Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching quotations data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadQuotationsListData(customQueryStr, setters) {

    const gftQuotations = MosySecureFilterEngine('quotations');
    let finalFilterStr = (gftQuotations);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setQuotationsLoading(true);
    
    const quotationsListData = await getQuotationsListData(finalFilterStr);
    
    setters.setQuotationsLoading(false)
    setters.setQuotationsListData(quotationsListData?.data)

    setters.setQuotationsListPageCount(quotationsListData?.pagination?.page_count)


    return quotationsListData

}
  
  
export async function quotationsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const quotationsTokenId = mosyUrlParam('quotations_dataNode');
    
    const deleteParam = mosyUrlParam('quotations_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedQuotationsToken = '0';
    if (quotationsTokenId) {
      
      decodedQuotationsToken = atob(quotationsTokenId); // Decode the record_id
      setters.setQuotationsUptoken(quotationsTokenId);
      setters.setQuotationsActionStatus('update_quotations');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawQuotationsQueryStr ={Node:btoa(decodedQuotationsToken)}
    if(customQueryStr!='')
    {
      // if no quotations_dataNode set , use customQueryStr
      if (!quotationsTokenId) {
       rawQuotationsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initQuotationsProfileData(rawQuotationsQueryStr)

    if(deleteParam){
      popDeleteDialog(quotationsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setQuotationsNode(finalProfileData)
    
    
}
  
  

export function InteprateQuotationsEvent(data) {
     
  //console.log(' Quotations Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_quotations){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('QuotationsProfileTray')

    
    mosyUpdateUrlParam('quotations_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setQuotationsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('QuotationsProfileTray')

    
    mosyUpdateUrlParam('quotations_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_quotations){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add quotations `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('QuotationsProfileTray')
      }
    }
     
  }

  if(childActionName.update_quotations){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update quotations `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('QuotationsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_quotations){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../quotations/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteQuotations(deleteToken).then(response=>{
  
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
       deleteUrlParam('quotations_delete');
        
    }
  
  });

}