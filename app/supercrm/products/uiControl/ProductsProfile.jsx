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
import { inteprateProductsFormAction, productsProfileData , popDeleteDialog, InteprateProductsEvent } from '../dataControl/ProductsRequestHandler';

//state management
import { useProductsState } from '../dataControl/ProductsStateManager';

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

import {InteprateProductCategoriesEvent} from '../../productcategories/dataControl/ProductCategoriesRequestHandler';
import ProductCategoriesList from '../../productcategories/uiControl/ProductCategoriesList';
import ProductCategoriesProfile from '../../productcategories/uiControl/ProductCategoriesProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from activate-product.jsx
import {
  activateProduct
} from '../logicControl/activate-product';

// Imports from disable-product.jsx
import {
  disableProduct
} from '../logicControl/disable-product';

// Imports from product_categories-automapper.jsx
import {
  viewProductCategories
} from '../../productcategories/logicControl/product_categories-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_PRODUCTS";

//live data detial / profile component

export default function ProductsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="ProductsMainProfilePage",
    parentProfileItemId = "ProductsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Products states
  const [stateItem, stateItemSetters] = useProductsState(settersOverrides);
  const productsNode = stateItem.productsNode
  
  // -- basic states --//
  const paramProductsUptoken  = stateItem.productsUptoken
  const productsActionStatus = stateItem.productsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setProductsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postProductsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateProductsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postProductsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("ProductsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    productsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setProductCategoriesCustomProfileQuery Script
  const setProductCategoriesCustomProfileQuery = stateItemSetters.setProductCategoriesCustomProfileQuery;
  const productCategoriesCustomProfileQuery =  stateItem.productCategoriesCustomProfileQuery;
  
  useEffect(() => {
    if (productsNode?.primkey && setProductCategoriesCustomProfileQuery) {
      
      const query = {recordId:btoa(productsNode?.product_category_id)    };
      
      const tokenUrl = mosyUrlParam("product_categories_dataNode")
      
      if(!tokenUrl)
      {
        setProductCategoriesCustomProfileQuery(query);
      }
      
    }
  }, [productsNode, setProductCategoriesCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="ProductsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postProductsFormData} encType="multipart/form-data" id="products_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  productsNode?.primkey ? (
                    
                    <span>{`Products / ${productsNode?.product_code}`}</span>
                    
                  ) : customProfileData?.ProductsTitle ? (
                    
                    <span>{customProfileData.ProductsTitle}</span>
                    
                  ) : (
                    
                    <span>New Products</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramProductsUptoken && (
                    <DeleteButton
                    src="ProductsMainProfilePage"
                    tableName="products"
                    uptoken={paramProductsUptoken}
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
                
                
                
                {paramProductsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="ProductsProfile"
                  action="products_DataMap_activateProduct_btn"
                  label="Activate Product"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    activateProduct({
                      
                      title: `Activate {{product_name}} product`,
                      
                      component: ProductsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "products",
                      
                      destTable: "products",
                      
                      fieldsetstr: 'product_status|Active',
                      
                      profileDataNode: productsNode,
                      
                      dataInterpreter: InteprateProductsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ProductsProfile"
                  action="products_DataMap_disableProduct_btn"
                  label="Disable Product"
                  icon="pause-circle"
                  
                  onClick={()=>{
                    
                    disableProduct({
                      
                      title: `Disable {{product_name}} product`,
                      
                      component: ProductsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "products",
                      
                      destTable: "products",
                      
                      fieldsetstr: 'product_status|Inactive',
                      
                      profileDataNode: productsNode,
                      
                      dataInterpreter: InteprateProductsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ProductsProfile"
                  action="view_category_details_profile_action_btn"
                  label="View Category Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewProductCategories({childCol:`recordId`,parentColVal:productsNode.product_category_id,parentName:productsNode.product_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramProductsUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="ProductsMainProfilePage"
                tableName="products"
                uptoken={paramProductsUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="ProductsMainProfilePage"
                tableName="products"
                link="./profile"
                label="New Products"
                icon="plus-circle" />
              </>
            )}
            
          </div>
        </div></>
        <div className="col-md-12 pt-4 p-0 hive_profile_navigation_divider d-lg-none" id=""></div>
        {/*    Navigation isle      */}
        <div className="row justify-content-center m-0 p-0 col-md-12" id="">
          {/*    Image section isle      */}
          
          <div className="col-md-6 mr-lg-5">
            
            <div className="col-md-12 p-0 text-center mb-3">
              <div className="col-md-12 m-2"><b>Product Image</b></div>
              <MosyImageViewer
              media={`/api/mediaroom?media=${btoa((productsNode?.product_image || ""))}`}
              mediaRoot={""}
              defaultLogo={logo.src}
              imageClass="product_image"
              />
              
              <div className="">
                <MosyFileUploadButton
                tblName="products"
                attribute="product_image"
                />
              </div>
              <input type="hidden" name="media_products_product_image" value={productsNode?.product_image || ""}/>
            </div>
            
            
          </div>
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
                  
                  <MosySmartField
                  module="products"
                  field="product_name"
                  label="Product Name"
                  value={productsNode?.product_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="products"
                  field="product_code"
                  label="Product Code"
                  value={productsNode?.product_code || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.productcategories.base}
                  tblName="product_categories"
                  parentTable="products"
                  inputName="_product_categories_undefined_product_category_id"
                  hiddenInputName="product_category_id"
                  valueField="record_id"
                  displayField="undefined"
                  label="Undefined"
                  defaultValue={{ record_id: productsNode?.product_category_id || "", undefined: productsNode?._product_categories_undefined_product_category_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.product_category_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <MosySmartField
                  module="products"
                  field="product_description"
                  label="Product Description"
                  value={productsNode?.product_description || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="products"
                  field="unit_price"
                  label="Unit Price"
                  value={productsNode?.unit_price || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="products"
                  field="discount_price"
                  label="Discount Price"
                  value={productsNode?.discount_price || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                </div>
                
              </div>
              
              <div className="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section  ">
                <h5 className="col-md-12 row p-2 justify-content-center p-0 m-0">
                  <div className="col-md-3 bg-dark mb-3 mb-lg-0 mt-lg-3" style={{height: "1px"}}></div>
                  <div className="col-md-5 text-center"></div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Tax Percentage</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.products.base}
                    idField="primkey"
                    labelField="tax_percentage"
                    inputName="tax_percentage"
                    label="Tax Percentage"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={productsNode?.tax_percentage || ""}
                    />
                  </div>
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Currency Code</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.products.base}
                    idField="primkey"
                    labelField="currency_code"
                    inputName="currency_code"
                    label="Currency Code"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={productsNode?.currency_code || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="products"
                  field="stock_quantity"
                  label="Stock Quantity"
                  value={productsNode?.stock_quantity || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label >Product Status</label>
                    
                    <select name="product_status" id="product_status" className="form-control">
                      <option  value={productsNode?.product_status || ""}>{productsNode?.product_status || "Select Product Status"}</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Out of Stock</option>
                      <option>Discontinued</option>
                      
                    </select>
                  </div>
                  
                  
                  <MosySmartField
                  module="products"
                  field="created_at"
                  label="Created At"
                  value={productsNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <input className="form-control" id="updated_at" name="updated_at" value={productsNode?.updated_at || ""} placeholder="Updated At" type="hidden"/>
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="ProductsMainProfilePage"
                  tblName="products"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="products_dataNode" name="products_dataNode" value={paramProductsUptoken}/>
              <input type="hidden" id="products_mosy_action" name="products_mosy_action" value={productsActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {productsNode?.primkey && (
            <MosyProfileSection
            title={`Category Details`}
            source="products_ProductCategoriesProfile"
            component={ProductCategoriesProfile}
            table="products"
            key={`ProductCategoriesProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : productCategoriesCustomProfileQuery,
              hostParent : "ProductsProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _products_product_name_record_id:productsNode?.product_name,
                record_id:productsNode?.product_category_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateProductCategoriesEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {productsNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../productcategories/list?products_mosyfilter=${btoa(`{recordId:btoa(productsNode?.product_category_id)    }`)}`}
            title={`Category Details`}
            source="products_ProductCategoriesList"
            component={ProductCategoriesList}
            table="products"
            key={`ProductCategoriesList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(productsNode?.product_category_id)    },
              customProfilePath:"../productcategories/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateProductCategoriesEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          )}
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

