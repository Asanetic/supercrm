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
export async function insertActivities() {
 //console.log(`Form activities insert sent `)

  return await mosyPostFormData({
    formId: 'activities_profile_form',
    url: apiRoutes.activities.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateActivities() {

  //console.log(`Form activities update sent `)

  return await mosyPostFormData({
    formId: 'activities_profile_form',
    url: apiRoutes.activities.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateActivitiesFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('activities_mosy_action');
 
 //console.log(`Form activities submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_activities') {

      actionMessage ='Record added succesfully!';

      result = await insertActivities();
    }

    if (actionType === 'update_activities') {

      actionMessage ='Record updated succesfully!';

      result = await updateActivities();
    }

    if (result?.status === 'success') {
      
      const activitiesUptoken = btoa(result.activities_dataNode || '');

      //set id key
      setters.setActivitiesUptoken(activitiesUptoken);
      
      //update url with new activitiesUptoken
      mosyUpdateUrlParam('activities_dataNode', activitiesUptoken)

      setters.setActivitiesActionStatus('update_activities')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: activitiesUptoken,
        actionName : actionType,
        actionType : 'activities_form_submission'
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


export async function initActivitiesProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Activities' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.activities.base,
      params: { 
      ...rawQstr,
      src : btoa(`initActivitiesProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('activities Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching activities data:', response.message);  // Handle error
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


export async function DeleteActivities(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.activities.delete,
        params: { 
          _activities_delete_record: (token), 
          },
      });

      console.log('Token DeleteActivities '+token)
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


export async function getActivitiesListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qactivities_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.activities.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getActivitiesListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('activities Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching activities data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadActivitiesListData(customQueryStr, setters) {

    const gftActivities = MosySecureFilterEngine('activities');
    let finalFilterStr = (gftActivities);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setActivitiesLoading(true);
    
    const activitiesListData = await getActivitiesListData(finalFilterStr);
    
    setters.setActivitiesLoading(false)
    setters.setActivitiesListData(activitiesListData?.data)

    setters.setActivitiesListPageCount(activitiesListData?.pagination?.page_count)


    return activitiesListData

}
  
  
export async function activitiesProfileData(customQueryStr, setters, router, customProfileData={}) {

    const activitiesTokenId = mosyUrlParam('activities_dataNode');
    
    const deleteParam = mosyUrlParam('activities_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedActivitiesToken = '0';
    if (activitiesTokenId) {
      
      decodedActivitiesToken = atob(activitiesTokenId); // Decode the record_id
      setters.setActivitiesUptoken(activitiesTokenId);
      setters.setActivitiesActionStatus('update_activities');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawActivitiesQueryStr ={Node:btoa(decodedActivitiesToken)}
    if(customQueryStr!='')
    {
      // if no activities_dataNode set , use customQueryStr
      if (!activitiesTokenId) {
       rawActivitiesQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initActivitiesProfileData(rawActivitiesQueryStr)

    if(deleteParam){
      popDeleteDialog(activitiesTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setActivitiesNode(finalProfileData)
    
    
}
  
  

export function InteprateActivitiesEvent(data) {
     
  //console.log(' Activities Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_activities){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ActivitiesProfileTray')

    
    mosyUpdateUrlParam('activities_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setActivitiesCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ActivitiesProfileTray')

    
    mosyUpdateUrlParam('activities_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_activities){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add activities `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ActivitiesProfileTray')
      }
    }
     
  }

  if(childActionName.update_activities){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update activities `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ActivitiesProfileTray')
        
      }
    }
  }

  if(childActionName.delete_activities){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../activities/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteActivities(deleteToken).then(response=>{
  
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
       deleteUrlParam('activities_delete');
        
    }
  
  });

}