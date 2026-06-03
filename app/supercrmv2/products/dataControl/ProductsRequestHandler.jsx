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
export async function insertProducts() {
 //console.log(`Form products insert sent `)

  return await mosyPostFormData({
    formId: 'products_profile_form',
    url: apiRoutes.products.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateProducts() {

  //console.log(`Form products update sent `)

  return await mosyPostFormData({
    formId: 'products_profile_form',
    url: apiRoutes.products.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateProductsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('products_mosy_action');
 
 //console.log(`Form products submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_products') {

      actionMessage ='Record added succesfully!';

      result = await insertProducts();
    }

    if (actionType === 'update_products') {

      actionMessage ='Record updated succesfully!';

      result = await updateProducts();
    }

    if (result?.status === 'success') {
      
      const productsUptoken = btoa(result.products_dataNode || '');

      //set id key
      setters.setProductsUptoken(productsUptoken);
      
      //update url with new productsUptoken
      mosyUpdateUrlParam('products_dataNode', productsUptoken)

      setters.setProductsActionStatus('update_products')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: productsUptoken,
        actionName : actionType,
        actionType : 'products_form_submission'
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


export async function initProductsProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Products' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.products.base,
      params: { 
      ...rawQstr,
      src : btoa(`initProductsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('products Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching products data:', response.message);  // Handle error
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


export async function DeleteProducts(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.products.delete,
        params: { 
          _products_delete_record: (token), 
          },
      });

      console.log('Token DeleteProducts '+token)
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


export async function getProductsListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qproducts_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.products.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getProductsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('products Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching products data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadProductsListData(customQueryStr, setters) {

    const gftProducts = MosySecureFilterEngine('products');
    let finalFilterStr = (gftProducts);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setProductsLoading(true);
    
    const productsListData = await getProductsListData(finalFilterStr);
    
    setters.setProductsLoading(false)
    setters.setProductsListData(productsListData?.data)

    setters.setProductsListPageCount(productsListData?.pagination?.page_count)


    return productsListData

}
  
  
export async function productsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const productsTokenId = mosyUrlParam('products_dataNode');
    
    const deleteParam = mosyUrlParam('products_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedProductsToken = '0';
    if (productsTokenId) {
      
      decodedProductsToken = atob(productsTokenId); // Decode the record_id
      setters.setProductsUptoken(productsTokenId);
      setters.setProductsActionStatus('update_products');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawProductsQueryStr ={Node:btoa(decodedProductsToken)}
    if(customQueryStr!='')
    {
      // if no products_dataNode set , use customQueryStr
      if (!productsTokenId) {
       rawProductsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initProductsProfileData(rawProductsQueryStr)

    if(deleteParam){
      popDeleteDialog(productsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setProductsNode(finalProfileData)
    
    
}
  
  

export function InteprateProductsEvent(data) {
     
  //console.log(' Products Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_products){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ProductsProfileTray')

    
    mosyUpdateUrlParam('products_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setProductsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ProductsProfileTray')

    
    mosyUpdateUrlParam('products_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_products){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add products `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ProductsProfileTray')
      }
    }
     
  }

  if(childActionName.update_products){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update products `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ProductsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_products){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../products/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteProducts(deleteToken).then(response=>{
  
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
       deleteUrlParam('products_delete');
        
    }
  
  });

}