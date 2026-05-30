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
import { inteprateInvoiceItemsFormAction, invoiceItemsProfileData , popDeleteDialog, InteprateInvoiceItemsEvent } from '../dataControl/InvoiceItemsRequestHandler';

//state management
import { useInvoiceItemsState } from '../dataControl/InvoiceItemsStateManager';

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

import {InteprateInvoicesEvent} from '../../invoices/dataControl/InvoicesRequestHandler';
import InvoicesList from '../../invoices/uiControl/InvoicesList';
import {InteprateServicesEvent} from '../../services/dataControl/ServicesRequestHandler';
import ServicesList from '../../services/uiControl/ServicesList';
import InvoicesProfile from '../../invoices/uiControl/InvoicesProfile';
import ServicesProfile from '../../services/uiControl/ServicesProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from services-automapper.jsx
import {
  viewServices
} from '../../services/logicControl/services-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_INVOICE_ITEMS";

//live data detial / profile component

export default function InvoiceItemsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="InvoiceItemsMainProfilePage",
    parentProfileItemId = "InvoiceItemsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage InvoiceItems states
  const [stateItem, stateItemSetters] = useInvoiceItemsState(settersOverrides);
  const invoice_itemsNode = stateItem.invoiceItemsNode
  
  // -- basic states --//
  const paramInvoiceItemsUptoken  = stateItem.invoiceItemsUptoken
  const invoiceItemsActionStatus = stateItem.invoiceItemsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setInvoiceItemsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postInvoiceItemsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateInvoiceItemsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postInvoiceItemsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("InvoiceItemsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    invoiceItemsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setInvoicesCustomProfileQuery Script
  const setInvoicesCustomProfileQuery = stateItemSetters.setInvoicesCustomProfileQuery;
  const invoicesCustomProfileQuery =  stateItem.invoicesCustomProfileQuery;
  
  useEffect(() => {
    if (invoice_itemsNode?.primkey && setInvoicesCustomProfileQuery) {
      
      const query = {recordId:btoa(invoice_itemsNode?.invoice_id)    };
      
      const tokenUrl = mosyUrlParam("invoices_dataNode")
      
      if(!tokenUrl)
      {
        setInvoicesCustomProfileQuery(query);
      }
      
    }
  }, [invoice_itemsNode, setInvoicesCustomProfileQuery]);
  
  //setServicesCustomProfileQuery Script
  const setServicesCustomProfileQuery = stateItemSetters.setServicesCustomProfileQuery;
  const servicesCustomProfileQuery =  stateItem.servicesCustomProfileQuery;
  
  useEffect(() => {
    if (invoice_itemsNode?.primkey && setServicesCustomProfileQuery) {
      
      const query = {recordId:btoa(invoice_itemsNode?.item_id)        };
      
      const tokenUrl = mosyUrlParam("services_dataNode")
      
      if(!tokenUrl)
      {
        setServicesCustomProfileQuery(query);
      }
      
    }
  }, [invoice_itemsNode, setServicesCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="InvoiceItemsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postInvoiceItemsFormData} encType="multipart/form-data" id="invoice_items_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  invoice_itemsNode?.primkey ? (
                    
                    <span>{`Invoice Items / ${invoice_itemsNode?.item_id}`}</span>
                    
                  ) : customProfileData?.InvoiceItemsTitle ? (
                    
                    <span>{customProfileData.InvoiceItemsTitle}</span>
                    
                  ) : (
                    
                    <span>New Invoice Items</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramInvoiceItemsUptoken && (
                    <DeleteButton
                    src="InvoiceItemsMainProfilePage"
                    tableName="invoice_items"
                    uptoken={paramInvoiceItemsUptoken}
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
                
                
                
                {paramInvoiceItemsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="InvoiceItemsProfile"
                  action="view_invoice_details_profile_action_btn"
                  label="View Invoice Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewInvoices({childCol:`recordId`,parentColVal:invoice_itemsNode.invoice_id,parentName:invoice_itemsNode.item_name})
                    
                  }}
                  />
                  <MosyActionButton
                  source="InvoiceItemsProfile"
                  action="view_service_detail_profile_action_btn"
                  label="View Service detail"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewServices({childCol:`recordId`,parentColVal:invoice_itemsNode.item_id,parentName:invoice_itemsNode.item_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramInvoiceItemsUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="InvoiceItemsMainProfilePage"
                tableName="invoice_items"
                uptoken={paramInvoiceItemsUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="InvoiceItemsMainProfilePage"
                tableName="invoice_items"
                link="./profile"
                label="New Invoice Items"
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
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.invoices.base}
                  tblName="invoices"
                  parentTable="invoice_items"
                  inputName="_invoices_invoice_title_invoice_id"
                  hiddenInputName="invoice_id"
                  valueField="record_id"
                  displayField="invoice_title"
                  label="Invoice Title"
                  defaultValue={{ record_id: invoice_itemsNode?.invoice_id || "", invoice_title: invoice_itemsNode?._invoices_invoice_title_invoice_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.invoice_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.services.base}
                  tblName="services"
                  parentTable="invoice_items"
                  inputName="_services_service_name_item_id"
                  hiddenInputName="item_id"
                  valueField="record_id"
                  displayField="service_name"
                  label="Service Name"
                  defaultValue={{ record_id: invoice_itemsNode?.item_id || "", service_name: invoice_itemsNode?._services_service_name_item_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.item_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <MosySmartField
                  module="invoice_items"
                  field="invoice_item_name"
                  label="Invoice Item Name"
                  value={invoice_itemsNode?.invoice_item_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="invoice_items"
                  field="item_quantity"
                  label="Item Quantity"
                  value={invoice_itemsNode?.item_quantity || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="invoice_items"
                  field="item_unit_price"
                  label="Item Unit Price"
                  value={invoice_itemsNode?.item_unit_price || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="invoice_items"
                  field="item_total_amount"
                  label="Item Total Amount"
                  value={invoice_itemsNode?.item_total_amount || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="invoice_items"
                  field="item_description"
                  label="Item Description"
                  value={invoice_itemsNode?.item_description || ""}
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
                  module="invoice_items"
                  field="created_at"
                  label="Created At"
                  value={invoice_itemsNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                  
                  <MosySmartField
                  module="invoice_items"
                  field="updated_at"
                  label="Updated At"
                  value={invoice_itemsNode?.updated_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="InvoiceItemsMainProfilePage"
                  tblName="invoice_items"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="invoice_items_dataNode" name="invoice_items_dataNode" value={paramInvoiceItemsUptoken}/>
              <input type="hidden" id="invoice_items_mosy_action" name="invoice_items_mosy_action" value={invoiceItemsActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {invoice_itemsNode?.primkey && (
            <MosyProfileSection
            title={`Invoice Details`}
            source="invoice_items_InvoicesProfile"
            component={InvoicesProfile}
            table="invoice_items"
            key={`InvoicesProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : invoicesCustomProfileQuery,
              hostParent : "InvoiceItemsProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _invoice_items_item_name_record_id:invoice_itemsNode?.item_name,
                record_id:invoice_itemsNode?.invoice_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateInvoicesEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          {invoice_itemsNode?.primkey && (
            <MosyProfileSection
            title={`Service detail`}
            source="invoice_items_ServicesProfile"
            component={ServicesProfile}
            table="invoice_items"
            key={`ServicesProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : servicesCustomProfileQuery,
              hostParent : "InvoiceItemsProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _invoice_items_item_name_record_id:invoice_itemsNode?.item_name,
                record_id:invoice_itemsNode?.item_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateServicesEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {invoice_itemsNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../invoices/list?invoice_items_mosyfilter=${btoa(`{recordId:btoa(invoice_itemsNode?.invoice_id)    }`)}`}
            title={`Invoice Details`}
            source="invoice_items_InvoicesList"
            component={InvoicesList}
            table="invoice_items"
            key={`InvoicesList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(invoice_itemsNode?.invoice_id)    },
              customProfilePath:"../invoices/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateInvoicesEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          )}
          
          {invoice_itemsNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../services/list?invoice_items_mosyfilter=${btoa(`{recordId:btoa(invoice_itemsNode?.item_id)        }`)}`}
            title={`Service detail`}
            source="invoice_items_ServicesList"
            component={ServicesList}
            table="invoice_items"
            key={`ServicesList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(invoice_itemsNode?.item_id)        },
              customProfilePath:"../services/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateServicesEvent,
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

