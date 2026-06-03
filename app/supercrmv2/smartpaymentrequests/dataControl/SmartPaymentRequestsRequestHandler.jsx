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
export async function insertSmartPaymentRequests() {
 //console.log(`Form smart_payment_requests insert sent `)

  return await mosyPostFormData({
    formId: 'smart_payment_requests_profile_form',
    url: apiRoutes.smartpaymentrequests.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSmartPaymentRequests() {

  //console.log(`Form smart_payment_requests update sent `)

  return await mosyPostFormData({
    formId: 'smart_payment_requests_profile_form',
    url: apiRoutes.smartpaymentrequests.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSmartPaymentRequestsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('smart_payment_requests_mosy_action');
 
 //console.log(`Form smart_payment_requests submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_smart_payment_requests') {

      actionMessage ='Record added succesfully!';

      result = await insertSmartPaymentRequests();
    }

    if (actionType === 'update_smart_payment_requests') {

      actionMessage ='Record updated succesfully!';

      result = await updateSmartPaymentRequests();
    }

    if (result?.status === 'success') {
      
      const smart_payment_requestsUptoken = btoa(result.smart_payment_requests_dataNode || '');

      //set id key
      setters.setSmartPaymentRequestsUptoken(smart_payment_requestsUptoken);
      
      //update url with new smart_payment_requestsUptoken
      mosyUpdateUrlParam('smart_payment_requests_dataNode', smart_payment_requestsUptoken)

      setters.setSmartPaymentRequestsActionStatus('update_smart_payment_requests')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: smart_payment_requestsUptoken,
        actionName : actionType,
        actionType : 'smart_payment_requests_form_submission'
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


export async function initSmartPaymentRequestsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Smart Payment Requests' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.smartpaymentrequests.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSmartPaymentRequestsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('smartpaymentrequests Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching smartpaymentrequests data:', response.message);  // Handle error
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


export async function DeleteSmartPaymentRequests(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.smartpaymentrequests.delete,
        params: { 
          _smart_payment_requests_delete_record: (token), 
          },
      });

      console.log('Token DeleteSmartPaymentRequests '+token)
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


export async function getSmartPaymentRequestsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsmart_payment_requests_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.smartpaymentrequests.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSmartPaymentRequestsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('smartpaymentrequests Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching smartpaymentrequests data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSmartPaymentRequestsListData(customQueryStr, setters) {

    const gftSmartPaymentRequests = MosySecureFilterEngine('smart_payment_requests');
    let finalFilterStr = (gftSmartPaymentRequests);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSmartPaymentRequestsLoading(true);
    
    const smartPaymentRequestsListData = await getSmartPaymentRequestsListData(finalFilterStr);
    
    setters.setSmartPaymentRequestsLoading(false)
    setters.setSmartPaymentRequestsListData(smartPaymentRequestsListData?.data)

    setters.setSmartPaymentRequestsListPageCount(smartPaymentRequestsListData?.pagination?.page_count)


    return smartPaymentRequestsListData

}
  
  
export async function smartPaymentRequestsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const smartPaymentRequestsTokenId = mosyUrlParam('smart_payment_requests_dataNode');
    
    const deleteParam = mosyUrlParam('smart_payment_requests_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSmartPaymentRequestsToken = '0';
    if (smartPaymentRequestsTokenId) {
      
      decodedSmartPaymentRequestsToken = atob(smartPaymentRequestsTokenId); // Decode the record_id
      setters.setSmartPaymentRequestsUptoken(smartPaymentRequestsTokenId);
      setters.setSmartPaymentRequestsActionStatus('update_smart_payment_requests');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSmartPaymentRequestsQueryStr ={Node:btoa(decodedSmartPaymentRequestsToken)}
    if(customQueryStr!='')
    {
      // if no smart_payment_requests_dataNode set , use customQueryStr
      if (!smartPaymentRequestsTokenId) {
       rawSmartPaymentRequestsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSmartPaymentRequestsProfileData(rawSmartPaymentRequestsQueryStr)

    if(deleteParam){
      popDeleteDialog(smartPaymentRequestsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSmartPaymentRequestsNode(finalProfileData)
    
    
}
  
  

export function InteprateSmartPaymentRequestsEvent(data) {
     
  //console.log(' SmartPaymentRequests Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_smart_payment_requests){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartPaymentRequestsProfileTray')

    
    mosyUpdateUrlParam('smart_payment_requests_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSmartPaymentRequestsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartPaymentRequestsProfileTray')

    
    mosyUpdateUrlParam('smart_payment_requests_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_smart_payment_requests){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add smart_payment_requests `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartPaymentRequestsProfileTray')
      }
    }
     
  }

  if(childActionName.update_smart_payment_requests){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update smart_payment_requests `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartPaymentRequestsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_smart_payment_requests){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../smartpaymentrequests/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSmartPaymentRequests(deleteToken).then(response=>{
  
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
       deleteUrlParam('smart_payment_requests_delete');
        
    }
  
  });

}