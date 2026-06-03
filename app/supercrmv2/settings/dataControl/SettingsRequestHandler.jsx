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
export async function insertSettings() {
 //console.log(`Form settings insert sent `)

  return await mosyPostFormData({
    formId: 'settings_profile_form',
    url: apiRoutes.settings.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSettings() {

  //console.log(`Form settings update sent `)

  return await mosyPostFormData({
    formId: 'settings_profile_form',
    url: apiRoutes.settings.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSettingsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('settings_mosy_action');
 
 //console.log(`Form settings submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_settings') {

      actionMessage ='Record added succesfully!';

      result = await insertSettings();
    }

    if (actionType === 'update_settings') {

      actionMessage ='Record updated succesfully!';

      result = await updateSettings();
    }

    if (result?.status === 'success') {
      
      const settingsUptoken = btoa(result.settings_dataNode || '');

      //set id key
      setters.setSettingsUptoken(settingsUptoken);
      
      //update url with new settingsUptoken
      mosyUpdateUrlParam('settings_dataNode', settingsUptoken)

      setters.setSettingsActionStatus('update_settings')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: settingsUptoken,
        actionName : actionType,
        actionType : 'settings_form_submission'
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


export async function initSettingsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Settings' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.settings.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSettingsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('settings Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching settings data:', response.message);  // Handle error
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


export async function DeleteSettings(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.settings.delete,
        params: { 
          _settings_delete_record: (token), 
          },
      });

      console.log('Token DeleteSettings '+token)
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


export async function getSettingsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsettings_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.settings.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSettingsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('settings Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching settings data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSettingsListData(customQueryStr, setters) {

    const gftSettings = MosySecureFilterEngine('settings');
    let finalFilterStr = (gftSettings);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSettingsLoading(true);
    
    const settingsListData = await getSettingsListData(finalFilterStr);
    
    setters.setSettingsLoading(false)
    setters.setSettingsListData(settingsListData?.data)

    setters.setSettingsListPageCount(settingsListData?.pagination?.page_count)


    return settingsListData

}
  
  
export async function settingsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const settingsTokenId = mosyUrlParam('settings_dataNode');
    
    const deleteParam = mosyUrlParam('settings_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSettingsToken = '0';
    if (settingsTokenId) {
      
      decodedSettingsToken = atob(settingsTokenId); // Decode the record_id
      setters.setSettingsUptoken(settingsTokenId);
      setters.setSettingsActionStatus('update_settings');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSettingsQueryStr ={Node:btoa(decodedSettingsToken)}
    if(customQueryStr!='')
    {
      // if no settings_dataNode set , use customQueryStr
      if (!settingsTokenId) {
       rawSettingsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSettingsProfileData(rawSettingsQueryStr)

    if(deleteParam){
      popDeleteDialog(settingsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSettingsNode(finalProfileData)
    
    
}
  
  

export function InteprateSettingsEvent(data) {
     
  //console.log(' Settings Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_settings){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SettingsProfileTray')

    
    mosyUpdateUrlParam('settings_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSettingsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SettingsProfileTray')

    
    mosyUpdateUrlParam('settings_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_settings){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add settings `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SettingsProfileTray')
      }
    }
     
  }

  if(childActionName.update_settings){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update settings `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SettingsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_settings){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../settings/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSettings(deleteToken).then(response=>{
  
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
       deleteUrlParam('settings_delete');
        
    }
  
  });

}