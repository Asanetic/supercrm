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
import { inteprateClientsFormAction, clientsProfileData , popDeleteDialog, InteprateClientsEvent } from '../dataControl/ClientsRequestHandler';

//state management
import { useClientsState } from '../dataControl/ClientsStateManager';

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

import {InteprateDealsEvent} from '../../deals/dataControl/DealsRequestHandler';
import DealsList from '../../deals/uiControl/DealsList';
import {InteprateQuotationsEvent} from '../../quotations/dataControl/QuotationsRequestHandler';
import QuotationsList from '../../quotations/uiControl/QuotationsList';
import {InteprateInvoicesEvent} from '../../invoices/dataControl/InvoicesRequestHandler';
import InvoicesList from '../../invoices/uiControl/InvoicesList';
import {IntepratePaymentsEvent} from '../../payments/dataControl/PaymentsRequestHandler';
import PaymentsList from '../../payments/uiControl/PaymentsList';
import {InteprateTasksEvent} from '../../tasks/dataControl/TasksRequestHandler';
import TasksList from '../../tasks/uiControl/TasksList';
import {InteprateActivitiesEvent} from '../../activities/dataControl/ActivitiesRequestHandler';
import ActivitiesList from '../../activities/uiControl/ActivitiesList';
import {InteprateExpectedRevenueEvent} from '../../expectedrevenue/dataControl/ExpectedRevenueRequestHandler';
import ExpectedRevenueList from '../../expectedrevenue/uiControl/ExpectedRevenueList';
import DealsProfile from '../../deals/uiControl/DealsProfile';
import QuotationsProfile from '../../quotations/uiControl/QuotationsProfile';
import InvoicesProfile from '../../invoices/uiControl/InvoicesProfile';
import PaymentsProfile from '../../payments/uiControl/PaymentsProfile';
import TasksProfile from '../../tasks/uiControl/TasksProfile';
import ActivitiesProfile from '../../activities/uiControl/ActivitiesProfile';
import ExpectedRevenueProfile from '../../expectedrevenue/uiControl/ExpectedRevenueProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from activate-client.jsx
import {
  activateClient
} from '../logicControl/activate-client';

// Imports from suspend-client.jsx
import {
  suspendClient
} from '../logicControl/suspend-client';

// Imports from create-revenue-projection.jsx
import {
  createClientRevenueProjections
} from '../logicControl/create-revenue-projection';

// Imports from create-deal.jsx
import {
  createClientDeal
} from '../logicControl/create-deal';

// Imports from create-invoice.jsx
import {
  createClientInvoice
} from '../logicControl/create-invoice';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from quotations-automapper.jsx
import {
  viewQuotations
} from '../../quotations/logicControl/quotations-automapper';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from payments-automapper.jsx
import {
  viewPayments
} from '../../payments/logicControl/payments-automapper';

// Imports from tasks-automapper.jsx
import {
  viewTasks
} from '../../tasks/logicControl/tasks-automapper';

// Imports from activities-automapper.jsx
import {
  viewActivities
} from '../../activities/logicControl/activities-automapper';

// Imports from expected_revenue-automapper.jsx
import {
  viewExpectedRevenue
} from '../../expectedrevenue/logicControl/expected_revenue-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_CLIENTS";

//live data detial / profile component

export default function ClientsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="ClientsMainProfilePage",
    parentProfileItemId = "ClientsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Clients states
  const [stateItem, stateItemSetters] = useClientsState(settersOverrides);
  const clientsNode = stateItem.clientsNode
  
  // -- basic states --//
  const paramClientsUptoken  = stateItem.clientsUptoken
  const clientsActionStatus = stateItem.clientsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setClientsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postClientsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateClientsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postClientsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("ClientsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    clientsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setDealsCustomProfileQuery Script
  const setDealsCustomProfileQuery = stateItemSetters.setDealsCustomProfileQuery;
  const dealsCustomProfileQuery =  stateItem.dealsCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setDealsCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)    };
      
      const tokenUrl = mosyUrlParam("deals_dataNode")
      
      if(!tokenUrl)
      {
        setDealsCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setDealsCustomProfileQuery]);
  
  //setQuotationsCustomProfileQuery Script
  const setQuotationsCustomProfileQuery = stateItemSetters.setQuotationsCustomProfileQuery;
  const quotationsCustomProfileQuery =  stateItem.quotationsCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setQuotationsCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)        };
      
      const tokenUrl = mosyUrlParam("quotations_dataNode")
      
      if(!tokenUrl)
      {
        setQuotationsCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setQuotationsCustomProfileQuery]);
  
  //setInvoicesCustomProfileQuery Script
  const setInvoicesCustomProfileQuery = stateItemSetters.setInvoicesCustomProfileQuery;
  const invoicesCustomProfileQuery =  stateItem.invoicesCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setInvoicesCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)            };
      
      const tokenUrl = mosyUrlParam("invoices_dataNode")
      
      if(!tokenUrl)
      {
        setInvoicesCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setInvoicesCustomProfileQuery]);
  
  //setPaymentsCustomProfileQuery Script
  const setPaymentsCustomProfileQuery = stateItemSetters.setPaymentsCustomProfileQuery;
  const paymentsCustomProfileQuery =  stateItem.paymentsCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setPaymentsCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)                };
      
      const tokenUrl = mosyUrlParam("payments_dataNode")
      
      if(!tokenUrl)
      {
        setPaymentsCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setPaymentsCustomProfileQuery]);
  
  //setTasksCustomProfileQuery Script
  const setTasksCustomProfileQuery = stateItemSetters.setTasksCustomProfileQuery;
  const tasksCustomProfileQuery =  stateItem.tasksCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setTasksCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)                    };
      
      const tokenUrl = mosyUrlParam("tasks_dataNode")
      
      if(!tokenUrl)
      {
        setTasksCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setTasksCustomProfileQuery]);
  
  //setActivitiesCustomProfileQuery Script
  const setActivitiesCustomProfileQuery = stateItemSetters.setActivitiesCustomProfileQuery;
  const activitiesCustomProfileQuery =  stateItem.activitiesCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setActivitiesCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)                        };
      
      const tokenUrl = mosyUrlParam("activities_dataNode")
      
      if(!tokenUrl)
      {
        setActivitiesCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setActivitiesCustomProfileQuery]);
  
  //setExpectedRevenueCustomProfileQuery Script
  const setExpectedRevenueCustomProfileQuery = stateItemSetters.setExpectedRevenueCustomProfileQuery;
  const expectedRevenueCustomProfileQuery =  stateItem.expectedRevenueCustomProfileQuery;
  
  useEffect(() => {
    if (clientsNode?.primkey && setExpectedRevenueCustomProfileQuery) {
      
      const query = {clientId:btoa(clientsNode?.record_id)                            };
      
      const tokenUrl = mosyUrlParam("expected_revenue_dataNode")
      
      if(!tokenUrl)
      {
        setExpectedRevenueCustomProfileQuery(query);
      }
      
    }
  }, [clientsNode, setExpectedRevenueCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="ClientsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postClientsFormData} encType="multipart/form-data" id="clients_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  clientsNode?.primkey ? (
                    
                    <span>{`Clients / ${clientsNode?.business_name}`}</span>
                    
                  ) : customProfileData?.ClientsTitle ? (
                    
                    <span>{customProfileData.ClientsTitle}</span>
                    
                  ) : (
                    
                    <span>New Clients</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramClientsUptoken && (
                    <DeleteButton
                    src="ClientsMainProfilePage"
                    tableName="clients"
                    uptoken={paramClientsUptoken}
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
                
                
                
                {paramClientsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="ClientsProfile"
                  action="clients_DataMap_activateClient_btn"
                  label="Activate Client"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    activateClient({
                      
                      title: `Activate {{full_name}} client`,
                      
                      component: ClientsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "clients",
                      
                      destTable: "clients",
                      
                      fieldsetstr: 'client_status|Active',
                      
                      profileDataNode: clientsNode,
                      
                      dataInterpreter: InteprateClientsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ClientsProfile"
                  action="clients_DataMap_suspendClient_btn"
                  label="Suspend Client"
                  icon="pause-circle"
                  
                  onClick={()=>{
                    
                    suspendClient({
                      
                      title: `Suspend {{full_name}} client`,
                      
                      component: ClientsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "clients",
                      
                      destTable: "clients",
                      
                      fieldsetstr: 'client_status|Suspended',
                      
                      profileDataNode: clientsNode,
                      
                      dataInterpreter: InteprateClientsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ClientsProfile"
                  action="clients_DataMap_createClientRevenueProjections_btn"
                  label="Create payment request"
                  icon="line-chart"
                  
                  onClick={()=>{
                    
                    createClientRevenueProjections({
                      
                      title: `Add payment request for {{full_name}}`,
                      
                      component: ExpectedRevenueProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "clients",
                      
                      destTable: "expected_revenue",
                      
                      fieldsetstr: "clients:full_name|record_id:client_id",
                      
                      profileDataNode: clientsNode,
                      
                      dataInterpreter: InteprateClientsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ClientsProfile"
                  action="clients_DataMap_createClientDeal_btn"
                  label="Create Deal"
                  icon="briefcase"
                  
                  onClick={()=>{
                    
                    createClientDeal({
                      
                      title: `Create deal for {{full_name}}`,
                      
                      component: DealsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "clients",
                      
                      destTable: "deals",
                      
                      fieldsetstr: "clients:full_name|record_id:client_id",
                      
                      profileDataNode: clientsNode,
                      
                      dataInterpreter: InteprateClientsEvent
                      
                    })
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="ClientsProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("Clients_more_profile_actions");
                      
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
                    id="Clients_more_profile_actions"
                    
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
                        clientsNode?.primkey ? (
                          
                          <span>{`Clients / ${clientsNode?.business_name}`}</span>
                          
                        ) : customProfileData?.ClientsTitle ? (
                          
                          <span>{customProfileData.ClientsTitle}</span>
                          
                        ) : (
                          
                          <span>New Clients</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("Clients_more_profile_actions").style.display = "none";
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
                    document.getElementById("Clients_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="clients_DataMap_createClientInvoice_btn"
                      label="Create Invoice"
                      icon="file-text"
                      
                      onClick={()=>{
                        
                        createClientInvoice({
                          
                          title: `Create invoice for {{full_name}}`,
                          
                          component: InvoicesProfile,
                          
                          stateitemsetters: stateItemSetters,
                          
                          parentTable: "clients",
                          
                          destTable: "invoices",
                          
                          fieldsetstr: "clients:full_name|record_id:client_id",
                          
                          profileDataNode: clientsNode,
                          
                          dataInterpreter: InteprateClientsEvent
                          
                        })
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_deals_profile_action_btn"
                      label="View Deals"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_quotations_profile_action_btn"
                      label="View Quotations"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_invoices_profile_action_btn"
                      label="View Invoices"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_payments_profile_action_btn"
                      label="View Payments"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_tasks_profile_action_btn"
                      label="View Tasks"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_activities_profile_action_btn"
                      label="View Activities"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="ClientsProfile"
                      action="view_expected_revenue_profile_action_btn"
                      label="View Expected Revenue"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramClientsUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="ClientsMainProfilePage"
          tableName="clients"
          uptoken={paramClientsUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="ClientsMainProfilePage"
          tableName="clients"
          link="./profile"
          label="New Clients"
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
        <div className="col-md-12 m-2"><b>Profile Photo</b></div>
        <MosyImageViewer
        media={`/api/mediaroom?media=${btoa((clientsNode?.profile_photo || ""))}`}
        mediaRoot={""}
        defaultLogo={logo.src}
        imageClass="product_image"
        />
        
        <div className="">
          <MosyFileUploadButton
          tblName="clients"
          attribute="profile_photo"
          />
        </div>
        <input type="hidden" name="media_clients_profile_photo" value={clientsNode?.profile_photo || ""}/>
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
            module="clients"
            field="full_name"
            label="Full Name"
            value={clientsNode?.full_name || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="business_name"
            label="Business Name"
            value={clientsNode?.business_name || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="phone_number"
            label="Phone Number"
            value={clientsNode?.phone_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="alternative_phone_number"
            label="Alternative Phone Number"
            value={clientsNode?.alternative_phone_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="email_address"
            label="Email Address"
            value={clientsNode?.email_address || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="website_url"
            label="Website Url"
            value={clientsNode?.website_url || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Industry Type</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.clients.base}
              idField="primkey"
              labelField="industry_type"
              inputName="industry_type"
              label="Industry Type"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={clientsNode?.industry_type || ""}
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
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Lead Source</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.clients.base}
              idField="primkey"
              labelField="lead_source"
              inputName="lead_source"
              label="Lead Source"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={clientsNode?.lead_source || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Country Name</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.clients.base}
              idField="primkey"
              labelField="country_name"
              inputName="country_name"
              label="Country Name"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={clientsNode?.country_name || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">City Name</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.clients.base}
              idField="primkey"
              labelField="city_name"
              inputName="city_name"
              label="City Name"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={clientsNode?.city_name || ""}
              />
            </div>
            
            
            <MosySmartField
            module="clients"
            field="client_status"
            label="Client Status"
            value={clientsNode?.client_status || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Assigned Sales Rep</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.clients.base}
              idField="primkey"
              labelField="assigned_sales_rep"
              inputName="assigned_sales_rep"
              label="Assigned Sales Rep"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={clientsNode?.assigned_sales_rep || ""}
              />
            </div>
            
            
            <MosySmartField
            module="clients"
            field="business_address"
            label="Business Address"
            value={clientsNode?.business_address || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="clients"
            field="tax_number"
            label="Tax Number"
            value={clientsNode?.tax_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="notes"
            label="Notes"
            value={clientsNode?.notes || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="clients"
            field="last_contact_date"
            label="Last Contact Date"
            value={clientsNode?.last_contact_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="clients"
            field="created_at"
            label="Created At"
            value={clientsNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
            
            <MosySmartField
            module="clients"
            field="updated_at"
            label="Updated At"
            value={clientsNode?.updated_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="ClientsMainProfilePage"
            tblName="clients"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="clients_dataNode" name="clients_dataNode" value={paramClientsUptoken}/>
        <input type="hidden" id="clients_mosy_action" name="clients_mosy_action" value={clientsActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Deals`}
      source="clients_DealsProfile"
      component={DealsProfile}
      table="clients"
      key={`DealsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : dealsCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Quotations`}
      source="clients_QuotationsProfile"
      component={QuotationsProfile}
      table="clients"
      key={`QuotationsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : quotationsCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateQuotationsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Invoices`}
      source="clients_InvoicesProfile"
      component={InvoicesProfile}
      table="clients"
      key={`InvoicesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : invoicesCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Payments`}
      source="clients_PaymentsProfile"
      component={PaymentsProfile}
      table="clients"
      key={`PaymentsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : paymentsCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Tasks`}
      source="clients_TasksProfile"
      component={TasksProfile}
      table="clients"
      key={`TasksProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : tasksCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateTasksEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Activities`}
      source="clients_ActivitiesProfile"
      component={ActivitiesProfile}
      table="clients"
      key={`ActivitiesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : activitiesCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateActivitiesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {clientsNode?.primkey && (
      <MosyProfileSection
      title={`Expected Revenue`}
      source="clients_ExpectedRevenueProfile"
      component={ExpectedRevenueProfile}
      table="clients"
      key={`ExpectedRevenueProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : expectedRevenueCustomProfileQuery,
        hostParent : "ClientsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _clients_full_name_client_id:clientsNode?.full_name,
          client_id:clientsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateExpectedRevenueEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../deals/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)    }`)}`}
      title={`Deals`}
      source="clients_DealsList"
      component={DealsList}
      table="clients"
      key={`DealsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)    },
        customProfilePath:"../deals/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../quotations/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)        }`)}`}
      title={`Quotations`}
      source="clients_QuotationsList"
      component={QuotationsList}
      table="clients"
      key={`QuotationsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)        },
        customProfilePath:"../quotations/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateQuotationsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../invoices/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)            }`)}`}
      title={`Invoices`}
      source="clients_InvoicesList"
      component={InvoicesList}
      table="clients"
      key={`InvoicesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)            },
        customProfilePath:"../invoices/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../payments/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)                }`)}`}
      title={`Payments`}
      source="clients_PaymentsList"
      component={PaymentsList}
      table="clients"
      key={`PaymentsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)                },
        customProfilePath:"../payments/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../tasks/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)                    }`)}`}
      title={`Tasks`}
      source="clients_TasksList"
      component={TasksList}
      table="clients"
      key={`TasksList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)                    },
        customProfilePath:"../tasks/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateTasksEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../activities/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)                        }`)}`}
      title={`Activities`}
      source="clients_ActivitiesList"
      component={ActivitiesList}
      table="clients"
      key={`ActivitiesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)                        },
        customProfilePath:"../activities/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateActivitiesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {clientsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../expectedrevenue/list?clients_mosyfilter=${btoa(`{clientId:btoa(clientsNode?.record_id)                            }`)}`}
      title={`Expected Revenue`}
      source="clients_ExpectedRevenueList"
      component={ExpectedRevenueList}
      table="clients"
      key={`ExpectedRevenueList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {clientId:btoa(clientsNode?.record_id)                            },
        customProfilePath:"../expectedrevenue/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateExpectedRevenueEvent,
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

