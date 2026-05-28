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
import { loadQuotationsListData, popDeleteDialog, InteprateQuotationsEvent  } from '../dataControl/QuotationsRequestHandler';

//state management
import { useQuotationsState } from '../dataControl/QuotationsStateManager';

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
// Imports from expired-quotations.jsx
import {
  filterExpiredQuotations
} from '../logicControl/expired-quotations';

// Imports from clients-automapper.jsx
import {
  viewClients
} from '../../clients/logicControl/clients-automapper';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from quotation_items-automapper.jsx
import {
  viewQuotationItems
} from '../../quotationitems/logicControl/quotation_items-automapper';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_QUOTATIONS";

//live data list component

export default function QuotationsList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage Quotations states
  const [stateItem, stateItemSetters] = useQuotationsState(settersOverrides);
  
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
      ...MosySecureFilterEngine("quotations"),
      
    }
    
    
    loadQuotationsListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute quotation_amount totals
  const sumquotations_quotation_amount = stateItem.quotationsListData?.reduce(
    (sum, row) => sum + Number(row.quotation_amount || 0),
    0
  );
  
  // Compute tax_amount totals
  const sumquotations_tax_amount = stateItem.quotationsListData?.reduce(
    (sum, row) => sum + Number(row.tax_amount || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qquotations_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"quotations", keyword:stateItem.quotationsQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_quotations"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setQuotationsQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qquotations_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qquotations")
      deleteUrlParam("quotations_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_quotations"
      ).value = "";
      
      //refresh list
      loadQuotationsListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"quotations", keyword:stateItem.quotationsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Quotations </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_quotations" name="txt_quotations" className="custom-search-input form-control" placeholder="Search in Quotations "
          onChange={(e) => stateItemSetters.setQuotationsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qquotations_btn" name="qquotations_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="QuotationsProfile"
            action="quotations_DataMapQCol_filterExpiredQuotations_btn"
            label="Expired Quotations"
            icon="clock"
            
            onClick={()=>{
              
              filterExpiredQuotations({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "quotationStatus",
                
                colVal: "Expired",
                
                tableName: "quotations",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="QuotationsList" link={customProfilePath} label="New Quotations" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "quotations_print_card", defaultTitle:"Quotations"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("quotations_data_table", "Quotations.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="quotations_print_card">
    <table className="table table-hover  text-left printTarget" id="quotations_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Quotation Number</b></th>
          <th scope="col"><b>Quotation Title</b></th>
          <th scope="col"><b>Quotation Description</b></th>
          <th scope="col"><b>Full Name</b></th>
          <th scope="col"><b>Deal Title</b></th>
          <th scope="col"><b>Quotation Amount</b></th>
          <th scope="col"><b>Tax Amount</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.quotationsLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Quotations ...</h5>
            </td>
          </tr>
        ) : stateItem.quotationsListData?.length > 0 ? (
          stateItem.quotationsListData.map((listquotations_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listquotations_result.primkey}`}>
                <tr key={listquotations_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listquotations_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="quotations"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listquotations_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="QuotationsList"
                          action="_client_details"
                          label=" Client Details"
                          icon="list "
                          dataIn={() => viewClients({childCol:`recordId`,parentColVal:listquotations_result.client_id,parentName:listquotations_result.quotation_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="QuotationsList"
                          action="_deal_details"
                          label=" Deal Details"
                          icon="list "
                          dataIn={() => viewDeals({childCol:`recordId`,parentColVal:listquotations_result.deal_id,parentName:listquotations_result.quotation_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="QuotationsList"
                          action="_quotation_items"
                          label=" Quotation Items"
                          icon="list "
                          dataIn={() => viewQuotationItems({childCol:`quotationId`,parentColVal:listquotations_result.record_id,parentName:listquotations_result.quotation_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="QuotationsList"
                          action="_invoices"
                          label=" Invoices"
                          icon="list "
                          dataIn={() => viewInvoices({childCol:`quotationId`,parentColVal:listquotations_result.record_id,parentName:listquotations_result.quotation_title})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listquotations_result.quotation_number}>{magicTrimText(listquotations_result.quotation_number, 70)}</span></td>
                    <td scope="col"><span title={listquotations_result.quotation_title}>{magicTrimText(listquotations_result.quotation_title, 70)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listquotations_result.quotation_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    <td scope="col"><span title={listquotations_result.client_id}>{magicTrimText(listquotations_result._clients_full_name_client_id, 70)}</span></td>
                    <td scope="col"><span title={listquotations_result.deal_id}>{magicTrimText(listquotations_result._deals_deal_title_deal_id, 70)}</span></td>
                    <td scope="col"><span>{mosyTonum(listquotations_result.quotation_amount)}</span></td>
                    <td scope="col"><span>{mosyTonum(listquotations_result.tax_amount)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no quotations records found</h6>
                  
                  <AddNewButton src="QuotationsList"  link={customProfilePath} label="New Quotations" icon="plus-circle" />
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
              <th scope="col"><b><span>{mosyTonum(sumquotations_quotation_amount)}</span></b></th>
              <th scope="col"><b><span>{mosyTonum(sumquotations_tax_amount)}</span></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="QuotationsList"
      tblName="quotations"
      totalPages={stateItem.quotationsListPageCount}
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

