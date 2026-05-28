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
import { inteprateQuotationItemsFormAction, quotationItemsProfileData , popDeleteDialog, InteprateQuotationItemsEvent } from '../dataControl/QuotationItemsRequestHandler';

//state management
import { useQuotationItemsState } from '../dataControl/QuotationItemsStateManager';

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

import {InteprateQuotationsEvent} from '../../quotations/dataControl/QuotationsRequestHandler';
import QuotationsList from '../../quotations/uiControl/QuotationsList';
import QuotationsProfile from '../../quotations/uiControl/QuotationsProfile';
// ════════════════════════════════════════════════════════════════
// PROFILE PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from quotations-automapper.jsx
import {
  viewQuotations
} from '../../quotations/logicControl/quotations-automapper';



// export profile

//import minilist component manager
import { MosyProfileSection} from '../../UiControl/dataMapUiControl';


///component access control key
export const MOSY_ACCESS_KEY = "MANAGE_QUOTATION_ITEMS";

//live data detial / profile component

export default function QuotationItemsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    backToList="./list",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="QuotationItemsMainProfilePage",
    parentProfileItemId = "QuotationItemsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage QuotationItems states
  const [stateItem, stateItemSetters] = useQuotationItemsState(settersOverrides);
  const quotation_itemsNode = stateItem.quotationItemsNode
  
  // -- basic states --//
  const paramQuotationItemsUptoken  = stateItem.quotationItemsUptoken
  const quotationItemsActionStatus = stateItem.quotationItemsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setQuotationItemsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postQuotationItemsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateQuotationItemsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postQuotationItemsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("QuotationItemsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    quotationItemsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  //setQuotationsCustomProfileQuery Script
  const setQuotationsCustomProfileQuery = stateItemSetters.setQuotationsCustomProfileQuery;
  const quotationsCustomProfileQuery =  stateItem.quotationsCustomProfileQuery;
  
  useEffect(() => {
    if (quotation_itemsNode?.primkey && setQuotationsCustomProfileQuery) {
      
      const query = {recordId:btoa(quotation_itemsNode?.quotation_id)    };
      
      const tokenUrl = mosyUrlParam("quotations_dataNode")
      
      if(!tokenUrl)
      {
        setQuotationsCustomProfileQuery(query);
      }
      
    }
  }, [quotation_itemsNode, setQuotationsCustomProfileQuery]);
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="QuotationItemsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postQuotationItemsFormData} encType="multipart/form-data" id="quotation_items_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                
                {
                  quotation_itemsNode?.primkey ? (
                    
                    <span>{`Quotation Items / ${quotation_itemsNode?.item_type}`}</span>
                    
                  ) : customProfileData?.QuotationItemsTitle ? (
                    
                    <span>{customProfileData.QuotationItemsTitle}</span>
                    
                  ) : (
                    
                    <span>New Quotation Items</span>
                    
                  )}
                  
                </div>
                <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                  {paramQuotationItemsUptoken && (
                    <DeleteButton
                    src="QuotationItemsMainProfilePage"
                    tableName="quotation_items"
                    uptoken={paramQuotationItemsUptoken}
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
                
                
                
                {paramQuotationItemsUptoken && (
                  <>
                  
                  <MosyActionButton
                  source="QuotationItemsProfile"
                  action="view_quotation_details_profile_action_btn"
                  label="View Quotation Details"
                  icon="list"
                  
                  onClick={()=>{
                    
                    viewQuotations({childCol:`recordId`,parentColVal:quotation_itemsNode.quotation_id,parentName:quotation_itemsNode.item_name})
                    
                  }}
                  />
                </>
              )}
              
              {paramQuotationItemsUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="QuotationItemsMainProfilePage"
                tableName="quotation_items"
                uptoken={paramQuotationItemsUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="QuotationItemsMainProfilePage"
                tableName="quotation_items"
                link="./profile"
                label="New Quotation Items"
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
                  apiEndpoint={apiRoutes.quotations.base}
                  tblName="quotations"
                  parentTable="quotation_items"
                  inputName="_quotations_quotation_title_quotation_id"
                  hiddenInputName="quotation_id"
                  valueField="record_id"
                  displayField="quotation_title"
                  label="Quotation Title"
                  defaultValue={{ record_id: quotation_itemsNode?.quotation_id || "", quotation_title: quotation_itemsNode?._quotations_quotation_title_quotation_id || "" }}
                  onSelect={(id) => console.log("Just the ID:", id)}
                  onSelectFull={(dataRes) =>  console.log("Data seleted")}
                  onInputChange={handleInputChange}
                  defaultColSize={`col-md-4 hive_data_cell  hive_data_cell ${
                    customProfileData?.quotation_id
                    ? 'd-none'
                    : ''
                  }`}
                  context={{hostParent : hostParent}}
                  />
                  
                  <div className="form-group col-md-4 hive_data_cell ">
                    <label className="d-none">Item Type</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.quotationitems.base}
                    idField="primkey"
                    labelField="item_type"
                    inputName="item_type"
                    label="Item Type"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={quotation_itemsNode?.item_type || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="quotation_items"
                  field="item_id"
                  label="Item Id"
                  value={quotation_itemsNode?.item_id || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="title"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="quotation_items"
                  field="item_name"
                  label="Item Name"
                  value={quotation_itemsNode?.item_name || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="quotation_items"
                  field="item_description"
                  label="Item Description"
                  value={quotation_itemsNode?.item_description || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <MosySmartField
                  module="quotation_items"
                  field="item_quantity"
                  label="Item Quantity"
                  value={quotation_itemsNode?.item_quantity || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="quotation_items"
                  field="item_unit_price"
                  label="Item Unit Price"
                  value={quotation_itemsNode?.item_unit_price || ""}
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
                  module="quotation_items"
                  field="item_total_amount"
                  label="Item Total Amount"
                  value={quotation_itemsNode?.item_total_amount || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="quotation_items"
                  field="created_at"
                  label="Created At"
                  value={quotation_itemsNode?.created_at || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="datetime-local"
                  cellOverrides={{additionalClass: "col-md-4 hive_data_cell "}}
                  />
                  
                  
                  <input className="form-control" id="updated_at" name="updated_at" value={quotation_itemsNode?.updated_at || ""} placeholder="Updated At" type="hidden"/>
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="QuotationItemsMainProfilePage"
                  tblName="quotation_items"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="quotation_items_dataNode" name="quotation_items_dataNode" value={paramQuotationItemsUptoken}/>
              <input type="hidden" id="quotation_items_mosy_action" name="quotation_items_mosy_action" value={quotationItemsActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          {quotation_itemsNode?.primkey && (
            <MosyProfileSection
            title={`Quotation Details`}
            source="quotation_items_QuotationsProfile"
            component={QuotationsProfile}
            table="quotation_items"
            key={`QuotationsProfile-${localEventSignature}`}
            dataIn={{
              
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              customQueryStr : quotationsCustomProfileQuery,
              hostParent : "QuotationItemsProfile",
              parentProfileItemId : activeScrollId,
              customProfileData : {
                _quotation_items_item_name_record_id:quotation_itemsNode?.item_name,
                record_id:quotation_itemsNode?.quotation_id
              }
              
            }}
            
            dataOut={{
              
              setChildDataOut: InteprateQuotationsEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
              
            }}
            />
            
          )}
          
          
          {quotation_itemsNode?.primkey && (
            <MosyProfileSection
            viewAllLink={`../quotations/list?quotation_items_mosyfilter=${btoa(`{recordId:btoa(quotation_itemsNode?.quotation_id)    }`)}`}
            title={`Quotation Details`}
            source="quotation_items_QuotationsList"
            component={QuotationsList}
            table="quotation_items"
            key={`QuotationsList-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : {recordId:btoa(quotation_itemsNode?.quotation_id)    },
              customProfilePath:"../quotations/profile"
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateQuotationsEvent,
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

