
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { InvoiceItemsBatchMutations } from './InvoiceItemsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddInvoiceItems, UpdateInvoiceItems } from './InvoiceItemsDbGateway';

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
      table: 'invoice_items',
      source: 'InvoiceItems',
      action : 'select',
      role: 'view_invoice_items',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // invoice_items column DictionaryMap
  const InvoiceItemsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    invoiceId : "invoice_id", 
    itemId : "item_id", 
    invoiceItemName : "invoice_item_name", 
    itemQuantity : "item_quantity", 
    itemUnitPrice : "item_unit_price", 
    itemTotalAmount : "item_total_amount", 
    itemDescription : "item_description", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `invoice_items`,
      recordIdColumn: `record_id`,
      dictionary: InvoiceItemsColumnDictionary,
      searchParams,
      authData,
      batchMutations: InvoiceItemsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'InvoiceItems data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET InvoiceItems failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(InvoiceItemsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = InvoiceItemsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await InvoiceItemsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await InvoiceItemsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(InvoiceItemsRequest);
     
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
      table: 'invoice_items',
      source: 'InvoiceItems',
      action : 'create',
      role: 'manage_invoice_items',
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

		
  
  //--- Begin  invoice_items inputs array ---// 
  const InvoiceItemsInputsArr = {

    "invoice_id" : "?", 
    "item_id" : "?", 
    "invoice_item_name" : "?", 
    "item_quantity" : "?", 
    "item_unit_price" : "?", 
    "item_total_amount" : "?", 
    "item_description" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End invoice_items inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('invoice_items',InvoiceItemsInputsArr, InvoiceItemsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table InvoiceItems
      const result = await AddInvoiceItems(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        invoice_items_dataNode: result.record_id
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

export async function PUT(InvoiceItemsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = InvoiceItemsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await InvoiceItemsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await InvoiceItemsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(InvoiceItemsRequest);
     
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
      table: 'invoice_items',
      source: 'InvoiceItems',
      action : 'update',
      role: 'manage_invoice_items',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const InvoiceItemsFormAction = body.invoice_items_mosy_action;
    const invoice_items_dataNode_value = base64Decode(body.invoice_items_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  invoice_items inputs array ---// 
  const InvoiceItemsInputsArr = {

    "invoice_id" : "?", 
    "item_id" : "?", 
    "invoice_item_name" : "?", 
    "item_quantity" : "?", 
    "item_unit_price" : "?", 
    "item_total_amount" : "?", 
    "item_description" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End invoice_items inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('invoice_items',InvoiceItemsInputsArr, InvoiceItemsRequest, newId, authData)
       
      // update table InvoiceItems
      const result = await UpdateInvoiceItems(newId, mutatedDataArray, body, authData, `primkey='${invoice_items_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        invoice_items_dataNode: invoice_items_dataNode_value
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


