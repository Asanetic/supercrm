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
import { inteprateServicesFormAction, servicesProfileData , popDeleteDialog, InteprateServicesEvent } from '../dataControl/ServicesRequestHandler';

//state management
import { useServicesState } from '../dataControl/ServicesStateManager';

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

import {InteprateInvoiceItemsEvent} from '../../invoiceitems/dataControl/InvoiceItemsRequestHandler';
import InvoiceItemsList from '../../invoiceitems/uiControl/InvoiceItemsList';
import InvoiceItemsProfile from '../../invoiceitems/uiControl/InvoiceItemsProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from activate-service.jsx
import {
  activateService
} from '../logicControl/activate-service';

// Imports from disable-service.jsx
import {
  disableService
} from '../logicControl/disable-service';

// Imports from invoice_items-automapper.jsx
import {
  viewInvoiceItems
} from '../../invoiceitems/logicControl/invoice_items-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_SERVICES";

//live data detial / profile component

export default function ServicesProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="ServicesMainProfilePage",
    parentProfileItemId = "ServicesProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Services states
  const [stateItem, stateItemSetters] = useServicesState(settersOverrides);
  const servicesNode = stateItem.servicesNode
  
  // -- basic states --//
  const paramServicesUptoken  = stateItem.servicesUptoken
  const servicesActionStatus = stateItem.servicesActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setServicesNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postServicesFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateServicesFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postServicesFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("ServicesProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    servicesProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setInvoiceItemsCustomProfileQuery Script
  const setInvoiceItemsCustomProfileQuery = stateItemSetters.setInvoiceItemsCustomProfileQuery;
  const invoiceItemsCustomProfileQuery =  stateItem.invoiceItemsCustomProfileQuery;
  
  useEffect(() => {
    if (servicesNode?.primkey && setInvoiceItemsCustomProfileQuery) {
      
      const query = {itemId:btoa(servicesNode?.record_id)    };
      
      const tokenUrl = mosyUrlParam("invoice_items_dataNode")
      
      if(!tokenUrl)
      {
        setInvoiceItemsCustomProfileQuery(query);
      }
      
    }
  }, [servicesNode, setInvoiceItemsCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="ServicesProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postServicesFormData} encType="multipart/form-data" id="services_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  servicesNode?.primkey ? (
                    
                    <span>{`Services / ${servicesNode?.service_name}`}</span>
                    
                  ) : customProfileData?.ServicesTitle ? (
                    
                    <span>{customProfileData.ServicesTitle}</span>
                    
                  ) : (
                    
                    <span>New Services</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramServicesUptoken && (
                    <DeleteButton
                    src="ServicesMainProfilePage"
                    tableName="services"
                    uptoken={paramServicesUptoken}
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
                
                
                
                {paramServicesUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="ServicesProfile"
                  action="services_DataMap_activateService_btn"
                  label="Activate Service"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    activateService({
                      
                      title: `Activate {{service_name}} service`,
                      
                      component: ServicesProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "services",
                      
                      destTable: "services",
                      
                      fieldsetstr: 'service_status|Active',
                      
                      profileDataNode: servicesNode,
                      
                      dataInterpreter: InteprateServicesEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ServicesProfile"
                  action="services_DataMap_disableService_btn"
                  label="Disable Service"
                  icon="pause-circle"
                  
                  onClick={()=>{
                    
                    disableService({
                      
                      title: `Disable {{service_name}} service`,
                      
                      component: ServicesProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "services",
                      
                      destTable: "services",
                      
                      fieldsetstr: 'service_status|Inactive',
                      
                      profileDataNode: servicesNode,
                      
                      dataInterpreter: InteprateServicesEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ServicesProfile"
                  action="view_invoice_items_profile_action_btn"
                  label="View Invoice Items"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewInvoiceItems({childCol:`itemId`,parentColVal:servicesNode.record_id,parentName:servicesNode.service_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramServicesUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="ServicesMainProfilePage"
                tableName="services"
                uptoken={paramServicesUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="ServicesMainProfilePage"
                tableName="services"
                link="./profile"
                label="New Services"
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
                  
                  <MosySmartField
                  module="services"
                  field="service_code"
                  label="Service Code"
                  value={servicesNode?.service_code || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="services"
                  field="service_name"
                  label="Service Name"
                  value={servicesNode?.service_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Category</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.services.base}
                    idField="primkey"
                    labelField="category"
                    inputName="category"
                    label="Category"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={servicesNode?.category || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="services"
                  field="price_range"
                  label="Price Range"
                  value={servicesNode?.price_range || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="services"
                  field="service_price"
                  label="Service Price"
                  value={servicesNode?.service_price || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Billing Type</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.services.base}
                    idField="primkey"
                    labelField="billing_type"
                    inputName="billing_type"
                    label="Billing Type"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={servicesNode?.billing_type || ""}
                    />
                  </div>
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Service Status</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.services.base}
                    idField="primkey"
                    labelField="service_status"
                    inputName="service_status"
                    label="Service Status"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={servicesNode?.service_status || ""}
                    />
                  </div>
                  
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
                  module="services"
                  field="service_description"
                  label="Service Description"
                  value={servicesNode?.service_description || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="services"
                  field="created_at"
                  label="Created At"
                  value={servicesNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                  
                  <MosySmartField
                  module="services"
                  field="updated_at"
                  label="Updated At"
                  value={servicesNode?.updated_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="ServicesMainProfilePage"
                  tblName="services"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="services_dataNode" name="services_dataNode" value={paramServicesUptoken}/>
              <input type="hidden" id="services_mosy_action" name="services_mosy_action" value={servicesActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {servicesNode?.primkey && (
            <MosyProfileSection
            title={`Invoice Items`}
            source="services_InvoiceItemsProfile"
            component={InvoiceItemsProfile}
            table="services"
            key={`InvoiceItemsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : invoiceItemsCustomProfileQuery,
              hostParent : "ServicesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _services_service_name_item_id:servicesNode?.service_name,
                item_id:servicesNode?.record_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateInvoiceItemsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {servicesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../invoiceitems/list?services_mosyfilter=${btoa(`{itemId:btoa(servicesNode?.record_id)    }`)}`}
            title={`Invoice Items`}
            source="services_InvoiceItemsList"
            component={InvoiceItemsList}
            table="services"
            key={`InvoiceItemsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {itemId:btoa(servicesNode?.record_id)    },
              customProfilePath:"../invoiceitems/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateInvoiceItemsEvent,
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

