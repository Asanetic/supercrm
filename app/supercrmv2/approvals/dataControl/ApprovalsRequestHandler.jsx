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
export async function insertApprovals() {
 //console.log(`Form approvals insert sent `)

  return await mosyPostFormData({
    formId: 'approvals_profile_form',
    url: apiRoutes.approvals.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateApprovals() {

  //console.log(`Form approvals update sent `)

  return await mosyPostFormData({
    formId: 'approvals_profile_form',
    url: apiRoutes.approvals.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateApprovalsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('approvals_mosy_action');
 
 //console.log(`Form approvals submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_approvals') {

      actionMessage ='Record added succesfully!';

      result = await insertApprovals();
    }

    if (actionType === 'update_approvals') {

      actionMessage ='Record updated succesfully!';

      result = await updateApprovals();
    }

    if (result?.status === 'success') {
      
      const approvalsUptoken = btoa(result.approvals_dataNode || '');

      //set id key
      setters.setApprovalsUptoken(approvalsUptoken);
      
      //update url with new approvalsUptoken
      mosyUpdateUrlParam('approvals_dataNode', approvalsUptoken)

      setters.setApprovalsActionStatus('update_approvals')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: approvalsUptoken,
        actionName : actionType,
        actionType : 'approvals_form_submission'
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


export async function initApprovalsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Approvals' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.approvals.base,
      params: { 
      ...rawQstr,
      src : btoa(`initApprovalsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('approvals Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching approvals data:', response.message);  // Handle error
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


export async function DeleteApprovals(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.approvals.delete,
        params: { 
          _approvals_delete_record: (token), 
          },
      });

      console.log('Token DeleteApprovals '+token)
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


export async function getApprovalsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qapprovals_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.approvals.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getApprovalsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('approvals Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching approvals data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadApprovalsListData(customQueryStr, setters) {

    const gftApprovals = MosySecureFilterEngine('approvals');
    let finalFilterStr = (gftApprovals);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setApprovalsLoading(true);
    
    const approvalsListData = await getApprovalsListData(finalFilterStr);
    
    setters.setApprovalsLoading(false)
    setters.setApprovalsListData(approvalsListData?.data)

    setters.setApprovalsListPageCount(approvalsListData?.pagination?.page_count)


    return approvalsListData

}
  
  
export async function approvalsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const approvalsTokenId = mosyUrlParam('approvals_dataNode');
    
    const deleteParam = mosyUrlParam('approvals_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedApprovalsToken = '0';
    if (approvalsTokenId) {
      
      decodedApprovalsToken = atob(approvalsTokenId); // Decode the record_id
      setters.setApprovalsUptoken(approvalsTokenId);
      setters.setApprovalsActionStatus('update_approvals');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawApprovalsQueryStr ={Node:btoa(decodedApprovalsToken)}
    if(customQueryStr!='')
    {
      // if no approvals_dataNode set , use customQueryStr
      if (!approvalsTokenId) {
       rawApprovalsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initApprovalsProfileData(rawApprovalsQueryStr)

    if(deleteParam){
      popDeleteDialog(approvalsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setApprovalsNode(finalProfileData)
    
    
}
  
  

export function InteprateApprovalsEvent(data) {
     
  //console.log(' Approvals Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_approvals){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ApprovalsProfileTray')

    
    mosyUpdateUrlParam('approvals_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setApprovalsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ApprovalsProfileTray')

    
    mosyUpdateUrlParam('approvals_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_approvals){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add approvals `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ApprovalsProfileTray')
      }
    }
     
  }

  if(childActionName.update_approvals){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update approvals `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ApprovalsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_approvals){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../approvals/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteApprovals(deleteToken).then(response=>{
  
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
       deleteUrlParam('approvals_delete');
        
    }
  
  });

}