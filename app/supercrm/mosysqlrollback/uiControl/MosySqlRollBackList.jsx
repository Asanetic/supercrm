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
import { loadMosySqlRollBackListData, popDeleteDialog, InteprateMosySqlRollBackEvent  } from '../dataControl/MosySqlRollBackRequestHandler';

//state management
import { useMosySqlRollBackState } from '../dataControl/MosySqlRollBackStateManager';

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


//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_MOSY_SQL_ROLL_BACK";

//live data list component

export default function MosySqlRollBackList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage MosySqlRollBack states
  const [stateItem, stateItemSetters] = useMosySqlRollBackState(settersOverrides);
  
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
      ...MosySecureFilterEngine("mosy_sql_roll_back"),
      
    }
    
    
    loadMosySqlRollBackListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qmosy_sql_roll_back_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"mosy_sql_roll_back", keyword:stateItem.mosySqlRollBackQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_mosy_sql_roll_back"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setMosySqlRollBackQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qmosy_sql_roll_back_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qmosy_sql_roll_back")
      deleteUrlParam("mosy_sql_roll_back_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_mosy_sql_roll_back"
      ).value = "";
      
      //refresh list
      loadMosySqlRollBackListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"mosy_sql_roll_back", keyword:stateItem.mosySqlRollBackQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Mosy Sql Roll Back </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_mosy_sql_roll_back" name="txt_mosy_sql_roll_back" className="custom-search-input form-control" placeholder="Search in Mosy Sql Roll Back "
          onChange={(e) => stateItemSetters.setMosySqlRollBackQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qmosy_sql_roll_back_btn" name="qmosy_sql_roll_back_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            
            
            <AddNewButton src="MosySqlRollBackList" link={customProfilePath} label="New Mosy Sql Roll Back" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "mosy_sql_roll_back_print_card", defaultTitle:"Mosy Sql Roll Back"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("mosy_sql_roll_back_data_table", "Mosy Sql Roll Back.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="mosy_sql_roll_back_print_card">
    <table className="table table-hover  text-left printTarget" id="mosy_sql_roll_back_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Table Name</b></th>
          <th scope="col"><b>Roll Type</b></th>
          <th scope="col"><b>Where Str</b></th>
          <th scope="col"><b>Roll Timestamp</b></th>
          <th scope="col"><b>Value Entries</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.mosySqlRollBackLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="6" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Mosy Sql Roll Back ...</h5>
            </td>
          </tr>
        ) : stateItem.mosySqlRollBackListData?.length > 0 ? (
          stateItem.mosySqlRollBackListData.map((listmosy_sql_roll_back_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listmosy_sql_roll_back_result.primkey}`}>
                <tr key={listmosy_sql_roll_back_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listmosy_sql_roll_back_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="mosy_sql_roll_back"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listmosy_sql_roll_back_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listmosy_sql_roll_back_result.table_name}>{magicTrimText(listmosy_sql_roll_back_result.table_name, 70)}</span></td>
                    <td scope="col"><span title={listmosy_sql_roll_back_result.roll_type}>{magicTrimText(listmosy_sql_roll_back_result.roll_type, 70)}</span></td>
                    <td scope="col"><span title={listmosy_sql_roll_back_result.where_str}>{magicTrimText(listmosy_sql_roll_back_result.where_str, 70)}</span></td>
                    <td scope="col"><span title={listmosy_sql_roll_back_result.roll_timestamp}>{magicTrimText(listmosy_sql_roll_back_result.roll_timestamp, 70)}</span></td>
                    <td scope="col"><span title={listmosy_sql_roll_back_result.value_entries}>{magicTrimText(listmosy_sql_roll_back_result.value_entries, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="6" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no mosy sql roll back records found</h6>
                  
                  <AddNewButton src="MosySqlRollBackList"  link={customProfilePath} label="New Mosy Sql Roll Back" icon="plus-circle" />
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
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="MosySqlRollBackList"
      tblName="mosy_sql_roll_back"
      totalPages={stateItem.mosySqlRollBackListPageCount}
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

