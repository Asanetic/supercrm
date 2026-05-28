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
import { intepratePaymentsFormAction, paymentsProfileData , popDeleteDialog, IntepratePaymentsEvent } from '../dataControl/PaymentsRequestHandler';

//state management
import { usePaymentsState } from '../dataControl/PaymentsStateManager';

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
import {InteprateDealsEvent} from '../../deals/dataControl/DealsRequestHandler';
import DealsList from '../../deals/uiControl/DealsList';
import {InteprateClientsEvent} from '../../clients/dataControl/ClientsRequestHandler';
import ClientsList from '../../clients/uiControl/ClientsList';
import InvoicesProfile from '../../invoices/uiControl/InvoicesProfile';
import DealsProfile from '../../deals/uiControl/DealsProfile';
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from confirm-payment.jsx
import {
  confirmPayment
} from '../logicControl/confirm-payment';

// Imports from refund-payment.jsx
import {
  refundPayment
} from '../logicControl/refund-payment';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_PAYMENTS";

//live data detial / profile component

export default function PaymentsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="PaymentsMainProfilePage",
    parentProfileItemId = "PaymentsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Payments states
  const [stateItem, stateItemSetters] = usePaymentsState(settersOverrides);
  const paymentsNode = stateItem.paymentsNode
  
  // -- basic states --//
  const paramPaymentsUptoken  = stateItem.paymentsUptoken
  const paymentsActionStatus = stateItem.paymentsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setPaymentsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postPaymentsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    intepratePaymentsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postPaymentsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("PaymentsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    paymentsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setInvoicesCustomProfileQuery Script
  const setInvoicesCustomProfileQuery = stateItemSetters.setInvoicesCustomProfileQuery;
  const invoicesCustomProfileQuery =  stateItem.invoicesCustomProfileQuery;
  
  useEffect(() => {
    if (paymentsNode?.primkey && setInvoicesCustomProfileQuery) {
      
      const query = {recordId:btoa(paymentsNode?.invoice_id)    };
      
      const tokenUrl = mosyUrlParam("invoices_dataNode")
      
      if(!tokenUrl)
      {
        setInvoicesCustomProfileQuery(query);
      }
      
    }
  }, [paymentsNode, setInvoicesCustomProfileQuery]);
  
  //setDealsCustomProfileQuery Script
  const setDealsCustomProfileQuery = stateItemSetters.setDealsCustomProfileQuery;
  const dealsCustomProfileQuery =  stateItem.dealsCustomProfileQuery;
  
  useEffect(() => {
    if (paymentsNode?.primkey && setDealsCustomProfileQuery) {
      
      const query = {recordId:btoa(paymentsNode?.deal_id)        };
      
      const tokenUrl = mosyUrlParam("deals_dataNode")
      
      if(!tokenUrl)
      {
        setDealsCustomProfileQuery(query);
      }
      
    }
  }, [paymentsNode, setDealsCustomProfileQuery]);
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (paymentsNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(paymentsNode?.client_id)            };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [paymentsNode, setClientsCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="PaymentsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postPaymentsFormData} encType="multipart/form-data" id="payments_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  paymentsNode?.primkey ? (
                    
                    <span>{`Payments / ${paymentsNode?.amount_paid}`}</span>
                    
                  ) : customProfileData?.PaymentsTitle ? (
                    
                    <span>{customProfileData.PaymentsTitle}</span>
                    
                  ) : (
                    
                    <span>New Payments</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramPaymentsUptoken && (
                    <DeleteButton
                    src="PaymentsMainProfilePage"
                    tableName="payments"
                    uptoken={paramPaymentsUptoken}
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
                
                
                
                {paramPaymentsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="PaymentsProfile"
                  action="payments_DataMap_confirmPayment_btn"
                  label="Confirm Payment"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    confirmPayment({
                      
                      title: `Confirm payment transaction`,
                      
                      component: PaymentsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "payments",
                      
                      destTable: "payments",
                      
                      fieldsetstr: 'payment_status|Paid',
                      
                      profileDataNode: paymentsNode,
                      
                      dataInterpreter: IntepratePaymentsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="PaymentsProfile"
                  action="payments_DataMap_refundPayment_btn"
                  label="Refund Payment"
                  icon="rotate-ccw"
                  
                  onClick={()=>{
                    
                    refundPayment({
                      
                      title: `Refund payment transaction`,
                      
                      component: PaymentsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "payments",
                      
                      destTable: "payments",
                      
                      fieldsetstr: 'payment_status|Refunded',
                      
                      profileDataNode: paymentsNode,
                      
                      dataInterpreter: IntepratePaymentsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="PaymentsProfile"
                  action="view_invoice_details_profile_action_btn"
                  label="View Invoice Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.payment_for})
                    
                  }}
                  />
                  <MosyActionButton
                  source="PaymentsProfile"
                  action="view_deal_details_profile_action_btn"
                  label="View Deal Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.payment_for})
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="PaymentsProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("Payments_more_profile_actions");
                      
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
                    id="Payments_more_profile_actions"
                    
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
                        paymentsNode?.primkey ? (
                          
                          <span>{`Payments / ${paymentsNode?.amount_paid}`}</span>
                          
                        ) : customProfileData?.PaymentsTitle ? (
                          
                          <span>{customProfileData.PaymentsTitle}</span>
                          
                        ) : (
                          
                          <span>New Payments</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("Payments_more_profile_actions").style.display = "none";
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
                    document.getElementById("Payments_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="PaymentsProfile"
                      action="view_client_details_profile_action_btn"
                      label="View Client Details"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.payment_for})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramPaymentsUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="PaymentsMainProfilePage"
          tableName="payments"
          uptoken={paramPaymentsUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="PaymentsMainProfilePage"
          tableName="payments"
          link="./profile"
          label="New Payments"
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
            module="payments"
            field="paid_on"
            label="Paid On"
            value={paymentsNode?.paid_on || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="payments"
            field="amount_paid"
            label="Amount Paid"
            value={paymentsNode?.amount_paid || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="payments"
            field="payment_for"
            label="Payment For"
            value={paymentsNode?.payment_for || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="payments"
            field="payment_notes"
            label="Payment Notes"
            value={paymentsNode?.payment_notes || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="payments"
            field="transaction_ref"
            label="Transaction Ref"
            value={paymentsNode?.transaction_ref || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="payments"
            field="receipt_number"
            label="Receipt Number"
            value={paymentsNode?.receipt_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.invoices.base}
            tblName="invoices"
            parentTable="payments"
            inputName="_invoices_invoice_title_invoice_id"
            hiddenInputName="invoice_id"
            valueField="record_id"
            displayField="invoice_title"
            label="Invoice Title"
            defaultValue={{ record_id: paymentsNode?.invoice_id || "", invoice_title: paymentsNode?._invoices_invoice_title_invoice_id || "" }}
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
            <LiveSearchDropdown
            apiEndpoint={apiRoutes.deals.base}
            tblName="deals"
            parentTable="payments"
            inputName="_deals_deal_title_deal_id"
            hiddenInputName="deal_id"
            valueField="record_id"
            displayField="deal_title"
            label="Deal Title"
            defaultValue={{ record_id: paymentsNode?.deal_id || "", deal_title: paymentsNode?._deals_deal_title_deal_id || "" }}
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
            apiEndpoint={apiRoutes.clients.base}
            tblName="clients"
            parentTable="payments"
            inputName="_clients_full_name_client_id"
            hiddenInputName="client_id"
            valueField="record_id"
            displayField="full_name"
            label="Full Name"
            defaultValue={{ record_id: paymentsNode?.client_id || "", full_name: paymentsNode?._clients_full_name_client_id || "" }}
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
              <label className="d-none">Payment Channel</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.payments.base}
              idField="primkey"
              labelField="payment_channel"
              inputName="payment_channel"
              label="Payment Channel"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={paymentsNode?.payment_channel || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Payment Method</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.payments.base}
              idField="primkey"
              labelField="payment_method"
              inputName="payment_method"
              label="Payment Method"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={paymentsNode?.payment_method || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label >Payment Status</label>
              
              <select name="payment_status" id="payment_status" className="form-control">
                <option  value={paymentsNode?.payment_status || ""}>{paymentsNode?.payment_status || "Select Payment Status"}</option>
                <option>Complete</option>
                <option>Pending</option>
                
              </select>
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Currency Code</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.payments.base}
              idField="primkey"
              labelField="currency_code"
              inputName="currency_code"
              label="Currency Code"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={paymentsNode?.currency_code || ""}
              />
            </div>
            
            
            <MosySmartField
            module="payments"
            field="created_at"
            label="Created At"
            value={paymentsNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <input className="form-control" id="updated_at" name="updated_at" value={paymentsNode?.updated_at || ""} placeholder="Updated At" type="hidden"/>
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="PaymentsMainProfilePage"
            tblName="payments"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="payments_dataNode" name="payments_dataNode" value={paramPaymentsUptoken}/>
        <input type="hidden" id="payments_mosy_action" name="payments_mosy_action" value={paymentsActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {paymentsNode?.primkey && (
      <MosyProfileSection
      title={`Invoice Details`}
      source="payments_InvoicesProfile"
      component={InvoicesProfile}
      table="payments"
      key={`InvoicesProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : invoicesCustomProfileQuery,
        hostParent : "PaymentsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _payments_payment_for_record_id:paymentsNode?.payment_for,
          record_id:paymentsNode?.invoice_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {paymentsNode?.primkey && (
      <MosyProfileSection
      title={`Deal Details`}
      source="payments_DealsProfile"
      component={DealsProfile}
      table="payments"
      key={`DealsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : dealsCustomProfileQuery,
        hostParent : "PaymentsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _payments_payment_for_record_id:paymentsNode?.payment_for,
          record_id:paymentsNode?.deal_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    {paymentsNode?.primkey && (
      <MosyProfileSection
      title={`Client Details`}
      source="payments_ClientsProfile"
      component={ClientsProfile}
      table="payments"
      key={`ClientsProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : clientsCustomProfileQuery,
        hostParent : "PaymentsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _payments_payment_for_record_id:paymentsNode?.payment_for,
          record_id:paymentsNode?.client_id
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateClientsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {paymentsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../invoices/list?payments_mosyfilter=${btoa(`{recordId:btoa(paymentsNode?.invoice_id)    }`)}`}
      title={`Invoice Details`}
      source="payments_InvoicesList"
      component={InvoicesList}
      table="payments"
      key={`InvoicesList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(paymentsNode?.invoice_id)    },
        customProfilePath:"../invoices/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateInvoicesEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {paymentsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../deals/list?payments_mosyfilter=${btoa(`{recordId:btoa(paymentsNode?.deal_id)        }`)}`}
      title={`Deal Details`}
      source="payments_DealsList"
      component={DealsList}
      table="payments"
      key={`DealsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(paymentsNode?.deal_id)        },
        customProfilePath:"../deals/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateDealsEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
      }}
      />
    )}
    
    {paymentsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../clients/list?payments_mosyfilter=${btoa(`{recordId:btoa(paymentsNode?.client_id)            }`)}`}
      title={`Client Details`}
      source="payments_ClientsList"
      component={ClientsList}
      table="payments"
      key={`ClientsList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(paymentsNode?.client_id)            },
        customProfilePath:"../clients/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateClientsEvent,
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

