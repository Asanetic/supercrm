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
import { inteprateSystemModuleManifestFormAction, systemModuleManifestProfileData , popDeleteDialog, InteprateSystemModuleManifestEvent } from '../dataControl/SystemModuleManifestRequestHandler';

//state management
import { useSystemModuleManifestState } from '../dataControl/SystemModuleManifestStateManager';

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
import PageManifestProfile from '../../pagemanifest/uiControl/PageManifestProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from page_manifest_-automapper.jsx
import {
  viewPageManifest
} from '../../pagemanifest/logicControl/page_manifest_-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_SYSTEM_MODULE_MANIFEST_";

//live data detial / profile component

export default function SystemModuleManifestProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="SystemModuleManifestMainProfilePage",
    parentProfileItemId = "SystemModuleManifestProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage SystemModuleManifest states
  const [stateItem, stateItemSetters] = useSystemModuleManifestState(settersOverrides);
  const system_module_manifest_Node = stateItem.systemModuleManifestNode
  
  // -- basic states --//
  const paramSystemModuleManifestUptoken  = stateItem.systemModuleManifestUptoken
  const systemModuleManifestActionStatus = stateItem.systemModuleManifestActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setSystemModuleManifestNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postSystemModuleManifestFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateSystemModuleManifestFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postSystemModuleManifestFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("SystemModuleManifestProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    systemModuleManifestProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setPageManifestCustomProfileQuery Script
  const setPageManifestCustomProfileQuery = stateItemSetters.setPageManifestCustomProfileQuery;
  const pageManifestCustomProfileQuery =  stateItem.pageManifestCustomProfileQuery;
  
  useEffect(() => {
    if (system_module_manifest_Node?.primkey && setPageManifestCustomProfileQuery) {
      
      const query = {moduleKey:btoa(system_module_manifest_Node?.module_key)    };
      
      const tokenUrl = mosyUrlParam("page_manifest__dataNode")
      
      if(!tokenUrl)
      {
        setPageManifestCustomProfileQuery(query);
      }
      
    }
  }, [system_module_manifest_Node, setPageManifestCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="SystemModuleManifestProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postSystemModuleManifestFormData} encType="multipart/form-data" id="system_module_manifest__profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  system_module_manifest_Node?.primkey ? (
                    
                    <span>{`System Module Manifest  / ${system_module_manifest_Node?.module_key}`}</span>
                    
                  ) : customProfileData?.SystemModuleManifestTitle ? (
                    
                    <span>{customProfileData.SystemModuleManifestTitle}</span>
                    
                  ) : (
                    
                    <span>New System Module Manifest </span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramSystemModuleManifestUptoken && (
                    <DeleteButton
                    src="SystemModuleManifestMainProfilePage"
                    tableName="system_module_manifest_"
                    uptoken={paramSystemModuleManifestUptoken}
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
                
                
                
                {paramSystemModuleManifestUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="SystemModuleManifestProfile"
                  action="view_related_pages_profile_action_btn"
                  label="View Related Pages"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewPageManifest({childCol:`moduleKey`,parentColVal:system_module_manifest_Node.module_key,parentName:system_module_manifest_Node.module_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramSystemModuleManifestUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="SystemModuleManifestMainProfilePage"
                tableName="system_module_manifest_"
                uptoken={paramSystemModuleManifestUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="SystemModuleManifestMainProfilePage"
                tableName="system_module_manifest_"
                link="./profile"
                label="New System Module Manifest "
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
                  module="system_module_manifest_"
                  field="component_name"
                  label="Component Name"
                  value={system_module_manifest_Node?.component_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  <LiveSearchDropdown
                  apiEndpoint={apiRoutes.pagemanifest.base}
                  tblName="page_manifest_"
                  parentTable="system_module_manifest_"
                  inputName="_page_manifest__page_url_module_key"
                  hiddenInputName="module_key"
                  valueField="module_key"
                  displayField="page_url"
                  label="Module Key"
                  defaultValue={{ module_key: system_module_manifest_Node?.module_key || "", page_url: system_module_manifest_Node?._page_manifest__page_url_module_key || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.module_key
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <MosySmartField
                  module="system_module_manifest_"
                  field="module_name"
                  label="Module Name"
                  value={system_module_manifest_Node?.module_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_module_manifest_"
                  field="permission_type"
                  label="Permission Type"
                  value={system_module_manifest_Node?.permission_type || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_module_manifest_"
                  field="capability_key"
                  label="Capability Key"
                  value={system_module_manifest_Node?.capability_key || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_module_manifest_"
                  field="access_name"
                  label="Access Name"
                  value={system_module_manifest_Node?.access_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_module_manifest_"
                  field="relative_path"
                  label="Relative Path"
                  value={system_module_manifest_Node?.relative_path || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="SystemModuleManifestMainProfilePage"
                  tblName="system_module_manifest_"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="system_module_manifest__dataNode" name="system_module_manifest__dataNode" value={paramSystemModuleManifestUptoken}/>
              <input type="hidden" id="system_module_manifest__mosy_action" name="system_module_manifest__mosy_action" value={systemModuleManifestActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {system_module_manifest_Node?.primkey && (
            <MosyProfileSection
            title={`Related Pages`}
            source="system_module_manifest__PageManifestProfile"
            component={PageManifestProfile}
            table="system_module_manifest_"
            key={`PageManifestProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : pageManifestCustomProfileQuery,
              hostParent : "SystemModuleManifestProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _system_module_manifest__module_name_module_key:system_module_manifest_Node?.module_name,
                module_key:system_module_manifest_Node?.module_key
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: IntepratePageManifestEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {system_module_manifest_Node?.primkey && (
            <MosyProfileSection
            viewAllLink={`../pagemanifest/list?system_module_manifest__mosyfilter=${btoa(`{moduleKey:btoa(system_module_manifest_Node?.module_key)    }`)}`}
            title={`Related Pages`}
            source="system_module_manifest__PageManifestList"
            component={PageManifestList}
            table="system_module_manifest_"
            key={`PageManifestList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {moduleKey:btoa(system_module_manifest_Node?.module_key)    },
              customProfilePath:"../pagemanifest/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: IntepratePageManifestEvent,
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

