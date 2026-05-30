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
import { loadProductsListData, popDeleteDialog, InteprateProductsEvent  } from '../dataControl/ProductsRequestHandler';

//state management
import { useProductsState } from '../dataControl/ProductsStateManager';

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
// Imports from out-of-stock-products.jsx
import {
  filterOutOfStockProducts
} from '../logicControl/out-of-stock-products';

// Imports from filter-prod-types.jsx
import {
  filterProdByCategory
} from '../logicControl/filter-prod-types';

// Imports from active-products.jsx
import {
  filterActiveProducts
} from '../logicControl/active-products';



//export list



///component access control key
export const MOSY_ACCESS_KEY = "VIEW_PRODUCTS";

//live data list component

export default function ProductsList({ dataIn = {}, dataOut = {} }) {
  
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
  
  //manage Products states
  const [stateItem, stateItemSetters] = useProductsState(settersOverrides);
  
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
      ...MosySecureFilterEngine("products"),
      
    }
    
    
    loadProductsListData(customFilter, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  // Compute unit_price totals
  const sumproducts_unit_price = stateItem.productsListData?.reduce(
    (sum, row) => sum + Number(row.unit_price || 0),
    0
  );
  
  
  function moduleFilterManager(action = "")
  {
    
    
    if(action === "search"){
      
      //reset pagination
      mosyUpdateUrlParam(
        "qproducts_page",
        "1"
      );
      
      //set url params
      mosyFilterUrl({tableName:"products", keyword:stateItem.productsQuerySearchStr, reload:false})
      
      // clear input
      document.getElementById(
        "txt_products"
      ).value = "";
      
    }
    
    if(action === "refresh")
    {
      //empty Search String
      stateItemSetters.setProductsQuerySearchStr("");
      
      //reset pagination
      mosyUpdateUrlParam(
        "qproducts_page",
        "1"
      );
      
      
      //delete search param var
      deleteUrlParam("qproducts")
      deleteUrlParam("products_mosyfilter")
      
      // clear input
      document.getElementById(
        "txt_products"
      ).value = "";
      
      //refresh list
      loadProductsListData(customQueryStr, stateItemSetters);
      
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
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"products", keyword:stateItem.productsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Products </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_products" name="txt_products" className="custom-search-input form-control" placeholder="Search in Products "
          onChange={(e) => stateItemSetters.setProductsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qproducts_btn" name="qproducts_btn" type="button" onClick={() => moduleFilterManager("search")}><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <MosyActionButton
            source="ProductsProfile"
            action="products_DataMapQCol_filterOutOfStockProducts_btn"
            label="Out Of Stock Products"
            icon="exclamation-triangle"
            
            onClick={()=>{
              
              filterOutOfStockProducts({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "productStatus",
                
                colVal: "Out Of Stock",
                
                tableName: "products",
                
              })
              
            }}
            />
            <MosyActionButton
            source="ProductsProfile"
            action="products_DataMapQCol_filterProdByCategory_btn"
            label="Filter Categories"
            icon="tags"
            
            onClick={()=>{
              
              filterProdByCategory({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                title: "Search Categories",
                
                parentColName: "category",
                
                parentTableName: "products",
                
              })
              
            }}
            />
            <MosyActionButton
            source="ProductsProfile"
            action="products_DataMapQCol_filterActiveProducts_btn"
            label="Active Products"
            icon="check-circle"
            
            onClick={()=>{
              
              filterActiveProducts({
                
                customQueryStr : customQueryStr,
                
                stateItemSetters: stateItemSetters,
                
                colName: "productStatus",
                
                colVal: "Active",
                
                tableName: "products",
                
              })
              
            }}
            />
            
            
            <AddNewButton src="ProductsList" link={customProfilePath} label="New Products" icon="plus-circle" />
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
        onClick={() => {mosyPrintToPdf({elemId : "products_print_card", defaultTitle:"Products"})}}
        >
        <i className="fa fa-print "></i> Print List
      </div>
      <div className="cpointer p-2 ml-2 badge rounded border border_set badge-whte mb-3 tbl_print_to_excel_btn"
      
      onClick={() => exportTableToExcel("products_data_table", "Products.xlsx")}
      >
      <i className="fa fa-arrow-right "></i> Export to excel
    </div>
  </div>
  <div className="col-md-12 m-0 p-0" id="products_print_card">
    <table className="table table-hover  text-left printTarget" id="products_data_table">
      <thead className="text-uppercase">
        <tr>
          <th scope="col">#</th>
          <th>Product Image</th>
          <th scope="col"><b>Product Name</b></th>
          <th scope="col"><b>Price Range</b></th>
          <th scope="col"><b>Unit Price</b></th>
          <th scope="col"><b>Product Code</b></th>
          <th scope="col"><b>Category</b></th>
          <th scope="col"><b>Product Description</b></th>
          
        </tr>
        
      </thead>
      <tbody>
        {stateItem.productsLoading ? (
          <tr>
            <th scope="col">#</th>
            <td colSpan="7" className="text-muted">
              <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Products ...</h5>
            </td>
          </tr>
        ) : stateItem.productsListData?.length > 0 ? (
          stateItem.productsListData.map((listproducts_result, index) => {
            
            
            
            return(
              <Fragment key={`_row_${listproducts_result.primkey}`}>
                <tr key={listproducts_result.primkey}>
                  <td>
                    <div className="table_cell_dropdown">
                      <div className="table_cell_dropbtn">
                        
                        <b>{listproducts_result.row_count}</b></div>
                        <div className="table_cell_dropdown-content">
                          <MosySmartDropdownActions
                          tblName="products"
                          setters={{
                            
                            childStateSetters: stateItemSetters,
                            parentStateSetters: parentStateSetters
                            
                          }}
                          
                          attributes={`${listproducts_result.primkey}:${customProfilePath}:false`}
                          callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                          
                          />
                          
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <MosyImageViewer
                      media={`/api/mediaroom?media=${btoa((listproducts_result.product_image || ""))}`}
                      mediaRoot={""}
                      defaultLogo={logo.src}
                      imageClass="small_thumbnail"
                      />
                    </td>
                    <td scope="col"><span title={listproducts_result.product_name}>{magicTrimText(listproducts_result.product_name, 70)}</span></td>
                    <td scope="col"><span title={listproducts_result.price_range}>{magicTrimText(listproducts_result.price_range, 70)}</span></td>
                    <td scope="col"><span>{mosyTonum(listproducts_result.unit_price)}</span></td>
                    <td scope="col"><span title={listproducts_result.product_code}>{magicTrimText(listproducts_result.product_code, 70)}</span></td>
                    <td scope="col"><span title={listproducts_result.category}>{magicTrimText(listproducts_result.category, 70)}</span></td>
                    <td scope="col"><span>
                      <ReactMarkdown>
                        
                        {magicTrimText(listproducts_result.product_description, 70)}
                        
                      </ReactMarkdown>
                    </span></td>
                    
                  </tr>
                  
                  
                </Fragment>)
                
              })
              
            ) : (
              
              <tr><td colSpan="8" className="text-muted">
                
                
                <div className="col-md-12 text-center mt-4">
                  <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no products records found</h6>
                  
                  <AddNewButton src="ProductsList"  link={customProfilePath} label="New Products" icon="plus-circle" />
                  <div className="col-md-12 pt-5 " id=""></div>
                </div>
              </td></tr>
              
            )}
            
            <tr className="bg-light">
              <th></th>
              <th></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b><span>{mosyTonum(sumproducts_unit_price)}</span></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              <th scope="col"><b></b></th>
              
            </tr>
          </tbody>
          
        </table>
      </div>
      <MosyPaginationUi
      src="ProductsList"
      tblName="products"
      totalPages={stateItem.productsListPageCount}
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

