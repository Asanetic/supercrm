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
import { loadSmartPaymentRequestsListData, popDeleteDialog, InteprateSmartPaymentRequestsEvent  } from '../dataControl/SmartPaymentRequestsRequestHandler';

//state management
import { useSmartPaymentRequestsState } from '../dataControl/SmartPaymentRequestsStateManager';

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
export const MOSY_ACCESS_KEY = "VIEW_SMART_PAYMENT_REQUESTS";

//live data list component

export default function SmartPaymentRequestsList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage SmartPaymentRequests states
  const [stateItem, stateItemSetters] = useSmartPaymentRequestsState(settersOverrides);
  
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
      ...MosySecureFilterEngine("smart_payment_requests"),
      
    }
    
    
    loadSmartPaymentRequestsListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qsmart_payment_requests_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"smart_payment_requests", keyword:stateItem.smartPaymentRequestsQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_smart_payment_requests"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setSmartPaymentRequestsQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qsmart_payment_requests_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qsmart_payment_requests")
      deleteUrlParam("smart_payment_requests_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_smart_payment_requests"
      ).value = "";
      
      //refresh list
      loadSmartPaymentRequestsListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"smart_payment_requests", keyword:stateItem.smartPaymentRequestsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Smart Payment Requests </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_smart_payment_requests" name="txt_smart_payment_requests" className="custom-search-input form-control" placeholder="Search in Smart Payment Requests "
          onChange={(e) => stateItemSetters.setSmartPaymentRequestsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qsmart_payment_requests_btn" name="qsmart_payment_requests_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            
            
            <AddNewButton src="SmartPaymentRequestsList" link={customProfilePath} label="New Smart Payment Requests" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "smart_payment_requests_print_card", defaultTitle:"Smart Payment Requests"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("smart_payment_requests_data_table", "Smart Payment Requests.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="smart_payment_requests_print_card">
    <table className="table table-hover  text-left printTarget" id="smart_payment_requests_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Request Reference</b></th>
          <th scope="col"><b>Request Title</b></th>
          <th scope="col"><b>Related Module</b></th>
          <th scope="col"><b>Related Record Id</b></th>
          <th scope="col"><b>Payer Name</b></th>
          <th scope="col"><b>Payer Phone</b></th>
          <th scope="col"><b>Payer Email</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.smartPaymentRequestsLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Smart Payment Requests ...</h5>
            </td>
          </tr>
        ) : stateItem.smartPaymentRequestsListData?.length > 0 ? (
          stateItem.smartPaymentRequestsListData.map((listsmart_payment_requests_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listsmart_payment_requests_result.primkey}`}>
                <tr key={listsmart_payment_requests_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listsmart_payment_requests_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="smart_payment_requests"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listsmart_payment_requests_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listsmart_payment_requests_result.request_reference}>{magicTrimText(listsmart_payment_requests_result.request_reference, 70)}</span></td>
                    <td scope="col"><span title={listsmart_payment_requests_result.request_title}>{magicTrimText(listsmart_payment_requests_result.request_title, 70)}</span></td>
                    <td scope="col"><span title={listsmart_payment_requests_result.related_module}>{magicTrimText(listsmart_payment_requests_result.related_module, 70)}</span></td>
                    <td scope="col"><span title={listsmart_payment_requests_result.related_record_id}>{magicTrimText(listsmart_payment_requests_result.related_record_id, 70)}</span></td>
                    <td scope="col"><span title={listsmart_payment_requests_result.payer_name}>{magicTrimText(listsmart_payment_requests_result.payer_name, 70)}</span></td>
                    <td scope="col"><span title={listsmart_payment_requests_result.payer_phone}>{magicTrimText(listsmart_payment_requests_result.payer_phone, 70)}</span></td>
                    <td scope="col"><span title={listsmart_payment_requests_result.payer_email}>{magicTrimText(listsmart_payment_requests_result.payer_email, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no smart payment requests records found</h6>
                  
                  <AddNewButton src="SmartPaymentRequestsList"  link={customProfilePath} label="New Smart Payment Requests" icon="plus-circle" />
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
      src="SmartPaymentRequestsList"
      tblName="smart_payment_requests"
      totalPages={stateItem.smartPaymentRequestsListPageCount}
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

