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
export async function insertServices() {
 //console.log(`Form services insert sent `)

  return await mosyPostFormData({
    formId: 'services_profile_form',
    url: apiRoutes.services.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateServices() {

  //console.log(`Form services update sent `)

  return await mosyPostFormData({
    formId: 'services_profile_form',
    url: apiRoutes.services.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateServicesFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('services_mosy_action');
 
 //console.log(`Form services submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_services') {

      actionMessage ='Record added succesfully!';

      result = await insertServices();
    }

    if (actionType === 'update_services') {

      actionMessage ='Record updated succesfully!';

      result = await updateServices();
    }

    if (result?.status === 'success') {
      
      const servicesUptoken = btoa(result.services_dataNode || '');

      //set id key
      setters.setServicesUptoken(servicesUptoken);
      
      //update url with new servicesUptoken
      mosyUpdateUrlParam('services_dataNode', servicesUptoken)

      setters.setServicesActionStatus('update_services')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: servicesUptoken,
        actionName : actionType,
        actionType : 'services_form_submission'
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


export async function initServicesProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Services' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.services.base,
      params: { 
      ...rawQstr,
      src : btoa(`initServicesProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('services Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching services data:', response.message);  // Handle error
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


export async function DeleteServices(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.services.delete,
        params: { 
          _services_delete_record: (token), 
          },
      });

      console.log('Token DeleteServices '+token)
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


export async function getServicesListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qservices_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.services.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getServicesListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('services Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching services data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadServicesListData(customQueryStr, setters) {

    const gftServices = MosySecureFilterEngine('services');
    let finalFilterStr = (gftServices);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setServicesLoading(true);
    
    const servicesListData = await getServicesListData(finalFilterStr);
    
    setters.setServicesLoading(false)
    setters.setServicesListData(servicesListData?.data)

    setters.setServicesListPageCount(servicesListData?.pagination?.page_count)


    return servicesListData

}
  
  
export async function servicesProfileData(customQueryStr, setters, router, customProfileData={}) {

    const servicesTokenId = mosyUrlParam('services_dataNode');
    
    const deleteParam = mosyUrlParam('services_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedServicesToken = '0';
    if (servicesTokenId) {
      
      decodedServicesToken = atob(servicesTokenId); // Decode the record_id
      setters.setServicesUptoken(servicesTokenId);
      setters.setServicesActionStatus('update_services');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawServicesQueryStr ={Node:btoa(decodedServicesToken)}
    if(customQueryStr!='')
    {
      // if no services_dataNode set , use customQueryStr
      if (!servicesTokenId) {
       rawServicesQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initServicesProfileData(rawServicesQueryStr)

    if(deleteParam){
      popDeleteDialog(servicesTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setServicesNode(finalProfileData)
    
    
}
  
  

export function InteprateServicesEvent(data) {
     
  //console.log(' Services Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_services){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ServicesProfileTray')

    
    mosyUpdateUrlParam('services_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setServicesCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ServicesProfileTray')

    
    mosyUpdateUrlParam('services_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_services){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add services `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ServicesProfileTray')
      }
    }
     
  }

  if(childActionName.update_services){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update services `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ServicesProfileTray')
        
      }
    }
  }

  if(childActionName.delete_services){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../services/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteServices(deleteToken).then(response=>{
  
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
       deleteUrlParam('services_delete');
        
    }
  
  });

}