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
import { inteprateActivitiesFormAction, activitiesProfileData , popDeleteDialog, InteprateActivitiesEvent } from '../dataControl/ActivitiesRequestHandler';

//state management
import { useActivitiesState } from '../dataControl/ActivitiesStateManager';

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
import {InteprateUsersEvent} from '../../users/dataControl/UsersRequestHandler';
import UsersList from '../../users/uiControl/UsersList';
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
import DealsProfile from '../../deals/uiControl/DealsProfile';
import UsersProfile from '../../users/uiControl/UsersProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from mark-completed.jsx
import {
  markActivityCompleted
} from '../logicControl/mark-completed';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from users-automapper.jsx
import {
  viewUsers
} from '../../users/logicControl/users-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_ACTIVITIES";

//live data detial / profile component

export default function ActivitiesProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="ActivitiesMainProfilePage",
    parentProfileItemId = "ActivitiesProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Activities states
  const [stateItem, stateItemSetters] = useActivitiesState(settersOverrides);
  const activitiesNode = stateItem.activitiesNode
  
  // -- basic states --//
  const paramActivitiesUptoken  = stateItem.activitiesUptoken
  const activitiesActionStatus = stateItem.activitiesActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setActivitiesNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postActivitiesFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateActivitiesFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postActivitiesFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("ActivitiesProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    activitiesProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (activitiesNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(activitiesNode?.client_id)    };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [activitiesNode, setClientsCustomProfileQuery]);
  
  //setDealsCustomProfileQuery Script
  const setDealsCustomProfileQuery = stateItemSetters.setDealsCustomProfileQuery;
  const dealsCustomProfileQuery =  stateItem.dealsCustomProfileQuery;
  
  useEffect(() => {
    if (activitiesNode?.primkey && setDealsCustomProfileQuery) {
      
      const query = {recordId:btoa(activitiesNode?.deal_id)        };
      
      const tokenUrl = mosyUrlParam("deals_dataNode")
      
      if(!tokenUrl)
      {
        setDealsCustomProfileQuery(query);
      }
      
    }
  }, [activitiesNode, setDealsCustomProfileQuery]);
  
  //setUsersCustomProfileQuery Script
  const setUsersCustomProfileQuery = stateItemSetters.setUsersCustomProfileQuery;
  const usersCustomProfileQuery =  stateItem.usersCustomProfileQuery;
  
  useEffect(() => {
    if (activitiesNode?.primkey && setUsersCustomProfileQuery) {
      
      const query = {recordId:btoa(activitiesNode?.performed_by)            };
      
      const tokenUrl = mosyUrlParam("users_dataNode")
      
      if(!tokenUrl)
      {
        setUsersCustomProfileQuery(query);
      }
      
    }
  }, [activitiesNode, setUsersCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="ActivitiesProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postActivitiesFormData} encType="multipart/form-data" id="activities_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  activitiesNode?.primkey ? (
                    
                    <span>{`Activities / ${activitiesNode?.deal_id}`}</span>
                    
                  ) : customProfileData?.ActivitiesTitle ? (
                    
                    <span>{customProfileData.ActivitiesTitle}</span>
                    
                  ) : (
                    
                    <span>New Activities</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramActivitiesUptoken && (
                    <DeleteButton
                    src="ActivitiesMainProfilePage"
                    tableName="activities"
                    uptoken={paramActivitiesUptoken}
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
                
                
                
                {paramActivitiesUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="ActivitiesProfile"
                  action="activities_DataMap_markActivityCompleted_btn"
                  label="Mark Completed"
                  icon="check-circle"
                  
                  onClick={()=>{
                    
                    markActivityCompleted({
                      
                      title: `Mark {{activity_title}} completed`,
                      
                      component: ActivitiesProfile,
                      
                      stateitemsetters: stateItemSetters,
                      
                      parentTable: "activities",
                      
                      destTable: "activities",
                      
                      fieldsetstr: 'activity_status|Completed',
                      
                      profileDataNode: activitiesNode,
                      
                      dataInterpreter: InteprateActivitiesEvent
                      
                    })
                    
                  }}
                  />
                  <MosyActionButton
                  source="ActivitiesProfile"
                  action="view_client_details_profile_action_btn"
                  label="View Client Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewClients({childCol:`recordId`,parentColVal:activitiesNode.client_id,parentName:activitiesNode.activity_title})
                    
                  }}
                  />
                  <MosyActionButton
                  source="ActivitiesProfile"
                  action="view_deal_details_profile_action_btn"
                  label="View Deal Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewDeals({childCol:`recordId`,parentColVal:activitiesNode.deal_id,parentName:activitiesNode.activity_title})
                    
                  }}
                  />
                  <MosyActionButton
                  source="ActivitiesProfile"
                  action="view_performed_by_profile_action_btn"
                  label="View Performed By"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewUsers({childCol:`recordId`,parentColVal:activitiesNode.performed_by,parentName:activitiesNode.activity_title})
                    
                  }}
                  />
                </>
              )}
              
              {paramActivitiesUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="ActivitiesMainProfilePage"
                tableName="activities"
                uptoken={paramActivitiesUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="ActivitiesMainProfilePage"
                tableName="activities"
                link="./profile"
                label="New Activities"
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
                  apiEndpoint={apiRoutes.clients.base}
                  tblName="clients"
                  parentTable="activities"
                  inputName="_clients_full_name_client_id"
                  hiddenInputName="client_id"
                  valueField="record_id"
                  displayField="full_name"
                  label="Full Name"
                  defaultValue={{ record_id: activitiesNode?.client_id || "", full_name: activitiesNode?._clients_full_name_client_id || "" }}
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
                  parentTable="activities"
                  inputName="_deals_deal_title_deal_id"
                  hiddenInputName="deal_id"
                  valueField="record_id"
                  displayField="deal_title"
                  label="Deal Title"
                  defaultValue={{ record_id: activitiesNode?.deal_id || "", deal_title: activitiesNode?._deals_deal_title_deal_id || "" }}
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
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Activity Type</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.activities.base}
                    idField="primkey"
                    labelField="activity_type"
                    inputName="activity_type"
                    label="Activity Type"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={activitiesNode?.activity_type || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="activities"
                  field="activity_title"
                  label="Activity Title"
                  value={activitiesNode?.activity_title || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="title"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="activities"
                  field="activity_description"
                  label="Activity Description"
                  value={activitiesNode?.activity_description || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="activities"
                  field="activity_status"
                  label="Activity Status"
                  value={activitiesNode?.activity_status || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.users.base}
                  tblName="users"
                  parentTable="activities"
                  inputName="_users_full_name_performed_by"
                  hiddenInputName="performed_by"
                  valueField="record_id"
                  displayField="full_name"
                  label="Full Name"
                  defaultValue={{ record_id: activitiesNode?.performed_by || "", full_name: activitiesNode?._users_full_name_performed_by || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.performed_by
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
                  module="activities"
                  field="activity_date"
                  label="Activity Date"
                  value={activitiesNode?.activity_date || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="activities"
                  field="next_action_date"
                  label="Next Action Date"
                  value={activitiesNode?.next_action_date || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="activities"
                  field="created_at"
                  label="Created At"
                  value={activitiesNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                  
                  <MosySmartField
                  module="activities"
                  field="updated_at"
                  label="Updated At"
                  value={activitiesNode?.updated_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="ActivitiesMainProfilePage"
                  tblName="activities"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="activities_dataNode" name="activities_dataNode" value={paramActivitiesUptoken}/>
              <input type="hidden" id="activities_mosy_action" name="activities_mosy_action" value={activitiesActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {activitiesNode?.primkey && (
            <MosyProfileSection
            title={`Client Details`}
            source="activities_ClientsProfile"
            component={ClientsProfile}
            table="activities"
            key={`ClientsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : clientsCustomProfileQuery,
              hostParent : "ActivitiesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _activities_activity_title_record_id:activitiesNode?.activity_title,
                record_id:activitiesNode?.client_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateClientsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          {activitiesNode?.primkey && (
            <MosyProfileSection
            title={`Deal Details`}
            source="activities_DealsProfile"
            component={DealsProfile}
            table="activities"
            key={`DealsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : dealsCustomProfileQuery,
              hostParent : "ActivitiesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _activities_activity_title_record_id:activitiesNode?.activity_title,
                record_id:activitiesNode?.deal_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateDealsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          {activitiesNode?.primkey && (
            <MosyProfileSection
            title={`Performed By`}
            source="activities_UsersProfile"
            component={UsersProfile}
            table="activities"
            key={`UsersProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : usersCustomProfileQuery,
              hostParent : "ActivitiesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _activities_activity_title_record_id:activitiesNode?.activity_title,
                record_id:activitiesNode?.performed_by
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateUsersEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {activitiesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../clients/list?activities_mosyfilter=${btoa(`{recordId:btoa(activitiesNode?.client_id)    }`)}`}
            title={`Client Details`}
            source="activities_ClientsList"
            component={ClientsList}
            table="activities"
            key={`ClientsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(activitiesNode?.client_id)    },
              customProfilePath:"../clients/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateClientsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          )}
          
          {activitiesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../deals/list?activities_mosyfilter=${btoa(`{recordId:btoa(activitiesNode?.deal_id)        }`)}`}
            title={`Deal Details`}
            source="activities_DealsList"
            component={DealsList}
            table="activities"
            key={`DealsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(activitiesNode?.deal_id)        },
              customProfilePath:"../deals/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateDealsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          )}
          
          {activitiesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../users/list?activities_mosyfilter=${btoa(`{recordId:btoa(activitiesNode?.performed_by)            }`)}`}
            title={`Performed By`}
            source="activities_UsersList"
            component={UsersList}
            table="activities"
            key={`UsersList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(activitiesNode?.performed_by)            },
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

