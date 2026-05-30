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
import { inteprateQuotationsFormAction, quotationsProfileData , popDeleteDialog, InteprateQuotationsEvent } from '../dataControl/QuotationsRequestHandler';

//state management
import { useQuotationsState } from '../dataControl/QuotationsStateManager';

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

import {InteprateClientsEvent} from '../../clients/dataControl/ClientsRequestHandler';
import ClientsList from '../../clients/uiControl/ClientsList';
import {InteprateDealsEvent} from '../../deals/dataControl/DealsRequestHandler';
import DealsList from '../../deals/uiControl/DealsList';
import {InteprateQuotationItemsEvent} from '../../quotationitems/dataControl/QuotationItemsRequestHandler';
import QuotationItemsList from '../../quotationitems/uiControl/QuotationItemsList';
import {InteprateInvoicesEvent} from '../../invoices/dataControl/InvoicesRequestHandler';
import InvoicesList from '../../invoices/uiControl/InvoicesList';
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
import DealsProfile from '../../deals/uiControl/DealsProfile';
import QuotationItemsProfile from '../../quotationitems/uiControl/QuotationItemsProfile';
import InvoicesProfile from '../../invoices/uiControl/InvoicesProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from approve-quotation.jsx
import {
  approveQuotation
} from '../logicControl/approve-quotation';

// Imports from reject-quotation.jsx
import {
  rejectQuotation
} from '../logicControl/reject-quotation';

// Imports from convert-to-invoice.jsx
import {
  convertQuotationToInvoice
} from '../logicControl/convert-to-invoice';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from quotation_items-automapper.jsx
import {
  viewQuotationItems
} from '../../quotationitems/logicControl/quotation_items-automapper';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_QUOTATIONS";

//live data detial / profile component

export default function QuotationsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="QuotationsMainProfilePage",
    parentProfileItemId = "QuotationsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Quotations states
  const [stateItem, stateItemSetters] = useQuotationsState(settersOverrides);
  const quotationsNode = stateItem.quotationsNode
  
  // -- basic states --//
  const paramQuotationsUptoken  = stateItem.quotationsUptoken
  const quotationsActionStatus = stateItem.quotationsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setQuotationsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postQuotationsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateQuotationsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postQuotationsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("QuotationsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    quotationsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (quotationsNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(quotationsNode?.client_id)    };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [quotationsNode, setClientsCustomProfileQuery]);
  
  //setDealsCustomProfileQuery Script
  const setDealsCustomProfileQuery = stateItemSetters.setDealsCustomProfileQuery;
  const dealsCustomProfileQuery =  stateItem.dealsCustomProfileQuery;
  
  useEffect(() => {
    if (quotationsNode?.primkey && setDealsCustomProfileQuery) {
      
      const query = {recordId:btoa(quotationsNode?.deal_id)        };
      
      const tokenUrl = mosyUrlParam("deals_dataNode")
      
      if(!tokenUrl)
      {
        setDealsCustomProfileQuery(query);
      }
      
    }
  }, [quotationsNode, setDealsCustomProfileQuery]);
  
  //setQuotationItemsCustomProfileQuery Script
  const setQuotationItemsCustomProfileQuery = stateItemSetters.setQuotationItemsCustomProfileQuery;
  const quotationItemsCustomProfileQuery =  stateItem.quotationItemsCustomProfileQuery;
  
  useEffect(() => {
    if (quotationsNode?.primkey && setQuotationItemsCustomProfileQuery) {
      
      const query = {quotationId:btoa(quotationsNode?.record_id)            };
      
      const tokenUrl = mosyUrlParam("quotation_items_dataNode")
      
      if(!tokenUrl)
      {
        setQuotationItemsCustomProfileQuery(query);
      }
      
    }
  }, [quotationsNode, setQuotationItemsCustomProfileQuery]);
  
  //setInvoicesCustomProfileQuery Script
  const setInvoicesCustomProfileQuery = stateItemSetters.setInvoicesCustomProfileQuery;
  const invoicesCustomProfileQuery =  stateItem.invoicesCustomProfileQuery;
  
  useEffect(() => {
    if (quotationsNode?.primkey && setInvoicesCustomProfileQuery) {
      
      const query = {quotationId:btoa(quotationsNode?.record_id)                };
      
      const tokenUrl = mosyUrlParam("invoices_dataNode")
      
      if(!tokenUrl)
      {
        setInvoicesCustomProfileQuery(query);
      }
      
    }
  }, [quotationsNode, setInvoicesCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="QuotationsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postQuotationsFormData} encType="multipart/form-data" id="quotations_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  quotationsNode?.primkey ? (
                    
                    <span>{`Quotations / ${quotationsNode?.quotation_title}`}</span>
                    
                  ) : customProfileData?.QuotationsTitle ? (
                    
                    <span>{customProfileData.QuotationsTitle}</span>
                    
                  ) : (
                    
                    <span>New Quotations</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramQuotationsUptoken && (
                    <DeleteButton
                    src="QuotationsMainProfilePage"
                    tableName="quotations"
                    uptoken={paramQuotationsUptoken}
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
                
                
                
                {paramQuotationsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="QuotationsProfile"
                  action="quotations_DataMap_approveQuotation_btn"
                  label="Approve Quotation"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    approveQuotation({
                      
                      title: `Approve {{quotation_title}} quotation`,
                      
                      component: QuotationsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "quotations",
                      
                      destTable: "quotations",
                      
                      fieldsetstr: 'quotation_status|Approved',
                      
                      profileDataNode: quotationsNode,
                      
                      dataInterpreter: InteprateQuotationsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="QuotationsProfile"
                  action="quotations_DataMap_rejectQuotation_btn"
                  label="Reject Quotation"
                  icon="x-circle"
                  
                  onClick={()=>{
                    
                    rejectQuotation({
                      
                      title: `Reject {{quotation_title}} quotation`,
                      
                      component: QuotationsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "quotations",
                      
                      destTable: "quotations",
                      
                      fieldsetstr: 'quotation_status|Rejected',
                      
                      profileDataNode: quotationsNode,
                      
                      dataInterpreter: InteprateQuotationsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="QuotationsProfile"
                  action="quotations_DataMap_convertQuotationToInvoice_btn"
                  label="Convert To Invoice"
                  icon="file-text"
                  
                  onClick={()=>{
                    
                    convertQuotationToInvoice({
                      
                      title: `Convert {{quotation_title}} to invoice`,
                      
                      component: InvoicesProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "quotations",
                      
                      destTable: "invoices",
                      
                      fieldsetstr: "quotations:quotation_title|record_id:quotation_id",
                      
                      profileDataNode: quotationsNode,
                      
                      dataInterpreter: InteprateQuotationsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="QuotationsProfile"
                  action="view_client_details_profile_action_btn"
                  label="View Client Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewClients({childCol:`recordId`,parentColVal:quotationsNode.client_id,parentName:quotationsNode.quotation_title})
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="QuotationsProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("Quotations_more_profile_actions");
                      
                      if(node.style.display === "block")
                      {
                        node.style.display = "none";
                      }
                      else
                      {
                        const rect = e.currentTarget.getBoundingClientRect();
                        
                        node.style.top = (rect.bottom + 8) + "px";
                        
                        node.style.display = "block";
                      }
                      
                    }}
                    />
                    
                    <div
                    id="Quotations_more_profile_actions"
                    
                    style={{
                      display:"none",
                      position:"fixed",
                      left:"10%",
                      top:"20%",
                      width:"80%",
                      zIndex:"3",
                      borderRadius:"16px",
                      boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
                      overflow:"hidden"
                    }}
                    
                    className="bg-white border p-0"
                    >
                    
                    <div
                    className="d-flex align-items-center justify-content-between px-3 py-2 btn-primary"
                    style={{ borderBottom:"1px solid #e5e7eb" }}
                    >
                    
                    <h6 className="m-0 fw-bold" style={{ fontSize:"0.95rem" }}>
                      
                      <i
                      className="fa fa-grid mr-2"
                      style={{ color:"#6c757d" }}
                      ></i>
                      
                      
                      {
                        quotationsNode?.primkey ? (
                          
                          <span>{`Quotations / ${quotationsNode?.quotation_title}`}</span>
                          
                        ) : customProfileData?.QuotationsTitle ? (
                          
                          <span>{customProfileData.QuotationsTitle}</span>
                          
                        ) : (
                          
                          <span>New Quotations</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("Quotations_more_profile_actions").style.display = "none";
                      }}
                      
                      style={{
                        background:"none",
                        border:"none",
                        cursor:"pointer",
                        padding:"4px 8px",
                        borderRadius:"8px",
                        fontSize:"1.1rem",
                        color:"#6c757d"
                      }}
                      >
                      
                      <i className="fa fa-times text-light"></i>
                      
                    </button>
                    
                  </div>
                  
                  <div
                  className="p-3"
                  
                  onClick={()=>{
                    document.getElementById("Quotations_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="QuotationsProfile"
                      action="view_deal_details_profile_action_btn"
                      label="View Deal Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewDeals({childCol:`recordId`,parentColVal:quotationsNode.deal_id,parentName:quotationsNode.quotation_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="QuotationsProfile"
                      action="view_quotation_items_profile_action_btn"
                      label="View Quotation Items"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewQuotationItems({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="QuotationsProfile"
                      action="view_invoices_profile_action_btn"
                      label="View Invoices"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewInvoices({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramQuotationsUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="QuotationsMainProfilePage"
          tableName="quotations"
          uptoken={paramQuotationsUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="QuotationsMainProfilePage"
          tableName="quotations"
          link="./profile"
          label="New Quotations"
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
            module="quotations"
            field="quotation_number"
            label="Quotation Number"
            value={quotationsNode?.quotation_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="quotation_title"
            label="Quotation Title"
            value={quotationsNode?.quotation_title || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="title"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="quotation_description"
            label="Quotation Description"
            value={quotationsNode?.quotation_description || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.clients.base}
            tblName="clients"
            parentTable="quotations"
            inputName="_clients_full_name_client_id"
            hiddenInputName="client_id"
            valueField="record_id"
            displayField="full_name"
            label="Full Name"
            defaultValue={{ record_id: quotationsNode?.client_id || "", full_name: quotationsNode?._clients_full_name_client_id || "" }}
            onSelect={(id) => console.log("Just the ID:", id)}
            onSelectFull={(dataRes) =>  console.log("Data seleted")}
            onInputChange={handleInputChange}
            defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
              customProfileData?.client_id
              ? 'd-none'
              : ''
            }`}
            context={{hostParent : hostParent}}
            />
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.deals.base}
            tblName="deals"
            parentTable="quotations"
            inputName="_deals_deal_title_deal_id"
            hiddenInputName="deal_id"
            valueField="record_id"
            displayField="deal_title"
            label="Deal Title"
            defaultValue={{ record_id: quotationsNode?.deal_id || "", deal_title: quotationsNode?._deals_deal_title_deal_id || "" }}
            onSelect={(id) => console.log("Just the ID:", id)}
            onSelectFull={(dataRes) =>  console.log("Data seleted")}
            onInputChange={handleInputChange}
            defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
              customProfileData?.deal_id
              ? 'd-none'
              : ''
            }`}
            context={{hostParent : hostParent}}
            />
            
            <MosySmartField
            module="quotations"
            field="quotation_amount"
            label="Quotation Amount"
            value={quotationsNode?.quotation_amount || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="tax_amount"
            label="Tax Amount"
            value={quotationsNode?.tax_amount || ""}
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
            
            <MosySmartField
            module="quotations"
            field="discount_amount"
            label="Discount Amount"
            value={quotationsNode?.discount_amount || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="quotation_status"
            label="Quotation Status"
            value={quotationsNode?.quotation_status || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="quotation_issued_on"
            label="Quotation Issued On"
            value={quotationsNode?.quotation_issued_on || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="date"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="quotation_expiry_date"
            label="Quotation Expiry Date"
            value={quotationsNode?.quotation_expiry_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="quotation_notes"
            label="Quotation Notes"
            value={quotationsNode?.quotation_notes || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="created_at"
            label="Created At"
            value={quotationsNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
            
            <MosySmartField
            module="quotations"
            field="updated_at"
            label="Updated At"
            value={quotationsNode?.updated_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="QuotationsMainProfilePage"
            tblName="quotations"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="quotations_dataNode" name="quotations_dataNode" value={paramQuotationsUptoken}/>
        <input type="hidden" id="quotations_mosy_action" name="quotations_mosy_action" value={quotationsActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {quotationsNode?.primkey && (
      <MosyProfileSection
      title={`Client Details`}
      source="quotations_ClientsProfile"
      component={ClientsProfile}
      table="quotations"
      key={`ClientsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : clientsCustomProfileQuery,
        hostParent : "QuotationsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _quotations_quotation_title_record_id:quotationsNode?.quotation_title,
          record_id:quotationsNode?.client_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {quotationsNode?.primkey && (
      <MosyProfileSection
      title={`Deal Details`}
      source="quotations_DealsProfile"
      component={DealsProfile}
      table="quotations"
      key={`DealsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : dealsCustomProfileQuery,
        hostParent : "QuotationsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _quotations_quotation_title_record_id:quotationsNode?.quotation_title,
          record_id:quotationsNode?.deal_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {quotationsNode?.primkey && (
      <MosyProfileSection
      title={`Quotation Items`}
      source="quotations_QuotationItemsProfile"
      component={QuotationItemsProfile}
      table="quotations"
      key={`QuotationItemsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : quotationItemsCustomProfileQuery,
        hostParent : "QuotationsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _quotations_quotation_title_quotation_id:quotationsNode?.quotation_title,
          quotation_id:quotationsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateQuotationItemsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {quotationsNode?.primkey && (
      <MosyProfileSection
      title={`Invoices`}
      source="quotations_InvoicesProfile"
      component={InvoicesProfile}
      table="quotations"
      key={`InvoicesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : invoicesCustomProfileQuery,
        hostParent : "QuotationsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _quotations_quotation_title_quotation_id:quotationsNode?.quotation_title,
          quotation_id:quotationsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {quotationsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../clients/list?quotations_mosyfilter=${btoa(`{recordId:btoa(quotationsNode?.client_id)    }`)}`}
      title={`Client Details`}
      source="quotations_ClientsList"
      component={ClientsList}
      table="quotations"
      key={`ClientsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(quotationsNode?.client_id)    },
        customProfilePath:"../clients/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {quotationsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../deals/list?quotations_mosyfilter=${btoa(`{recordId:btoa(quotationsNode?.deal_id)        }`)}`}
      title={`Deal Details`}
      source="quotations_DealsList"
      component={DealsList}
      table="quotations"
      key={`DealsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(quotationsNode?.deal_id)        },
        customProfilePath:"../deals/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {quotationsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../quotationitems/list?quotations_mosyfilter=${btoa(`{quotationId:btoa(quotationsNode?.record_id)            }`)}`}
      title={`Quotation Items`}
      source="quotations_QuotationItemsList"
      component={QuotationItemsList}
      table="quotations"
      key={`QuotationItemsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {quotationId:btoa(quotationsNode?.record_id)            },
        customProfilePath:"../quotationitems/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateQuotationItemsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {quotationsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../invoices/list?quotations_mosyfilter=${btoa(`{quotationId:btoa(quotationsNode?.record_id)                }`)}`}
      title={`Invoices`}
      source="quotations_InvoicesList"
      component={InvoicesList}
      table="quotations"
      key={`InvoicesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {quotationId:btoa(quotationsNode?.record_id)                },
        customProfilePath:"../invoices/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateInvoicesEvent,
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

