'use client';
//React
import { useEffect, useState ,Fragment } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';



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
import { loadProductCategoriesListData, popDeleteDialog, InteprateProductCategoriesEvent  } from '../dataControl/ProductCategoriesRequestHandler';

//state management
import { useProductCategoriesState } from '../dataControl/ProductCategoriesStateManager';

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
export const MOSY_ACCESS_KEY = "VIEW_";

//live data list component

export default function ProductCategoriesList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage ProductCategories states
  const [stateItem, stateItemSetters] = useProductCategoriesState(settersOverrides);
  
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
      ...MosySecureFilterEngine(""),
      
    }
    
    
    loadProductCategoriesListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "q_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"", keyword:stateItem.productCategoriesQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setProductCategoriesQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "q_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("q")
      deleteUrlParam("_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_"
      ).value = "";
      
      //refresh list
      loadProductCategoriesListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"", keyword:stateItem.productCategoriesQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b>  </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_" name="txt_" className="custom-search-input form-control" placeholder="Search in  "
          onChange={(e) => stateItemSetters.setProductCategoriesQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="q_btn" name="q_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            
            
            <AddNewButton src="ProductCategoriesList" link={customProfilePath} label="" icon="" />
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
      
      
      <table className="table table-hover  text-left printTarget" id="_data_table">
        <thead className="text-uppercase">
          <tr>
            <th scope="col">#</th>
            
            
          </tr>
          
        </thead>
        <tbody>
          {stateItem.productCategoriesLoading ? (
            <tr>
              <th scope="col">#</th>
              <td colSpan="1" className="text-muted">
                <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Product Categories ...</h5>
              </td>
            </tr>
          ) : stateItem.productCategoriesListData?.length > 0 ? (
            stateItem.productCategoriesListData.map((list_result, index) => {
              
              
              
              return(
                <Fragment key={`_row_${list_result.primkey}`}>
                  <tr key={list_result.primkey}>
                    <td>
                      <div className="table_cell_dropdown">
                        <div className="table_cell_dropbtn">
                          
                          <b>{list_result.row_count}</b></div>
                          <div className="table_cell_dropdown-content">
                            <MosySmartDropdownActions
                            tblName=""
                            setters={{
                              
                              childStateSetters: stateItemSetters,
                              parentStateSetters: parentStateSetters
                              
                            }}
                            
                            attributes={`${list_result.primkey}:${customProfilePath}:false`}
                            callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                            
                            />
                            
                          </div>
                        </div>
                      </td>
                      
                      
                    </tr>
                    
                    
                  </Fragment>)
                  
                })
                
              ) : (
                
                <tr><td colSpan="1" className="text-muted">
                  
                  
                  <div className="col-md-12 text-center mt-4">
                    <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no  records found</h6>
                    
                    <AddNewButton src="ProductCategoriesList"  link={customProfilePath} label="" icon="" />
                    <div className="col-md-12 pt-5 " id=""></div>
                  </div>
                </td></tr>
                
              )}
              
              <tr className="bg-light">
                <th></th>
                
                
              </tr>
            </tbody>
            
          </table>
          
          <MosyPaginationUi
          src="ProductCategoriesList"
          tblName=""
          totalPages={stateItem.productCategoriesListPageCount}
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
  
