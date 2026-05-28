
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { LeadsBatchMutations } from './LeadsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddLeads, UpdateLeads } from './LeadsDbGateway';

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
      table: 'leads',
      source: 'Leads',
      action : 'select',
      role: 'view_leads',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // leads column DictionaryMap
  const LeadsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    leadTitle : "lead_title", 
    fullName : "full_name", 
    businessName : "business_name", 
    phoneNumber : "phone_number", 
    alternativePhoneNumber : "alternative_phone_number", 
    emailAddress : "email_address", 
    websiteUrl : "website_url", 
    industryType : "industry_type", 
    leadSource : "lead_source", 
    leadStatus : "lead_status", 
    leadTemperature : "lead_temperature", 
    assignedSalesRep : "assigned_sales_rep", 
    estimatedDealValue : "estimated_deal_value", 
    expectedConversionDate : "expected_conversion_date", 
    countryName : "country_name", 
    cityName : "city_name", 
    businessAddress : "business_address", 
    notes : "notes", 
    nextFollowUpDate : "next_follow_up_date", 
    lastContactDate : "last_contact_date", 
    profilePhoto : "profile_photo", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `leads`,
      recordIdColumn: `record_id`,
      dictionary: LeadsColumnDictionary,
      searchParams,
      authData,
      batchMutations: LeadsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Leads data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Leads failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(LeadsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = LeadsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await LeadsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await LeadsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(LeadsRequest);
     
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
      table: 'leads',
      source: 'Leads',
      action : 'create',
      role: 'manage_leads',
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

		
  
  //--- Begin  leads inputs array ---// 
  const LeadsInputsArr = {

    "lead_title" : "?", 
    "full_name" : "?", 
    "business_name" : "?", 
    "phone_number" : "?", 
    "alternative_phone_number" : "?", 
    "email_address" : "?", 
    "website_url" : "?", 
    "industry_type" : "?", 
    "lead_source" : "?", 
    "lead_status" : "?", 
    "lead_temperature" : "?", 
    "assigned_sales_rep" : "?", 
    "estimated_deal_value" : "?", 
    "expected_conversion_date" : "?", 
    "country_name" : "?", 
    "city_name" : "?", 
    "business_address" : "?", 
    "notes" : "?", 
    "next_follow_up_date" : "?", 
    "last_contact_date" : "?", 
    "profile_photo" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End leads inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('leads',LeadsInputsArr, LeadsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Leads
      const result = await AddLeads(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for profile_photo, if any
                if (body.fileleads_profile_photo) {
                  if(body["fileleads_profile_photo"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileleads_profile_photo"], "media/leads");
                    
                    LeadsInputsArr.profile_photo = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateLeads(newId, { profile_photo: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_leads_profile_photo;
                      
                    //Delete file if need be

                  } catch (fileErr) {
                    console.error("File upload failed:", fileErr);
                    // You can either handle this error or return a partial success message
                  }
                }
               }

      return Response.json({
        status: 'success',
        message: result.message,
        leads_dataNode: result.record_id
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

export async function PUT(LeadsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = LeadsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await LeadsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await LeadsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(LeadsRequest);
     
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
      table: 'leads',
      source: 'Leads',
      action : 'update',
      role: 'manage_leads',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const LeadsFormAction = body.leads_mosy_action;
    const leads_dataNode_value = base64Decode(body.leads_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  leads inputs array ---// 
  const LeadsInputsArr = {

    "lead_title" : "?", 
    "full_name" : "?", 
    "business_name" : "?", 
    "phone_number" : "?", 
    "alternative_phone_number" : "?", 
    "email_address" : "?", 
    "website_url" : "?", 
    "industry_type" : "?", 
    "lead_source" : "?", 
    "lead_status" : "?", 
    "lead_temperature" : "?", 
    "assigned_sales_rep" : "?", 
    "estimated_deal_value" : "?", 
    "expected_conversion_date" : "?", 
    "country_name" : "?", 
    "city_name" : "?", 
    "business_address" : "?", 
    "notes" : "?", 
    "next_follow_up_date" : "?", 
    "last_contact_date" : "?", 
    "profile_photo" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End leads inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('leads',LeadsInputsArr, LeadsRequest, newId, authData)
       
      // update table Leads
      const result = await UpdateLeads(newId, mutatedDataArray, body, authData, `primkey='${leads_dataNode_value}'`)

      
                // Now handle the file upload for profile_photo, if any
                if (body.fileleads_profile_photo) {
                  if(body["fileleads_profile_photo"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileleads_profile_photo"], "media/leads");
                    
                    LeadsInputsArr.profile_photo = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateLeads(newId, { profile_photo: filePath }, body, authData,  `primkey='${leads_dataNode_value}'`)
                    
                    let fileToDelete = body.media_leads_profile_photo;
                      
                    //Delete old file
mosyDeleteFile(fileToDelete);
// Log or store deleted file: fileToDelete

                  } catch (fileErr) {
                    console.error("File upload failed:", fileErr);
                    // You can either handle this error or return a partial success message
                  }
                }
               }

      return Response.json({
        status: 'success',
        message: result.message,
        leads_dataNode: leads_dataNode_value
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


