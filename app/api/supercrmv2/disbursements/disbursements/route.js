
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { DisbursementsBatchMutations } from './DisbursementsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddDisbursements, UpdateDisbursements } from './DisbursementsDbGateway';

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
      table: 'disbursements',
      source: 'Disbursements',
      action : 'select',
      role: 'view_disbursements',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // disbursements column DictionaryMap
  const DisbursementsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    requestId : "request_id", 
    staffId : "staff_id", 
    disbursementNumber : "disbursement_number", 
    amountDisbursed : "amount_disbursed", 
    referenceNumber : "reference_number", 
    paymentMethod : "payment_method", 
    disbursementNotes : "disbursement_notes", 
    disbursedBy : "disbursed_by", 
    disbursedOn : "disbursed_on", 
    disbursementStatus : "disbursement_status", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `disbursements`,
      recordIdColumn: `record_id`,
      dictionary: DisbursementsColumnDictionary,
      searchParams,
      authData,
      batchMutations: DisbursementsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Disbursements data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Disbursements failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(DisbursementsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = DisbursementsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await DisbursementsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await DisbursementsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(DisbursementsRequest);
     
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
      table: 'disbursements',
      source: 'Disbursements',
      action : 'create',
      role: 'manage_disbursements',
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

		
  
  //--- Begin  disbursements inputs array ---// 
  const DisbursementsInputsArr = {

    "request_id" : "?", 
    "staff_id" : "?", 
    "disbursement_number" : "?", 
    "amount_disbursed" : "?", 
    "reference_number" : "?", 
    "payment_method" : "?", 
    "disbursement_notes" : "?", 
    "disbursed_by" : "?", 
    "disbursed_on" : "?", 
    "disbursement_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End disbursements inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('disbursements',DisbursementsInputsArr, DisbursementsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Disbursements
      const result = await AddDisbursements(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        disbursements_dataNode: result.record_id
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

export async function PUT(DisbursementsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = DisbursementsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await DisbursementsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await DisbursementsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(DisbursementsRequest);
     
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
      table: 'disbursements',
      source: 'Disbursements',
      action : 'update',
      role: 'manage_disbursements',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const DisbursementsFormAction = body.disbursements_mosy_action;
    const disbursements_dataNode_value = base64Decode(body.disbursements_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  disbursements inputs array ---// 
  const DisbursementsInputsArr = {

    "request_id" : "?", 
    "staff_id" : "?", 
    "disbursement_number" : "?", 
    "amount_disbursed" : "?", 
    "reference_number" : "?", 
    "payment_method" : "?", 
    "disbursement_notes" : "?", 
    "disbursed_by" : "?", 
    "disbursed_on" : "?", 
    "disbursement_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End disbursements inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('disbursements',DisbursementsInputsArr, DisbursementsRequest, newId, authData)
       
      // update table Disbursements
      const result = await UpdateDisbursements(newId, mutatedDataArray, body, authData, `primkey='${disbursements_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        disbursements_dataNode: disbursements_dataNode_value
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


