
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ApprovalsBatchMutations } from './ApprovalsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddApprovals, UpdateApprovals } from './ApprovalsDbGateway';

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
      table: 'approvals',
      source: 'Approvals',
      action : 'select',
      role: 'view_approvals',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // approvals column DictionaryMap
  const ApprovalsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    requestId : "request_id", 
    staffId : "staff_id", 
    approvalLevel : "approval_level", 
    approvedBy : "approved_by", 
    approvalAction : "approval_action", 
    approvalComments : "approval_comments", 
    approvedOn : "approved_on", 
    approvalStatus : "approval_status", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `approvals`,
      recordIdColumn: `record_id`,
      dictionary: ApprovalsColumnDictionary,
      searchParams,
      authData,
      batchMutations: ApprovalsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Approvals data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Approvals failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ApprovalsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ApprovalsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ApprovalsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ApprovalsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ApprovalsRequest);
     
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
      table: 'approvals',
      source: 'Approvals',
      action : 'create',
      role: 'manage_approvals',
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

		
  
  //--- Begin  approvals inputs array ---// 
  const ApprovalsInputsArr = {

    "request_id" : "?", 
    "staff_id" : "?", 
    "approval_level" : "?", 
    "approved_by" : "?", 
    "approval_action" : "?", 
    "approval_comments" : "?", 
    "approved_on" : "?", 
    "approval_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End approvals inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('approvals',ApprovalsInputsArr, ApprovalsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Approvals
      const result = await AddApprovals(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        approvals_dataNode: result.record_id
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

export async function PUT(ApprovalsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ApprovalsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ApprovalsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ApprovalsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ApprovalsRequest);
     
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
      table: 'approvals',
      source: 'Approvals',
      action : 'update',
      role: 'manage_approvals',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ApprovalsFormAction = body.approvals_mosy_action;
    const approvals_dataNode_value = base64Decode(body.approvals_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  approvals inputs array ---// 
  const ApprovalsInputsArr = {

    "request_id" : "?", 
    "staff_id" : "?", 
    "approval_level" : "?", 
    "approved_by" : "?", 
    "approval_action" : "?", 
    "approval_comments" : "?", 
    "approved_on" : "?", 
    "approval_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End approvals inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('approvals',ApprovalsInputsArr, ApprovalsRequest, newId, authData)
       
      // update table Approvals
      const result = await UpdateApprovals(newId, mutatedDataArray, body, authData, `primkey='${approvals_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        approvals_dataNode: approvals_dataNode_value
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


