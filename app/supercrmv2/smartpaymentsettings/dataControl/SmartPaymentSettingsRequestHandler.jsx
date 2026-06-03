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
export async function insertSmartPaymentSettings() {
 //console.log(`Form smart_payment_settings insert sent `)

  return await mosyPostFormData({
    formId: 'smart_payment_settings_profile_form',
    url: apiRoutes.smartpaymentsettings.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSmartPaymentSettings() {

  //console.log(`Form smart_payment_settings update sent `)

  return await mosyPostFormData({
    formId: 'smart_payment_settings_profile_form',
    url: apiRoutes.smartpaymentsettings.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSmartPaymentSettingsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('smart_payment_settings_mosy_action');
 
 //console.log(`Form smart_payment_settings submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_smart_payment_settings') {

      actionMessage ='Record added succesfully!';

      result = await insertSmartPaymentSettings();
    }

    if (actionType === 'update_smart_payment_settings') {

      actionMessage ='Record updated succesfully!';

      result = await updateSmartPaymentSettings();
    }

    if (result?.status === 'success') {
      
      const smart_payment_settingsUptoken = btoa(result.smart_payment_settings_dataNode || '');

      //set id key
      setters.setSmartPaymentSettingsUptoken(smart_payment_settingsUptoken);
      
      //update url with new smart_payment_settingsUptoken
      mosyUpdateUrlParam('smart_payment_settings_dataNode', smart_payment_settingsUptoken)

      setters.setSmartPaymentSettingsActionStatus('update_smart_payment_settings')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: smart_payment_settingsUptoken,
        actionName : actionType,
        actionType : 'smart_payment_settings_form_submission'
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


export async function initSmartPaymentSettingsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Smart Payment Settings' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.smartpaymentsettings.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSmartPaymentSettingsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('smartpaymentsettings Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching smartpaymentsettings data:', response.message);  // Handle error
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


export async function DeleteSmartPaymentSettings(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.smartpaymentsettings.delete,
        params: { 
          _smart_payment_settings_delete_record: (token), 
          },
      });

      console.log('Token DeleteSmartPaymentSettings '+token)
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


export async function getSmartPaymentSettingsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsmart_payment_settings_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.smartpaymentsettings.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSmartPaymentSettingsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('smartpaymentsettings Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching smartpaymentsettings data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSmartPaymentSettingsListData(customQueryStr, setters) {

    const gftSmartPaymentSettings = MosySecureFilterEngine('smart_payment_settings');
    let finalFilterStr = (gftSmartPaymentSettings);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSmartPaymentSettingsLoading(true);
    
    const smartPaymentSettingsListData = await getSmartPaymentSettingsListData(finalFilterStr);
    
    setters.setSmartPaymentSettingsLoading(false)
    setters.setSmartPaymentSettingsListData(smartPaymentSettingsListData?.data)

    setters.setSmartPaymentSettingsListPageCount(smartPaymentSettingsListData?.pagination?.page_count)


    return smartPaymentSettingsListData

}
  
  
export async function smartPaymentSettingsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const smartPaymentSettingsTokenId = mosyUrlParam('smart_payment_settings_dataNode');
    
    const deleteParam = mosyUrlParam('smart_payment_settings_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSmartPaymentSettingsToken = '0';
    if (smartPaymentSettingsTokenId) {
      
      decodedSmartPaymentSettingsToken = atob(smartPaymentSettingsTokenId); // Decode the record_id
      setters.setSmartPaymentSettingsUptoken(smartPaymentSettingsTokenId);
      setters.setSmartPaymentSettingsActionStatus('update_smart_payment_settings');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSmartPaymentSettingsQueryStr ={Node:btoa(decodedSmartPaymentSettingsToken)}
    if(customQueryStr!='')
    {
      // if no smart_payment_settings_dataNode set , use customQueryStr
      if (!smartPaymentSettingsTokenId) {
       rawSmartPaymentSettingsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSmartPaymentSettingsProfileData(rawSmartPaymentSettingsQueryStr)

    if(deleteParam){
      popDeleteDialog(smartPaymentSettingsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSmartPaymentSettingsNode(finalProfileData)
    
    
}
  
  

export function InteprateSmartPaymentSettingsEvent(data) {
     
  //console.log(' SmartPaymentSettings Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_smart_payment_settings){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartPaymentSettingsProfileTray')

    
    mosyUpdateUrlParam('smart_payment_settings_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSmartPaymentSettingsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartPaymentSettingsProfileTray')

    
    mosyUpdateUrlParam('smart_payment_settings_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_smart_payment_settings){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add smart_payment_settings `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartPaymentSettingsProfileTray')
      }
    }
     
  }

  if(childActionName.update_smart_payment_settings){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update smart_payment_settings `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartPaymentSettingsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_smart_payment_settings){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../smartpaymentsettings/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSmartPaymentSettings(deleteToken).then(response=>{
  
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
       deleteUrlParam('smart_payment_settings_delete');
        
    }
  
  });

}