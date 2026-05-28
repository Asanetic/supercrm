'use client';

//React
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
//access control
import {MosyAccessControl} from "../../UiControl/MosyAccessControl"
import {MosyUIGuard } from "../../UiControl/MosyUiGuard"


//components
import { MosyAlertCard, MosyNotify ,closeMosyModal } from  '../../../MosyUtils/ActionModals';
import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//basic utils
import { mosyScrollTo , deleteUrlParam, mosyFormInputHandler,mosyUrlParam ,mosyTonum  } from '../../../MosyUtils/hiveUtils';

//data control and processors
import { inteprateProductCategoriesFormAction, productCategoriesProfileData , popDeleteDialog, InteprateProductCategoriesEvent } from '../dataControl/ProductCategoriesRequestHandler';

//state management
import { useProductCategoriesState } from '../dataControl/ProductCategoriesStateManager';

//profile components
import {
  SubmitButtons,
  AddNewButton,
  LiveSearchDropdown,
  MosySmartField,
  MosyActionButton,
  SmartDropdown,
  DeleteButton ,
  MosyImageViewer,
  MosyFileUploadButton
} from '../../UiControl/componentControl';

//def logo
import logo from '../../../img/logo/logo.png'; // outside public!

import MosyHtmlEditor from '../../../MosyUtils/htmlEditor'

//routes manager
///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();


// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════


// export profile


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_PRODUCT_CATEGORIES";

//live data detial / profile component

export default function ProductCategoriesProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="ProductCategoriesMainProfilePage",
    parentProfileItemId = "ProductCategoriesProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage ProductCategories states
  const [stateItem, stateItemSetters] = useProductCategoriesState(settersOverrides);
  const product_categoriesNode = stateItem.productCategoriesNode
  
  // -- basic states --//
  const paramProductCategoriesUptoken  = stateItem.productCategoriesUptoken
  const productCategoriesActionStatus = stateItem.productCategoriesActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setProductCategoriesNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postProductCategoriesFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateProductCategoriesFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postProductCategoriesFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("ProductCategoriesProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    productCategoriesProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="ProductCategoriesProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postProductCategoriesFormData} encType="multipart/form-data" id="product_categories_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  product_categoriesNode?.primkey ? (
                    
                    <span>{`Product Categories / ${product_categoriesNode?.category_description}`}</span>
                    
                  ) : customProfileData?.ProductCategoriesTitle ? (
                    
                    <span>{customProfileData.ProductCategoriesTitle}</span>
                    
                  ) : (
                    
                    <span>New Product Categories</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramProductCategoriesUptoken && (
                    <DeleteButton
                    src="ProductCategoriesMainProfilePage"
                    tableName="product_categories"
                    uptoken={paramProductCategoriesUptoken}
                    stateItemSetters={stateItemSetters}
                    parentStateSetters={parentStateSetters}
                    
                    onDelete={popDeleteDialog}
                    />
                  )}
                </div>)}</>
              </h3>
              {/*    Title isle      */}
              
              
              
              {/*    Navigation isle      */}
              <><div className="row justify-content-end m-0 p-0 col-md-12  p-3  hive_profile_navigation " id="">
                <div className="col-md-4 text-left p-0 hive_profile_nav_back_to_list_tray" id="">
                  
                  {showNavigationIsle && (
                    <>
                    <Link href={backToList} className="text-info hive_profile_nav_back_to_list "><i className="fa fa-arrow-left"></i> Back to list</Link>
                  </>
                )}
                
              </div>
              <div className="col-md-8 p-0 text-right hive_profile_nav_add_new_tray" id="">
                
                
                
                {paramProductCategoriesUptoken && (
                  <>
                  
                </>
              )}
              
              {paramProductCategoriesUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="ProductCategoriesMainProfilePage"
                tableName="product_categories"
                uptoken={paramProductCategoriesUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="ProductCategoriesMainProfilePage"
                tableName="product_categories"
                link="./profile"
                label="New Product Categories"
                icon="plus-circle" />
              </>
            )}
            
          </div>
        </div></>
        <div className="col-md-12 pt-4 p-0 hive_profile_navigation_divider d-lg-none" id=""></div>
        {/*    Navigation isle      */}
        <div className="row justify-content-center m-0 p-0 col-md-12" id="">
          {/*    Image section isle      */}
          
          {/*    Image section isle      */}
          
          {/*  //-------------    main content starts here  ------------------------------ */}
          
          
          
          <div className="col-md-12 row justify-content-center m-0  p-0">
            {/*    Input cells section isle      */}
            <div className="col-md-12 row p-0 justify-content-center p-0 m-0">
              <div className="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section  ">
                <h5 className="col-md-12 row p-2 justify-content-center p-0 m-0">
                  <div className="col-md-3 bg-dark mb-3 mb-lg-0 mt-lg-3" style={{height: "1px"}}></div>
                  <div className="col-md-5 text-center">Basic Information</div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Category Name</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.productcategories.base}
                    idField="primkey"
                    labelField="category_name"
                    inputName="category_name"
                    label="Category Name"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={product_categoriesNode?.category_name || ""}
                    />
                  </div>
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Category Description</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.productcategories.base}
                    idField="primkey"
                    labelField="category_description"
                    inputName="category_description"
                    label="Category Description"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={product_categoriesNode?.category_description || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="product_categories"
                  field="parent_category_id"
                  label="Parent Category Id"
                  value={product_categoriesNode?.parent_category_id || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Category Image</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.productcategories.base}
                    idField="primkey"
                    labelField="category_image"
                    inputName="category_image"
                    label="Category Image"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={product_categoriesNode?.category_image || ""}
                    />
                  </div>
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label >Category Status</label>
                    
                    <select name="category_status" id="category_status" className="form-control">
                      <option  value={product_categoriesNode?.category_status || ""}>{product_categoriesNode?.category_status || "Select Category Status"}</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      
                    </select>
                  </div>
                  
                  
                  <MosySmartField
                  module="product_categories"
                  field="created_at"
                  label="Created At"
                  value={product_categoriesNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <input className="form-control" id="updated_at" name="updated_at" value={product_categoriesNode?.updated_at || ""} placeholder="Updated At" type="hidden"/>
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="ProductCategoriesMainProfilePage"
                  tblName="product_categories"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="product_categories_dataNode" name="product_categories_dataNode" value={paramProductCategoriesUptoken}/>
              <input type="hidden" id="product_categories_mosy_action" name="product_categories_mosy_action" value={productCategoriesActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          
        </div>
      </div>
    </div>
    
    
    {/* snack notifications -- */}
    {snackMessage &&(
      <MosySnackWidget
      content={snackMessage}
      duration={5000}
      type="custom"
      onDone={() => {
        stateItemSetters.setSnackMessage("");
        stateItem.snackOnDone(); // Run whats inside onDone
        deleteUrlParam("snack_alert")
      }}
      
      />)}
      {/* snack notifications -- */}
      
      
      {/* ================== End Feature Section========================== ------*/}
    </div>
    
  );
  
}

