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
import { loadActivitiesListData, popDeleteDialog, InteprateActivitiesEvent  } from '../dataControl/ActivitiesRequestHandler';

//state management
import { useActivitiesState } from '../dataControl/ActivitiesStateManager';

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
// Imports from pending-activities.jsx
import {
  filterPendingActivities
} from '../logicControl/pending-activities';

// Imports from completed-activities.jsx
import {
  filterCompletedActivities
} from '../logicControl/completed-activities';

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



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_ACTIVITIES";

//live data list component

export default function ActivitiesList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage Activities states
  const [stateItem, stateItemSetters] = useActivitiesState(settersOverrides);
  
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
      ...MosySecureFilterEngine("activities"),
      
    }
    
    
    loadActivitiesListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qactivities_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"activities", keyword:stateItem.activitiesQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_activities"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setActivitiesQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qactivities_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qactivities")
      deleteUrlParam("activities_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_activities"
      ).value = "";
      
      //refresh list
      loadActivitiesListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"activities", keyword:stateItem.activitiesQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Activities </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_activities" name="txt_activities" className="custom-search-input form-control" placeholder="Search in Activities "
          onChange={(e) => stateItemSetters.setActivitiesQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qactivities_btn" name="qactivities_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="ActivitiesProfile"
            action="activities_DataMapQCol_filterPendingActivities_btn"
            label="Pending Activities"
            icon="clock"
            
            onClick={()=>{
              
              filterPendingActivities({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "activityStatus",
                
                colVal: "Pending",
                
                tableName: "activities",
                
              })
              
            }}
            />
            <MosyActionButton
            source="ActivitiesProfile"
            action="activities_DataMapQCol_filterCompletedActivities_btn"
            label="Completed Activities"
            icon="check-circle"
            
            onClick={()=>{
              
              filterCompletedActivities({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "activityStatus",
                
                colVal: "Completed",
                
                tableName: "activities",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="ActivitiesList" link={customProfilePath} label="New Activities" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "activities_print_card", defaultTitle:"Activities"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("activities_data_table", "Activities.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="activities_print_card">
    <table className="table table-hover  text-left printTarget" id="activities_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Client Id</b></th>
          <th scope="col"><b>Deal Id</b></th>
          <th scope="col"><b>Activity Type</b></th>
          <th scope="col"><b>Activity Title</b></th>
          <th scope="col"><b>Activity Description</b></th>
          <th scope="col"><b>Activity Status</b></th>
          <th scope="col"><b>Performed By</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.activitiesLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Activities ...</h5>
            </td>
          </tr>
        ) : stateItem.activitiesListData?.length > 0 ? (
          stateItem.activitiesListData.map((listactivities_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listactivities_result.primkey}`}>
                <tr key={listactivities_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listactivities_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="activities"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listactivities_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="ActivitiesList"
                          action="_client_details"
                          label=" Client Details"
                          icon="list "
                          dataIn={() => viewClients({childCol:`recordId`,parentColVal:listactivities_result.client_id,parentName:listactivities_result.activity_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ActivitiesList"
                          action="_deal_details"
                          label=" Deal Details"
                          icon="list "
                          dataIn={() => viewDeals({childCol:`recordId`,parentColVal:listactivities_result.deal_id,parentName:listactivities_result.activity_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ActivitiesList"
                          action="_performed_by"
                          label=" Performed By"
                          icon="list "
                          dataIn={() => viewUsers({childCol:`recordId`,parentColVal:listactivities_result.performed_by,parentName:listactivities_result.activity_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listactivities_result.client_id}>{magicTrimText(listactivities_result._clients_full_name_client_id, 70)}</span></td>
                    <td scope="col"><span title={listactivities_result.deal_id}>{magicTrimText(listactivities_result._deals_deal_title_deal_id, 70)}</span></td>
                    <td scope="col"><span title={listactivities_result.activity_type}>{magicTrimText(listactivities_result.activity_type, 70)}</span></td>
                    <td scope="col"><span title={listactivities_result.activity_title}>{magicTrimText(listactivities_result.activity_title, 70)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listactivities_result.activity_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    <td scope="col"><span title={listactivities_result.activity_status}>{magicTrimText(listactivities_result.activity_status, 70)}</span></td>
                    <td scope="col"><span title={listactivities_result.performed_by}>{magicTrimText(listactivities_result._users_full_name_performed_by, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no activities records found</h6>
                  
                  <AddNewButton src="ActivitiesList"  link={customProfilePath} label="New Activities" icon="plus-circle" />
                  <div className="col-md-12 pt-5 " id=""></div>
                </div>
              </td></tr>
              
            )}
            
            <tr className="bg-light">
              <th></th>
              
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="ActivitiesList"
      tblName="activities"
      totalPages={stateItem.activitiesListPageCount}
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

