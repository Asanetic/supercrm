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
export async function insertMosySqlRollBack() {
 //console.log(`Form mosy_sql_roll_back insert sent `)

  return await mosyPostFormData({
    formId: 'mosy_sql_roll_back_profile_form',
    url: apiRoutes.mosysqlrollback.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateMosySqlRollBack() {

  //console.log(`Form mosy_sql_roll_back update sent `)

  return await mosyPostFormData({
    formId: 'mosy_sql_roll_back_profile_form',
    url: apiRoutes.mosysqlrollback.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateMosySqlRollBackFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('mosy_sql_roll_back_mosy_action');
 
 //console.log(`Form mosy_sql_roll_back submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_mosy_sql_roll_back') {

      actionMessage ='Record added succesfully!';

      result = await insertMosySqlRollBack();
    }

    if (actionType === 'update_mosy_sql_roll_back') {

      actionMessage ='Record updated succesfully!';

      result = await updateMosySqlRollBack();
    }

    if (result?.status === 'success') {
      
      const mosy_sql_roll_backUptoken = btoa(result.mosy_sql_roll_back_dataNode || '');

      //set id key
      setters.setMosySqlRollBackUptoken(mosy_sql_roll_backUptoken);
      
      //update url with new mosy_sql_roll_backUptoken
      mosyUpdateUrlParam('mosy_sql_roll_back_dataNode', mosy_sql_roll_backUptoken)

      setters.setMosySqlRollBackActionStatus('update_mosy_sql_roll_back')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: mosy_sql_roll_backUptoken,
        actionName : actionType,
        actionType : 'mosy_sql_roll_back_form_submission'
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


export async function initMosySqlRollBackProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Mosy Sql Roll Back' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.mosysqlrollback.base,
      params: { 
      ...rawQstr,
      src : btoa(`initMosySqlRollBackProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('mosysqlrollback Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching mosysqlrollback data:', response.message);  // Handle error
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


export async function DeleteMosySqlRollBack(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.mosysqlrollback.delete,
        params: { 
          _mosy_sql_roll_back_delete_record: (token), 
          },
      });

      console.log('Token DeleteMosySqlRollBack '+token)
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


export async function getMosySqlRollBackListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qmosy_sql_roll_back_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.mosysqlrollback.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getMosySqlRollBackListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('mosysqlrollback Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching mosysqlrollback data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadMosySqlRollBackListData(customQueryStr, setters) {

    const gftMosySqlRollBack = MosySecureFilterEngine('mosy_sql_roll_back');
    let finalFilterStr = (gftMosySqlRollBack);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setMosySqlRollBackLoading(true);
    
    const mosySqlRollBackListData = await getMosySqlRollBackListData(finalFilterStr);
    
    setters.setMosySqlRollBackLoading(false)
    setters.setMosySqlRollBackListData(mosySqlRollBackListData?.data)

    setters.setMosySqlRollBackListPageCount(mosySqlRollBackListData?.pagination?.page_count)


    return mosySqlRollBackListData

}
  
  
export async function mosySqlRollBackProfileData(customQueryStr, setters, router, customProfileData={}) {

    const mosySqlRollBackTokenId = mosyUrlParam('mosy_sql_roll_back_dataNode');
    
    const deleteParam = mosyUrlParam('mosy_sql_roll_back_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedMosySqlRollBackToken = '0';
    if (mosySqlRollBackTokenId) {
      
      decodedMosySqlRollBackToken = atob(mosySqlRollBackTokenId); // Decode the record_id
      setters.setMosySqlRollBackUptoken(mosySqlRollBackTokenId);
      setters.setMosySqlRollBackActionStatus('update_mosy_sql_roll_back');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawMosySqlRollBackQueryStr ={Node:btoa(decodedMosySqlRollBackToken)}
    if(customQueryStr!='')
    {
      // if no mosy_sql_roll_back_dataNode set , use customQueryStr
      if (!mosySqlRollBackTokenId) {
       rawMosySqlRollBackQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initMosySqlRollBackProfileData(rawMosySqlRollBackQueryStr)

    if(deleteParam){
      popDeleteDialog(mosySqlRollBackTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setMosySqlRollBackNode(finalProfileData)
    
    
}
  
  

export function InteprateMosySqlRollBackEvent(data) {
     
  //console.log(' MosySqlRollBack Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_mosy_sql_roll_back){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('MosySqlRollBackProfileTray')

    
    mosyUpdateUrlParam('mosy_sql_roll_back_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setMosySqlRollBackCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('MosySqlRollBackProfileTray')

    
    mosyUpdateUrlParam('mosy_sql_roll_back_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_mosy_sql_roll_back){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add mosy_sql_roll_back `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('MosySqlRollBackProfileTray')
      }
    }
     
  }

  if(childActionName.update_mosy_sql_roll_back){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update mosy_sql_roll_back `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('MosySqlRollBackProfileTray')
        
      }
    }
  }

  if(childActionName.delete_mosy_sql_roll_back){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../mosysqlrollback/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteMosySqlRollBack(deleteToken).then(response=>{
  
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
       deleteUrlParam('mosy_sql_roll_back_delete');
        
    }
  
  });

}