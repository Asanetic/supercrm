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
import { loadQuotationItemsListData, popDeleteDialog, InteprateQuotationItemsEvent  } from '../dataControl/QuotationItemsRequestHandler';

//state management
import { useQuotationItemsState } from '../dataControl/QuotationItemsStateManager';

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
// Imports from quotations-automapper.jsx
import {
  viewQuotations
} from '../../quotations/logicControl/quotations-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_QUOTATION_ITEMS";

//live data list component

export default function QuotationItemsList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage QuotationItems states
  const [stateItem, stateItemSetters] = useQuotationItemsState(settersOverrides);
  
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
      ...MosySecureFilterEngine("quotation_items"),
      
    }
    
    
    loadQuotationItemsListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute item_quantity totals
  const sumquotation_items_item_quantity = stateItem.quotationItemsListData?.reduce(
    (sum, row) => sum + Number(row.item_quantity || 0),
    0
  );
  
  // Compute item_unit_price totals
  const sumquotation_items_item_unit_price = stateItem.quotationItemsListData?.reduce(
    (sum, row) => sum + Number(row.item_unit_price || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qquotation_items_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"quotation_items", keyword:stateItem.quotationItemsQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_quotation_items"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setQuotationItemsQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qquotation_items_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qquotation_items")
      deleteUrlParam("quotation_items_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_quotation_items"
      ).value = "";
      
      //refresh list
      loadQuotationItemsListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"quotation_items", keyword:stateItem.quotationItemsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Quotation Items </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_quotation_items" name="txt_quotation_items" className="custom-search-input form-control" placeholder="Search in Quotation Items "
          onChange={(e) => stateItemSetters.setQuotationItemsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qquotation_items_btn" name="qquotation_items_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            
            
            <AddNewButton src="QuotationItemsList" link={customProfilePath} label="New Quotation Items" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "quotation_items_print_card", defaultTitle:"Quotation Items"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("quotation_items_data_table", "Quotation Items.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="quotation_items_print_card">
    <table className="table table-hover  text-left printTarget" id="quotation_items_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          
          <th scope="col"><b>Quotation Id</b></th>
          <th scope="col"><b>Item Type</b></th>
          <th scope="col"><b>Item Id</b></th>
          <th scope="col"><b>Item Name</b></th>
          <th scope="col"><b>Item Description</b></th>
          <th scope="col"><b>Item Quantity</b></th>
          <th scope="col"><b>Item Unit Price</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.quotationItemsLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Quotation Items ...</h5>
            </td>
          </tr>
        ) : stateItem.quotationItemsListData?.length > 0 ? (
          stateItem.quotationItemsListData.map((listquotation_items_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listquotation_items_result.primkey}`}>
                <tr key={listquotation_items_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listquotation_items_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="quotation_items"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listquotation_items_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="QuotationItemsList"
                          action="_quotation_details"
                          label=" Quotation Details"
                          icon="list "
                          dataIn={() => viewQuotations({childCol:`recordId`,parentColVal:listquotation_items_result.quotation_id,parentName:listquotation_items_result.item_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td scope="col"><span title={listquotation_items_result.quotation_id}>{magicTrimText(listquotation_items_result._quotations_quotation_title_quotation_id, 70)}</span></td>
                    <td scope="col"><span title={listquotation_items_result.item_type}>{magicTrimText(listquotation_items_result.item_type, 70)}</span></td>
                    <td scope="col"><span title={listquotation_items_result.item_id}>{magicTrimText(listquotation_items_result.item_id, 70)}</span></td>
                    <td scope="col"><span title={listquotation_items_result.item_name}>{magicTrimText(listquotation_items_result.item_name, 70)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listquotation_items_result.item_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    <td scope="col"><span>{mosyTonum(listquotation_items_result.item_quantity)}</span></td>
                    <td scope="col"><span>{mosyTonum(listquotation_items_result.item_unit_price)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no quotation items records found</h6>
                  
                  <AddNewButton src="QuotationItemsList"  link={customProfilePath} label="New Quotation Items" icon="plus-circle" />
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
              <th scope="col"><b><span>{mosyTonum(sumquotation_items_item_quantity)}</span></b></th>
              <th scope="col"><b><span>{mosyTonum(sumquotation_items_item_unit_price)}</span></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="QuotationItemsList"
      tblName="quotation_items"
      totalPages={stateItem.quotationItemsListPageCount}
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

