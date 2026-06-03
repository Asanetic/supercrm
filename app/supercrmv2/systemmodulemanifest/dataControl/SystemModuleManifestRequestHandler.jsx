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
export async function insertSystemModuleManifest() {
 //console.log(`Form system_module_manifest_ insert sent `)

  return await mosyPostFormData({
    formId: 'system_module_manifest__profile_form',
    url: apiRoutes.systemmodulemanifest.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSystemModuleManifest() {

  //console.log(`Form system_module_manifest_ update sent `)

  return await mosyPostFormData({
    formId: 'system_module_manifest__profile_form',
    url: apiRoutes.systemmodulemanifest.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSystemModuleManifestFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('system_module_manifest__mosy_action');
 
 //console.log(`Form system_module_manifest_ submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_system_module_manifest_') {

      actionMessage ='Record added succesfully!';

      result = await insertSystemModuleManifest();
    }

    if (actionType === 'update_system_module_manifest_') {

      actionMessage ='Record updated succesfully!';

      result = await updateSystemModuleManifest();
    }

    if (result?.status === 'success') {
      
      const system_module_manifest_Uptoken = btoa(result.system_module_manifest__dataNode || '');

      //set id key
      setters.setSystemModuleManifestUptoken(system_module_manifest_Uptoken);
      
      //update url with new system_module_manifest_Uptoken
      mosyUpdateUrlParam('system_module_manifest__dataNode', system_module_manifest_Uptoken)

      setters.setSystemModuleManifestActionStatus('update_system_module_manifest_')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: system_module_manifest_Uptoken,
        actionName : actionType,
        actionType : 'system_module_manifest__form_submission'
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


export async function initSystemModuleManifestProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing System Module Manifest ' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.systemmodulemanifest.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSystemModuleManifestProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('systemmodulemanifest Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching systemmodulemanifest data:', response.message);  // Handle error
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


export async function DeleteSystemModuleManifest(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.systemmodulemanifest.delete,
        params: { 
          _system_module_manifest__delete_record: (token), 
          },
      });

      console.log('Token DeleteSystemModuleManifest '+token)
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


export async function getSystemModuleManifestListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsystem_module_manifest__page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.systemmodulemanifest.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSystemModuleManifestListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('systemmodulemanifest Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching systemmodulemanifest data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSystemModuleManifestListData(customQueryStr, setters) {

    const gftSystemModuleManifest = MosySecureFilterEngine('system_module_manifest_');
    let finalFilterStr = (gftSystemModuleManifest);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSystemModuleManifestLoading(true);
    
    const systemModuleManifestListData = await getSystemModuleManifestListData(finalFilterStr);
    
    setters.setSystemModuleManifestLoading(false)
    setters.setSystemModuleManifestListData(systemModuleManifestListData?.data)

    setters.setSystemModuleManifestListPageCount(systemModuleManifestListData?.pagination?.page_count)


    return systemModuleManifestListData

}
  
  
export async function systemModuleManifestProfileData(customQueryStr, setters, router, customProfileData={}) {

    const systemModuleManifestTokenId = mosyUrlParam('system_module_manifest__dataNode');
    
    const deleteParam = mosyUrlParam('system_module_manifest__delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSystemModuleManifestToken = '0';
    if (systemModuleManifestTokenId) {
      
      decodedSystemModuleManifestToken = atob(systemModuleManifestTokenId); // Decode the record_id
      setters.setSystemModuleManifestUptoken(systemModuleManifestTokenId);
      setters.setSystemModuleManifestActionStatus('update_system_module_manifest_');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSystemModuleManifestQueryStr ={Node:btoa(decodedSystemModuleManifestToken)}
    if(customQueryStr!='')
    {
      // if no system_module_manifest__dataNode set , use customQueryStr
      if (!systemModuleManifestTokenId) {
       rawSystemModuleManifestQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSystemModuleManifestProfileData(rawSystemModuleManifestQueryStr)

    if(deleteParam){
      popDeleteDialog(systemModuleManifestTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSystemModuleManifestNode(finalProfileData)
    
    
}
  
  

export function InteprateSystemModuleManifestEvent(data) {
     
  //console.log(' SystemModuleManifest Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_system_module_manifest_){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SystemModuleManifestProfileTray')

    
    mosyUpdateUrlParam('system_module_manifest__dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSystemModuleManifestCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SystemModuleManifestProfileTray')

    
    mosyUpdateUrlParam('system_module_manifest__dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_system_module_manifest_){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add system_module_manifest_ `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SystemModuleManifestProfileTray')
      }
    }
     
  }

  if(childActionName.update_system_module_manifest_){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update system_module_manifest_ `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SystemModuleManifestProfileTray')
        
      }
    }
  }

  if(childActionName.delete_system_module_manifest_){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../systemmodulemanifest/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSystemModuleManifest(deleteToken).then(response=>{
  
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
       deleteUrlParam('system_module_manifest__delete');
        
    }
  
  });

}