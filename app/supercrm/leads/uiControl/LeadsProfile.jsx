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
import { inteprateLeadsFormAction, leadsProfileData , popDeleteDialog, InteprateLeadsEvent } from '../dataControl/LeadsRequestHandler';

//state management
import { useLeadsState } from '../dataControl/LeadsStateManager';

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

import {InteprateUsersEvent} from '../../users/dataControl/UsersRequestHandler';
import UsersList from '../../users/uiControl/UsersList';
import UsersProfile from '../../users/uiControl/UsersProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from convert-lead.jsx
import {
  convertLead
} from '../logicControl/convert-lead';

// Imports from mark-qualified.jsx
import {
  markQualifiedLead
} from '../logicControl/mark-qualified';

// Imports from mark-lost.jsx
import {
  markLostLead
} from '../logicControl/mark-lost';

// Imports from add-task.jsx
import {
  addLeadTask
} from '../logicControl/add-task';

// Imports from users-automapper.jsx
import {
  viewUsers
} from '../../users/logicControl/users-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_LEADS";

//live data detial / profile component

export default function LeadsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="LeadsMainProfilePage",
    parentProfileItemId = "LeadsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Leads states
  const [stateItem, stateItemSetters] = useLeadsState(settersOverrides);
  const leadsNode = stateItem.leadsNode
  
  // -- basic states --//
  const paramLeadsUptoken  = stateItem.leadsUptoken
  const leadsActionStatus = stateItem.leadsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setLeadsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postLeadsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateLeadsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postLeadsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("LeadsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    leadsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setUsersCustomProfileQuery Script
  const setUsersCustomProfileQuery = stateItemSetters.setUsersCustomProfileQuery;
  const usersCustomProfileQuery =  stateItem.usersCustomProfileQuery;
  
  useEffect(() => {
    if (leadsNode?.primkey && setUsersCustomProfileQuery) {
      
      const query = {recordId:btoa(leadsNode?.assigned_sales_rep)    };
      
      const tokenUrl = mosyUrlParam("users_dataNode")
      
      if(!tokenUrl)
      {
        setUsersCustomProfileQuery(query);
      }
      
    }
  }, [leadsNode, setUsersCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="LeadsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postLeadsFormData} encType="multipart/form-data" id="leads_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  leadsNode?.primkey ? (
                    
                    <span>{`Leads / ${leadsNode?.full_name}`}</span>
                    
                  ) : customProfileData?.LeadsTitle ? (
                    
                    <span>{customProfileData.LeadsTitle}</span>
                    
                  ) : (
                    
                    <span>New Leads</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramLeadsUptoken && (
                    <DeleteButton
                    src="LeadsMainProfilePage"
                    tableName="leads"
                    uptoken={paramLeadsUptoken}
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
                
                
                
                {paramLeadsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="LeadsProfile"
                  action="leads_DataMap_convertLead_btn"
                  label="Convert Lead"
                  icon="user-check"
                  
                  onClick={()=>{
                    
                    convertLead({
                      
                      title: `Convert {{full_name}} to client`,
                      
                      component: ClientsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "leads",
                      
                      destTable: "clients",
                      
                      fieldsetstr: "leads:full_name|record_id:lead_id",
                      
                      profileDataNode: leadsNode,
                      
                      dataInterpreter: InteprateLeadsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="LeadsProfile"
                  action="leads_DataMap_markQualifiedLead_btn"
                  label="Mark Qualified"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    markQualifiedLead({
                      
                      title: `Mark {{full_name}} qualified`,
                      
                      component: LeadsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "leads",
                      
                      destTable: "leads",
                      
                      fieldsetstr: 'lead_status|Qualified',
                      
                      profileDataNode: leadsNode,
                      
                      dataInterpreter: InteprateLeadsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="LeadsProfile"
                  action="leads_DataMap_markLostLead_btn"
                  label="Mark Lost"
                  icon="x-circle"
                  
                  onClick={()=>{
                    
                    markLostLead({
                      
                      title: `Mark {{full_name}} lost`,
                      
                      component: LeadsProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "leads",
                      
                      destTable: "leads",
                      
                      fieldsetstr: 'lead_status|Lost',
                      
                      profileDataNode: leadsNode,
                      
                      dataInterpreter: InteprateLeadsEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="LeadsProfile"
                  action="leads_DataMap_addLeadTask_btn"
                  label="Add Task"
                  icon="check-square"
                  
                  onClick={()=>{
                    
                    addLeadTask({
                      
                      title: `Add task for {{full_name}}`,
                      
                      component: TasksProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "leads",
                      
                      destTable: "tasks",
                      
                      fieldsetstr: "leads:full_name|record_id:lead_id",
                      
                      profileDataNode: leadsNode,
                      
                      dataInterpreter: InteprateLeadsEvent
                      
                    })
                    
                  }}
                  />
                  
                  <div className="position-relative d-inline-block mr-2">
                    
                    <MosyActionButton
                    source="LeadsProfile"
                    action="more_profile_action_btn"
                    label="More..."
                    icon="ellipsis-v"
                    
                    onClick={(e)=>{
                      
                      const node = document.getElementById("Leads_more_profile_actions");
                      
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
                    id="Leads_more_profile_actions"
                    
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
                        leadsNode?.primkey ? (
                          
                          <span>{`Leads / ${leadsNode?.full_name}`}</span>
                          
                        ) : customProfileData?.LeadsTitle ? (
                          
                          <span>{customProfileData.LeadsTitle}</span>
                          
                        ) : (
                          
                          <span>New Leads</span>
                          
                        )}
                        - advanced options
                        
                      </h6>
                      
                      <button
                      type="button"
                      aria-label="Close"
                      
                      onClick={()=>{
                        document.getElementById("Leads_more_profile_actions").style.display = "none";
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
                    document.getElementById("Leads_more_profile_actions").style.display = "none";
                  }}
                  >
                  
                  <div className="row m-0 align-items-center">
                    
                    
                    <div className="col-auto p-1">
                      
                      <MosyActionButton
                      source="LeadsProfile"
                      action="view_assigned_sales_rep_profile_action_btn"
                      label="View Assigned Sales Rep"
                      icon="list"
                      
                      onClick={()=>{
                        
                        viewUsers({childCol:`recordId`,parentColVal:leadsNode.assigned_sales_rep,parentName:leadsNode.full_name})
                        
                      }}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </>
        )}
        
        {paramLeadsUptoken && showNavigationIsle && (
          <>
          
          <DeleteButton
          src="LeadsMainProfilePage"
          tableName="leads"
          uptoken={paramLeadsUptoken}
          stateItemSetters={stateItemSetters}
          parentStateSetters={parentStateSetters}
          router={router}
          onDelete={popDeleteDialog}
          />
          
          
          <AddNewButton
          src="LeadsMainProfilePage"
          tableName="leads"
          link="./profile"
          label="New Leads"
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
        media={`/api/mediaroom?media=${btoa((leadsNode?.profile_photo || ""))}`}
        mediaRoot={""}
        defaultLogo={logo.src}
        imageClass="product_image"
        />
        
        <div className="">
          <MosyFileUploadButton
          tblName="leads"
          attribute="profile_photo"
          />
        </div>
        <input type="hidden" name="media_leads_profile_photo" value={leadsNode?.profile_photo || ""}/>
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
            module="leads"
            field="lead_title"
            label="Lead Title"
            value={leadsNode?.lead_title || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="title"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="full_name"
            label="Full Name"
            value={leadsNode?.full_name || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="business_name"
            label="Business Name"
            value={leadsNode?.business_name || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="phone_number"
            label="Phone Number"
            value={leadsNode?.phone_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="alternative_phone_number"
            label="Alternative Phone Number"
            value={leadsNode?.alternative_phone_number || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="email_address"
            label="Email Address"
            value={leadsNode?.email_address || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="website_url"
            label="Website Url"
            value={leadsNode?.website_url || ""}
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
              <label className="d-none">Industry Type</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.leads.base}
              idField="primkey"
              labelField="industry_type"
              inputName="industry_type"
              label="Industry Type"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={leadsNode?.industry_type || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Lead Source</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.leads.base}
              idField="primkey"
              labelField="lead_source"
              inputName="lead_source"
              label="Lead Source"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={leadsNode?.lead_source || ""}
              />
            </div>
            
            
            <MosySmartField
            module="leads"
            field="lead_status"
            label="Lead Status"
            value={leadsNode?.lead_status || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Lead Temperature</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.leads.base}
              idField="primkey"
              labelField="lead_temperature"
              inputName="lead_temperature"
              label="Lead Temperature"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={leadsNode?.lead_temperature || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Full Name</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.leads.base}
              idField="primkey"
              labelField="assigned_sales_rep"
              inputName="assigned_sales_rep"
              label="Full Name"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={leadsNode?.assigned_sales_rep || ""}
              />
            </div>
            
            
            <MosySmartField
            module="leads"
            field="estimated_deal_value"
            label="Estimated Deal Value"
            value={leadsNode?.estimated_deal_value || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="text"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="expected_conversion_date"
            label="Expected Conversion Date"
            value={leadsNode?.expected_conversion_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">Country Name</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.leads.base}
              idField="primkey"
              labelField="country_name"
              inputName="country_name"
              label="Country Name"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={leadsNode?.country_name || ""}
              />
            </div>
            
            
            <div className="form-group col-md-4 hive_data_cell ">
              <label className="d-none">City Name</label>
              
              <SmartDropdown
              apiEndpoint={apiRoutes.leads.base}
              idField="primkey"
              labelField="city_name"
              inputName="city_name"
              label="City Name"
              onSelect={(val) => console.log('Selected:', val)}
              defaultValue={leadsNode?.city_name || ""}
              />
            </div>
            
            
            <MosySmartField
            module="leads"
            field="business_address"
            label="Business Address"
            value={leadsNode?.business_address || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="leads"
            field="notes"
            label="Notes"
            value={leadsNode?.notes || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="textarea"
            cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
            />
            
            
            <MosySmartField
            module="leads"
            field="next_follow_up_date"
            label="Next Follow Up Date"
            value={leadsNode?.next_follow_up_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="last_contact_date"
            label="Last Contact Date"
            value={leadsNode?.last_contact_date || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
            />
            
            
            <MosySmartField
            module="leads"
            field="created_at"
            label="Created At"
            value={leadsNode?.created_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
            
            <MosySmartField
            module="leads"
            field="updated_at"
            label="Updated At"
            value={leadsNode?.updated_at || ""}
            onChange={handleInputChange}
            context={{ hostParent: hostParent  }}
            inputOverrides={{}}
            type="datetime-local"
            cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
            />
            
          </div>
          
          <div className="col-md-12 text-center">
            <SubmitButtons
            src="LeadsMainProfilePage"
            tblName="leads"
            extraClass="optional-custom-class"
            
            />
          </div>
        </div></div>
        {/*    Input cells section isle      */}
      </div>
      
      <section className="hive_control">
        <input type="hidden" id="leads_dataNode" name="leads_dataNode" value={paramLeadsUptoken}/>
        <input type="hidden" id="leads_mosy_action" name="leads_mosy_action" value={leadsActionStatus}/>
      </section>
      
      
    </div>
    
  </form>
  
  
  <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
    {/*<hive_mini_list/>*/}
    
    {leadsNode?.primkey && (
      <MosyProfileSection
      title={`Assigned Sales Rep`}
      source="leads_UsersProfile"
      component={UsersProfile}
      table="leads"
      key={`UsersProfile-${localEventSignature}`}
      dataIn={{
        
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        customQueryStr : usersCustomProfileQuery,
        hostParent : "LeadsProfile",
        parentProfileItemId : activeScrollId,
        customProfileData : {
          _leads_full_name_record_id:leadsNode?.full_name,
          record_id:leadsNode?.assigned_sales_rep
        }
        
      }}
      
      dataOut={{
        
        setChildDataOut: InteprateUsersEvent,
        setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
        
      }}
      />
      
    )}
    
    
    {leadsNode?.primkey && (
      <MosyProfileSection
      viewAllLink={`../users/list?leads_mosyfilter=${btoa(`{recordId:btoa(leadsNode?.assigned_sales_rep)    }`)}`}
      title={`Assigned Sales Rep`}
      source="leads_UsersList"
      component={UsersList}
      table="leads"
      key={`UsersList-${localEventSignature}`}
      dataIn={{
        parentStateSetters : stateItemSetters,
        parentUseEffectKey : localEventSignature,
        showNavigationIsle:false,
        showDataControlSections:false,
        customQueryStr : {recordId:btoa(leadsNode?.assigned_sales_rep)    },
        customProfilePath:"../users/profile"
        
      }}
      
      dataOut={{
        setChildDataOut: InteprateUsersEvent,
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

