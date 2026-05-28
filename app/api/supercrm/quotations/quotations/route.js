
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { QuotationsBatchMutations } from './QuotationsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddQuotations, UpdateQuotations } from './QuotationsDbGateway';

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
      table: 'quotations',
      source: 'Quotations',
      action : 'select',
      role: 'view_quotations',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // quotations column DictionaryMap
  const QuotationsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    quotationNumber : "quotation_number", 
    quotationTitle : "quotation_title", 
    quotationDescription : "quotation_description", 
    clientId : "client_id", 
    dealId : "deal_id", 
    quotationAmount : "quotation_amount", 
    taxAmount : "tax_amount", 
    discountAmount : "discount_amount", 
    quotationStatus : "quotation_status", 
    quotationIssuedOn : "quotation_issued_on", 
    quotationExpiryDate : "quotation_expiry_date", 
    quotationNotes : "quotation_notes", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `quotations`,
      recordIdColumn: `record_id`,
      dictionary: QuotationsColumnDictionary,
      searchParams,
      authData,
      batchMutations: QuotationsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Quotations data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Quotations failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(QuotationsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = QuotationsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await QuotationsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await QuotationsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(QuotationsRequest);
     
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
      table: 'quotations',
      source: 'Quotations',
      action : 'create',
      role: 'manage_quotations',
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

		
  
  //--- Begin  quotations inputs array ---// 
  const QuotationsInputsArr = {

    "quotation_number" : "?", 
    "quotation_title" : "?", 
    "quotation_description" : "?", 
    "client_id" : "?", 
    "deal_id" : "?", 
    "quotation_amount" : "?", 
    "tax_amount" : "?", 
    "discount_amount" : "?", 
    "quotation_status" : "?", 
    "quotation_issued_on" : "?", 
    "quotation_expiry_date" : "?", 
    "quotation_notes" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End quotations inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('quotations',QuotationsInputsArr, QuotationsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Quotations
      const result = await AddQuotations(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        quotations_dataNode: result.record_id
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

export async function PUT(QuotationsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = QuotationsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await QuotationsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await QuotationsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(QuotationsRequest);
     
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
      table: 'quotations',
      source: 'Quotations',
      action : 'update',
      role: 'manage_quotations',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const QuotationsFormAction = body.quotations_mosy_action;
    const quotations_dataNode_value = base64Decode(body.quotations_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  quotations inputs array ---// 
  const QuotationsInputsArr = {

    "quotation_number" : "?", 
    "quotation_title" : "?", 
    "quotation_description" : "?", 
    "client_id" : "?", 
    "deal_id" : "?", 
    "quotation_amount" : "?", 
    "tax_amount" : "?", 
    "discount_amount" : "?", 
    "quotation_status" : "?", 
    "quotation_issued_on" : "?", 
    "quotation_expiry_date" : "?", 
    "quotation_notes" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End quotations inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('quotations',QuotationsInputsArr, QuotationsRequest, newId, authData)
       
      // update table Quotations
      const result = await UpdateQuotations(newId, mutatedDataArray, body, authData, `primkey='${quotations_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        quotations_dataNode: quotations_dataNode_value
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


