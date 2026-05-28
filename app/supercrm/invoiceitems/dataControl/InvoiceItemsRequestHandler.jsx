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
export async function insertInvoiceItems() {
 //console.log(`Form invoice_items insert sent `)

  return await mosyPostFormData({
    formId: 'invoice_items_profile_form',
    url: apiRoutes.invoiceitems.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateInvoiceItems() {

  //console.log(`Form invoice_items update sent `)

  return await mosyPostFormData({
    formId: 'invoice_items_profile_form',
    url: apiRoutes.invoiceitems.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateInvoiceItemsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('invoice_items_mosy_action');
 
 //console.log(`Form invoice_items submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_invoice_items') {

      actionMessage ='Record added succesfully!';

      result = await insertInvoiceItems();
    }

    if (actionType === 'update_invoice_items') {

      actionMessage ='Record updated succesfully!';

      result = await updateInvoiceItems();
    }

    if (result?.status === 'success') {
      
      const invoice_itemsUptoken = btoa(result.invoice_items_dataNode || '');

      //set id key
      setters.setInvoiceItemsUptoken(invoice_itemsUptoken);
      
      //update url with new invoice_itemsUptoken
      mosyUpdateUrlParam('invoice_items_dataNode', invoice_itemsUptoken)

      setters.setInvoiceItemsActionStatus('update_invoice_items')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: invoice_itemsUptoken,
        actionName : actionType,
        actionType : 'invoice_items_form_submission'
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


export async function initInvoiceItemsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Invoice Items' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.invoiceitems.base,
      params: { 
      ...rawQstr,
      src : btoa(`initInvoiceItemsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('invoiceitems Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching invoiceitems data:', response.message);  // Handle error
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


export async function DeleteInvoiceItems(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.invoiceitems.delete,
        params: { 
          _invoice_items_delete_record: (token), 
          },
      });

      console.log('Token DeleteInvoiceItems '+token)
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


export async function getInvoiceItemsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qinvoice_items_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.invoiceitems.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getInvoiceItemsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('invoiceitems Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching invoiceitems data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadInvoiceItemsListData(customQueryStr, setters) {

    const gftInvoiceItems = MosySecureFilterEngine('invoice_items');
    let finalFilterStr = (gftInvoiceItems);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setInvoiceItemsLoading(true);
    
    const invoiceItemsListData = await getInvoiceItemsListData(finalFilterStr);
    
    setters.setInvoiceItemsLoading(false)
    setters.setInvoiceItemsListData(invoiceItemsListData?.data)

    setters.setInvoiceItemsListPageCount(invoiceItemsListData?.pagination?.page_count)


    return invoiceItemsListData

}
  
  
export async function invoiceItemsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const invoiceItemsTokenId = mosyUrlParam('invoice_items_dataNode');
    
    const deleteParam = mosyUrlParam('invoice_items_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedInvoiceItemsToken = '0';
    if (invoiceItemsTokenId) {
      
      decodedInvoiceItemsToken = atob(invoiceItemsTokenId); // Decode the record_id
      setters.setInvoiceItemsUptoken(invoiceItemsTokenId);
      setters.setInvoiceItemsActionStatus('update_invoice_items');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawInvoiceItemsQueryStr ={Node:btoa(decodedInvoiceItemsToken)}
    if(customQueryStr!='')
    {
      // if no invoice_items_dataNode set , use customQueryStr
      if (!invoiceItemsTokenId) {
       rawInvoiceItemsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initInvoiceItemsProfileData(rawInvoiceItemsQueryStr)

    if(deleteParam){
      popDeleteDialog(invoiceItemsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setInvoiceItemsNode(finalProfileData)
    
    
}
  
  

export function InteprateInvoiceItemsEvent(data) {
     
  //console.log(' InvoiceItems Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_invoice_items){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('InvoiceItemsProfileTray')

    
    mosyUpdateUrlParam('invoice_items_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setInvoiceItemsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('InvoiceItemsProfileTray')

    
    mosyUpdateUrlParam('invoice_items_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_invoice_items){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add invoice_items `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('InvoiceItemsProfileTray')
      }
    }
     
  }

  if(childActionName.update_invoice_items){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update invoice_items `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('InvoiceItemsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_invoice_items){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../invoiceitems/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteInvoiceItems(deleteToken).then(response=>{
  
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
       deleteUrlParam('invoice_items_delete');
        
    }
  
  });

}