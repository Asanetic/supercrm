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
import { loadInvoicesListData, popDeleteDialog, InteprateInvoicesEvent  } from '../dataControl/InvoicesRequestHandler';

//state management
import { useInvoicesState } from '../dataControl/InvoicesStateManager';

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
// Imports from pending-invoices.jsx
import {
  filterPendingInvoices
} from '../logicControl/pending-invoices';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from quotations-automapper.jsx
import {
  viewQuotations
} from '../../quotations/logicControl/quotations-automapper';

// Imports from invoice_items-automapper.jsx
import {
  viewInvoiceItems
} from '../../invoiceitems/logicControl/invoice_items-automapper';

// Imports from payments-automapper.jsx
import {
  viewPayments
} from '../../payments/logicControl/payments-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_INVOICES";

//live data list component

export default function InvoicesList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage Invoices states
  const [stateItem, stateItemSetters] = useInvoicesState(settersOverrides);
  
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
      ...MosySecureFilterEngine("invoices"),
      
    }
    
    
    loadInvoicesListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute invoice_amount totals
  const suminvoices_invoice_amount = stateItem.invoicesListData?.reduce(
    (sum, row) => sum + Number(row.invoice_amount || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qinvoices_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"invoices", keyword:stateItem.invoicesQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_invoices"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setInvoicesQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qinvoices_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qinvoices")
      deleteUrlParam("invoices_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_invoices"
      ).value = "";
      
      //refresh list
      loadInvoicesListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"invoices", keyword:stateItem.invoicesQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Invoices </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_invoices" name="txt_invoices" className="custom-search-input form-control" placeholder="Search in Invoices "
          onChange={(e) => stateItemSetters.setInvoicesQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qinvoices_btn" name="qinvoices_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="InvoicesProfile"
            action="invoices_DataMapQCol_filterPendingInvoices_btn"
            label="Pending Invoices"
            icon="clock"
            
            onClick={()=>{
              
              filterPendingInvoices({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "invoiceStatus",
                
                colVal: "Pending",
                
                tableName: "invoices",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="InvoicesList" link={customProfilePath} label="New Invoices" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "invoices_print_card", defaultTitle:"Invoices"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("invoices_data_table", "Invoices.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="invoices_print_card">
    <table className="table table-hover  text-left printTarget" id="invoices_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Invoice Number</b></th>
          <th scope="col"><b>Invoice title </b></th>
          <th scope="col"><b>Invoice Description</b></th>
          <th scope="col"><b>Client Id</b></th>
          <th scope="col"><b>Deal Id</b></th>
          <th scope="col"><b>Quotation Id</b></th>
          <th scope="col"><b>Invoice Amount</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.invoicesLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Invoices ...</h5>
            </td>
          </tr>
        ) : stateItem.invoicesListData?.length > 0 ? (
          stateItem.invoicesListData.map((listinvoices_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listinvoices_result.primkey}`}>
                <tr key={listinvoices_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listinvoices_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="invoices"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listinvoices_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="InvoicesList"
                          action="_client_details"
                          label=" Client Details"
                          icon="list "
                          dataIn={() => viewClients({childCol:`recordId`,parentColVal:listinvoices_result.client_id,parentName:listinvoices_result.invoice_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="InvoicesList"
                          action="_deal_details"
                          label=" Deal Details"
                          icon="list "
                          dataIn={() => viewDeals({childCol:`recordId`,parentColVal:listinvoices_result.deal_id,parentName:listinvoices_result.invoice_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="InvoicesList"
                          action="_quotation_details"
                          label=" Quotation Details"
                          icon="list "
                          dataIn={() => viewQuotations({childCol:`recordId`,parentColVal:listinvoices_result.quotation_id,parentName:listinvoices_result.invoice_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="InvoicesList"
                          action="_invoice_items"
                          label=" Invoice Items"
                          icon="list "
                          dataIn={() => viewInvoiceItems({childCol:`invoiceId`,parentColVal:listinvoices_result.record_id,parentName:listinvoices_result.invoice_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="InvoicesList"
                          action="_payments"
                          label=" Payments"
                          icon="list "
                          dataIn={() => viewPayments({childCol:`invoiceId`,parentColVal:listinvoices_result.record_id,parentName:listinvoices_result.invoice_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listinvoices_result.invoice_number}>{magicTrimText(listinvoices_result.invoice_number, 70)}</span></td>
                    <td scope="col"><span title={listinvoices_result.invoice_title}>{magicTrimText(listinvoices_result.invoice_title, 70)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listinvoices_result.invoice_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    <td scope="col"><span title={listinvoices_result.client_id}>{magicTrimText(listinvoices_result._clients_full_name_client_id, 70)}</span></td>
                    <td scope="col"><span title={listinvoices_result.deal_id}>{magicTrimText(listinvoices_result._deals_deal_title_deal_id, 70)}</span></td>
                    <td scope="col"><span title={listinvoices_result.quotation_id}>{magicTrimText(listinvoices_result._quotations_quotation_title_quotation_id, 70)}</span></td>
                    <td scope="col"><span>{mosyTonum(listinvoices_result.invoice_amount)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no invoices records found</h6>
                  
                  <AddNewButton src="InvoicesList"  link={customProfilePath} label="New Invoices" icon="plus-circle" />
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
              <th scope="col"><b><span>{mosyTonum(suminvoices_invoice_amount)}</span></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="InvoicesList"
      tblName="invoices"
      totalPages={stateItem.invoicesListPageCount}
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

