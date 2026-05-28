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
import { inteprateExpectedRevenueFormAction, expectedRevenueProfileData , popDeleteDialog, InteprateExpectedRevenueEvent } from '../dataControl/ExpectedRevenueRequestHandler';

//state management
import { useExpectedRevenueState } from '../dataControl/ExpectedRevenueStateManager';

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
import {InteprateInvoicesEvent} from '../../invoices/dataControl/InvoicesRequestHandler';
import InvoicesList from '../../invoices/uiControl/InvoicesList';
import {IntepratePaymentsEvent} from '../../payments/dataControl/PaymentsRequestHandler';
import PaymentsList from '../../payments/uiControl/PaymentsList';
import {InteprateActivitiesEvent} from '../../activities/dataControl/ActivitiesRequestHandler';
import ActivitiesList from '../../activities/uiControl/ActivitiesList';
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
import DealsProfile from '../../deals/uiControl/DealsProfile';
import InvoicesProfile from '../../invoices/uiControl/InvoicesProfile';
import PaymentsProfile from '../../payments/uiControl/PaymentsProfile';
import ActivitiesProfile from '../../activities/uiControl/ActivitiesProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from mark-complete.jsx
import {
  markRevenueComplete
} from '../logicControl/mark-complete';

// Imports from mark-pending.jsx
import {
  markRevenuePending
} from '../logicControl/mark-pending';

// Imports from mark-postponed.jsx
import {
  markRevenuePostponed
} from '../logicControl/mark-postponed';

// Imports from mark-cancelled.jsx
import {
  markRevenueCancelled
} from '../logicControl/mark-cancelled';

// Imports from mark-paid.jsx
import {
  markRevenuePaid
} from '../logicControl/mark-paid';

// Imports from mark-unpaid.jsx
import {
  markRevenueUnpaid
} from '../logicControl/mark-unpaid';

// Imports from create-invoice.jsx
import {
  createRevenueInvoice
} from '../logicControl/create-invoice';

// Imports from add-activity.jsx
import {
  addRevenueActivity
} from '../logicControl/add-activity';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from payments-automapper.jsx
import {
  viewPayments
} from '../../payments/logicControl/payments-automapper';

// Imports from activities-automapper.jsx
import {
  viewActivities
} from '../../activities/logicControl/activities-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_EXPECTED_REVENUE";

//live data detial / profile component

export default function ExpectedRevenueProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="ExpectedRevenueMainProfilePage",
    parentProfileItemId = "ExpectedRevenueProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage ExpectedRevenue states
  const [stateItem, stateItemSetters] = useExpectedRevenueState(settersOverrides);
  const expected_revenueNode = stateItem.expectedRevenueNode
  
  // -- basic states --//
  const paramExpectedRevenueUptoken  = stateItem.expectedRevenueUptoken
  const expectedRevenueActionStatus = stateItem.expectedRevenueActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setExpectedRevenueNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postExpectedRevenueFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateExpectedRevenueFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postExpectedRevenueFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("ExpectedRevenueProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    expectedRevenueProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (expected_revenueNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(expected_revenueNode?.client_id)    };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [expected_revenueNode, setClientsCustomProfileQuery]);
  
  //setDealsCustomProfileQuery Script
  const setDealsCustomProfileQuery = stateItemSetters.setDealsCustomProfileQuery;
  const dealsCustomProfileQuery =  stateItem.dealsCustomProfileQuery;
  
  useEffect(() => {
    if (expected_revenueNode?.primkey && setDealsCustomProfileQuery) {
      
      const query = {recordId:btoa(expected_revenueNode?.deal_id)        };
      
      const tokenUrl = mosyUrlParam("deals_dataNode")
      
      if(!tokenUrl)
      {
        setDealsCustomProfileQuery(query);
      }
      
    }
  }, [expected_revenueNode, setDealsCustomProfileQuery]);
  
  //setInvoicesCustomProfileQuery Script
  const setInvoicesCustomProfileQuery = stateItemSetters.setInvoicesCustomProfileQuery;
  const invoicesCustomProfileQuery =  stateItem.invoicesCustomProfileQuery;
  
  useEffect(() => {
    if (expected_revenueNode?.primkey && setInvoicesCustomProfileQuery) {
      
      const query = {recordId:btoa(expected_revenueNode?.invoice_id)            };
      
      const tokenUrl = mosyUrlParam("invoices_dataNode")
      
      if(!tokenUrl)
      {
        setInvoicesCustomProfileQuery(query);
      }
      
    }
  }, [expected_revenueNode, setInvoicesCustomProfileQuery]);
  
  //setPaymentsCustomProfileQuery Script
  const setPaymentsCustomProfileQuery = stateItemSetters.setPaymentsCustomProfileQuery;
  const paymentsCustomProfileQuery =  stateItem.paymentsCustomProfileQuery;
  
  useEffect(() => {
    if (expected_revenueNode?.primkey && setPaymentsCustomProfileQuery) {
      
      const query = {transactionRef:btoa(expected_revenueNode?.payment_ref_no)                };
      
      const tokenUrl = mosyUrlParam("payments_dataNode")
      
      if(!tokenUrl)
      {
        setPaymentsCustomProfileQuery(query);
      }
      
    }
  }, [expected_revenueNode, setPaymentsCustomProfileQuery]);
  
  //setActivitiesCustomProfileQuery Script
  const setActivitiesCustomProfileQuery = stateItemSetters.setActivitiesCustomProfileQuery;
  const activitiesCustomProfileQuery =  stateItem.activitiesCustomProfileQuery;
  
  useEffect(() => {
    if (expected_revenueNode?.primkey && setActivitiesCustomProfileQuery) {
      
      const query = {dealId:btoa(expected_revenueNode?.record_id)                    };
      
      const tokenUrl = mosyUrlParam("activities_dataNode")
      
      if(!tokenUrl)
      {
        setActivitiesCustomProfileQuery(query);
      }
      
    }
  }, [expected_revenueNode, setActivitiesCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="ExpectedRevenueProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postExpectedRevenueFormData} encType="multipart/form-data" id="expected_revenue_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  expected_revenueNode?.primkey ? (
                    
                    <span>{`Expected Revenue / ${expected_revenueNode?.client_id}`}</span>
                    
                  ) : customProfileData?.ExpectedRevenueTitle ? (
                    
                    <span>{customProfileData.ExpectedRevenueTitle}</span>
                    
                  ) : (
                    
                    <span>New Expected Revenue</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramExpectedRevenueUptoken && (
                    <DeleteButton
                    src="ExpectedRevenueMainProfilePage"
                    tableName="expected_revenue"
                    uptoken={paramExpectedRevenueUptoken}
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
                
                
                
                {paramExpectedRevenueUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="ExpectedRevenueProfile"
                  action="expected_revenue_DataMap_markRevenueComplete_btn"
                  label="Mark Complete"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    markRevenueComplete({
                      
                      title: `Mark {{revenue_title}} complete`,
                      
                      component: ExpectedRevenueProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "expected_revenue",
                      
                      destTable: "expected_revenue",
                      
                      fieldsetstr: 'revenue_status|Completed',
                      
                      profileDataNode: expected_revenueNode,
                      
                      dataInterpreter: InteprateExpectedRevenueEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ExpectedRevenueProfile"
                  action="expected_revenue_DataMap_markRevenuePending_btn"
                  label="Mark Pending"
                  icon="clock"
                  
                  onClick={()=>{
                    
                    markRevenuePending({
                      
                      title: `Mark {{revenue_title}} pending`,
                      
                      component: ExpectedRevenueProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "expected_revenue",
                      
                      destTable: "expected_revenue",
                      
                      fieldsetstr: 'revenue_status|Pending',
                      
                      profileDataNode: expected_revenueNode,
                      
                      dataInterpreter: InteprateExpectedRevenueEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ExpectedRevenueProfile"
                  action="expected_revenue_DataMap_markRevenuePostponed_btn"
                  label="Mark Postponed"
                  icon="pause-circle"
                  
                  onClick={()=>{
                    
                    markRevenuePostponed({
                      
                      title: `Mark {{revenue_title}} postponed`,
                      
                      component: ExpectedRevenueProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "expected_revenue",
                      
                      destTable: "expected_revenue",
                      
                      fieldsetstr: 'revenue_status|Postponed',
                      
                      profileDataNode: expected_revenueNode,
                      
                      dataInterpreter: InteprateExpectedRevenueEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ExpectedRevenueProfile"
                  action="expected_revenue_DataMap_markRevenueCancelled_btn"
                  label="Mark Cancelled"
                  icon="x-circle"
                  
                  onClick={()=>{
                    
                    markRevenueCancelled({
                      
                      title: `Mark {{revenue_title}} cancelled`,
                      
                      component: ExpectedRevenueProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "expected_revenue",
                      
                      destTable: "expected_revenue",
                      
                      fieldsetstr: 'revenue_status|Cancelled',
                      
                      profileDataNode: expected_revenueNode,
                      
                      dataInterpreter: InteprateExpectedRevenueEvent
                      
                    })
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="ExpectedRevenueProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("ExpectedRevenue_more_profile_actions");
                      
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
                    id="ExpectedRevenue_more_profile_actions"
                    
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
                        expected_revenueNode?.primkey ? (
                          
                          <span>{`Expected Revenue / ${expected_revenueNode?.client_id}`}</span>
                          
                        ) : customProfileData?.ExpectedRevenueTitle ? (
                          
                          <span>{customProfileData.ExpectedRevenueTitle}</span>
                          
                        ) : (
                          
                          <span>New Expected Revenue</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("ExpectedRevenue_more_profile_actions").style.display = "none";
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
                    document.getElementById("ExpectedRevenue_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="expected_revenue_DataMap_markRevenuePaid_btn"
                      label="Mark Paid"
                      icon="badge-check"
                      
                      onClick={()=>{
                        
                        markRevenuePaid({
                          
                          title: `Mark {{revenue_title}} paid`,
                          
                          component: ExpectedRevenueProfile,
                          
                          stateitemsetters: stateItemSetters,
                          
                          parentTable: "expected_revenue",
                          
                          destTable: "expected_revenue",
                          
                          fieldsetstr: 'payment_status|Paid',
                          
                          profileDataNode: expected_revenueNode,
                          
                          dataInterpreter: InteprateExpectedRevenueEvent
                          
                        })
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="expected_revenue_DataMap_markRevenueUnpaid_btn"
                      label="Mark Unpaid"
                      icon="alert-circle"
                      
                      onClick={()=>{
                        
                        markRevenueUnpaid({
                          
                          title: `Mark {{revenue_title}} unpaid`,
                          
                          component: ExpectedRevenueProfile,
                          
                          stateitemsetters: stateItemSetters,
                          
                          parentTable: "expected_revenue",
                          
                          destTable: "expected_revenue",
                          
                          fieldsetstr: 'payment_status|Unpaid',
                          
                          profileDataNode: expected_revenueNode,
                          
                          dataInterpreter: InteprateExpectedRevenueEvent
                          
                        })
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="expected_revenue_DataMap_createRevenueInvoice_btn"
                      label="Create Invoice"
                      icon="file-text"
                      
                      onClick={()=>{
                        
                        createRevenueInvoice({
                          
                          title: `Create invoice for {{revenue_title}}`,
                          
                          component: InvoicesProfile,
                          
                          stateitemsetters: stateItemSetters,
                          
                          parentTable: "expected_revenue",
                          
                          destTable: "invoices",
                          
                          fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",
                          
                          profileDataNode: expected_revenueNode,
                          
                          dataInterpreter: InteprateExpectedRevenueEvent
                          
                        })
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="expected_revenue_DataMap_addRevenueActivity_btn"
                      label="Add Activity"
                      icon="calendar"
                      
                      onClick={()=>{
                        
                        addRevenueActivity({
                          
                          title: `Add activity for {{revenue_title}}`,
                          
                          component: ActivitiesProfile,
                          
                          stateitemsetters: stateItemSetters,
                          
                          parentTable: "expected_revenue",
                          
                          destTable: "activities",
                          
                          fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",
                          
                          profileDataNode: expected_revenueNode,
                          
                          dataInterpreter: InteprateExpectedRevenueEvent
                          
                        })
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="view_client_details_profile_action_btn"
                      label="View Client Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="view_deal_profile_action_btn"
                      label="View Deal"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="view_invoices_profile_action_btn"
                      label="View Invoices"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="view_payments_profile_action_btn"
                      label="View Payments"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ExpectedRevenueProfile"
                      action="view_activities_profile_action_btn"
                      label="View Activities"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramExpectedRevenueUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="ExpectedRevenueMainProfilePage"
          tableName="expected_revenue"
          uptoken={paramExpectedRevenueUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="ExpectedRevenueMainProfilePage"
          tableName="expected_revenue"
          link="./profile"
          label="New Expected Revenue"
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
              <label className="d-none">Revenue Month</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.expectedrevenue.base}
              idField="primkey"
              labelField="revenue_month"
              inputName="revenue_month"
              label="Revenue Month"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={expected_revenueNode?.revenue_month || ""}
              />
            </div>
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.clients.base}
            tblName="clients"
            parentTable="expected_revenue"
            inputName="_clients_full_name_client_id"
            hiddenInputName="client_id"
            valueField="record_id"
            displayField="full_name"
            label="Full Name"
            defaultValue={{ record_id: expected_revenueNode?.client_id || "", full_name: expected_revenueNode?._clients_full_name_client_id || "" }}
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
            parentTable="expected_revenue"
            inputName="_deals_deal_title_deal_id"
            hiddenInputName="deal_id"
            valueField="record_id"
            displayField="deal_title"
            label="Deal Title"
            defaultValue={{ record_id: expected_revenueNode?.deal_id || "", deal_title: expected_revenueNode?._deals_deal_title_deal_id || "" }}
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
            module="expected_revenue"
            field="expected_amount"
            label="Expected Amount"
            value={expected_revenueNode?.expected_amount || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Currency Code</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.expectedrevenue.base}
              idField="primkey"
              labelField="currency_code"
              inputName="currency_code"
              label="Currency Code"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={expected_revenueNode?.currency_code || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label >Payment Status</label>
              
              <select name="payment_status" id="payment_status" className="form-control">
                <option  value={expected_revenueNode?.payment_status || ""}>{expected_revenueNode?.payment_status || "Select Payment Status"}</option>
                <option>Complete</option>
                <option>Pending</option>
                
              </select>
            </div>
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.payments.base}
            tblName="payments"
            parentTable="expected_revenue"
            inputName="_payments_transaction_ref_payment_ref_no"
            hiddenInputName="payment_ref_no"
            valueField="transaction_ref"
            displayField="transaction_ref"
            label="Transaction Ref"
            defaultValue={{ transaction_ref: expected_revenueNode?.payment_ref_no || "", transaction_ref: expected_revenueNode?._payments_transaction_ref_payment_ref_no || "" }}
            onSelect={(id) => console.log("Just the ID:", id)}
            onSelectFull={(dataRes) =>  console.log("Data seleted")}
            onInputChange={handleInputChange}
            defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
              customProfileData?.payment_ref_no
              ? 'd-none'
              : ''
            }`}
            context={{hostParent : hostParent}}
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
            module="expected_revenue"
            field="expected_close_date"
            label="Expected Close Date"
            value={expected_revenueNode?.expected_close_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="date"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Probability Percent</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.expectedrevenue.base}
              idField="primkey"
              labelField="probability_percent"
              inputName="probability_percent"
              label="Probability Percent"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={expected_revenueNode?.probability_percent || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Revenue Source Type</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.expectedrevenue.base}
              idField="primkey"
              labelField="revenue_source_type"
              inputName="revenue_source_type"
              label="Revenue Source Type"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={expected_revenueNode?.revenue_source_type || ""}
              />
            </div>
            
            
            <MosySmartField
            module="expected_revenue"
            field="revenue_title"
            label="Revenue Title"
            value={expected_revenueNode?.revenue_title || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.invoices.base}
            tblName="invoices"
            parentTable="expected_revenue"
            inputName="_invoices_invoice_title_invoice_id"
            hiddenInputName="invoice_id"
            valueField="record_id"
            displayField="invoice_title"
            label="Invoice Title"
            defaultValue={{ record_id: expected_revenueNode?.invoice_id || "", invoice_title: expected_revenueNode?._invoices_invoice_title_invoice_id || "" }}
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
            
            <MosySmartField
            module="expected_revenue"
            field="lead_id"
            label="Lead Id"
            value={expected_revenueNode?.lead_id || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Revenue Status</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.expectedrevenue.base}
              idField="primkey"
              labelField="revenue_status"
              inputName="revenue_status"
              label="Revenue Status"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={expected_revenueNode?.revenue_status || ""}
              />
            </div>
            
            
            <MosySmartField
            module="expected_revenue"
            field="revenue_description"
            label="Revenue Description"
            value={expected_revenueNode?.revenue_description || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="expected_revenue"
            field="assigned_to"
            label="Assigned To"
            value={expected_revenueNode?.assigned_to || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="expected_revenue"
            field="created_at"
            label="Created At"
            value={expected_revenueNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <input className="form-control" id="updated_at" name="updated_at" value={expected_revenueNode?.updated_at || ""} placeholder="Updated At" type="hidden"/>
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="ExpectedRevenueMainProfilePage"
            tblName="expected_revenue"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="expected_revenue_dataNode" name="expected_revenue_dataNode" value={paramExpectedRevenueUptoken}/>
        <input type="hidden" id="expected_revenue_mosy_action" name="expected_revenue_mosy_action" value={expectedRevenueActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      title={`Client Details`}
      source="expected_revenue_ClientsProfile"
      component={ClientsProfile}
      table="expected_revenue"
      key={`ClientsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : clientsCustomProfileQuery,
        hostParent : "ExpectedRevenueProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _expected_revenue_revenue_title_record_id:expected_revenueNode?.revenue_title,
          record_id:expected_revenueNode?.client_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      title={`Deal`}
      source="expected_revenue_DealsProfile"
      component={DealsProfile}
      table="expected_revenue"
      key={`DealsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : dealsCustomProfileQuery,
        hostParent : "ExpectedRevenueProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _expected_revenue_revenue_title_record_id:expected_revenueNode?.revenue_title,
          record_id:expected_revenueNode?.deal_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      title={`Invoices`}
      source="expected_revenue_InvoicesProfile"
      component={InvoicesProfile}
      table="expected_revenue"
      key={`InvoicesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : invoicesCustomProfileQuery,
        hostParent : "ExpectedRevenueProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _expected_revenue_revenue_title_record_id:expected_revenueNode?.revenue_title,
          record_id:expected_revenueNode?.invoice_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      title={`Payments`}
      source="expected_revenue_PaymentsProfile"
      component={PaymentsProfile}
      table="expected_revenue"
      key={`PaymentsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : paymentsCustomProfileQuery,
        hostParent : "ExpectedRevenueProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _expected_revenue_revenue_title_transaction_ref:expected_revenueNode?.revenue_title,
          transaction_ref:expected_revenueNode?.payment_ref_no
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      title={`Activities`}
      source="expected_revenue_ActivitiesProfile"
      component={ActivitiesProfile}
      table="expected_revenue"
      key={`ActivitiesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : activitiesCustomProfileQuery,
        hostParent : "ExpectedRevenueProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _expected_revenue_revenue_title_deal_id:expected_revenueNode?.revenue_title,
          deal_id:expected_revenueNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateActivitiesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../clients/list?expected_revenue_mosyfilter=${btoa(`{recordId:btoa(expected_revenueNode?.client_id)    }`)}`}
      title={`Client Details`}
      source="expected_revenue_ClientsList"
      component={ClientsList}
      table="expected_revenue"
      key={`ClientsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(expected_revenueNode?.client_id)    },
        customProfilePath:"../clients/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../deals/list?expected_revenue_mosyfilter=${btoa(`{recordId:btoa(expected_revenueNode?.deal_id)        }`)}`}
      title={`Deal`}
      source="expected_revenue_DealsList"
      component={DealsList}
      table="expected_revenue"
      key={`DealsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(expected_revenueNode?.deal_id)        },
        customProfilePath:"../deals/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../invoices/list?expected_revenue_mosyfilter=${btoa(`{recordId:btoa(expected_revenueNode?.invoice_id)            }`)}`}
      title={`Invoices`}
      source="expected_revenue_InvoicesList"
      component={InvoicesList}
      table="expected_revenue"
      key={`InvoicesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(expected_revenueNode?.invoice_id)            },
        customProfilePath:"../invoices/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../payments/list?expected_revenue_mosyfilter=${btoa(`{transactionRef:btoa(expected_revenueNode?.payment_ref_no)                }`)}`}
      title={`Payments`}
      source="expected_revenue_PaymentsList"
      component={PaymentsList}
      table="expected_revenue"
      key={`PaymentsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {transactionRef:btoa(expected_revenueNode?.payment_ref_no)                },
        customProfilePath:"../payments/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {expected_revenueNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../activities/list?expected_revenue_mosyfilter=${btoa(`{dealId:btoa(expected_revenueNode?.record_id)                    }`)}`}
      title={`Activities`}
      source="expected_revenue_ActivitiesList"
      component={ActivitiesList}
      table="expected_revenue"
      key={`ActivitiesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(expected_revenueNode?.record_id)                    },
        customProfilePath:"../activities/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateActivitiesEvent,
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

