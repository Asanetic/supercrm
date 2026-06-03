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
import { loadClientsListData, popDeleteDialog, InteprateClientsEvent  } from '../dataControl/ClientsRequestHandler';

//state management
import { useClientsState } from '../dataControl/ClientsStateManager';

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
// Imports from active-clients.jsx
import {
  filterActiveClients
} from '../logicControl/active-clients';

// Imports from inactive-clients.jsx
import {
  filterInactiveClients
} from '../logicControl/inactive-clients';

// Imports from deals-automapper.jsx
import {
  viewDeals
} from '../../deals/logicControl/deals-automapper';

// Imports from quotations-automapper.jsx
import {
  viewQuotations
} from '../../quotations/logicControl/quotations-automapper';

// Imports from invoices-automapper.jsx
import {
  viewInvoices
} from '../../invoices/logicControl/invoices-automapper';

// Imports from payments-automapper.jsx
import {
  viewPayments
} from '../../payments/logicControl/payments-automapper';

// Imports from tasks-automapper.jsx
import {
  viewTasks
} from '../../tasks/logicControl/tasks-automapper';

// Imports from activities-automapper.jsx
import {
  viewActivities
} from '../../activities/logicControl/activities-automapper';

// Imports from expected_revenue-automapper.jsx
import {
  viewExpectedRevenue
} from '../../expectedrevenue/logicControl/expected_revenue-automapper';

// Imports from leads-automapper.jsx
import {
  viewLeads
} from '../../leads/logicControl/leads-automapper';

// Imports from smart_messages-automapper.jsx
import {
  viewSmartMessages
} from '../../smartmessages/logicControl/smart_messages-automapper';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_CLIENTS";

//live data list component

export default function ClientsList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage Clients states
  const [stateItem, stateItemSetters] = useClientsState(settersOverrides);
  
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
      ...MosySecureFilterEngine("clients"),
      
    }
    
    
    loadClientsListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qclients_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"clients", keyword:stateItem.clientsQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_clients"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setClientsQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qclients_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qclients")
      deleteUrlParam("clients_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_clients"
      ).value = "";
      
      //refresh list
      loadClientsListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"clients", keyword:stateItem.clientsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Clients </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_clients" name="txt_clients" className="custom-search-input form-control" placeholder="Search in Clients "
          onChange={(e) => stateItemSetters.setClientsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qclients_btn" name="qclients_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="ClientsProfile"
            action="clients_DataMapQCol_filterActiveClients_btn"
            label="Active Clients"
            icon="bolt"
            
            onClick={()=>{
              
              filterActiveClients({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "clientStatus",
                
                colVal: "Active",
                
                tableName: "clients",
                
              })
              
            }}
            />
            <MosyActionButton
            source="ClientsProfile"
            action="clients_DataMapQCol_filterInactiveClients_btn"
            label="Inactive Clients"
            icon="times-circle"
            
            onClick={()=>{
              
              filterInactiveClients({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "clientStatus",
                
                colVal: "Inactive",
                
                tableName: "clients",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="ClientsList" link={customProfilePath} label="New Clients" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "clients_print_card", defaultTitle:"Clients"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("clients_data_table", "Clients.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="clients_print_card">
    <table className="table table-hover  text-left printTarget" id="clients_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          <th>Profile Photo</th>
          <th scope="col"><b>Full Name</b></th>
          <th scope="col"><b>Business Name</b></th>
          <th scope="col"><b>Phone Number</b></th>
          <th scope="col"><b>Alternative Phone Number</b></th>
          <th scope="col"><b>Email Address</b></th>
          <th scope="col"><b>Website Url</b></th>
          <th scope="col"><b>Industry Type</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.clientsLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="8" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Clients ...</h5>
            </td>
          </tr>
        ) : stateItem.clientsListData?.length > 0 ? (
          stateItem.clientsListData.map((listclients_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listclients_result.primkey}`}>
                <tr key={listclients_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listclients_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="clients"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listclients_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_deals"
                          label=" Deals"
                          icon="list "
                          dataIn={() => viewDeals({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_quotations"
                          label=" Quotations"
                          icon="list "
                          dataIn={() => viewQuotations({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_invoices"
                          label=" Invoices"
                          icon="list "
                          dataIn={() => viewInvoices({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_payments"
                          label=" Payments"
                          icon="list "
                          dataIn={() => viewPayments({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_tasks"
                          label=" Tasks"
                          icon="list "
                          dataIn={() => viewTasks({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_activities"
                          label=" Activities"
                          icon="list "
                          dataIn={() => viewActivities({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_expected_revenue"
                          label=" Expected Revenue"
                          icon="list "
                          dataIn={() => viewExpectedRevenue({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_lead_profile"
                          label=" Lead profile"
                          icon="list "
                          dataIn={() => viewLeads({childCol:`recordId`,parentColVal:listclients_result.converted_lead_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                          <MosyGridRowOptions
                          src="ClientsList"
                          action="_message_history"
                          label=" Message history"
                          icon="list "
                          dataIn={() => viewSmartMessages({childCol:`relatedRecordId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})}   // only runs on click now
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <MosyImageViewer
                      media={`/api/mediaroom?media=${btoa((listclients_result.profile_photo || ""))}`}
                      mediaRoot={""}
                      defaultLogo={logo.src}
                      imageClass="small_thumbnail"
                      />
                    </td>
                    <td scope="col"><span title={listclients_result.full_name}>{magicTrimText(listclients_result.full_name, 70)}</span></td>
                    <td scope="col"><span title={listclients_result.business_name}>{magicTrimText(listclients_result.business_name, 70)}</span></td>
                    <td scope="col"><span title={listclients_result.phone_number}>{magicTrimText(listclients_result.phone_number, 70)}</span></td>
                    <td scope="col"><span title={listclients_result.alternative_phone_number}>{magicTrimText(listclients_result.alternative_phone_number, 70)}</span></td>
                    <td scope="col"><span title={listclients_result.email_address}>{magicTrimText(listclients_result.email_address, 70)}</span></td>
                    <td scope="col"><span title={listclients_result.website_url}>{magicTrimText(listclients_result.website_url, 70)}</span></td>
                    <td scope="col"><span title={listclients_result.industry_type}>{magicTrimText(listclients_result.industry_type, 70)}</span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="9" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no clients records found</h6>
                  
                  <AddNewButton src="ClientsList"  link={customProfilePath} label="New Clients" icon="plus-circle" />
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
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="ClientsList"
      tblName="clients"
      totalPages={stateItem.clientsListPageCount}
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

