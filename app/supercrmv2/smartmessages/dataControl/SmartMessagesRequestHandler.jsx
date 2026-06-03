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
export async function insertSmartMessages() {
 //console.log(`Form smart_messages insert sent `)

  return await mosyPostFormData({
    formId: 'smart_messages_profile_form',
    url: apiRoutes.smartmessages.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateSmartMessages() {

  //console.log(`Form smart_messages update sent `)

  return await mosyPostFormData({
    formId: 'smart_messages_profile_form',
    url: apiRoutes.smartmessages.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateSmartMessagesFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('smart_messages_mosy_action');
 
 //console.log(`Form smart_messages submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_smart_messages') {

      actionMessage ='Record added succesfully!';

      result = await insertSmartMessages();
    }

    if (actionType === 'update_smart_messages') {

      actionMessage ='Record updated succesfully!';

      result = await updateSmartMessages();
    }

    if (result?.status === 'success') {
      
      const smart_messagesUptoken = btoa(result.smart_messages_dataNode || '');

      //set id key
      setters.setSmartMessagesUptoken(smart_messagesUptoken);
      
      //update url with new smart_messagesUptoken
      mosyUpdateUrlParam('smart_messages_dataNode', smart_messagesUptoken)

      setters.setSmartMessagesActionStatus('update_smart_messages')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: smart_messagesUptoken,
        actionName : actionType,
        actionType : 'smart_messages_form_submission'
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


export async function initSmartMessagesProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Smart Messages' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.smartmessages.base,
      params: { 
      ...rawQstr,
      src : btoa(`initSmartMessagesProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('smartmessages Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching smartmessages data:', response.message);  // Handle error
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


export async function DeleteSmartMessages(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.smartmessages.delete,
        params: { 
          _smart_messages_delete_record: (token), 
          },
      });

      console.log('Token DeleteSmartMessages '+token)
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


export async function getSmartMessagesListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qsmart_messages_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.smartmessages.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getSmartMessagesListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('smartmessages Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching smartmessages data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadSmartMessagesListData(customQueryStr, setters) {

    const gftSmartMessages = MosySecureFilterEngine('smart_messages');
    let finalFilterStr = (gftSmartMessages);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setSmartMessagesLoading(true);
    
    const smartMessagesListData = await getSmartMessagesListData(finalFilterStr);
    
    setters.setSmartMessagesLoading(false)
    setters.setSmartMessagesListData(smartMessagesListData?.data)

    setters.setSmartMessagesListPageCount(smartMessagesListData?.pagination?.page_count)


    return smartMessagesListData

}
  
  
export async function smartMessagesProfileData(customQueryStr, setters, router, customProfileData={}) {

    const smartMessagesTokenId = mosyUrlParam('smart_messages_dataNode');
    
    const deleteParam = mosyUrlParam('smart_messages_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedSmartMessagesToken = '0';
    if (smartMessagesTokenId) {
      
      decodedSmartMessagesToken = atob(smartMessagesTokenId); // Decode the record_id
      setters.setSmartMessagesUptoken(smartMessagesTokenId);
      setters.setSmartMessagesActionStatus('update_smart_messages');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawSmartMessagesQueryStr ={Node:btoa(decodedSmartMessagesToken)}
    if(customQueryStr!='')
    {
      // if no smart_messages_dataNode set , use customQueryStr
      if (!smartMessagesTokenId) {
       rawSmartMessagesQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initSmartMessagesProfileData(rawSmartMessagesQueryStr)

    if(deleteParam){
      popDeleteDialog(smartMessagesTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setSmartMessagesNode(finalProfileData)
    
    
}
  
  

export function InteprateSmartMessagesEvent(data) {
     
  //console.log(' SmartMessages Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_smart_messages){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartMessagesProfileTray')

    
    mosyUpdateUrlParam('smart_messages_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setSmartMessagesCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('SmartMessagesProfileTray')

    
    mosyUpdateUrlParam('smart_messages_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_smart_messages){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add smart_messages `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartMessagesProfileTray')
      }
    }
     
  }

  if(childActionName.update_smart_messages){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update smart_messages `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('SmartMessagesProfileTray')
        
      }
    }
  }

  if(childActionName.delete_smart_messages){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../smartmessages/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteSmartMessages(deleteToken).then(response=>{
  
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
       deleteUrlParam('smart_messages_delete');
        
    }
  
  });

}