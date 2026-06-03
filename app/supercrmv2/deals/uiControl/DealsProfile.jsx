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
import { inteprateDealsFormAction, dealsProfileData , popDeleteDialog, InteprateDealsEvent } from '../dataControl/DealsRequestHandler';

//state management
import { useDealsState } from '../dataControl/DealsStateManager';

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
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
import QuotationsProfile from '../../quotations/uiControl/QuotationsProfile';
import InvoicesProfile from '../../invoices/uiControl/InvoicesProfile';
import PaymentsProfile from '../../payments/uiControl/PaymentsProfile';
import TasksProfile from '../../tasks/uiControl/TasksProfile';
import ActivitiesProfile from '../../activities/uiControl/ActivitiesProfile';
import ExpectedRevenueProfile from '../../expectedrevenue/uiControl/ExpectedRevenueProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from mark-won.jsx
import {
  markDealWon
} from '../logicControl/mark-won';

// Imports from mark-lost.jsx
import {
  markDealLost
} from '../logicControl/mark-lost';

// Imports from create-quotation.jsx
import {
  createDealQuotation
} from '../logicControl/create-quotation';

// Imports from add-followup-task.jsx
import {
  addDealFollowupTask
} from '../logicControl/add-followup-task';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

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
export const MOSY_ACCESS_KEY = "MANAGE_DEALS";

//live data detial / profile component

export default function DealsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="DealsMainProfilePage",
    parentProfileItemId = "DealsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Deals states
  const [stateItem, stateItemSetters] = useDealsState(settersOverrides);
  const dealsNode = stateItem.dealsNode
  
  // -- basic states --//
  const paramDealsUptoken  = stateItem.dealsUptoken
  const dealsActionStatus = stateItem.dealsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setDealsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postDealsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateDealsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postDealsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("DealsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    dealsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(dealsNode?.client_id)    };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setClientsCustomProfileQuery]);
  
  //setQuotationsCustomProfileQuery Script
  const setQuotationsCustomProfileQuery = stateItemSetters.setQuotationsCustomProfileQuery;
  const quotationsCustomProfileQuery =  stateItem.quotationsCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setQuotationsCustomProfileQuery) {
      
      const query = {dealId:btoa(dealsNode?.record_id)        };
      
      const tokenUrl = mosyUrlParam("quotations_dataNode")
      
      if(!tokenUrl)
      {
        setQuotationsCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setQuotationsCustomProfileQuery]);
  
  //setInvoicesCustomProfileQuery Script
  const setInvoicesCustomProfileQuery = stateItemSetters.setInvoicesCustomProfileQuery;
  const invoicesCustomProfileQuery =  stateItem.invoicesCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setInvoicesCustomProfileQuery) {
      
      const query = {dealId:btoa(dealsNode?.record_id)            };
      
      const tokenUrl = mosyUrlParam("invoices_dataNode")
      
      if(!tokenUrl)
      {
        setInvoicesCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setInvoicesCustomProfileQuery]);
  
  //setPaymentsCustomProfileQuery Script
  const setPaymentsCustomProfileQuery = stateItemSetters.setPaymentsCustomProfileQuery;
  const paymentsCustomProfileQuery =  stateItem.paymentsCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setPaymentsCustomProfileQuery) {
      
      const query = {dealId:btoa(dealsNode?.record_id)                };
      
      const tokenUrl = mosyUrlParam("payments_dataNode")
      
      if(!tokenUrl)
      {
        setPaymentsCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setPaymentsCustomProfileQuery]);
  
  //setTasksCustomProfileQuery Script
  const setTasksCustomProfileQuery = stateItemSetters.setTasksCustomProfileQuery;
  const tasksCustomProfileQuery =  stateItem.tasksCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setTasksCustomProfileQuery) {
      
      const query = {dealId:btoa(dealsNode?.record_id)                    };
      
      const tokenUrl = mosyUrlParam("tasks_dataNode")
      
      if(!tokenUrl)
      {
        setTasksCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setTasksCustomProfileQuery]);
  
  //setActivitiesCustomProfileQuery Script
  const setActivitiesCustomProfileQuery = stateItemSetters.setActivitiesCustomProfileQuery;
  const activitiesCustomProfileQuery =  stateItem.activitiesCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setActivitiesCustomProfileQuery) {
      
      const query = {dealId:btoa(dealsNode?.record_id)                        };
      
      const tokenUrl = mosyUrlParam("activities_dataNode")
      
      if(!tokenUrl)
      {
        setActivitiesCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setActivitiesCustomProfileQuery]);
  
  //setExpectedRevenueCustomProfileQuery Script
  const setExpectedRevenueCustomProfileQuery = stateItemSetters.setExpectedRevenueCustomProfileQuery;
  const expectedRevenueCustomProfileQuery =  stateItem.expectedRevenueCustomProfileQuery;
  
  useEffect(() => {
    if (dealsNode?.primkey && setExpectedRevenueCustomProfileQuery) {
      
      const query = {dealId:btoa(dealsNode?.record_id)                            };
      
      const tokenUrl = mosyUrlParam("expected_revenue_dataNode")
      
      if(!tokenUrl)
      {
        setExpectedRevenueCustomProfileQuery(query);
      }
      
    }
  }, [dealsNode, setExpectedRevenueCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="DealsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postDealsFormData} encType="multipart/form-data" id="deals_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  dealsNode?.primkey ? (
                    
                    <span>{`Deal profile / ${dealsNode?.deal_title}`}</span>
                    
                  ) : customProfileData?.DealsTitle ? (
                    
                    <span>{customProfileData.DealsTitle}</span>
                    
                  ) : (
                    
                    <span>Create deal</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramDealsUptoken && (
                    <DeleteButton
                    src="DealsMainProfilePage"
                    tableName="deals"
                    uptoken={paramDealsUptoken}
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
                
                
                
                {paramDealsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="DealsProfile"
                  action="deals_DataMap_markDealWon_btn"
                  label="Mark Won"
                  icon="trophy"
                  
                  onClick={()=>{
                    
                    markDealWon({
                      
                      title: `Mark {{deal_title}} won`,
                      
                      component: DealsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "deals",
                      
                      destTable: "deals",
                      
                      fieldsetstr: 'deal_status|Won',
                      
                      profileDataNode: dealsNode,
                      
                      dataInterpreter: InteprateDealsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="DealsProfile"
                  action="deals_DataMap_markDealLost_btn"
                  label="Mark Lost"
                  icon="x-circle"
                  
                  onClick={()=>{
                    
                    markDealLost({
                      
                      title: `Mark {{deal_title}} lost`,
                      
                      component: DealsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "deals",
                      
                      destTable: "deals",
                      
                      fieldsetstr: 'deal_status|Lost',
                      
                      profileDataNode: dealsNode,
                      
                      dataInterpreter: InteprateDealsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="DealsProfile"
                  action="deals_DataMap_createDealQuotation_btn"
                  label="Create Quotation"
                  icon="file-text-o"
                  
                  onClick={()=>{
                    
                    createDealQuotation({
                      
                      title: `Create quotation for {{deal_title}}`,
                      
                      component: QuotationsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "deals",
                      
                      destTable: "quotations",
                      
                      fieldsetstr: "deals:deal_title|record_id:deal_id",
                      
                      profileDataNode: dealsNode,
                      
                      dataInterpreter: InteprateDealsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="DealsProfile"
                  action="deals_DataMap_addDealFollowupTask_btn"
                  label="Add Follow Up"
                  icon="calendar"
                  
                  onClick={()=>{
                    
                    addDealFollowupTask({
                      
                      title: `Add follow up task for {{deal_title}}`,
                      
                      component: TasksProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "deals",
                      
                      destTable: "tasks",
                      
                      fieldsetstr: "deals:deal_title|record_id:deal_id",
                      
                      profileDataNode: dealsNode,
                      
                      dataInterpreter: InteprateDealsEvent
                      
                    })
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="DealsProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("Deals_more_profile_actions");
                      
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
                    id="Deals_more_profile_actions"
                    
                    style={{
                    }}
                    
                    className="bg-white border p-0 _more_button_tray_actions"
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
                        dealsNode?.primkey ? (
                          
                          <span>{`Deal profile / ${dealsNode?.deal_title}`}</span>
                          
                        ) : customProfileData?.DealsTitle ? (
                          
                          <span>{customProfileData.DealsTitle}</span>
                          
                        ) : (
                          
                          <span>Create deal</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("Deals_more_profile_actions").style.display = "none";
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
                    document.getElementById("Deals_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_client_details_profile_action_btn"
                      label="View Client Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewClients({childCol:`recordId`,parentColVal:dealsNode.client_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_quotations_profile_action_btn"
                      label="View Quotations"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewQuotations({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_invoices_profile_action_btn"
                      label="View Invoices"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewInvoices({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_payments_profile_action_btn"
                      label="View Payments"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewPayments({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_tasks_profile_action_btn"
                      label="View Tasks"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewTasks({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_activities_profile_action_btn"
                      label="View Activities"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewActivities({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="DealsProfile"
                      action="view_revenue_profile_action_btn"
                      label="View Revenue"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewExpectedRevenue({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramDealsUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="DealsMainProfilePage"
          tableName="deals"
          uptoken={paramDealsUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="DealsMainProfilePage"
          tableName="deals"
          link="./profile"
          label="Create deal"
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
            module="deals"
            field="deal_title"
            label="Deal name"
            value={dealsNode?.deal_title || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="title"
            cellOverrides={{additionalClass: "col-md-12"}}
            />
            
            
            <MosySmartField
            module="deals"
            field="deal_description"
            label="Deal Description"
            value={dealsNode?.deal_description || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.clients.base}
            tblName="clients"
            parentTable="deals"
            inputName="_clients_full_name_client_id"
            hiddenInputName="client_id"
            valueField="record_id"
            displayField="full_name"
            label="Client"
            defaultValue={{ record_id: dealsNode?.client_id || "", full_name: dealsNode?._clients_full_name_client_id || "" }}
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
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Deal Source</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="deal_source"
              inputName="deal_source"
              label="Deal Source"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.deal_source || ""}
              />
            </div>
            
            
            <MosySmartField
            module="deals"
            field="deal_value"
            label="Deal Value"
            value={dealsNode?.deal_value || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="deals"
            field="expected_close_date"
            label="Expected Close Date"
            value={dealsNode?.expected_close_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Pipeline Stage</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="pipeline_stage"
              inputName="pipeline_stage"
              label="Pipeline Stage"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.pipeline_stage || ""}
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
              <label className="d-none">Deal Stage</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="deal_stage"
              inputName="deal_stage"
              label="Deal Stage"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.deal_stage || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Deal Status</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="deal_status"
              inputName="deal_status"
              label="Deal Status"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.deal_status || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Assigned Sales Rep</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="assigned_sales_rep"
              inputName="assigned_sales_rep"
              label="Assigned Sales Rep"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.assigned_sales_rep || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Priority Level</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="priority_level"
              inputName="priority_level"
              label="Priority Level"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.priority_level || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Deal Probability</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.deals.base}
              idField="primkey"
              labelField="deal_probability"
              inputName="deal_probability"
              label="Deal Probability"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={dealsNode?.deal_probability || ""}
              />
            </div>
            
            
            <MosySmartField
            module="deals"
            field="next_follow_up_date"
            label="Next Follow Up Date"
            value={dealsNode?.next_follow_up_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="deals"
            field="deal_notes"
            label="Deal Notes"
            value={dealsNode?.deal_notes || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="deals"
            field="created_at"
            label="Created At"
            value={dealsNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
            
            <MosySmartField
            module="deals"
            field="updated_at"
            label="Updated At"
            value={dealsNode?.updated_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="DealsMainProfilePage"
            tblName="deals"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="deals_dataNode" name="deals_dataNode" value={paramDealsUptoken}/>
        <input type="hidden" id="deals_mosy_action" name="deals_mosy_action" value={dealsActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Client Details`}
      source="deals_ClientsProfile"
      component={ClientsProfile}
      table="deals"
      key={`ClientsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : clientsCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_record_id:dealsNode?.deal_title,
          record_id:dealsNode?.client_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Quotations`}
      source="deals_QuotationsProfile"
      component={QuotationsProfile}
      table="deals"
      key={`QuotationsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : quotationsCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_deal_id:dealsNode?.deal_title,
          deal_id:dealsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateQuotationsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Invoices`}
      source="deals_InvoicesProfile"
      component={InvoicesProfile}
      table="deals"
      key={`InvoicesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : invoicesCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_deal_id:dealsNode?.deal_title,
          deal_id:dealsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Payments`}
      source="deals_PaymentsProfile"
      component={PaymentsProfile}
      table="deals"
      key={`PaymentsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : paymentsCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_deal_id:dealsNode?.deal_title,
          deal_id:dealsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Tasks`}
      source="deals_TasksProfile"
      component={TasksProfile}
      table="deals"
      key={`TasksProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : tasksCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_deal_id:dealsNode?.deal_title,
          deal_id:dealsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateTasksEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Activities`}
      source="deals_ActivitiesProfile"
      component={ActivitiesProfile}
      table="deals"
      key={`ActivitiesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : activitiesCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_deal_id:dealsNode?.deal_title,
          deal_id:dealsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateActivitiesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {dealsNode?.primkey && (
      <MosyProfileSection
      title={`Revenue`}
      source="deals_ExpectedRevenueProfile"
      component={ExpectedRevenueProfile}
      table="deals"
      key={`ExpectedRevenueProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : expectedRevenueCustomProfileQuery,
        hostParent : "DealsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _deals_deal_title_deal_id:dealsNode?.deal_title,
          deal_id:dealsNode?.record_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateExpectedRevenueEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../clients/list?deals_mosyfilter=${btoa(`{recordId:btoa(dealsNode?.client_id)    }`)}`}
      title={`Client Details`}
      source="deals_ClientsList"
      component={ClientsList}
      table="deals"
      key={`ClientsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(dealsNode?.client_id)    },
        customProfilePath:"../clients/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../quotations/list?deals_mosyfilter=${btoa(`{dealId:btoa(dealsNode?.record_id)        }`)}`}
      title={`Quotations`}
      source="deals_QuotationsList"
      component={QuotationsList}
      table="deals"
      key={`QuotationsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(dealsNode?.record_id)        },
        customProfilePath:"../quotations/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateQuotationsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../invoices/list?deals_mosyfilter=${btoa(`{dealId:btoa(dealsNode?.record_id)            }`)}`}
      title={`Invoices`}
      source="deals_InvoicesList"
      component={InvoicesList}
      table="deals"
      key={`InvoicesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(dealsNode?.record_id)            },
        customProfilePath:"../invoices/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../payments/list?deals_mosyfilter=${btoa(`{dealId:btoa(dealsNode?.record_id)                }`)}`}
      title={`Payments`}
      source="deals_PaymentsList"
      component={PaymentsList}
      table="deals"
      key={`PaymentsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(dealsNode?.record_id)                },
        customProfilePath:"../payments/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: IntepratePaymentsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../tasks/list?deals_mosyfilter=${btoa(`{dealId:btoa(dealsNode?.record_id)                    }`)}`}
      title={`Tasks`}
      source="deals_TasksList"
      component={TasksList}
      table="deals"
      key={`TasksList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(dealsNode?.record_id)                    },
        customProfilePath:"../tasks/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateTasksEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../activities/list?deals_mosyfilter=${btoa(`{dealId:btoa(dealsNode?.record_id)                        }`)}`}
      title={`Activities`}
      source="deals_ActivitiesList"
      component={ActivitiesList}
      table="deals"
      key={`ActivitiesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(dealsNode?.record_id)                        },
        customProfilePath:"../activities/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateActivitiesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {dealsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../expectedrevenue/list?deals_mosyfilter=${btoa(`{dealId:btoa(dealsNode?.record_id)                            }`)}`}
      title={`Revenue`}
      source="deals_ExpectedRevenueList"
      component={ExpectedRevenueList}
      table="deals"
      key={`ExpectedRevenueList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {dealId:btoa(dealsNode?.record_id)                            },
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

