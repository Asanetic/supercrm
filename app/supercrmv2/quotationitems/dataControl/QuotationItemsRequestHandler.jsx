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
export async function insertQuotationItems() {
 //console.log(`Form quotation_items insert sent `)

  return await mosyPostFormData({
    formId: 'quotation_items_profile_form',
    url: apiRoutes.quotationitems.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateQuotationItems() {

  //console.log(`Form quotation_items update sent `)

  return await mosyPostFormData({
    formId: 'quotation_items_profile_form',
    url: apiRoutes.quotationitems.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateQuotationItemsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('quotation_items_mosy_action');
 
 //console.log(`Form quotation_items submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_quotation_items') {

      actionMessage ='Record added succesfully!';

      result = await insertQuotationItems();
    }

    if (actionType === 'update_quotation_items') {

      actionMessage ='Record updated succesfully!';

      result = await updateQuotationItems();
    }

    if (result?.status === 'success') {
      
      const quotation_itemsUptoken = btoa(result.quotation_items_dataNode || '');

      //set id key
      setters.setQuotationItemsUptoken(quotation_itemsUptoken);
      
      //update url with new quotation_itemsUptoken
      mosyUpdateUrlParam('quotation_items_dataNode', quotation_itemsUptoken)

      setters.setQuotationItemsActionStatus('update_quotation_items')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: quotation_itemsUptoken,
        actionName : actionType,
        actionType : 'quotation_items_form_submission'
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


export async function initQuotationItemsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Quotation Items' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.quotationitems.base,
      params: { 
      ...rawQstr,
      src : btoa(`initQuotationItemsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('quotationitems Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching quotationitems data:', response.message);  // Handle error
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


export async function DeleteQuotationItems(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.quotationitems.delete,
        params: { 
          _quotation_items_delete_record: (token), 
          },
      });

      console.log('Token DeleteQuotationItems '+token)
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


export async function getQuotationItemsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qquotation_items_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.quotationitems.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getQuotationItemsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('quotationitems Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching quotationitems data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadQuotationItemsListData(customQueryStr, setters) {

    const gftQuotationItems = MosySecureFilterEngine('quotation_items');
    let finalFilterStr = (gftQuotationItems);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setQuotationItemsLoading(true);
    
    const quotationItemsListData = await getQuotationItemsListData(finalFilterStr);
    
    setters.setQuotationItemsLoading(false)
    setters.setQuotationItemsListData(quotationItemsListData?.data)

    setters.setQuotationItemsListPageCount(quotationItemsListData?.pagination?.page_count)


    return quotationItemsListData

}
  
  
export async function quotationItemsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const quotationItemsTokenId = mosyUrlParam('quotation_items_dataNode');
    
    const deleteParam = mosyUrlParam('quotation_items_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedQuotationItemsToken = '0';
    if (quotationItemsTokenId) {
      
      decodedQuotationItemsToken = atob(quotationItemsTokenId); // Decode the record_id
      setters.setQuotationItemsUptoken(quotationItemsTokenId);
      setters.setQuotationItemsActionStatus('update_quotation_items');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawQuotationItemsQueryStr ={Node:btoa(decodedQuotationItemsToken)}
    if(customQueryStr!='')
    {
      // if no quotation_items_dataNode set , use customQueryStr
      if (!quotationItemsTokenId) {
       rawQuotationItemsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initQuotationItemsProfileData(rawQuotationItemsQueryStr)

    if(deleteParam){
      popDeleteDialog(quotationItemsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setQuotationItemsNode(finalProfileData)
    
    
}
  
  

export function InteprateQuotationItemsEvent(data) {
     
  //console.log(' QuotationItems Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_quotation_items){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('QuotationItemsProfileTray')

    
    mosyUpdateUrlParam('quotation_items_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setQuotationItemsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('QuotationItemsProfileTray')

    
    mosyUpdateUrlParam('quotation_items_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_quotation_items){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add quotation_items `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('QuotationItemsProfileTray')
      }
    }
     
  }

  if(childActionName.update_quotation_items){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update quotation_items `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('QuotationItemsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_quotation_items){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../quotationitems/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteQuotationItems(deleteToken).then(response=>{
  
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
       deleteUrlParam('quotation_items_delete');
        
    }
  
  });

}