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
import { inteprateSmartMessagesFormAction, smartMessagesProfileData , popDeleteDialog, InteprateSmartMessagesEvent } from '../dataControl/SmartMessagesRequestHandler';

//state management
import { useSmartMessagesState } from '../dataControl/SmartMessagesStateManager';

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
import {InteprateLeadsEvent} from '../../leads/dataControl/LeadsRequestHandler';
import LeadsList from '../../leads/uiControl/LeadsList';
import ClientsProfile from '../../clients/uiControl/ClientsProfile';
import LeadsProfile from '../../leads/uiControl/LeadsProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from resendmsg.jsx
import {
  reSendMessage
} from '../logicControl/resendmsg';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from leads-automapper.jsx
import {
  viewLeads
} from '../../leads/logicControl/leads-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_SMART_MESSAGES";

//live data detial / profile component

export default function SmartMessagesProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="SmartMessagesMainProfilePage",
    parentProfileItemId = "SmartMessagesProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage SmartMessages states
  const [stateItem, stateItemSetters] = useSmartMessagesState(settersOverrides);
  const smart_messagesNode = stateItem.smartMessagesNode
  
  // -- basic states --//
  const paramSmartMessagesUptoken  = stateItem.smartMessagesUptoken
  const smartMessagesActionStatus = stateItem.smartMessagesActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setSmartMessagesNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postSmartMessagesFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateSmartMessagesFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postSmartMessagesFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("SmartMessagesProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    smartMessagesProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setClientsCustomProfileQuery Script
  const setClientsCustomProfileQuery = stateItemSetters.setClientsCustomProfileQuery;
  const clientsCustomProfileQuery =  stateItem.clientsCustomProfileQuery;
  
  useEffect(() => {
    if (smart_messagesNode?.primkey && setClientsCustomProfileQuery) {
      
      const query = {recordId:btoa(smart_messagesNode?.related_record_id)    };
      
      const tokenUrl = mosyUrlParam("clients_dataNode")
      
      if(!tokenUrl)
      {
        setClientsCustomProfileQuery(query);
      }
      
    }
  }, [smart_messagesNode, setClientsCustomProfileQuery]);
  
  //setLeadsCustomProfileQuery Script
  const setLeadsCustomProfileQuery = stateItemSetters.setLeadsCustomProfileQuery;
  const leadsCustomProfileQuery =  stateItem.leadsCustomProfileQuery;
  
  useEffect(() => {
    if (smart_messagesNode?.primkey && setLeadsCustomProfileQuery) {
      
      const query = {recordId:btoa(smart_messagesNode?.related_record_id)        };
      
      const tokenUrl = mosyUrlParam("leads_dataNode")
      
      if(!tokenUrl)
      {
        setLeadsCustomProfileQuery(query);
      }
      
    }
  }, [smart_messagesNode, setLeadsCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="SmartMessagesProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postSmartMessagesFormData} encType="multipart/form-data" id="smart_messages_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  smart_messagesNode?.primkey ? (
                    
                    <span>{`Smart Messages / ${smart_messagesNode?.related_record_id}`}</span>
                    
                  ) : customProfileData?.SmartMessagesTitle ? (
                    
                    <span>{customProfileData.SmartMessagesTitle}</span>
                    
                  ) : (
                    
                    <span>New Smart Messages</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramSmartMessagesUptoken && (
                    <DeleteButton
                    src="SmartMessagesMainProfilePage"
                    tableName="smart_messages"
                    uptoken={paramSmartMessagesUptoken}
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
                
                
                
                {paramSmartMessagesUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="SmartMessagesProfile"
                  action="smart_messages_SmartMsg_reSendMessage_btn"
                  label="Send Message"
                  icon="send"
                  
                  onClick={()=>{
                    
                    reSendMessage({
                      
                      profileDataNode:
                      {
                        tel : smart_messagesNode?.recipient_phone,
                        email : smart_messagesNode?.recipient_email,
                        record_id : smart_messagesNode?.related_record_id,
                        name : smart_messagesNode?.recipient_name,
                        
                      },
                      
                      uiOptions:
                      {
                        title:`Send Message`,
                        modalTitle:`Send message`,
                        subject:`${smart_messagesNode?.message_subject}`,
                        message:`${smart_messagesNode?.message_content}`
                      }
                      
                    });
                    
                  }}
                  />
                  <MosyActionButton
                  source="SmartMessagesProfile"
                  action="view_clients_profile_action_btn"
                  label="View Clients"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewClients({childCol:`recordId`,parentColVal:smart_messagesNode.related_record_id,parentName:smart_messagesNode.recipient_name})
                    
                  }}
                  />
                  <MosyActionButton
                  source="SmartMessagesProfile"
                  action="view_leads_profile_action_btn"
                  label="View Leads"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewLeads({childCol:`recordId`,parentColVal:smart_messagesNode.related_record_id,parentName:smart_messagesNode.recipient_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramSmartMessagesUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="SmartMessagesMainProfilePage"
                tableName="smart_messages"
                uptoken={paramSmartMessagesUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="SmartMessagesMainProfilePage"
                tableName="smart_messages"
                link="./profile"
                label="New Smart Messages"
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
                  module="smart_messages"
                  field="message_number"
                  label="Message Number"
                  value={smart_messagesNode?.message_number || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.leads.base}
                  tblName="leads"
                  parentTable="smart_messages"
                  inputName="_leads_full_name_related_record_id"
                  hiddenInputName="related_record_id"
                  valueField="record_id"
                  displayField="full_name"
                  label="Related Record Id"
                  defaultValue={{ record_id: smart_messagesNode?.related_record_id || "", full_name: smart_messagesNode?._leads_full_name_related_record_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.related_record_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <MosySmartField
                  module="smart_messages"
                  field="recipient_name"
                  label="Recipient Name"
                  value={smart_messagesNode?.recipient_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="recipient_phone"
                  label="Recipient Phone"
                  value={smart_messagesNode?.recipient_phone || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="recipient_email"
                  label="Recipient Email"
                  value={smart_messagesNode?.recipient_email || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="message_channel"
                  label="Message Channel"
                  value={smart_messagesNode?.message_channel || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="message_subject"
                  label="Message Subject"
                  value={smart_messagesNode?.message_subject || ""}
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
                  module="smart_messages"
                  field="message_content"
                  label="Message Content"
                  value={smart_messagesNode?.message_content || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="message_status"
                  label="Message Status"
                  value={smart_messagesNode?.message_status || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="delivery_status"
                  label="Delivery Status"
                  value={smart_messagesNode?.delivery_status || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="request_source"
                  label="Request Source"
                  value={smart_messagesNode?.request_source || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="request_id"
                  label="Request Id"
                  value={smart_messagesNode?.request_id || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="sent_by"
                  label="Sent By"
                  value={smart_messagesNode?.sent_by || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="scheduled_for"
                  label="Scheduled For"
                  value={smart_messagesNode?.scheduled_for || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="sent_on"
                  label="Sent On"
                  value={smart_messagesNode?.sent_on || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="delivered_on"
                  label="Delivered On"
                  value={smart_messagesNode?.delivered_on || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="read_on"
                  label="Read On"
                  value={smart_messagesNode?.read_on || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="failed_on"
                  label="Failed On"
                  value={smart_messagesNode?.failed_on || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="failure_reason"
                  label="Failure Reason"
                  value={smart_messagesNode?.failure_reason || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="created_on"
                  label="Created On"
                  value={smart_messagesNode?.created_on || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="created_at"
                  label="Created At"
                  value={smart_messagesNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                  
                  <MosySmartField
                  module="smart_messages"
                  field="updated_at"
                  label="Updated At"
                  value={smart_messagesNode?.updated_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell  d-none"}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="SmartMessagesMainProfilePage"
                  tblName="smart_messages"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="smart_messages_dataNode" name="smart_messages_dataNode" value={paramSmartMessagesUptoken}/>
              <input type="hidden" id="smart_messages_mosy_action" name="smart_messages_mosy_action" value={smartMessagesActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {smart_messagesNode?.primkey && (
            <MosyProfileSection
            title={`Clients`}
            source="smart_messages_ClientsProfile"
            component={ClientsProfile}
            table="smart_messages"
            key={`ClientsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : clientsCustomProfileQuery,
              hostParent : "SmartMessagesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _smart_messages_recipient_name_record_id:smart_messagesNode?.recipient_name,
                record_id:smart_messagesNode?.related_record_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateClientsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          {smart_messagesNode?.primkey && (
            <MosyProfileSection
            title={`Leads`}
            source="smart_messages_LeadsProfile"
            component={LeadsProfile}
            table="smart_messages"
            key={`LeadsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : leadsCustomProfileQuery,
              hostParent : "SmartMessagesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _smart_messages_recipient_name_record_id:smart_messagesNode?.recipient_name,
                record_id:smart_messagesNode?.related_record_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateLeadsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {smart_messagesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../clients/list?smart_messages_mosyfilter=${btoa(`{recordId:btoa(smart_messagesNode?.related_record_id)    }`)}`}
            title={`Clients`}
            source="smart_messages_ClientsList"
            component={ClientsList}
            table="smart_messages"
            key={`ClientsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(smart_messagesNode?.related_record_id)    },
              customProfilePath:"../clients/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateClientsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          )}
          
          {smart_messagesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../leads/list?smart_messages_mosyfilter=${btoa(`{recordId:btoa(smart_messagesNode?.related_record_id)        }`)}`}
            title={`Leads`}
            source="smart_messages_LeadsList"
            component={LeadsList}
            table="smart_messages"
            key={`LeadsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(smart_messagesNode?.related_record_id)        },
              customProfilePath:"../leads/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateLeadsEvent,
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

