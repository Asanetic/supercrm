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
export async function insertServiceCategories() {
 //console.log(`Form service_categories insert sent `)

  return await mosyPostFormData({
    formId: 'service_categories_profile_form',
    url: apiRoutes.servicecategories.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateServiceCategories() {

  //console.log(`Form service_categories update sent `)

  return await mosyPostFormData({
    formId: 'service_categories_profile_form',
    url: apiRoutes.servicecategories.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateServiceCategoriesFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('service_categories_mosy_action');
 
 //console.log(`Form service_categories submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_service_categories') {

      actionMessage ='Record added succesfully!';

      result = await insertServiceCategories();
    }

    if (actionType === 'update_service_categories') {

      actionMessage ='Record updated succesfully!';

      result = await updateServiceCategories();
    }

    if (result?.status === 'success') {
      
      const service_categoriesUptoken = btoa(result.service_categories_dataNode || '');

      //set id key
      setters.setServiceCategoriesUptoken(service_categoriesUptoken);
      
      //update url with new service_categoriesUptoken
      mosyUpdateUrlParam('service_categories_dataNode', service_categoriesUptoken)

      setters.setServiceCategoriesActionStatus('update_service_categories')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: service_categoriesUptoken,
        actionName : actionType,
        actionType : 'service_categories_form_submission'
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


export async function initServiceCategoriesProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Service Categories' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.servicecategories.base,
      params: { 
      ...rawQstr,
      src : btoa(`initServiceCategoriesProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('servicecategories Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching servicecategories data:', response.message);  // Handle error
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


export async function DeleteServiceCategories(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.servicecategories.delete,
        params: { 
          _service_categories_delete_record: (token), 
          },
      });

      console.log('Token DeleteServiceCategories '+token)
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


export async function getServiceCategoriesListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qservice_categories_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.servicecategories.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getServiceCategoriesListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('servicecategories Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching servicecategories data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadServiceCategoriesListData(customQueryStr, setters) {

    const gftServiceCategories = MosySecureFilterEngine('service_categories');
    let finalFilterStr = (gftServiceCategories);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setServiceCategoriesLoading(true);
    
    const serviceCategoriesListData = await getServiceCategoriesListData(finalFilterStr);
    
    setters.setServiceCategoriesLoading(false)
    setters.setServiceCategoriesListData(serviceCategoriesListData?.data)

    setters.setServiceCategoriesListPageCount(serviceCategoriesListData?.pagination?.page_count)


    return serviceCategoriesListData

}
  
  
export async function serviceCategoriesProfileData(customQueryStr, setters, router, customProfileData={}) {

    const serviceCategoriesTokenId = mosyUrlParam('service_categories_dataNode');
    
    const deleteParam = mosyUrlParam('service_categories_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedServiceCategoriesToken = '0';
    if (serviceCategoriesTokenId) {
      
      decodedServiceCategoriesToken = atob(serviceCategoriesTokenId); // Decode the record_id
      setters.setServiceCategoriesUptoken(serviceCategoriesTokenId);
      setters.setServiceCategoriesActionStatus('update_service_categories');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawServiceCategoriesQueryStr ={Node:btoa(decodedServiceCategoriesToken)}
    if(customQueryStr!='')
    {
      // if no service_categories_dataNode set , use customQueryStr
      if (!serviceCategoriesTokenId) {
       rawServiceCategoriesQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initServiceCategoriesProfileData(rawServiceCategoriesQueryStr)

    if(deleteParam){
      popDeleteDialog(serviceCategoriesTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setServiceCategoriesNode(finalProfileData)
    
    
}
  
  

export function InteprateServiceCategoriesEvent(data) {
     
  //console.log(' ServiceCategories Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_service_categories){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ServiceCategoriesProfileTray')

    
    mosyUpdateUrlParam('service_categories_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setServiceCategoriesCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ServiceCategoriesProfileTray')

    
    mosyUpdateUrlParam('service_categories_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_service_categories){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add service_categories `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ServiceCategoriesProfileTray')
      }
    }
     
  }

  if(childActionName.update_service_categories){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update service_categories `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ServiceCategoriesProfileTray')
        
      }
    }
  }

  if(childActionName.delete_service_categories){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../servicecategories/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteServiceCategories(deleteToken).then(response=>{
  
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
       deleteUrlParam('service_categories_delete');
        
    }
  
  });

}