
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { DealsBatchMutations } from './DealsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddDeals, UpdateDeals } from './DealsDbGateway';

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
      table: 'deals',
      source: 'Deals',
      action : 'select',
      role: 'view_deals',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // deals column DictionaryMap
  const DealsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    dealTitle : "deal_title", 
    dealDescription : "deal_description", 
    clientId : "client_id", 
    dealSource : "deal_source", 
    dealValue : "deal_value", 
    expectedCloseDate : "expected_close_date", 
    pipelineStage : "pipeline_stage", 
    dealStage : "deal_stage", 
    dealStatus : "deal_status", 
    assignedSalesRep : "assigned_sales_rep", 
    priorityLevel : "priority_level", 
    dealProbability : "deal_probability", 
    nextFollowUpDate : "next_follow_up_date", 
    dealNotes : "deal_notes", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `deals`,
      recordIdColumn: `record_id`,
      dictionary: DealsColumnDictionary,
      searchParams,
      authData,
      batchMutations: DealsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Deals data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Deals failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(DealsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = DealsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await DealsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await DealsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(DealsRequest);
     
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
      table: 'deals',
      source: 'Deals',
      action : 'create',
      role: 'manage_deals',
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

		
  
  //--- Begin  deals inputs array ---// 
  const DealsInputsArr = {

    "deal_title" : "?", 
    "deal_description" : "?", 
    "client_id" : "?", 
    "deal_source" : "?", 
    "deal_value" : "?", 
    "expected_close_date" : "?", 
    "pipeline_stage" : "?", 
    "deal_stage" : "?", 
    "deal_status" : "?", 
    "assigned_sales_rep" : "?", 
    "priority_level" : "?", 
    "deal_probability" : "?", 
    "next_follow_up_date" : "?", 
    "deal_notes" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End deals inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('deals',DealsInputsArr, DealsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Deals
      const result = await AddDeals(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        deals_dataNode: result.record_id
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

export async function PUT(DealsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = DealsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await DealsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await DealsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(DealsRequest);
     
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
      table: 'deals',
      source: 'Deals',
      action : 'update',
      role: 'manage_deals',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const DealsFormAction = body.deals_mosy_action;
    const deals_dataNode_value = base64Decode(body.deals_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  deals inputs array ---// 
  const DealsInputsArr = {

    "deal_title" : "?", 
    "deal_description" : "?", 
    "client_id" : "?", 
    "deal_source" : "?", 
    "deal_value" : "?", 
    "expected_close_date" : "?", 
    "pipeline_stage" : "?", 
    "deal_stage" : "?", 
    "deal_status" : "?", 
    "assigned_sales_rep" : "?", 
    "priority_level" : "?", 
    "deal_probability" : "?", 
    "next_follow_up_date" : "?", 
    "deal_notes" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End deals inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('deals',DealsInputsArr, DealsRequest, newId, authData)
       
      // update table Deals
      const result = await UpdateDeals(newId, mutatedDataArray, body, authData, `primkey='${deals_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        deals_dataNode: deals_dataNode_value
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


