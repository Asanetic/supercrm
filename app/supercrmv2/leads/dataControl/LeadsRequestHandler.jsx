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
export async function insertLeads() {
 //console.log(`Form leads insert sent `)

  return await mosyPostFormData({
    formId: 'leads_profile_form',
    url: apiRoutes.leads.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateLeads() {

  //console.log(`Form leads update sent `)

  return await mosyPostFormData({
    formId: 'leads_profile_form',
    url: apiRoutes.leads.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateLeadsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('leads_mosy_action');
 
 //console.log(`Form leads submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_leads') {

      actionMessage ='Record added succesfully!';

      result = await insertLeads();
    }

    if (actionType === 'update_leads') {

      actionMessage ='Record updated succesfully!';

      result = await updateLeads();
    }

    if (result?.status === 'success') {
      
      const leadsUptoken = btoa(result.leads_dataNode || '');

      //set id key
      setters.setLeadsUptoken(leadsUptoken);
      
      //update url with new leadsUptoken
      mosyUpdateUrlParam('leads_dataNode', leadsUptoken)

      setters.setLeadsActionStatus('update_leads')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: leadsUptoken,
        actionName : actionType,
        actionType : 'leads_form_submission'
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


export async function initLeadsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Leads' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.leads.base,
      params: { 
      ...rawQstr,
      src : btoa(`initLeadsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('leads Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching leads data:', response.message);  // Handle error
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


export async function DeleteLeads(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.leads.delete,
        params: { 
          _leads_delete_record: (token), 
          },
      });

      console.log('Token DeleteLeads '+token)
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


export async function getLeadsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qleads_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.leads.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getLeadsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('leads Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching leads data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadLeadsListData(customQueryStr, setters) {

    const gftLeads = MosySecureFilterEngine('leads');
    let finalFilterStr = (gftLeads);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setLeadsLoading(true);
    
    const leadsListData = await getLeadsListData(finalFilterStr);
    
    setters.setLeadsLoading(false)
    setters.setLeadsListData(leadsListData?.data)

    setters.setLeadsListPageCount(leadsListData?.pagination?.page_count)


    return leadsListData

}
  
  
export async function leadsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const leadsTokenId = mosyUrlParam('leads_dataNode');
    
    const deleteParam = mosyUrlParam('leads_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedLeadsToken = '0';
    if (leadsTokenId) {
      
      decodedLeadsToken = atob(leadsTokenId); // Decode the record_id
      setters.setLeadsUptoken(leadsTokenId);
      setters.setLeadsActionStatus('update_leads');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawLeadsQueryStr ={Node:btoa(decodedLeadsToken)}
    if(customQueryStr!='')
    {
      // if no leads_dataNode set , use customQueryStr
      if (!leadsTokenId) {
       rawLeadsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initLeadsProfileData(rawLeadsQueryStr)

    if(deleteParam){
      popDeleteDialog(leadsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setLeadsNode(finalProfileData)
    
    
}
  
  

export function InteprateLeadsEvent(data) {
     
  //console.log(' Leads Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_leads){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('LeadsProfileTray')

    
    mosyUpdateUrlParam('leads_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLeadsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('LeadsProfileTray')

    
    mosyUpdateUrlParam('leads_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_leads){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add leads `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('LeadsProfileTray')
      }
    }
     
  }

  if(childActionName.update_leads){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update leads `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('LeadsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_leads){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../leads/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteLeads(deleteToken).then(response=>{
  
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
       deleteUrlParam('leads_delete');
        
    }
  
  });

}