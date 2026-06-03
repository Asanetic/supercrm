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
export async function insertSmartPayments() {
 //console.log(`Form smart_payments insert sent `)

  return await mosyPostFormData({
    formId: 'smart_payments_profile_form',
    url: apiRoutes.smartpayments.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSmartPayments() {

  //console.log(`Form smart_payments update sent `)

  return await mosyPostFormData({
    formId: 'smart_payments_profile_form',
    url: apiRoutes.smartpayments.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSmartPaymentsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('smart_payments_mosy_action');
 
 //console.log(`Form smart_payments submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_smart_payments') {

      actionMessage ='Record added succesfully!';

      result = await insertSmartPayments();
    }

    if (actionType === 'update_smart_payments') {

      actionMessage ='Record updated succesfully!';

      result = await updateSmartPayments();
    }

    if (result?.status === 'success') {
      
      const smart_paymentsUptoken = btoa(result.smart_payments_dataNode || '');

      //set id key
      setters.setSmartPaymentsUptoken(smart_paymentsUptoken);
      
      //update url with new smart_paymentsUptoken
      mosyUpdateUrlParam('smart_payments_dataNode', smart_paymentsUptoken)

      setters.setSmartPaymentsActionStatus('update_smart_payments')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: smart_paymentsUptoken,
        actionName : actionType,
        actionType : 'smart_payments_form_submission'
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


export async function initSmartPaymentsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Smart Payments' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.smartpayments.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSmartPaymentsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('smartpayments Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching smartpayments data:', response.message);  // Handle error
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


export async function DeleteSmartPayments(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.smartpayments.delete,
        params: { 
          _smart_payments_delete_record: (token), 
          },
      });

      console.log('Token DeleteSmartPayments '+token)
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


export async function getSmartPaymentsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsmart_payments_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.smartpayments.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSmartPaymentsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('smartpayments Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching smartpayments data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSmartPaymentsListData(customQueryStr, setters) {

    const gftSmartPayments = MosySecureFilterEngine('smart_payments');
    let finalFilterStr = (gftSmartPayments);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSmartPaymentsLoading(true);
    
    const smartPaymentsListData = await getSmartPaymentsListData(finalFilterStr);
    
    setters.setSmartPaymentsLoading(false)
    setters.setSmartPaymentsListData(smartPaymentsListData?.data)

    setters.setSmartPaymentsListPageCount(smartPaymentsListData?.pagination?.page_count)


    return smartPaymentsListData

}
  
  
export async function smartPaymentsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const smartPaymentsTokenId = mosyUrlParam('smart_payments_dataNode');
    
    const deleteParam = mosyUrlParam('smart_payments_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSmartPaymentsToken = '0';
    if (smartPaymentsTokenId) {
      
      decodedSmartPaymentsToken = atob(smartPaymentsTokenId); // Decode the record_id
      setters.setSmartPaymentsUptoken(smartPaymentsTokenId);
      setters.setSmartPaymentsActionStatus('update_smart_payments');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSmartPaymentsQueryStr ={Node:btoa(decodedSmartPaymentsToken)}
    if(customQueryStr!='')
    {
      // if no smart_payments_dataNode set , use customQueryStr
      if (!smartPaymentsTokenId) {
       rawSmartPaymentsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSmartPaymentsProfileData(rawSmartPaymentsQueryStr)

    if(deleteParam){
      popDeleteDialog(smartPaymentsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSmartPaymentsNode(finalProfileData)
    
    
}
  
  

export function InteprateSmartPaymentsEvent(data) {
     
  //console.log(' SmartPayments Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_smart_payments){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartPaymentsProfileTray')

    
    mosyUpdateUrlParam('smart_payments_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSmartPaymentsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartPaymentsProfileTray')

    
    mosyUpdateUrlParam('smart_payments_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_smart_payments){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add smart_payments `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartPaymentsProfileTray')
      }
    }
     
  }

  if(childActionName.update_smart_payments){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update smart_payments `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartPaymentsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_smart_payments){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../smartpayments/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSmartPayments(deleteToken).then(response=>{
  
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
       deleteUrlParam('smart_payments_delete');
        
    }
  
  });

}