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
export async function insertProductCategories() {
 //console.log(`Form product_categories insert sent `)

  return await mosyPostFormData({
    formId: 'product_categories_profile_form',
    url: apiRoutes.productcategories.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateProductCategories() {

  //console.log(`Form product_categories update sent `)

  return await mosyPostFormData({
    formId: 'product_categories_profile_form',
    url: apiRoutes.productcategories.base,
    method: 'PUT',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateProductCategoriesFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('product_categories_mosy_action');
 
 //console.log(`Form product_categories submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_product_categories') {

      actionMessage ='Record added succesfully!';

      result = await insertProductCategories();
    }

    if (actionType === 'update_product_categories') {

      actionMessage ='Record updated succesfully!';

      result = await updateProductCategories();
    }

    if (result?.status === 'success') {
      
      const product_categoriesUptoken = btoa(result.product_categories_dataNode || '');

      //set id key
      setters.setProductCategoriesUptoken(product_categoriesUptoken);
      
      //update url with new product_categoriesUptoken
      mosyUpdateUrlParam('product_categories_dataNode', product_categoriesUptoken)

      setters.setProductCategoriesActionStatus('update_product_categories')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: product_categoriesUptoken,
        actionName : actionType,
        actionType : 'product_categories_form_submission'
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


export async function initProductCategoriesProfileData(rawQstr) { 

  MosyNotify({message : 'Refreshing Product Categories' , icon:'refresh', addTimer:false})

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.productcategories.base,
      params: { 
      ...rawQstr,
      src : btoa(`initProductCategoriesProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('productcategories Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching productcategories data:', response.message);  // Handle error
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


export async function DeleteProductCategories(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.productcategories.delete,
        params: { 
          _product_categories_delete_record: (token), 
          },
      });

      console.log('Token DeleteProductCategories '+token)
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


export async function getProductCategoriesListData(qstr = {}) {

  //manage pagination 
  const pageNo = mosyUrlParam('qproduct_categories_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.productcategories.base,
      params: { 
        ... qstr, 
        pageNo : pageNo,
        pageSize : recordsPerPage,
        orderType : 'desc', 
        src : btoa(`getProductCategoriesListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('productcategories Data:', response.data);
      return response; //Return the data
    } else {
      console.log('Error fetching productcategories data:', response);
      MosyNotify({message:response.message, icon:'times-circle', iconColor :'text-danger'})
      
      return []; // Safe fallback
    }
  } catch (err) {

   MosyNotify({message:err, icon:'times-circle', iconColor :'text-danger'})

    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadProductCategoriesListData(customQueryStr, setters) {

    const gftProductCategories = MosySecureFilterEngine('product_categories');
    let finalFilterStr = (gftProductCategories);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setProductCategoriesLoading(true);
    
    const productCategoriesListData = await getProductCategoriesListData(finalFilterStr);
    
    setters.setProductCategoriesLoading(false)
    setters.setProductCategoriesListData(productCategoriesListData?.data)

    setters.setProductCategoriesListPageCount(productCategoriesListData?.pagination?.page_count)


    return productCategoriesListData

}
  
  
export async function productCategoriesProfileData(customQueryStr, setters, router, customProfileData={}) {

    const productCategoriesTokenId = mosyUrlParam('product_categories_dataNode');
    
    const deleteParam = mosyUrlParam('product_categories_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedProductCategoriesToken = '0';
    if (productCategoriesTokenId) {
      
      decodedProductCategoriesToken = atob(productCategoriesTokenId); // Decode the record_id
      setters.setProductCategoriesUptoken(productCategoriesTokenId);
      setters.setProductCategoriesActionStatus('update_product_categories');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawProductCategoriesQueryStr ={Node:btoa(decodedProductCategoriesToken)}
    if(customQueryStr!='')
    {
      // if no product_categories_dataNode set , use customQueryStr
      if (!productCategoriesTokenId) {
       rawProductCategoriesQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initProductCategoriesProfileData(rawProductCategoriesQueryStr)

    if(deleteParam){
      popDeleteDialog(productCategoriesTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setProductCategoriesNode(finalProfileData)
    
    
}
  
  

export function InteprateProductCategoriesEvent(data) {
     
  //console.log(' ProductCategories Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_product_categories){

    if(data?.profile)
    {
    
    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ProductCategoriesProfileTray')

    
    mosyUpdateUrlParam('product_categories_dataNode', btoa(data?.token))
    
    const router = data?.router
      
    const url = data?.url

    router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setProductCategoriesCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ProductCategoriesProfileTray')

    
    mosyUpdateUrlParam('product_categories_dataNode', btoa(data?.token))
    
    }
  }

  if(childActionName.add_product_categories){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add product_categories `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ProductCategoriesProfileTray')
      }
    }
     
  }

  if(childActionName.update_product_categories){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update product_categories `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ProductCategoriesProfileTray')
        
      }
    }
  }

  if(childActionName.delete_product_categories){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../productcategories/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteProductCategories(deleteToken).then(response=>{
  
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
       deleteUrlParam('product_categories_delete');
        
    }
  
  });

}