
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ExpectedRevenueBatchMutations } from './ExpectedRevenueBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddExpectedRevenue, UpdateExpectedRevenue } from './ExpectedRevenueDbGateway';

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
      table: 'expected_revenue',
      source: 'ExpectedRevenue',
      action : 'select',
      role: 'view_expected_revenue',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // expected_revenue column DictionaryMap
  const ExpectedRevenueColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    revenueMonth : "revenue_month", 
    clientId : "client_id", 
    dealId : "deal_id", 
    expectedAmount : "expected_amount", 
    currencyCode : "currency_code", 
    paymentStatus : "payment_status", 
    paymentRefNo : "payment_ref_no", 
    expectedCloseDate : "expected_close_date", 
    probabilityPercent : "probability_percent", 
    revenueSourceType : "revenue_source_type", 
    revenueTitle : "revenue_title", 
    invoiceId : "invoice_id", 
    leadId : "lead_id", 
    revenueStatus : "revenue_status", 
    revenueDescription : "revenue_description", 
    assignedTo : "assigned_to", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `expected_revenue`,
      recordIdColumn: `record_id`,
      dictionary: ExpectedRevenueColumnDictionary,
      searchParams,
      authData,
      batchMutations: ExpectedRevenueBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'ExpectedRevenue data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET ExpectedRevenue failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ExpectedRevenueRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ExpectedRevenueRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ExpectedRevenueRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ExpectedRevenueRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ExpectedRevenueRequest);
     
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
      table: 'expected_revenue',
      source: 'ExpectedRevenue',
      action : 'create',
      role: 'manage_expected_revenue',
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

		
  
  //--- Begin  expected_revenue inputs array ---// 
  const ExpectedRevenueInputsArr = {

    "revenue_month" : "?", 
    "client_id" : "?", 
    "deal_id" : "?", 
    "expected_amount" : "?", 
    "currency_code" : "?", 
    "payment_status" : "?", 
    "payment_ref_no" : "?", 
    "expected_close_date" : "?", 
    "probability_percent" : "?", 
    "revenue_source_type" : "?", 
    "revenue_title" : "?", 
    "invoice_id" : "?", 
    "lead_id" : "?", 
    "revenue_status" : "?", 
    "revenue_description" : "?", 
    "assigned_to" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End expected_revenue inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('expected_revenue',ExpectedRevenueInputsArr, ExpectedRevenueRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table ExpectedRevenue
      const result = await AddExpectedRevenue(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        expected_revenue_dataNode: result.record_id
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

export async function PUT(ExpectedRevenueRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ExpectedRevenueRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ExpectedRevenueRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ExpectedRevenueRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ExpectedRevenueRequest);
     
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
      table: 'expected_revenue',
      source: 'ExpectedRevenue',
      action : 'update',
      role: 'manage_expected_revenue',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ExpectedRevenueFormAction = body.expected_revenue_mosy_action;
    const expected_revenue_dataNode_value = base64Decode(body.expected_revenue_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  expected_revenue inputs array ---// 
  const ExpectedRevenueInputsArr = {

    "revenue_month" : "?", 
    "client_id" : "?", 
    "deal_id" : "?", 
    "expected_amount" : "?", 
    "currency_code" : "?", 
    "payment_status" : "?", 
    "payment_ref_no" : "?", 
    "expected_close_date" : "?", 
    "probability_percent" : "?", 
    "revenue_source_type" : "?", 
    "revenue_title" : "?", 
    "invoice_id" : "?", 
    "lead_id" : "?", 
    "revenue_status" : "?", 
    "revenue_description" : "?", 
    "assigned_to" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End expected_revenue inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('expected_revenue',ExpectedRevenueInputsArr, ExpectedRevenueRequest, newId, authData)
       
      // update table ExpectedRevenue
      const result = await UpdateExpectedRevenue(newId, mutatedDataArray, body, authData, `primkey='${expected_revenue_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        expected_revenue_dataNode: expected_revenue_dataNode_value
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


