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



// export profile


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
                    
                    <span>{`Product details / ${productsNode?.product_name}`}</span>
                    
                  ) : customProfileData?.ProductsTitle ? (
                    
                    <span>{customProfileData.ProductsTitle}</span>
                    
                  ) : (
                    
                    <span>Create product </span>
                    
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
                label="Create product "
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
                  field="price_range"
                  label="Price Range"
                  value={productsNode?.price_range || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
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
                  field="product_code"
                  label="Product Code"
                  value={productsNode?.product_code || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Category</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.products.base}
                    idField="primkey"
                    labelField="category"
                    inputName="category"
                    label="Category"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={productsNode?.category || ""}
                    />
                  </div>
                  
                  
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
                  
                  
                  <MosySmartField
                  module="products"
                  field="tax_percentage"
                  label="Tax Percentage"
                  value={productsNode?.tax_percentage || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
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
                  
                  
                  <MosySmartField
                  module="products"
                  field="product_status"
                  label="Product Status"
                  value={productsNode?.product_status || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="products"
                  field="created_at"
                  label="Created At"
                  value={productsNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                  
                  <MosySmartField
                  module="products"
                  field="updated_at"
                  label="Updated At"
                  value={productsNode?.updated_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
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

