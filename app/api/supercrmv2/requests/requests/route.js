
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { RequestsBatchMutations } from './RequestsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddRequests, UpdateRequests } from './RequestsDbGateway';

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
      table: 'requests',
      source: 'Requests',
      action : 'select',
      role: 'view_requests',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // requests column DictionaryMap
  const RequestsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    staffId : "staff_id", 
    requestNumber : "request_number", 
    amountRequested : "amount_requested", 
    requestReason : "request_reason", 
    amountApproved : "amount_approved", 
    currentBalance : "current_balance", 
    requestedOn : "requested_on", 
    approvedOn : "approved_on", 
    paidOn : "paid_on", 
    clearedOn : "cleared_on", 
    requestStatus : "request_status", 
    requestRemarks : "request_remarks", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `requests`,
      recordIdColumn: `record_id`,
      dictionary: RequestsColumnDictionary,
      searchParams,
      authData,
      batchMutations: RequestsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Requests data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Requests failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(RequestsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = RequestsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await RequestsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await RequestsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(RequestsRequest);
     
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
      table: 'requests',
      source: 'Requests',
      action : 'create',
      role: 'manage_requests',
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

		
  
  //--- Begin  requests inputs array ---// 
  const RequestsInputsArr = {

    "staff_id" : "?", 
    "request_number" : "?", 
    "amount_requested" : "?", 
    "request_reason" : "?", 
    "amount_approved" : "?", 
    "current_balance" : "?", 
    "requested_on" : "?", 
    "approved_on" : "?", 
    "paid_on" : "?", 
    "cleared_on" : "?", 
    "request_status" : "?", 
    "request_remarks" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End requests inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('requests',RequestsInputsArr, RequestsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Requests
      const result = await AddRequests(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        requests_dataNode: result.record_id
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

export async function PUT(RequestsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = RequestsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await RequestsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await RequestsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(RequestsRequest);
     
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
      table: 'requests',
      source: 'Requests',
      action : 'update',
      role: 'manage_requests',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const RequestsFormAction = body.requests_mosy_action;
    const requests_dataNode_value = base64Decode(body.requests_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  requests inputs array ---// 
  const RequestsInputsArr = {

    "staff_id" : "?", 
    "request_number" : "?", 
    "amount_requested" : "?", 
    "request_reason" : "?", 
    "amount_approved" : "?", 
    "current_balance" : "?", 
    "requested_on" : "?", 
    "approved_on" : "?", 
    "paid_on" : "?", 
    "cleared_on" : "?", 
    "request_status" : "?", 
    "request_remarks" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End requests inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('requests',RequestsInputsArr, RequestsRequest, newId, authData)
       
      // update table Requests
      const result = await UpdateRequests(newId, mutatedDataArray, body, authData, `primkey='${requests_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        requests_dataNode: requests_dataNode_value
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


