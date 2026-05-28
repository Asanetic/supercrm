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
import { inteprateInvoicesFormAction, invoicesProfileData , popDeleteDialog, InteprateInvoicesEvent } from '../dataControl/InvoicesRequestHandler';

//state management
import { useInvoicesState } from '../dataControl/InvoicesStateManager';

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
import {InteprateQuotationsEvent} from '../../quotations/dataControl/QuotationsRequestHandler';
import QuotationsList from '../../quotations/uiControl/QuotationsList';
import {InteprateInvoiceItemsEvent} from '../../invoiceitems/dataControl/InvoiceItemsRequestHandler';
import InvoiceItemsList from '../../invoiceitems/uiControl/InvoiceItemsList';
import {IntepratePaymentsEvent} from '../../payments/dataControl/PaymentsRequestHandler';
import PaymentsList from '../../payments/uiControl/PaymentsList';
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
import DealsProfile from '../../deals/uiControl/DealsProfile';
import QuotationsProfile from '../../quotations/uiControl/QuotationsProfile';
import InvoiceItemsProfile from '../../invoiceitems/uiControl/InvoiceItemsProfile';
import PaymentsProfile from '../../payments/uiControl/PaymentsProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from mark-paid.jsx
import {
  markInvoicePaid
} from '../logicControl/mark-paid';

// Imports from mark-overdue.jsx
import {
  markInvoiceOverdue
} from '../logicControl/mark-overdue';

// Imports from add-payment.jsx
import {
  addInvoicePayment
} from '../logicControl/add-payment';

// Imports from add-invoice-item.jsx
import {
  addInvoiceItem
} from '../logicControl/add-invoice-item';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from quotations-automapper.jsx
import {
  viewQuotations
} from '../../quotations/logicControl/quotations-automapper';

// Imports from invoice_items-automapper.jsx
import {
  viewInvoiceItems
} from '../../invoiceitems/logicControl/invoice_items-automapper';

// Imports from payments-automapper.jsx
import {
  viewPayments
} from '../../payments/logicControl/payments-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_INVOICES";

//live data detial / profile component

export default function InvoicesProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="InvoicesMainProfilePage",
    parentProfileItemId = "InvoicesProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Invoices states
  const [stateItem, stateItemSetters] = useInvoicesState(settersOverrides);
  const invoicesNode = stateItem.invoicesNode
  
  // -- basic states --//
  const paramInvoicesUptoken  = stateItem.invoicesUptoken
  const invoicesActionStatus = stateItem.invoicesActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setInvoicesNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postInvoicesFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateInvoicesFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postInvoicesFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("InvoicesProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    invoicesProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (invoicesNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(invoicesNode?.client_id)    };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [invoicesNode, setClientsCustomProfileQuery]);
  
  //setDealsCustomProfileQuery Script
  const setDealsCustomProfileQuery = stateItemSetters.setDealsCustomProfileQuery;
  const dealsCustomProfileQuery =  stateItem.dealsCustomProfileQuery;
  
  useEffect(() => {
    if (invoicesNode?.primkey && setDealsCustomProfileQuery) {
      
      const query = {recordId:btoa(invoicesNode?.deal_id)        };
      
      const tokenUrl = mosyUrlParam("deals_dataNode")
      
      if(!tokenUrl)
      {
        setDealsCustomProfileQuery(query);
      }
      
    }
  }, [invoicesNode, setDealsCustomProfileQuery]);
  
  //setQuotationsCustomProfileQuery Script
  const setQuotationsCustomProfileQuery = stateItemSetters.setQuotationsCustomProfileQuery;
  const quotationsCustomProfileQuery =  stateItem.quotationsCustomProfileQuery;
  
  useEffect(() => {
    if (invoicesNode?.primkey && setQuotationsCustomProfileQuery) {
      
      const query = {recordId:btoa(invoicesNode?.quotation_id)            };
      
      const tokenUrl = mosyUrlParam("quotations_dataNode")
      
      if(!tokenUrl)
      {
        setQuotationsCustomProfileQuery(query);
      }
      
    }
  }, [invoicesNode, setQuotationsCustomProfileQuery]);
  
  //setInvoiceItemsCustomProfileQuery Script
  const setInvoiceItemsCustomProfileQuery = stateItemSetters.setInvoiceItemsCustomProfileQuery;
  const invoiceItemsCustomProfileQuery =  stateItem.invoiceItemsCustomProfileQuery;
  
  useEffect(() => {
    if (invoicesNode?.primkey && setInvoiceItemsCustomProfileQuery) {
      
      const query = {invoiceId:btoa(invoicesNode?.record_id)                };
      
      const tokenUrl = mosyUrlParam("invoice_items_dataNode")
      
      if(!tokenUrl)
      {
        setInvoiceItemsCustomProfileQuery(query);
      }
      
    }
  }, [invoicesNode, setInvoiceItemsCustomProfileQuery]);
  
  //setPaymentsCustomProfileQuery Script
  const setPaymentsCustomProfileQuery = stateItemSetters.setPaymentsCustomProfileQuery;
  const paymentsCustomProfileQuery =  stateItem.paymentsCustomProfileQuery;
  
  useEffect(() => {
    if (invoicesNode?.primkey && setPaymentsCustomProfileQuery) {
      
      const query = {invoiceId:btoa(invoicesNode?.record_id)                    };
      
      const tokenUrl = mosyUrlParam("payments_dataNode")
      
      if(!tokenUrl)
      {
        setPaymentsCustomProfileQuery(query);
      }
      
    }
  }, [invoicesNode, setPaymentsCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="InvoicesProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postInvoicesFormData} encType="multipart/form-data" id="invoices_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  invoicesNode?.primkey ? (
                    
                    <span>{`Invoices / ${invoicesNode?.invoice_title}`}</span>
                    
                  ) : customProfileData?.InvoicesTitle ? (
                    
                    <span>{customProfileData.InvoicesTitle}</span>
                    
                  ) : (
                    
                    <span>New Invoices</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramInvoicesUptoken && (
                    <DeleteButton
                    src="InvoicesMainProfilePage"
                    tableName="invoices"
                    uptoken={paramInvoicesUptoken}
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
                
                
                
                {paramInvoicesUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="InvoicesProfile"
                  action="invoices_DataMap_markInvoicePaid_btn"
                  label="Mark Paid"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    markInvoicePaid({
                      
                      title: `Mark {{invoice_title}} paid`,
                      
                      component: InvoicesProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "invoices",
                      
                      destTable: "invoices",
                      
                      fieldsetstr: 'invoice_status|Paid',
                      
                      profileDataNode: invoicesNode,
                      
                      dataInterpreter: InteprateInvoicesEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="InvoicesProfile"
                  action="invoices_DataMap_markInvoiceOverdue_btn"
                  label="Mark Overdue"
                  icon="alert-circle"
                  
                  onClick={()=>{
                    
                    markInvoiceOverdue({
                      
                      title: `Mark {{invoice_title}} overdue`,
                      
                      component: InvoicesProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "invoices",
                      
                      destTable: "invoices",
                      
                      fieldsetstr: 'invoice_status|Overdue',
                      
                      profileDataNode: invoicesNode,
                      
                      dataInterpreter: InteprateInvoicesEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="InvoicesProfile"
                  action="invoices_DataMap_addInvoicePayment_btn"
                  label="Add Payment"
                  icon="credit-card"
                  
                  onClick={()=>{
                    
                    addInvoicePayment({
                      
                      title: `Add payment for {{invoice_title}}`,
                      
                      component: PaymentsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "invoices",
                      
                      destTable: "payments",
                      
                      fieldsetstr: "invoices:invoice_title|record_id:invoice_id",
                      
                      profileDataNode: invoicesNode,
                      
                      dataInterpreter: InteprateInvoicesEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="InvoicesProfile"
                  action="invoices_DataMap_addInvoiceItem_btn"
                  label="Add Invoice Item"
                  icon="plus-circle"
                  
                  onClick={()=>{
                    
                    addInvoiceItem({
                      
                      title: `Add item to {{invoice_title}} invoice`,
                      
                      component: InvoiceItemsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "invoices",
                      
                      destTable: "invoice_items",
                      
                      fieldsetstr: "invoices:invoice_title|record_id:invoice_id",
                      
                      profileDataNode: invoicesNode,
                      
                      dataInterpreter: InteprateInvoicesEvent
                      
                    })
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="InvoicesProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("Invoices_more_profile_actions");
                      
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
                    id="Invoices_more_profile_actions"
                    
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
                        invoicesNode?.primkey ? (
                          
                          <span>{`Invoices / ${invoicesNode?.invoice_title}`}</span>
                          
                        ) : customProfileData?.InvoicesTitle ? (
                          
                          <span>{customProfileData.InvoicesTitle}</span>
                          
                        ) : (
                          
                          <span>New Invoices</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("Invoices_more_profile_actions").style.display = "none";
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
                    document.getElementById("Invoices_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="InvoicesProfile"
                      action="view_client_details_profile_action_btn"
                      label="View Client Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewClients({childCol:`recordId`,parentColVal:invoicesNode.client_id,parentName:invoicesNode.invoice_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="InvoicesProfile"
                      action="view_deal_details_profile_action_btn"
                      label="View Deal Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewDeals({childCol:`recordId`,parentColVal:invoicesNode.deal_id,parentName:invoicesNode.invoice_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="InvoicesProfile"
                      action="view_quotation_details_profile_action_btn"
                      label="View Quotation Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewQuotations({childCol:`recordId`,parentColVal:invoicesNode.quotation_id,parentName:invoicesNode.invoice_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="InvoicesProfile"
                      action="view_invoice_items_profile_action_btn"
                      label="View Invoice Items"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewInvoiceItems({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="InvoicesProfile"
                      action="view_payments_profile_action_btn"
                      label="View Payments"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewPayments({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramInvoicesUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="InvoicesMainProfilePage"
          tableName="invoices"
          uptoken={paramInvoicesUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="InvoicesMainProfilePage"
          tableName="invoices"
          link="./profile"
          label="New Invoices"
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
            module="invoices"
            field="invoice_number"
            label="Invoice Number"
            value={invoicesNode?.invoice_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="invoices"
            field="invoice_title"
            label="Invoice Title"
            value={invoicesNode?.invoice_title || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="title"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="invoices"
            field="invoice_description"
            label="Invoice Description"
            value={invoicesNode?.invoice_description || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.clients.base}
            tblName="clients"
            parentTable="invoices"
            inputName="_clients_full_name_client_id"
            hiddenInputName="client_id"
            valueField="record_id"
            displayField="full_name"
            label="Full Name"
            defaultValue={{ record_id: invoicesNode?.client_id || "", full_name: invoicesNode?._clients_full_name_client_id || "" }}
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
            parentTable="invoices"
            inputName="_deals_deal_title_deal_id"
            hiddenInputName="deal_id"
            valueField="record_id"
            displayField="deal_title"
            label="Deal Title"
            defaultValue={{ record_id: invoicesNode?.deal_id || "", deal_title: invoicesNode?._deals_deal_title_deal_id || "" }}
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
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.quotations.base}
            tblName="quotations"
            parentTable="invoices"
            inputName="_quotations_quotation_title_quotation_id"
            hiddenInputName="quotation_id"
            valueField="record_id"
            displayField="quotation_title"
            label="Quotation Title"
            defaultValue={{ record_id: invoicesNode?.quotation_id || "", quotation_title: invoicesNode?._quotations_quotation_title_quotation_id || "" }}
            onSelect={(id) => console.log("Just the ID:", id)}
            onSelectFull={(dataRes) =>  console.log("Data seleted")}
            onInputChange={handleInputChange}
            defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
              customProfileData?.quotation_id
              ? 'd-none'
              : ''
            }`}
            context={{hostParent : hostParent}}
            />
            
            <MosySmartField
            module="invoices"
            field="invoice_amount"
            label="Invoice Amount"
            value={invoicesNode?.invoice_amount || ""}
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
            module="invoices"
            field="tax_amount"
            label="Tax Amount"
            value={invoicesNode?.tax_amount || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="invoices"
            field="discount_amount"
            label="Discount Amount"
            value={invoicesNode?.discount_amount || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label >Invoice Status</label>
              
              <select name="invoice_status" id="invoice_status" className="form-control">
                <option  value={invoicesNode?.invoice_status || ""}>{invoicesNode?.invoice_status || "Select Invoice Status"}</option>
                <option>Draft</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Overdue</option>
                <option>Cancelled</option>
                
              </select>
            </div>
            
            
            <MosySmartField
            module="invoices"
            field="invoice_issued_on"
            label="Invoice Issued On"
            value={invoicesNode?.invoice_issued_on || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="date"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="invoices"
            field="invoice_due_date"
            label="Invoice Due Date"
            value={invoicesNode?.invoice_due_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="date"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="invoices"
            field="billing_notes"
            label="Billing Notes"
            value={invoicesNode?.billing_notes || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="invoices"
            field="created_at"
            label="Created At"
            value={invoicesNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <input className="form-control" id="updated_at" name="updated_at" value={invoicesNode?.updated_at || ""} placeholder="Updated At" type="hidden"/>
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="InvoicesMainProfilePage"
            tblName="invoices"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="invoices_dataNode" name="invoices_dataNode" value={paramInvoicesUptoken}/>
        <input type="hidden" id="invoices_mosy_action" name="invoices_mosy_action" value={invoicesActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {invoicesNode?.primkey && (
      <MosyProfileSection
      title={`Client Details`}
      source="invoices_ClientsProfile"
      component={ClientsProfile}
      table="invoices"
      key={`ClientsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : clientsCustomProfileQuery,
        hostParent : "InvoicesProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _invoices_invoice_title_record_id:invoicesNode?.invoice_title,
          record_id:invoicesNode?.client_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {invoicesNode?.primkey && (
      <MosyProfileSection
      title={`Deal Details`}
      source="invoices_DealsProfile"
      component={DealsProfile}
      table="invoices"
      key={`DealsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : dealsCustomProfileQuery,
        hostParent : "InvoicesProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _invoices_invoice_title_record_id:invoicesNode?.invoice_title,
          record_id:invoicesNode?.deal_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {invoicesNode?.primkey && (
      <MosyProfileSection
      title={`Quotation Details`}
      source="invoices_QuotationsProfile"
      component={QuotationsProfile}
      table="invoices"
      key={`QuotationsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : quotationsCustomProfileQuery,
        hostParent : "InvoicesProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _invoices_invoice_title_record_id:invoicesNode?.invoice_title,
          record_id:invoicesNode?.quotation_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateQuotationsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {invoicesNode?.primkey && (
      <MosyProfileSection
      title={`Invoice Items`}
      source="invoices_InvoiceItemsProfile"
      component={InvoiceItemsProfile}
      table="invoices"
      key={`InvoiceItemsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : invoiceItemsCustomProfileQuery,
        hostParent : "InvoicesProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _invoices_invoice_title_invoice_id:invoicesNode?.invoice_title,
          invoice_id:invoicesNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateInvoiceItemsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {invoicesNode?.primkey && (
      <MosyProfileSection
      title={`Payments`}
      source="invoices_PaymentsProfile"
      component={PaymentsProfile}
      table="invoices"
      key={`PaymentsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : paymentsCustomProfileQuery,
        hostParent : "InvoicesProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _invoices_invoice_title_invoice_id:invoicesNode?.invoice_title,
          invoice_id:invoicesNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {invoicesNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../clients/list?invoices_mosyfilter=${btoa(`{recordId:btoa(invoicesNode?.client_id)    }`)}`}
      title={`Client Details`}
      source="invoices_ClientsList"
      component={ClientsList}
      table="invoices"
      key={`ClientsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(invoicesNode?.client_id)    },
        customProfilePath:"../clients/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {invoicesNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../deals/list?invoices_mosyfilter=${btoa(`{recordId:btoa(invoicesNode?.deal_id)        }`)}`}
      title={`Deal Details`}
      source="invoices_DealsList"
      component={DealsList}
      table="invoices"
      key={`DealsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(invoicesNode?.deal_id)        },
        customProfilePath:"../deals/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {invoicesNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../quotations/list?invoices_mosyfilter=${btoa(`{recordId:btoa(invoicesNode?.quotation_id)            }`)}`}
      title={`Quotation Details`}
      source="invoices_QuotationsList"
      component={QuotationsList}
      table="invoices"
      key={`QuotationsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(invoicesNode?.quotation_id)            },
        customProfilePath:"../quotations/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateQuotationsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {invoicesNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../invoiceitems/list?invoices_mosyfilter=${btoa(`{invoiceId:btoa(invoicesNode?.record_id)                }`)}`}
      title={`Invoice Items`}
      source="invoices_InvoiceItemsList"
      component={InvoiceItemsList}
      table="invoices"
      key={`InvoiceItemsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {invoiceId:btoa(invoicesNode?.record_id)                },
        customProfilePath:"../invoiceitems/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateInvoiceItemsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {invoicesNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../payments/list?invoices_mosyfilter=${btoa(`{invoiceId:btoa(invoicesNode?.record_id)                    }`)}`}
      title={`Payments`}
      source="invoices_PaymentsList"
      component={PaymentsList}
      table="invoices"
      key={`PaymentsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {invoiceId:btoa(invoicesNode?.record_id)                    },
        customProfilePath:"../payments/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: IntepratePaymentsEvent,
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

