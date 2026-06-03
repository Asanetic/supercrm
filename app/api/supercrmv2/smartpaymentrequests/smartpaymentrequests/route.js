
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SmartPaymentRequestsBatchMutations } from './SmartPaymentRequestsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSmartPaymentRequests, UpdateSmartPaymentRequests } from './SmartPaymentRequestsDbGateway';

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
      table: 'smart_payment_requests',
      source: 'SmartPaymentRequests',
      action : 'select',
      role: 'view_smart_payment_requests',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // smart_payment_requests column DictionaryMap
  const SmartPaymentRequestsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    requestReference : "request_reference", 
    requestTitle : "request_title", 
    relatedModule : "related_module", 
    relatedRecordId : "related_record_id", 
    payerName : "payer_name", 
    payerPhone : "payer_phone", 
    payerEmail : "payer_email", 
    amountRequested : "amount_requested", 
    amountPaid : "amount_paid", 
    balanceAmount : "balance_amount", 
    paymentShortcode : "payment_shortcode", 
    paymentLink : "payment_link", 
    requestNotes : "request_notes", 
    expiryDate : "expiry_date", 
    requestStatus : "request_status", 
    createdBy : "created_by", 
    createdOn : "created_on", 
    updatedOn : "updated_on", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `smart_payment_requests`,
      recordIdColumn: `record_id`,
      dictionary: SmartPaymentRequestsColumnDictionary,
      searchParams,
      authData,
      batchMutations: SmartPaymentRequestsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SmartPaymentRequests data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SmartPaymentRequests failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SmartPaymentRequestsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartPaymentRequestsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartPaymentRequestsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartPaymentRequestsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartPaymentRequestsRequest);
     
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
      table: 'smart_payment_requests',
      source: 'SmartPaymentRequests',
      action : 'create',
      role: 'manage_smart_payment_requests',
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

		
  
  //--- Begin  smart_payment_requests inputs array ---// 
  const SmartPaymentRequestsInputsArr = {

    "request_reference" : "?", 
    "request_title" : "?", 
    "related_module" : "?", 
    "related_record_id" : "?", 
    "payer_name" : "?", 
    "payer_phone" : "?", 
    "payer_email" : "?", 
    "amount_requested" : "?", 
    "amount_paid" : "?", 
    "balance_amount" : "?", 
    "payment_shortcode" : "?", 
    "payment_link" : "?", 
    "request_notes" : "?", 
    "expiry_date" : "?", 
    "request_status" : "?", 
    "created_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_payment_requests inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_payment_requests',SmartPaymentRequestsInputsArr, SmartPaymentRequestsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SmartPaymentRequests
      const result = await AddSmartPaymentRequests(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        smart_payment_requests_dataNode: result.record_id
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

export async function PUT(SmartPaymentRequestsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartPaymentRequestsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartPaymentRequestsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartPaymentRequestsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartPaymentRequestsRequest);
     
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
      table: 'smart_payment_requests',
      source: 'SmartPaymentRequests',
      action : 'update',
      role: 'manage_smart_payment_requests',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SmartPaymentRequestsFormAction = body.smart_payment_requests_mosy_action;
    const smart_payment_requests_dataNode_value = base64Decode(body.smart_payment_requests_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  smart_payment_requests inputs array ---// 
  const SmartPaymentRequestsInputsArr = {

    "request_reference" : "?", 
    "request_title" : "?", 
    "related_module" : "?", 
    "related_record_id" : "?", 
    "payer_name" : "?", 
    "payer_phone" : "?", 
    "payer_email" : "?", 
    "amount_requested" : "?", 
    "amount_paid" : "?", 
    "balance_amount" : "?", 
    "payment_shortcode" : "?", 
    "payment_link" : "?", 
    "request_notes" : "?", 
    "expiry_date" : "?", 
    "request_status" : "?", 
    "created_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_payment_requests inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_payment_requests',SmartPaymentRequestsInputsArr, SmartPaymentRequestsRequest, newId, authData)
       
      // update table SmartPaymentRequests
      const result = await UpdateSmartPaymentRequests(newId, mutatedDataArray, body, authData, `primkey='${smart_payment_requests_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        smart_payment_requests_dataNode: smart_payment_requests_dataNode_value
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


