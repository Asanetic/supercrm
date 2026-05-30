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
import { inteprateSystemUsersFormAction, systemUsersProfileData , popDeleteDialog, InteprateSystemUsersEvent } from '../dataControl/SystemUsersRequestHandler';

//state management
import { useSystemUsersState } from '../dataControl/SystemUsersStateManager';

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

import {IntepratePageManifestEvent} from '../../pagemanifest/dataControl/PageManifestRequestHandler';
import PageManifestList from '../../pagemanifest/uiControl/PageManifestList';
import {InteprateUserManifestEvent} from '../../usermanifest/dataControl/UserManifestRequestHandler';
import UserManifestList from '../../usermanifest/uiControl/UserManifestList';
import PageManifestProfile from '../../pagemanifest/uiControl/PageManifestProfile';
import UserManifestProfile from '../../usermanifest/uiControl/UserManifestProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from page_manifest_-automapper.jsx
import {
  viewPageManifest
} from '../../pagemanifest/logicControl/page_manifest_-automapper';

// Imports from user_manifest_-automapper.jsx
import {
  viewUserManifest
} from '../../usermanifest/logicControl/user_manifest_-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_SYSTEM_USERS";

//live data detial / profile component

export default function SystemUsersProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="SystemUsersMainProfilePage",
    parentProfileItemId = "SystemUsersProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage SystemUsers states
  const [stateItem, stateItemSetters] = useSystemUsersState(settersOverrides);
  const system_usersNode = stateItem.systemUsersNode
  
  // -- basic states --//
  const paramSystemUsersUptoken  = stateItem.systemUsersUptoken
  const systemUsersActionStatus = stateItem.systemUsersActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setSystemUsersNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postSystemUsersFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateSystemUsersFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postSystemUsersFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("SystemUsersProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    systemUsersProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setPageManifestCustomProfileQuery Script
  const setPageManifestCustomProfileQuery = stateItemSetters.setPageManifestCustomProfileQuery;
  const pageManifestCustomProfileQuery =  stateItem.pageManifestCustomProfileQuery;
  
  useEffect(() => {
    if (system_usersNode?.primkey && setPageManifestCustomProfileQuery) {
      
      const query = {projectId:btoa(system_usersNode?.project_id)    };
      
      const tokenUrl = mosyUrlParam("page_manifest__dataNode")
      
      if(!tokenUrl)
      {
        setPageManifestCustomProfileQuery(query);
      }
      
    }
  }, [system_usersNode, setPageManifestCustomProfileQuery]);
  
  //setUserManifestCustomProfileQuery Script
  const setUserManifestCustomProfileQuery = stateItemSetters.setUserManifestCustomProfileQuery;
  const userManifestCustomProfileQuery =  stateItem.userManifestCustomProfileQuery;
  
  useEffect(() => {
    if (system_usersNode?.primkey && setUserManifestCustomProfileQuery) {
      
      const query = {userId:btoa(system_usersNode?.record_id)        };
      
      const tokenUrl = mosyUrlParam("user_manifest__dataNode")
      
      if(!tokenUrl)
      {
        setUserManifestCustomProfileQuery(query);
      }
      
    }
  }, [system_usersNode, setUserManifestCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="SystemUsersProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postSystemUsersFormData} encType="multipart/form-data" id="system_users_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  system_usersNode?.primkey ? (
                    
                    <span>{`System Users / ${system_usersNode?.email}`}</span>
                    
                  ) : customProfileData?.SystemUsersTitle ? (
                    
                    <span>{customProfileData.SystemUsersTitle}</span>
                    
                  ) : (
                    
                    <span>New System Users</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramSystemUsersUptoken && (
                    <DeleteButton
                    src="SystemUsersMainProfilePage"
                    tableName="system_users"
                    uptoken={paramSystemUsersUptoken}
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
                
                
                
                {paramSystemUsersUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="SystemUsersProfile"
                  action="view_project_pages_profile_action_btn"
                  label="View Project Pages"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewPageManifest({childCol:`projectId`,parentColVal:system_usersNode.project_id,parentName:system_usersNode.name})
                    
                  }}
                  />
                  <MosyActionButton
                  source="SystemUsersProfile"
                  action="view_user_access_profile_action_btn"
                  label="View User Access"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewUserManifest({childCol:`userId`,parentColVal:system_usersNode.record_id,parentName:system_usersNode.name})
                    
                  }}
                  />
                </>
              )}
              
              {paramSystemUsersUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="SystemUsersMainProfilePage"
                tableName="system_users"
                uptoken={paramSystemUsersUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="SystemUsersMainProfilePage"
                tableName="system_users"
                link="./profile"
                label="New System Users"
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
                  module="system_users"
                  field="name"
                  label="Name"
                  value={system_usersNode?.name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="email"
                  label="Email"
                  value={system_usersNode?.email || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="tel"
                  label="Tel"
                  value={system_usersNode?.tel || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="login_password"
                  label="Login Password"
                  value={system_usersNode?.login_password || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="password"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="ref_id"
                  label="Ref Id"
                  value={system_usersNode?.ref_id || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="regdate"
                  label="Regdate"
                  value={system_usersNode?.regdate || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="user_no"
                  label="User No"
                  value={system_usersNode?.user_no || ""}
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
                  module="system_users"
                  field="user_pic"
                  label="User Pic"
                  value={system_usersNode?.user_pic || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="user_gender"
                  label="User Gender"
                  value={system_usersNode?.user_gender || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="last_seen"
                  label="Last Seen"
                  value={system_usersNode?.last_seen || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="about"
                  label="About"
                  value={system_usersNode?.about || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="auth_token"
                  label="Auth Token"
                  value={system_usersNode?.auth_token || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="token_status"
                  label="Token Status"
                  value={system_usersNode?.token_status || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_users"
                  field="token_expiring_in"
                  label="Token Expiring In"
                  value={system_usersNode?.token_expiring_in || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.pagemanifest.base}
                  tblName="page_manifest_"
                  parentTable="system_users"
                  inputName="_page_manifest__page_url_project_id"
                  hiddenInputName="project_id"
                  valueField="project_id"
                  displayField="page_url"
                  label="Page Url"
                  defaultValue={{ project_id: system_usersNode?.project_id || "", page_url: system_usersNode?._page_manifest__page_url_project_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.project_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <MosySmartField
                  module="system_users"
                  field="project_name"
                  label="Project Name"
                  value={system_usersNode?.project_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">User Role</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.systemusers.base}
                    idField="primkey"
                    labelField="user_role"
                    inputName="user_role"
                    label="User Role"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={system_usersNode?.user_role || ""}
                    />
                  </div>
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="SystemUsersMainProfilePage"
                  tblName="system_users"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="system_users_dataNode" name="system_users_dataNode" value={paramSystemUsersUptoken}/>
              <input type="hidden" id="system_users_mosy_action" name="system_users_mosy_action" value={systemUsersActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {system_usersNode?.primkey && (
            <MosyProfileSection
            title={`Project Pages`}
            source="system_users_PageManifestProfile"
            component={PageManifestProfile}
            table="system_users"
            key={`PageManifestProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : pageManifestCustomProfileQuery,
              hostParent : "SystemUsersProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _system_users_name_project_id:system_usersNode?.name,
                project_id:system_usersNode?.project_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: IntepratePageManifestEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          {system_usersNode?.primkey && (
            <MosyProfileSection
            title={`User Access`}
            source="system_users_UserManifestProfile"
            component={UserManifestProfile}
            table="system_users"
            key={`UserManifestProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : userManifestCustomProfileQuery,
              hostParent : "SystemUsersProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _system_users_name_user_id:system_usersNode?.name,
                user_id:system_usersNode?.record_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateUserManifestEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {system_usersNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../pagemanifest/list?system_users_mosyfilter=${btoa(`{projectId:btoa(system_usersNode?.project_id)    }`)}`}
            title={`Project Pages`}
            source="system_users_PageManifestList"
            component={PageManifestList}
            table="system_users"
            key={`PageManifestList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {projectId:btoa(system_usersNode?.project_id)    },
              customProfilePath:"../pagemanifest/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: IntepratePageManifestEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          )}
          
          {system_usersNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../usermanifest/list?system_users_mosyfilter=${btoa(`{userId:btoa(system_usersNode?.record_id)        }`)}`}
            title={`User Access`}
            source="system_users_UserManifestList"
            component={UserManifestList}
            table="system_users"
            key={`UserManifestList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {userId:btoa(system_usersNode?.record_id)        },
              customProfilePath:"../usermanifest/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateUserManifestEvent,
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

