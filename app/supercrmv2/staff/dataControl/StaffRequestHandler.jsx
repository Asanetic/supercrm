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
export async function insertStaff() {
 //console.log(`Form staff insert sent `)

  return await mosyPostFormData({
    formId: 'staff_profile_form',
    url: apiRoutes.staff.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateStaff() {

  //console.log(`Form staff update sent `)

  return await mosyPostFormData({
    formId: 'staff_profile_form',
    url: apiRoutes.staff.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateStaffFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('staff_mosy_action');
 
 //console.log(`Form staff submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_staff') {

      actionMessage ='Record added succesfully!';

      result = await insertStaff();
    }

    if (actionType === 'update_staff') {

      actionMessage ='Record updated succesfully!';

      result = await updateStaff();
    }

    if (result?.status === 'success') {
      
      const staffUptoken = btoa(result.staff_dataNode || '');

      //set id key
      setters.setStaffUptoken(staffUptoken);
      
      //update url with new staffUptoken
      mosyUpdateUrlParam('staff_dataNode', staffUptoken)

      setters.setStaffActionStatus('update_staff')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: staffUptoken,
        actionName : actionType,
        actionType : 'staff_form_submission'
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


export async function initStaffProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Staff' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.staff.base,
      params: { 
      ...rawQstr,
      src : btoa(`initStaffProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('staff Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching staff data:', response.message);  // Handle error
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


export async function DeleteStaff(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.staff.delete,
        params: { 
          _staff_delete_record: (token), 
          },
      });

      console.log('Token DeleteStaff '+token)
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


export async function getStaffListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qstaff_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.staff.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getStaffListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('staff Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching staff data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadStaffListData(customQueryStr, setters) {

    const gftStaff = MosySecureFilterEngine('staff');
    let finalFilterStr = (gftStaff);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setStaffLoading(true);
    
    const staffListData = await getStaffListData(finalFilterStr);
    
    setters.setStaffLoading(false)
    setters.setStaffListData(staffListData?.data)

    setters.setStaffListPageCount(staffListData?.pagination?.page_count)


    return staffListData

}
  
  
export async function staffProfileData(customQueryStr, setters, router, customProfileData={}) {

    const staffTokenId = mosyUrlParam('staff_dataNode');
    
    const deleteParam = mosyUrlParam('staff_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedStaffToken = '0';
    if (staffTokenId) {
      
      decodedStaffToken = atob(staffTokenId); // Decode the record_id
      setters.setStaffUptoken(staffTokenId);
      setters.setStaffActionStatus('update_staff');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawStaffQueryStr ={Node:btoa(decodedStaffToken)}
    if(customQueryStr!='')
    {
      // if no staff_dataNode set , use customQueryStr
      if (!staffTokenId) {
       rawStaffQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initStaffProfileData(rawStaffQueryStr)

    if(deleteParam){
      popDeleteDialog(staffTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setStaffNode(finalProfileData)
    
    
}
  
  

export function InteprateStaffEvent(data) {
     
  //console.log(' Staff Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_staff){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('StaffProfileTray')

    
    mosyUpdateUrlParam('staff_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setStaffCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('StaffProfileTray')

    
    mosyUpdateUrlParam('staff_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_staff){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add staff `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('StaffProfileTray')
      }
    }
     
  }

  if(childActionName.update_staff){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update staff `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('StaffProfileTray')
        
      }
    }
  }

  if(childActionName.delete_staff){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../staff/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteStaff(deleteToken).then(response=>{
  
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
       deleteUrlParam('staff_delete');
        
    }
  
  });

}