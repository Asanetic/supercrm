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
import { inteprateSystemRoleBundlesFormAction, systemRoleBundlesProfileData , popDeleteDialog, InteprateSystemRoleBundlesEvent } from '../dataControl/SystemRoleBundlesRequestHandler';

//state management
import { useSystemRoleBundlesState } from '../dataControl/SystemRoleBundlesStateManager';

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

import {InteprateUserBundleRoleFunctionsEvent} from '../../userbundlerolefunctions/dataControl/UserBundleRoleFunctionsRequestHandler';
import UserBundleRoleFunctionsList from '../../userbundlerolefunctions/uiControl/UserBundleRoleFunctionsList';
import UserBundleRoleFunctionsProfile from '../../userbundlerolefunctions/uiControl/UserBundleRoleFunctionsProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from user_bundle_role_functions-automapper.jsx
import {
  viewUserBundleRoleFunctions
} from '../../userbundlerolefunctions/logicControl/user_bundle_role_functions-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_SYSTEM_ROLE_BUNDLES";

//live data detial / profile component

export default function SystemRoleBundlesProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="SystemRoleBundlesMainProfilePage",
    parentProfileItemId = "SystemRoleBundlesProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage SystemRoleBundles states
  const [stateItem, stateItemSetters] = useSystemRoleBundlesState(settersOverrides);
  const system_role_bundlesNode = stateItem.systemRoleBundlesNode
  
  // -- basic states --//
  const paramSystemRoleBundlesUptoken  = stateItem.systemRoleBundlesUptoken
  const systemRoleBundlesActionStatus = stateItem.systemRoleBundlesActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setSystemRoleBundlesNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postSystemRoleBundlesFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateSystemRoleBundlesFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postSystemRoleBundlesFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("SystemRoleBundlesProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    systemRoleBundlesProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setUserBundleRoleFunctionsCustomProfileQuery Script
  const setUserBundleRoleFunctionsCustomProfileQuery = stateItemSetters.setUserBundleRoleFunctionsCustomProfileQuery;
  const userBundleRoleFunctionsCustomProfileQuery =  stateItem.userBundleRoleFunctionsCustomProfileQuery;
  
  useEffect(() => {
    if (system_role_bundlesNode?.primkey && setUserBundleRoleFunctionsCustomProfileQuery) {
      
      const query = {bundleId:btoa(system_role_bundlesNode?.bundle_id)    };
      
      const tokenUrl = mosyUrlParam("user_bundle_role_functions_dataNode")
      
      if(!tokenUrl)
      {
        setUserBundleRoleFunctionsCustomProfileQuery(query);
      }
      
    }
  }, [system_role_bundlesNode, setUserBundleRoleFunctionsCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="SystemRoleBundlesProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postSystemRoleBundlesFormData} encType="multipart/form-data" id="system_role_bundles_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  system_role_bundlesNode?.primkey ? (
                    
                    <span>{`System Role Bundles / ${system_role_bundlesNode?.bundle_name}`}</span>
                    
                  ) : customProfileData?.SystemRoleBundlesTitle ? (
                    
                    <span>{customProfileData.SystemRoleBundlesTitle}</span>
                    
                  ) : (
                    
                    <span>New System Role Bundles</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramSystemRoleBundlesUptoken && (
                    <DeleteButton
                    src="SystemRoleBundlesMainProfilePage"
                    tableName="system_role_bundles"
                    uptoken={paramSystemRoleBundlesUptoken}
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
                
                
                
                {paramSystemRoleBundlesUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="SystemRoleBundlesProfile"
                  action="view_role_functions_profile_action_btn"
                  label="View Role Functions"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewUserBundleRoleFunctions({childCol:`bundleId`,parentColVal:system_role_bundlesNode.bundle_id,parentName:system_role_bundlesNode.bundle_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramSystemRoleBundlesUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="SystemRoleBundlesMainProfilePage"
                tableName="system_role_bundles"
                uptoken={paramSystemRoleBundlesUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="SystemRoleBundlesMainProfilePage"
                tableName="system_role_bundles"
                link="./profile"
                label="New System Role Bundles"
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
                  apiEndpoint={apiRoutes.userbundlerolefunctions.base}
                  tblName="user_bundle_role_functions"
                  parentTable="system_role_bundles"
                  inputName="_user_bundle_role_functions_role_name_bundle_id"
                  hiddenInputName="bundle_id"
                  valueField="bundle_id"
                  displayField="role_name"
                  label="Bundle Id"
                  defaultValue={{ bundle_id: system_role_bundlesNode?.bundle_id || "", role_name: system_role_bundlesNode?._user_bundle_role_functions_role_name_bundle_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.bundle_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <MosySmartField
                  module="system_role_bundles"
                  field="bundle_name"
                  label="Bundle Name"
                  value={system_role_bundlesNode?.bundle_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="system_role_bundles"
                  field="remark"
                  label="Remark"
                  value={system_role_bundlesNode?.remark || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="SystemRoleBundlesMainProfilePage"
                  tblName="system_role_bundles"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="system_role_bundles_dataNode" name="system_role_bundles_dataNode" value={paramSystemRoleBundlesUptoken}/>
              <input type="hidden" id="system_role_bundles_mosy_action" name="system_role_bundles_mosy_action" value={systemRoleBundlesActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {system_role_bundlesNode?.primkey && (
            <MosyProfileSection
            title={`Role Functions`}
            source="system_role_bundles_UserBundleRoleFunctionsProfile"
            component={UserBundleRoleFunctionsProfile}
            table="system_role_bundles"
            key={`UserBundleRoleFunctionsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : userBundleRoleFunctionsCustomProfileQuery,
              hostParent : "SystemRoleBundlesProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _system_role_bundles_bundle_name_bundle_id:system_role_bundlesNode?.bundle_name,
                bundle_id:system_role_bundlesNode?.bundle_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateUserBundleRoleFunctionsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {system_role_bundlesNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../userbundlerolefunctions/list?system_role_bundles_mosyfilter=${btoa(`{bundleId:btoa(system_role_bundlesNode?.bundle_id)    }`)}`}
            title={`Role Functions`}
            source="system_role_bundles_UserBundleRoleFunctionsList"
            component={UserBundleRoleFunctionsList}
            table="system_role_bundles"
            key={`UserBundleRoleFunctionsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {bundleId:btoa(system_role_bundlesNode?.bundle_id)    },
              customProfilePath:"../userbundlerolefunctions/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateUserBundleRoleFunctionsEvent,
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

