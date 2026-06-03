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
import { intepratePageManifestFormAction, pageManifestProfileData , popDeleteDialog, IntepratePageManifestEvent } from '../dataControl/PageManifestRequestHandler';

//state management
import { usePageManifestState } from '../dataControl/PageManifestStateManager';

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

import {InteprateSystemUsersEvent} from '../../systemusers/dataControl/SystemUsersRequestHandler';
import SystemUsersList from '../../systemusers/uiControl/SystemUsersList';
import SystemUsersProfile from '../../systemusers/uiControl/SystemUsersProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from system_users-automapper.jsx
import {
  viewSystemUsers
} from '../../systemusers/logicControl/system_users-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_PAGE_MANIFEST_";

//live data detial / profile component

export default function PageManifestProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="PageManifestMainProfilePage",
    parentProfileItemId = "PageManifestProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage PageManifest states
  const [stateItem, stateItemSetters] = usePageManifestState(settersOverrides);
  const page_manifest_Node = stateItem.pageManifestNode
  
  // -- basic states --//
  const paramPageManifestUptoken  = stateItem.pageManifestUptoken
  const pageManifestActionStatus = stateItem.pageManifestActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setPageManifestNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postPageManifestFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    intepratePageManifestFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postPageManifestFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("PageManifestProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    pageManifestProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setSystemUsersCustomProfileQuery Script
  const setSystemUsersCustomProfileQuery = stateItemSetters.setSystemUsersCustomProfileQuery;
  const systemUsersCustomProfileQuery =  stateItem.systemUsersCustomProfileQuery;
  
  useEffect(() => {
    if (page_manifest_Node?.primkey && setSystemUsersCustomProfileQuery) {
      
      const query = {projectId:btoa(page_manifest_Node?.project_id)    };
      
      const tokenUrl = mosyUrlParam("system_users_dataNode")
      
      if(!tokenUrl)
      {
        setSystemUsersCustomProfileQuery(query);
      }
      
    }
  }, [page_manifest_Node, setSystemUsersCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="PageManifestProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postPageManifestFormData} encType="multipart/form-data" id="page_manifest__profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  page_manifest_Node?.primkey ? (
                    
                    <span>{`Page Manifest  / ${page_manifest_Node?.site_id}`}</span>
                    
                  ) : customProfileData?.PageManifestTitle ? (
                    
                    <span>{customProfileData.PageManifestTitle}</span>
                    
                  ) : (
                    
                    <span>New Page Manifest </span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramPageManifestUptoken && (
                    <DeleteButton
                    src="PageManifestMainProfilePage"
                    tableName="page_manifest_"
                    uptoken={paramPageManifestUptoken}
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
                
                
                
                {paramPageManifestUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="PageManifestProfile"
                  action="view_project_users_profile_action_btn"
                  label="View Project Users"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewSystemUsers({childCol:`projectId`,parentColVal:page_manifest_Node.project_id,parentName:page_manifest_Node.page_url})
                    
                  }}
                  />
                </>
              )}
              
              {paramPageManifestUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="PageManifestMainProfilePage"
                tableName="page_manifest_"
                uptoken={paramPageManifestUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="PageManifestMainProfilePage"
                tableName="page_manifest_"
                link="./profile"
                label="New Page Manifest "
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
                  module="page_manifest_"
                  field="page_group"
                  label="Page Group"
                  value={page_manifest_Node?.page_group || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="page_manifest_"
                  field="site_id"
                  label="Site Id"
                  value={page_manifest_Node?.site_id || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="page_manifest_"
                  field="page_url"
                  label="Page Url"
                  value={page_manifest_Node?.page_url || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.systemusers.base}
                  tblName="system_users"
                  parentTable="page_manifest_"
                  inputName="_system_users_name_project_id"
                  hiddenInputName="project_id"
                  valueField="project_id"
                  displayField="name"
                  label="Project Id"
                  defaultValue={{ project_id: page_manifest_Node?.project_id || "", name: page_manifest_Node?._system_users_name_project_id || "" }}
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
                  module="page_manifest_"
                  field="project_name"
                  label="Project Name"
                  value={page_manifest_Node?.project_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="PageManifestMainProfilePage"
                  tblName="page_manifest_"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="page_manifest__dataNode" name="page_manifest__dataNode" value={paramPageManifestUptoken}/>
              <input type="hidden" id="page_manifest__mosy_action" name="page_manifest__mosy_action" value={pageManifestActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {page_manifest_Node?.primkey && (
            <MosyProfileSection
            title={`Project Users`}
            source="page_manifest__SystemUsersProfile"
            component={SystemUsersProfile}
            table="page_manifest_"
            key={`SystemUsersProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : systemUsersCustomProfileQuery,
              hostParent : "PageManifestProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _page_manifest__page_url_project_id:page_manifest_Node?.page_url,
                project_id:page_manifest_Node?.project_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateSystemUsersEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {page_manifest_Node?.primkey && (
            <MosyProfileSection
            viewAllLink={`../systemusers/list?page_manifest__mosyfilter=${btoa(`{projectId:btoa(page_manifest_Node?.project_id)    }`)}`}
            title={`Project Users`}
            source="page_manifest__SystemUsersList"
            component={SystemUsersList}
            table="page_manifest_"
            key={`SystemUsersList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {projectId:btoa(page_manifest_Node?.project_id)    },
              customProfilePath:"../systemusers/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateSystemUsersEvent,
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

