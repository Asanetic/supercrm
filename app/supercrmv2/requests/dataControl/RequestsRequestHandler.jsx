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
export async function insertRequests() {
 //console.log(`Form requests insert sent `)

  return await mosyPostFormData({
    formId: 'requests_profile_form',
    url: apiRoutes.requests.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateRequests() {

  //console.log(`Form requests update sent `)

  return await mosyPostFormData({
    formId: 'requests_profile_form',
    url: apiRoutes.requests.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateRequestsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('requests_mosy_action');
 
 //console.log(`Form requests submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_requests') {

      actionMessage ='Record added succesfully!';

      result = await insertRequests();
    }

    if (actionType === 'update_requests') {

      actionMessage ='Record updated succesfully!';

      result = await updateRequests();
    }

    if (result?.status === 'success') {
      
      const requestsUptoken = btoa(result.requests_dataNode || '');

      //set id key
      setters.setRequestsUptoken(requestsUptoken);
      
      //update url with new requestsUptoken
      mosyUpdateUrlParam('requests_dataNode', requestsUptoken)

      setters.setRequestsActionStatus('update_requests')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: requestsUptoken,
        actionName : actionType,
        actionType : 'requests_form_submission'
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


export async function initRequestsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Requests' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.requests.base,
      params: { 
      ...rawQstr,
      src : btoa(`initRequestsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('requests Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching requests data:', response.message);  // Handle error
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


export async function DeleteRequests(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.requests.delete,
        params: { 
          _requests_delete_record: (token), 
          },
      });

      console.log('Token DeleteRequests '+token)
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


export async function getRequestsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qrequests_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.requests.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getRequestsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('requests Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching requests data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadRequestsListData(customQueryStr, setters) {

    const gftRequests = MosySecureFilterEngine('requests');
    let finalFilterStr = (gftRequests);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setRequestsLoading(true);
    
    const requestsListData = await getRequestsListData(finalFilterStr);
    
    setters.setRequestsLoading(false)
    setters.setRequestsListData(requestsListData?.data)

    setters.setRequestsListPageCount(requestsListData?.pagination?.page_count)


    return requestsListData

}
  
  
export async function requestsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const requestsTokenId = mosyUrlParam('requests_dataNode');
    
    const deleteParam = mosyUrlParam('requests_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedRequestsToken = '0';
    if (requestsTokenId) {
      
      decodedRequestsToken = atob(requestsTokenId); // Decode the record_id
      setters.setRequestsUptoken(requestsTokenId);
      setters.setRequestsActionStatus('update_requests');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawRequestsQueryStr ={Node:btoa(decodedRequestsToken)}
    if(customQueryStr!='')
    {
      // if no requests_dataNode set , use customQueryStr
      if (!requestsTokenId) {
       rawRequestsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initRequestsProfileData(rawRequestsQueryStr)

    if(deleteParam){
      popDeleteDialog(requestsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setRequestsNode(finalProfileData)
    
    
}
  
  

export function InteprateRequestsEvent(data) {
     
  //console.log(' Requests Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_requests){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('RequestsProfileTray')

    
    mosyUpdateUrlParam('requests_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setRequestsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('RequestsProfileTray')

    
    mosyUpdateUrlParam('requests_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_requests){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add requests `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('RequestsProfileTray')
      }
    }
     
  }

  if(childActionName.update_requests){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update requests `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('RequestsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_requests){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../requests/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteRequests(deleteToken).then(response=>{
  
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
       deleteUrlParam('requests_delete');
        
    }
  
  });

}