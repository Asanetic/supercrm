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
export async function insertDisbursements() {
 //console.log(`Form disbursements insert sent `)

  return await mosyPostFormData({
    formId: 'disbursements_profile_form',
    url: apiRoutes.disbursements.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateDisbursements() {

  //console.log(`Form disbursements update sent `)

  return await mosyPostFormData({
    formId: 'disbursements_profile_form',
    url: apiRoutes.disbursements.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateDisbursementsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('disbursements_mosy_action');
 
 //console.log(`Form disbursements submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_disbursements') {

      actionMessage ='Record added succesfully!';

      result = await insertDisbursements();
    }

    if (actionType === 'update_disbursements') {

      actionMessage ='Record updated succesfully!';

      result = await updateDisbursements();
    }

    if (result?.status === 'success') {
      
      const disbursementsUptoken = btoa(result.disbursements_dataNode || '');

      //set id key
      setters.setDisbursementsUptoken(disbursementsUptoken);
      
      //update url with new disbursementsUptoken
      mosyUpdateUrlParam('disbursements_dataNode', disbursementsUptoken)

      setters.setDisbursementsActionStatus('update_disbursements')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: disbursementsUptoken,
        actionName : actionType,
        actionType : 'disbursements_form_submission'
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


export async function initDisbursementsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Disbursements' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.disbursements.base,
      params: { 
      ...rawQstr,
      src : btoa(`initDisbursementsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('disbursements Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching disbursements data:', response.message);  // Handle error
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


export async function DeleteDisbursements(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.disbursements.delete,
        params: { 
          _disbursements_delete_record: (token), 
          },
      });

      console.log('Token DeleteDisbursements '+token)
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


export async function getDisbursementsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qdisbursements_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.disbursements.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getDisbursementsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('disbursements Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching disbursements data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadDisbursementsListData(customQueryStr, setters) {

    const gftDisbursements = MosySecureFilterEngine('disbursements');
    let finalFilterStr = (gftDisbursements);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setDisbursementsLoading(true);
    
    const disbursementsListData = await getDisbursementsListData(finalFilterStr);
    
    setters.setDisbursementsLoading(false)
    setters.setDisbursementsListData(disbursementsListData?.data)

    setters.setDisbursementsListPageCount(disbursementsListData?.pagination?.page_count)


    return disbursementsListData

}
  
  
export async function disbursementsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const disbursementsTokenId = mosyUrlParam('disbursements_dataNode');
    
    const deleteParam = mosyUrlParam('disbursements_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedDisbursementsToken = '0';
    if (disbursementsTokenId) {
      
      decodedDisbursementsToken = atob(disbursementsTokenId); // Decode the record_id
      setters.setDisbursementsUptoken(disbursementsTokenId);
      setters.setDisbursementsActionStatus('update_disbursements');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawDisbursementsQueryStr ={Node:btoa(decodedDisbursementsToken)}
    if(customQueryStr!='')
    {
      // if no disbursements_dataNode set , use customQueryStr
      if (!disbursementsTokenId) {
       rawDisbursementsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initDisbursementsProfileData(rawDisbursementsQueryStr)

    if(deleteParam){
      popDeleteDialog(disbursementsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setDisbursementsNode(finalProfileData)
    
    
}
  
  

export function InteprateDisbursementsEvent(data) {
     
  //console.log(' Disbursements Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_disbursements){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('DisbursementsProfileTray')

    
    mosyUpdateUrlParam('disbursements_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setDisbursementsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('DisbursementsProfileTray')

    
    mosyUpdateUrlParam('disbursements_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_disbursements){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add disbursements `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('DisbursementsProfileTray')
      }
    }
     
  }

  if(childActionName.update_disbursements){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update disbursements `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('DisbursementsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_disbursements){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../disbursements/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteDisbursements(deleteToken).then(response=>{
  
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
       deleteUrlParam('disbursements_delete');
        
    }
  
  });

}