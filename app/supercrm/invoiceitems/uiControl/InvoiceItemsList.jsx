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
import { loadInvoiceItemsListData, popDeleteDialog, InteprateInvoiceItemsEvent  } from '../dataControl/InvoiceItemsRequestHandler';

//state management
import { useInvoiceItemsState } from '../dataControl/InvoiceItemsStateManager';

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
// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from services-automapper.jsx
import {
  viewServices
} from '../../services/logicControl/services-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_INVOICE_ITEMS";

//live data list component

export default function InvoiceItemsList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage InvoiceItems states
  const [stateItem, stateItemSetters] = useInvoiceItemsState(settersOverrides);
  
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
      ...MosySecureFilterEngine("invoice_items"),
      
    }
    
    
    loadInvoiceItemsListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute item_quantity totals
  const suminvoice_items_item_quantity = stateItem.invoiceItemsListData?.reduce(
    (sum, row) => sum + Number(row.item_quantity || 0),
    0
  );
  
  // Compute item_unit_price totals
  const suminvoice_items_item_unit_price = stateItem.invoiceItemsListData?.reduce(
    (sum, row) => sum + Number(row.item_unit_price || 0),
    0
  );
  
  // Compute item_total_amount totals
  const suminvoice_items_item_total_amount = stateItem.invoiceItemsListData?.reduce(
    (sum, row) => sum + Number(row.item_total_amount || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qinvoice_items_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"invoice_items", keyword:stateItem.invoiceItemsQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_invoice_items"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setInvoiceItemsQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qinvoice_items_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qinvoice_items")
      deleteUrlParam("invoice_items_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_invoice_items"
      ).value = "";
      
      //refresh list
      loadInvoiceItemsListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"invoice_items", keyword:stateItem.invoiceItemsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Invoice Items </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_invoice_items" name="txt_invoice_items" className="custom-search-input form-control" placeholder="Search in Invoice Items "
          onChange={(e) => stateItemSetters.setInvoiceItemsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qinvoice_items_btn" name="qinvoice_items_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            
            
            <AddNewButton src="InvoiceItemsList" link={customProfilePath} label="New Invoice Items" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "invoice_items_print_card", defaultTitle:"Invoice Items"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("invoice_items_data_table", "Invoice Items.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="invoice_items_print_card">
    <table className="table table-hover  text-left printTarget" id="invoice_items_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Invoice Title</b></th>
          <th scope="col"><b>Service Name</b></th>
          <th scope="col"><b>Invoice Item Name</b></th>
          <th scope="col"><b>Item Quantity</b></th>
          <th scope="col"><b>Item Unit Price</b></th>
          <th scope="col"><b>Item Total Amount</b></th>
          <th scope="col"><b>Item Description</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.invoiceItemsLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Invoice Items ...</h5>
            </td>
          </tr>
        ) : stateItem.invoiceItemsListData?.length > 0 ? (
          stateItem.invoiceItemsListData.map((listinvoice_items_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listinvoice_items_result.primkey}`}>
                <tr key={listinvoice_items_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listinvoice_items_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="invoice_items"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listinvoice_items_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="InvoiceItemsList"
                          action="_invoice_details"
                          label=" Invoice Details"
                          icon="list "
                          dataIn={() => viewInvoices({childCol:`recordId`,parentColVal:listinvoice_items_result.invoice_id,parentName:listinvoice_items_result.item_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="InvoiceItemsList"
                          action="_service_detail"
                          label=" Service detail"
                          icon="list "
                          dataIn={() => viewServices({childCol:`recordId`,parentColVal:listinvoice_items_result.item_id,parentName:listinvoice_items_result.item_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listinvoice_items_result.invoice_id}>{magicTrimText(listinvoice_items_result._invoices_invoice_title_invoice_id, 70)}</span></td>
                    <td scope="col"><span title={listinvoice_items_result.item_id}>{magicTrimText(listinvoice_items_result._services_service_name_item_id, 70)}</span></td>
                    <td scope="col"><span title={listinvoice_items_result.invoice_item_name}>{magicTrimText(listinvoice_items_result.invoice_item_name, 70)}</span></td>
                    <td scope="col"><span>{mosyTonum(listinvoice_items_result.item_quantity)}</span></td>
                    <td scope="col"><span>{mosyTonum(listinvoice_items_result.item_unit_price)}</span></td>
                    <td scope="col"><span>{mosyTonum(listinvoice_items_result.item_total_amount)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listinvoice_items_result.item_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no invoice items records found</h6>
                  
                  <AddNewButton src="InvoiceItemsList"  link={customProfilePath} label="New Invoice Items" icon="plus-circle" />
                  <div className="col-md-12 pt-5 " id=""></div>
                </div>
              </td></tr>
              
            )}
            
            <tr className="bg-light">
              <th></th>
              
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b><span>{mosyTonum(suminvoice_items_item_quantity)}</span></b></th>
              <th scope="col"><b><span>{mosyTonum(suminvoice_items_item_unit_price)}</span></b></th>
              <th scope="col"><b><span>{mosyTonum(suminvoice_items_item_total_amount)}</span></b></th>
              <th scope="col"><b></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="InvoiceItemsList"
      tblName="invoice_items"
      totalPages={stateItem.invoiceItemsListPageCount}
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

