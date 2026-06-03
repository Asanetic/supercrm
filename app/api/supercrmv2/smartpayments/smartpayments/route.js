
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SmartPaymentsBatchMutations } from './SmartPaymentsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSmartPayments, UpdateSmartPayments } from './SmartPaymentsDbGateway';

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
      table: 'smart_payments',
      source: 'SmartPayments',
      action : 'select',
      role: 'view_smart_payments',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // smart_payments column DictionaryMap
  const SmartPaymentsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    paymentDate : "payment_date", 
    transactionCode : "transaction_code", 
    amountPaid : "amount_paid", 
    payerName : "payer_name", 
    payerPhone : "payer_phone", 
    requestReference : "request_reference", 
    paymentDescription : "payment_description", 
    relatedModule : "related_module", 
    paymentReference : "payment_reference", 
    relatedRecordId : "related_record_id", 
    receiptNumber : "receipt_number", 
    payerEmail : "payer_email", 
    paymentMethod : "payment_method", 
    paymentChannel : "payment_channel", 
    currency : "currency", 
    paymentNotes : "payment_notes", 
    paymentStatus : "payment_status", 
    processedBy : "processed_by", 
    createdOn : "created_on", 
    updatedOn : "updated_on", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `smart_payments`,
      recordIdColumn: `record_id`,
      dictionary: SmartPaymentsColumnDictionary,
      searchParams,
      authData,
      batchMutations: SmartPaymentsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SmartPayments data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SmartPayments failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SmartPaymentsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartPaymentsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartPaymentsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartPaymentsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartPaymentsRequest);
     
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
      table: 'smart_payments',
      source: 'SmartPayments',
      action : 'create',
      role: 'manage_smart_payments',
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

		
  
  //--- Begin  smart_payments inputs array ---// 
  const SmartPaymentsInputsArr = {

    "payment_date" : "?", 
    "transaction_code" : "?", 
    "amount_paid" : "?", 
    "payer_name" : "?", 
    "payer_phone" : "?", 
    "request_reference" : "?", 
    "payment_description" : "?", 
    "related_module" : "?", 
    "payment_reference" : "?", 
    "related_record_id" : "?", 
    "receipt_number" : "?", 
    "payer_email" : "?", 
    "payment_method" : "?", 
    "payment_channel" : "?", 
    "currency" : "?", 
    "payment_notes" : "?", 
    "payment_status" : "?", 
    "processed_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_payments inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_payments',SmartPaymentsInputsArr, SmartPaymentsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SmartPayments
      const result = await AddSmartPayments(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        smart_payments_dataNode: result.record_id
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

export async function PUT(SmartPaymentsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartPaymentsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartPaymentsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartPaymentsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartPaymentsRequest);
     
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
      table: 'smart_payments',
      source: 'SmartPayments',
      action : 'update',
      role: 'manage_smart_payments',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SmartPaymentsFormAction = body.smart_payments_mosy_action;
    const smart_payments_dataNode_value = base64Decode(body.smart_payments_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  smart_payments inputs array ---// 
  const SmartPaymentsInputsArr = {

    "payment_date" : "?", 
    "transaction_code" : "?", 
    "amount_paid" : "?", 
    "payer_name" : "?", 
    "payer_phone" : "?", 
    "request_reference" : "?", 
    "payment_description" : "?", 
    "related_module" : "?", 
    "payment_reference" : "?", 
    "related_record_id" : "?", 
    "receipt_number" : "?", 
    "payer_email" : "?", 
    "payment_method" : "?", 
    "payment_channel" : "?", 
    "currency" : "?", 
    "payment_notes" : "?", 
    "payment_status" : "?", 
    "processed_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_payments inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_payments',SmartPaymentsInputsArr, SmartPaymentsRequest, newId, authData)
       
      // update table SmartPayments
      const result = await UpdateSmartPayments(newId, mutatedDataArray, body, authData, `primkey='${smart_payments_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        smart_payments_dataNode: smart_payments_dataNode_value
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


