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
import { loadExpectedRevenueListData, popDeleteDialog, InteprateExpectedRevenueEvent  } from '../dataControl/ExpectedRevenueRequestHandler';

//state management
import { useExpectedRevenueState } from '../dataControl/ExpectedRevenueStateManager';

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
// Imports from client-revenue.jsx
import {
  filterRevenueByClient
} from '../logicControl/client-revenue';

// Imports from deal-revenue.jsx
import {
  filterRevenueByDeal
} from '../logicControl/deal-revenue';

// Imports from status-revenue.jsx
import {
  filterRevenueByStatus
} from '../logicControl/status-revenue';

// Imports from filter-by-month.jsx
import {
  filterRevenueByMonth
} from '../logicControl/filter-by-month';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from payments-automapper.jsx
import {
  viewPayments
} from '../../payments/logicControl/payments-automapper';

// Imports from activities-automapper.jsx
import {
  viewActivities
} from '../../activities/logicControl/activities-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_EXPECTED_REVENUE";

//live data list component

export default function ExpectedRevenueList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage ExpectedRevenue states
  const [stateItem, stateItemSetters] = useExpectedRevenueState(settersOverrides);
  
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
      ...MosySecureFilterEngine("expected_revenue"),
      
    }
    
    
    loadExpectedRevenueListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute expected_amount totals
  const sumexpected_revenue_expected_amount = stateItem.expectedRevenueListData?.reduce(
    (sum, row) => sum + Number(row.expected_amount || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qexpected_revenue_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"expected_revenue", keyword:stateItem.expectedRevenueQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_expected_revenue"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setExpectedRevenueQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qexpected_revenue_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qexpected_revenue")
      deleteUrlParam("expected_revenue_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_expected_revenue"
      ).value = "";
      
      //refresh list
      loadExpectedRevenueListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"expected_revenue", keyword:stateItem.expectedRevenueQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Expected Revenue </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_expected_revenue" name="txt_expected_revenue" className="custom-search-input form-control" placeholder="Search in Expected Revenue "
          onChange={(e) => stateItemSetters.setExpectedRevenueQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qexpected_revenue_btn" name="qexpected_revenue_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="ExpectedRevenueProfile"
            action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
            label="Filter By Client"
            icon="building"
            
            onClick={()=>{
              
              filterRevenueByClient({
                
                title : "Filter by client",
                customQueryStr : customQueryStr,
                stateItemSetters : stateItemSetters,
                parentColName : "record_id",
                childColName : "client_id",
                displayField : "full_name",
                parentTableName : "clients",
                childTableName : "expected_revenue"
                
              })
              
            }}
            />
            <MosyActionButton
            source="ExpectedRevenueProfile"
            action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
            label="Filter By Deal"
            icon="briefcase"
            
            onClick={()=>{
              
              filterRevenueByDeal({
                
                title : "Filter by deal",
                customQueryStr : customQueryStr,
                stateItemSetters : stateItemSetters,
                parentColName : "record_id",
                childColName : "deal_id",
                displayField : "deal_title",
                parentTableName : "deals",
                childTableName : "expected_revenue"
                
              })
              
            }}
            />
            <MosyActionButton
            source="ExpectedRevenueProfile"
            action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
            label="Filter By Status"
            icon="list-alt"
            
            onClick={()=>{
              
              filterRevenueByStatus({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                title: "Filter by status",
                
                parentColName: "payment_status",
                
                parentTableName: "expected_revenue",
                
              })
              
            }}
            />
            <MosyActionButton
            source="ExpectedRevenueProfile"
            action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
            label="Filter By Month"
            icon="calendar"
            
            onClick={()=>{
              
              filterRevenueByMonth({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                title: "Filter by Month",
                
                parentColName: "revenue_month",
                
                parentTableName: "expected_revenue",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="ExpectedRevenueList" link={customProfilePath} label="New Expected Revenue" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "expected_revenue_print_card", defaultTitle:"Expected Revenue"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("expected_revenue_data_table", "Expected Revenue.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="expected_revenue_print_card">
    <table className="table table-hover  text-left printTarget" id="expected_revenue_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Revenue Month</b></th>
          <th scope="col"><b>Client Id</b></th>
          <th scope="col"><b>Deal Id</b></th>
          <th scope="col"><b>Expected Amount</b></th>
          <th scope="col"><b>Currency Code</b></th>
          <th scope="col"><b>Payment Status</b></th>
          <th scope="col"><b>Payment Ref No</b></th>
          <th scope="col"><b>Name</b></th>
          <th scope="col"><b>Tel</b></th>
          <th scope="col"><b>Email</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.expectedRevenueLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="11" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Expected Revenue ...</h5>
            </td>
          </tr>
        ) : stateItem.expectedRevenueListData?.length > 0 ? (
          stateItem.expectedRevenueListData.map((listexpected_revenue_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listexpected_revenue_result.primkey}`}>
                <tr key={listexpected_revenue_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listexpected_revenue_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="expected_revenue"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listexpected_revenue_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="ExpectedRevenueList"
                          action="_client_details"
                          label=" Client Details"
                          icon="list "
                          dataIn={() => viewClients({childCol:`recordId`,parentColVal:listexpected_revenue_result.client_id,parentName:listexpected_revenue_result.revenue_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ExpectedRevenueList"
                          action="_deal"
                          label=" Deal"
                          icon="list "
                          dataIn={() => viewDeals({childCol:`recordId`,parentColVal:listexpected_revenue_result.deal_id,parentName:listexpected_revenue_result.revenue_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ExpectedRevenueList"
                          action="_invoices"
                          label=" Invoices"
                          icon="list "
                          dataIn={() => viewInvoices({childCol:`recordId`,parentColVal:listexpected_revenue_result.invoice_id,parentName:listexpected_revenue_result.revenue_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ExpectedRevenueList"
                          action="_payments"
                          label=" Payments"
                          icon="list "
                          dataIn={() => viewPayments({childCol:`transactionRef`,parentColVal:listexpected_revenue_result.payment_ref_no,parentName:listexpected_revenue_result.revenue_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ExpectedRevenueList"
                          action="_activities"
                          label=" Activities"
                          icon="list "
                          dataIn={() => viewActivities({childCol:`dealId`,parentColVal:listexpected_revenue_result.record_id,parentName:listexpected_revenue_result.revenue_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listexpected_revenue_result.revenue_month}>{magicTrimText(listexpected_revenue_result.revenue_month, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.client_id}>{magicTrimText(listexpected_revenue_result._clients_full_name_client_id, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.deal_id}>{magicTrimText(listexpected_revenue_result._deals_deal_title_deal_id, 70)}</span></td>
                    <td scope="col"><span>{mosyTonum(listexpected_revenue_result.expected_amount)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.currency_code}>{magicTrimText(listexpected_revenue_result.currency_code, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.payment_status}>{magicTrimText(listexpected_revenue_result.payment_status, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.payment_ref_no}>{magicTrimText(listexpected_revenue_result._payments_transaction_ref_payment_ref_no, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.name}>{magicTrimText(listexpected_revenue_result.name, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.tel}>{magicTrimText(listexpected_revenue_result.tel, 70)}</span></td>
                    <td scope="col"><span title={listexpected_revenue_result.email}>{magicTrimText(listexpected_revenue_result.email, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="11" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no expected revenue records found</h6>
                  
                  <AddNewButton src="ExpectedRevenueList"  link={customProfilePath} label="New Expected Revenue" icon="plus-circle" />
                  <div className="col-md-12 pt-5 " id=""></div>
                </div>
              </td></tr>
              
            )}
            
            <tr className="bg-light">
              <th></th>
              
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b><span>{mosyTonum(sumexpected_revenue_expected_amount)}</span></b></th>
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
      src="ExpectedRevenueList"
      tblName="expected_revenue"
      totalPages={stateItem.expectedRevenueListPageCount}
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

