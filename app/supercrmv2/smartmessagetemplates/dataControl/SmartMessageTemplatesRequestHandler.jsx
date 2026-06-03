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
export async function insertSmartMessageTemplates() {
 //console.log(`Form smart_message_templates insert sent `)

  return await mosyPostFormData({
    formId: 'smart_message_templates_profile_form',
    url: apiRoutes.smartmessagetemplates.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSmartMessageTemplates() {

  //console.log(`Form smart_message_templates update sent `)

  return await mosyPostFormData({
    formId: 'smart_message_templates_profile_form',
    url: apiRoutes.smartmessagetemplates.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSmartMessageTemplatesFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('smart_message_templates_mosy_action');
 
 //console.log(`Form smart_message_templates submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_smart_message_templates') {

      actionMessage ='Record added succesfully!';

      result = await insertSmartMessageTemplates();
    }

    if (actionType === 'update_smart_message_templates') {

      actionMessage ='Record updated succesfully!';

      result = await updateSmartMessageTemplates();
    }

    if (result?.status === 'success') {
      
      const smart_message_templatesUptoken = btoa(result.smart_message_templates_dataNode || '');

      //set id key
      setters.setSmartMessageTemplatesUptoken(smart_message_templatesUptoken);
      
      //update url with new smart_message_templatesUptoken
      mosyUpdateUrlParam('smart_message_templates_dataNode', smart_message_templatesUptoken)

      setters.setSmartMessageTemplatesActionStatus('update_smart_message_templates')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: smart_message_templatesUptoken,
        actionName : actionType,
        actionType : 'smart_message_templates_form_submission'
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


export async function initSmartMessageTemplatesProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Smart Message Templates' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.smartmessagetemplates.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSmartMessageTemplatesProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('smartmessagetemplates Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching smartmessagetemplates data:', response.message);  // Handle error
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


export async function DeleteSmartMessageTemplates(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.smartmessagetemplates.delete,
        params: { 
          _smart_message_templates_delete_record: (token), 
          },
      });

      console.log('Token DeleteSmartMessageTemplates '+token)
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


export async function getSmartMessageTemplatesListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsmart_message_templates_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.smartmessagetemplates.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSmartMessageTemplatesListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('smartmessagetemplates Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching smartmessagetemplates data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSmartMessageTemplatesListData(customQueryStr, setters) {

    const gftSmartMessageTemplates = MosySecureFilterEngine('smart_message_templates');
    let finalFilterStr = (gftSmartMessageTemplates);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSmartMessageTemplatesLoading(true);
    
    const smartMessageTemplatesListData = await getSmartMessageTemplatesListData(finalFilterStr);
    
    setters.setSmartMessageTemplatesLoading(false)
    setters.setSmartMessageTemplatesListData(smartMessageTemplatesListData?.data)

    setters.setSmartMessageTemplatesListPageCount(smartMessageTemplatesListData?.pagination?.page_count)


    return smartMessageTemplatesListData

}
  
  
export async function smartMessageTemplatesProfileData(customQueryStr, setters, router, customProfileData={}) {

    const smartMessageTemplatesTokenId = mosyUrlParam('smart_message_templates_dataNode');
    
    const deleteParam = mosyUrlParam('smart_message_templates_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSmartMessageTemplatesToken = '0';
    if (smartMessageTemplatesTokenId) {
      
      decodedSmartMessageTemplatesToken = atob(smartMessageTemplatesTokenId); // Decode the record_id
      setters.setSmartMessageTemplatesUptoken(smartMessageTemplatesTokenId);
      setters.setSmartMessageTemplatesActionStatus('update_smart_message_templates');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSmartMessageTemplatesQueryStr ={Node:btoa(decodedSmartMessageTemplatesToken)}
    if(customQueryStr!='')
    {
      // if no smart_message_templates_dataNode set , use customQueryStr
      if (!smartMessageTemplatesTokenId) {
       rawSmartMessageTemplatesQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSmartMessageTemplatesProfileData(rawSmartMessageTemplatesQueryStr)

    if(deleteParam){
      popDeleteDialog(smartMessageTemplatesTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSmartMessageTemplatesNode(finalProfileData)
    
    
}
  
  

export function InteprateSmartMessageTemplatesEvent(data) {
     
  //console.log(' SmartMessageTemplates Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_smart_message_templates){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartMessageTemplatesProfileTray')

    
    mosyUpdateUrlParam('smart_message_templates_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSmartMessageTemplatesCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartMessageTemplatesProfileTray')

    
    mosyUpdateUrlParam('smart_message_templates_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_smart_message_templates){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add smart_message_templates `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartMessageTemplatesProfileTray')
      }
    }
     
  }

  if(childActionName.update_smart_message_templates){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update smart_message_templates `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartMessageTemplatesProfileTray')
        
      }
    }
  }

  if(childActionName.delete_smart_message_templates){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../smartmessagetemplates/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSmartMessageTemplates(deleteToken).then(response=>{
  
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
       deleteUrlParam('smart_message_templates_delete');
        
    }
  
  });

}