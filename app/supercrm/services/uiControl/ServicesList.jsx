'use client';
//React
import { useEffect, useState ,Fragment } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';


//print utils
import { exportTableToExcel } from '../../../MosyUtils/exportToExcel';
import { mosyPrintToPdf } from '../../../MosyUtils/hiveUtils';


//access control
import {MosyAccessControl} from "../../UiControl/MosyAccessControl"
import {MosyUIGuard } from "../../UiControl/MosyUiGuard"
import { MosySecureFilterEngine  } from "../../DataControl/MosyFilterEngine";
import { mosyBtoa, mosyUpdateUrlParam } from "../../../MosyUtils/hiveUtils";



//custom utils
import { deleteUrlParam, magicTrimText, mosyUrlParam, mosyFormatDateOnly , mosyFormatDateTime, mosyTonum , mosyToggleSelectAllTblRows , mosySelectTblRows } from '../../../MosyUtils/hiveUtils';
import { mosyFilterUrl } from '../../DataControl/MosyFilterEngine';

//list components
import {
  MosySmartDropdownActions,
  AddNewButton,
  MosyActionButton,
  MosyGridRowOptions,
  MosyPaginationUi,
  DeleteButton,
  MosyImageViewer
} from '../../UiControl/componentControl';

import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//data
import { loadServicesListData, popDeleteDialog, InteprateServicesEvent  } from '../dataControl/ServicesRequestHandler';

//state management
import { useServicesState } from '../dataControl/ServicesStateManager';

import logo from '../../../img/logo/logo.png'; // outside public!

//large text
import ReactMarkdown from 'react-markdown';

//routes manager
///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

//custom fuctions
//import {  } from '../../AppCore/coreUtils';

// Use default base root (/)
const apiRoutes = getApiRoutes();
// ════════════════════════════════════════════════════════════════
// LIST PAGE FUNCTION IMPORTS
// ════════════════════════════════════════════════════════════════
// Imports from recurring-services.jsx
import {
  filterRecurringServices
} from '../logicControl/recurring-services';

// Imports from one-time-services.jsx
import {
  filterOneTimeServices
} from '../logicControl/one-time-services';

// Imports from service_categories-automapper.jsx
import {
  viewServiceCategories
} from '../../servicecategories/logicControl/service_categories-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_SERVICES";

//live data list component

export default function ServicesList({ dataIn = {}, dataOut = {} }) {
  
  //incoming data in from parent
  const {
    customQueryStr = "",
    customProfilePath="./profile",
    showDataControlSections = true,
    parentUseEffectKey = "",
    parentStateSetters=null,
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey}
  
  //manage Services states
  const [stateItem, stateItemSetters] = useServicesState(settersOverrides);
  
  const localEventSignature = stateItem.localEventSignature
  const snackMessage = stateItem.snackMessage
  const snackOnDone = stateItem.snackOnDone
  
  //use route navigation system if need be
  const router = useRouter();
  
  useEffect(() => {
    
    const snackUrlAlert = mosyUrlParam("snack_alert")
    if(snackUrlAlert)
    {
      stateItemSetters.setSnackMessage(snackUrlAlert)
    }
    
    const customFilter = {
      
      ...customQueryStr,
      ...MosySecureFilterEngine("services"),
      
    }
    
    
    loadServicesListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute service_price totals
  const sumservices_service_price = stateItem.servicesListData?.reduce(
    (sum, row) => sum + Number(row.service_price || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qservices_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"services", keyword:stateItem.servicesQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_services"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setServicesQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qservices_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qservices")
      deleteUrlParam("services_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_services"
      ).value = "";
      
      //refresh list
      loadServicesListData(customQueryStr, stateItemSetters);
      
    }
    
    //refresh sign
    stateItemSetters.setLocalEventSignature(Date.now())
    
  }
  
  
  //access control managemant
  const [allowed, setAllowed] = useState(null);
  
  useEffect(() => {
    setAllowed(MosyAccessControl(MOSY_ACCESS_KEY));
  }, []);
  
  if (allowed === null) return null;
  if (!allowed) return <MosyUIGuard />;
  
  return (
    
    <div className={`col-md-12  p-0 m-0  ${showDataControlSections && ("main_list_container")}  `} style={{marginTop: "0px", paddingBottom: "0px"}}>
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"services", keyword:stateItem.servicesQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Services </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_services" name="txt_services" className="custom-search-input form-control" placeholder="Search in Services "
          onChange={(e) => stateItemSetters.setServicesQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qservices_btn" name="qservices_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="ServicesProfile"
            action="services_DataMapQCol_filterRecurringServices_btn"
            label="Recurring Services"
            icon="refresh-cw"
            
            onClick={()=>{
              
              filterRecurringServices({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "billingType",
                
                colVal: "Recurring",
                
                tableName: "services",
                
              })
              
            }}
            />
            <MosyActionButton
            source="ServicesProfile"
            action="services_DataMapQCol_filterOneTimeServices_btn"
            label="One Time Services"
            icon="credit-card"
            
            onClick={()=>{
              
              filterOneTimeServices({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "billingType",
                
                colVal: "One Time",
                
                tableName: "services",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="ServicesList" link={customProfilePath} label="New Services" icon="plus-circle" />
            <div
            className="cpointer medium_btn border border_set btn-white hive_list_nav_refresh ml-3"
            
            onClick={() => moduleFilterManager("refresh")}
            >
            <i className="fa fa-refresh mr-1"></i> Refresh
          </div>
        </div>
      </div>
    </div> )}
    
    
    <div className="table-responsive  data-tables bottom_tbl_handler">
      
      
      <div className="text-left m-0 p-0 col-md-12">
        <div className="ml-2 cpointer badge btn_neo p-2 rounded badge-primary mb-3 tbl_print_btn"
        onClick={() => {mosyPrintToPdf({elemId : "services_print_card", defaultTitle:"Services"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("services_data_table", "Services.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="services_print_card">
    <table className="table table-hover  text-left printTarget" id="services_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          <th>Service Image</th>
          <th scope="col"><b>Service Name</b></th>
          <th scope="col"><b>Service Code</b></th>
          <th scope="col"><b>Undefined</b></th>
          <th scope="col"><b>Service Description</b></th>
          <th scope="col"><b>Service Price</b></th>
          <th scope="col"><b>Estimated Duration</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.servicesLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="7" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Services ...</h5>
            </td>
          </tr>
        ) : stateItem.servicesListData?.length > 0 ? (
          stateItem.servicesListData.map((listservices_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listservices_result.primkey}`}>
                <tr key={listservices_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listservices_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="services"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listservices_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="ServicesList"
                          action="_category_details"
                          label=" Category Details"
                          icon="list "
                          dataIn={() => viewServiceCategories({childCol:`recordId`,parentColVal:listservices_result.service_category_id,parentName:listservices_result.service_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <MosyImageViewer
                      media={`/api/mediaroom?media=${btoa((listservices_result.service_image || ""))}`}
                      mediaRoot={""}
                      defaultLogo={logo.src}
                      imageClass="small_thumbnail"
                      />
                    </td>
                    <td scope="col"><span title={listservices_result.service_name}>{magicTrimText(listservices_result.service_name, 70)}</span></td>
                    <td scope="col"><span title={listservices_result.service_code}>{magicTrimText(listservices_result.service_code, 70)}</span></td>
                    <td scope="col"><span title={listservices_result.service_category_id}>{magicTrimText(listservices_result._service_categories_undefined_service_category_id, 70)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listservices_result.service_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    <td scope="col"><span>{mosyTonum(listservices_result.service_price)}</span></td>
                    <td scope="col"><span title={listservices_result.estimated_duration}>{magicTrimText(listservices_result.estimated_duration, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no services records found</h6>
                  
                  <AddNewButton src="ServicesList"  link={customProfilePath} label="New Services" icon="plus-circle" />
                  <div className="col-md-12 pt-5 " id=""></div>
                </div>
              </td></tr>
              
            )}
            
            <tr className="bg-light">
              <th></th>
              <th></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b><span>{mosyTonum(sumservices_service_price)}</span></b></th>
              <th scope="col"><b></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="ServicesList"
      tblName="services"
      totalPages={stateItem.servicesListPageCount}
      stateItemSetters={stateItemSetters}
      />
    </div>
    
    
  </form>
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
  </div>
);

}

