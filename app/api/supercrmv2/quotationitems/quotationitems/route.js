
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { QuotationItemsBatchMutations } from './QuotationItemsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddQuotationItems, UpdateQuotationItems } from './QuotationItemsDbGateway';

export async function GET(request) {

  try {
    const { searchParams } = new URL(request.url);

    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canSelect = validateRoleAccess({
      table: 'quotation_items',
      source: 'QuotationItems',
      action : 'select',
      role: 'view_quotation_items',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // quotation_items column DictionaryMap
  const QuotationItemsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    quotationId : "quotation_id", 
    itemType : "item_type", 
    itemId : "item_id", 
    itemName : "item_name", 
    itemDescription : "item_description", 
    itemQuantity : "item_quantity", 
    itemUnitPrice : "item_unit_price", 
    itemTotalAmount : "item_total_amount", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `quotation_items`,
      recordIdColumn: `record_id`,
      dictionary: QuotationItemsColumnDictionary,
      searchParams,
      authData,
      batchMutations: QuotationItemsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'QuotationItems data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET QuotationItems failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(QuotationItemsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = QuotationItemsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await QuotationItemsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await QuotationItemsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(QuotationItemsRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canPost = validateRoleAccess({
      table: 'quotation_items',
      source: 'QuotationItems',
      action : 'create',
      role: 'manage_quotation_items',
      authData
    });

    if (!canPost.valid) {
      return Response.json({
        status: 'error',
        message: canPost.message,
        data: []
      });
    }
    
    //generate Record id 
    const newId = magicRandomStr(7);

		
  
  //--- Begin  quotation_items inputs array ---// 
  const QuotationItemsInputsArr = {

    "quotation_id" : "?", 
    "item_type" : "?", 
    "item_id" : "?", 
    "item_name" : "?", 
    "item_description" : "?", 
    "item_quantity" : "?", 
    "item_unit_price" : "?", 
    "item_total_amount" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End quotation_items inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('quotation_items',QuotationItemsInputsArr, QuotationItemsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table QuotationItems
      const result = await AddQuotationItems(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        quotation_items_dataNode: result.record_id
      });
      
    
 
  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(QuotationItemsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = QuotationItemsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await QuotationItemsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await QuotationItemsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(QuotationItemsRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canUpdate = validateRoleAccess({
      table: 'quotation_items',
      source: 'QuotationItems',
      action : 'update',
      role: 'manage_quotation_items',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const QuotationItemsFormAction = body.quotation_items_mosy_action;
    const quotation_items_dataNode_value = base64Decode(body.quotation_items_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  quotation_items inputs array ---// 
  const QuotationItemsInputsArr = {

    "quotation_id" : "?", 
    "item_type" : "?", 
    "item_id" : "?", 
    "item_name" : "?", 
    "item_description" : "?", 
    "item_quantity" : "?", 
    "item_unit_price" : "?", 
    "item_total_amount" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End quotation_items inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('quotation_items',QuotationItemsInputsArr, QuotationItemsRequest, newId, authData)
       
      // update table QuotationItems
      const result = await UpdateQuotationItems(newId, mutatedDataArray, body, authData, `primkey='${quotation_items_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        quotation_items_dataNode: quotation_items_dataNode_value
      });
 

  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}


