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
import { loadSmartMessagesListData, popDeleteDialog, InteprateSmartMessagesEvent  } from '../dataControl/SmartMessagesRequestHandler';

//state management
import { useSmartMessagesState } from '../dataControl/SmartMessagesStateManager';

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
// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from leads-automapper.jsx
import {
  viewLeads
} from '../../leads/logicControl/leads-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_SMART_MESSAGES";

//live data list component

export default function SmartMessagesList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage SmartMessages states
  const [stateItem, stateItemSetters] = useSmartMessagesState(settersOverrides);
  
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
      ...MosySecureFilterEngine("smart_messages"),
      
    }
    
    
    loadSmartMessagesListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qsmart_messages_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"smart_messages", keyword:stateItem.smartMessagesQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_smart_messages"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setSmartMessagesQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qsmart_messages_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qsmart_messages")
      deleteUrlParam("smart_messages_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_smart_messages"
      ).value = "";
      
      //refresh list
      loadSmartMessagesListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"smart_messages", keyword:stateItem.smartMessagesQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Smart Messages </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_smart_messages" name="txt_smart_messages" className="custom-search-input form-control" placeholder="Search in Smart Messages "
          onChange={(e) => stateItemSetters.setSmartMessagesQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qsmart_messages_btn" name="qsmart_messages_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            
            
            <AddNewButton src="SmartMessagesList" link={customProfilePath} label="New Smart Messages" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "smart_messages_print_card", defaultTitle:"Smart Messages"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("smart_messages_data_table", "Smart Messages.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="smart_messages_print_card">
    <table className="table table-hover  text-left printTarget" id="smart_messages_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Message Number</b></th>
          <th scope="col"><b>Related Record Id</b></th>
          <th scope="col"><b>Recipient Name</b></th>
          <th scope="col"><b>Recipient Phone</b></th>
          <th scope="col"><b>Recipient Email</b></th>
          <th scope="col"><b>Message Channel</b></th>
          <th scope="col"><b>Message Subject</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.smartMessagesLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Smart Messages ...</h5>
            </td>
          </tr>
        ) : stateItem.smartMessagesListData?.length > 0 ? (
          stateItem.smartMessagesListData.map((listsmart_messages_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listsmart_messages_result.primkey}`}>
                <tr key={listsmart_messages_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listsmart_messages_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="smart_messages"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listsmart_messages_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="SmartMessagesList"
                          action="_clients"
                          label=" Clients"
                          icon="list "
                          dataIn={() => viewClients({childCol:`recordId`,parentColVal:listsmart_messages_result.related_record_id,parentName:listsmart_messages_result.recipient_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="SmartMessagesList"
                          action="_leads"
                          label=" Leads"
                          icon="list "
                          dataIn={() => viewLeads({childCol:`recordId`,parentColVal:listsmart_messages_result.related_record_id,parentName:listsmart_messages_result.recipient_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listsmart_messages_result.message_number}>{magicTrimText(listsmart_messages_result.message_number, 70)}</span></td>
                    <td scope="col"><span title={listsmart_messages_result.related_record_id}>{magicTrimText(listsmart_messages_result._leads_full_name_related_record_id, 70)}</span></td>
                    <td scope="col"><span title={listsmart_messages_result.recipient_name}>{magicTrimText(listsmart_messages_result.recipient_name, 70)}</span></td>
                    <td scope="col"><span title={listsmart_messages_result.recipient_phone}>{magicTrimText(listsmart_messages_result.recipient_phone, 70)}</span></td>
                    <td scope="col"><span title={listsmart_messages_result.recipient_email}>{magicTrimText(listsmart_messages_result.recipient_email, 70)}</span></td>
                    <td scope="col"><span title={listsmart_messages_result.message_channel}>{magicTrimText(listsmart_messages_result.message_channel, 70)}</span></td>
                    <td scope="col"><span title={listsmart_messages_result.message_subject}>{magicTrimText(listsmart_messages_result.message_subject, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no smart messages records found</h6>
                  
                  <AddNewButton src="SmartMessagesList"  link={customProfilePath} label="New Smart Messages" icon="plus-circle" />
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
      src="SmartMessagesList"
      tblName="smart_messages"
      totalPages={stateItem.smartMessagesListPageCount}
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

