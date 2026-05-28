
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ClientsBatchMutations } from './ClientsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddClients, UpdateClients } from './ClientsDbGateway';

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
      table: 'clients',
      source: 'Clients',
      action : 'select',
      role: 'view_clients',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // clients column DictionaryMap
  const ClientsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    fullName : "full_name", 
    businessName : "business_name", 
    phoneNumber : "phone_number", 
    alternativePhoneNumber : "alternative_phone_number", 
    emailAddress : "email_address", 
    websiteUrl : "website_url", 
    industryType : "industry_type", 
    leadSource : "lead_source", 
    countryName : "country_name", 
    cityName : "city_name", 
    clientStatus : "client_status", 
    assignedSalesRep : "assigned_sales_rep", 
    businessAddress : "business_address", 
    taxNumber : "tax_number", 
    profilePhoto : "profile_photo", 
    notes : "notes", 
    lastContactDate : "last_contact_date", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `clients`,
      recordIdColumn: `record_id`,
      dictionary: ClientsColumnDictionary,
      searchParams,
      authData,
      batchMutations: ClientsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Clients data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Clients failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ClientsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ClientsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ClientsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ClientsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ClientsRequest);
     
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
      table: 'clients',
      source: 'Clients',
      action : 'create',
      role: 'manage_clients',
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

		
  
  //--- Begin  clients inputs array ---// 
  const ClientsInputsArr = {

    "full_name" : "?", 
    "business_name" : "?", 
    "phone_number" : "?", 
    "alternative_phone_number" : "?", 
    "email_address" : "?", 
    "website_url" : "?", 
    "industry_type" : "?", 
    "lead_source" : "?", 
    "country_name" : "?", 
    "city_name" : "?", 
    "client_status" : "?", 
    "assigned_sales_rep" : "?", 
    "business_address" : "?", 
    "tax_number" : "?", 
    "profile_photo" : "?", 
    "notes" : "?", 
    "last_contact_date" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End clients inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('clients',ClientsInputsArr, ClientsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Clients
      const result = await AddClients(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for profile_photo, if any
                if (body.fileclients_profile_photo) {
                  if(body["fileclients_profile_photo"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileclients_profile_photo"], "media/clients");
                    
                    ClientsInputsArr.profile_photo = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateClients(newId, { profile_photo: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_clients_profile_photo;
                      
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
        clients_dataNode: result.record_id
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

export async function PUT(ClientsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ClientsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ClientsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ClientsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ClientsRequest);
     
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
      table: 'clients',
      source: 'Clients',
      action : 'update',
      role: 'manage_clients',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ClientsFormAction = body.clients_mosy_action;
    const clients_dataNode_value = base64Decode(body.clients_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  clients inputs array ---// 
  const ClientsInputsArr = {

    "full_name" : "?", 
    "business_name" : "?", 
    "phone_number" : "?", 
    "alternative_phone_number" : "?", 
    "email_address" : "?", 
    "website_url" : "?", 
    "industry_type" : "?", 
    "lead_source" : "?", 
    "country_name" : "?", 
    "city_name" : "?", 
    "client_status" : "?", 
    "assigned_sales_rep" : "?", 
    "business_address" : "?", 
    "tax_number" : "?", 
    "profile_photo" : "?", 
    "notes" : "?", 
    "last_contact_date" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End clients inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('clients',ClientsInputsArr, ClientsRequest, newId, authData)
       
      // update table Clients
      const result = await UpdateClients(newId, mutatedDataArray, body, authData, `primkey='${clients_dataNode_value}'`)

      
                // Now handle the file upload for profile_photo, if any
                if (body.fileclients_profile_photo) {
                  if(body["fileclients_profile_photo"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileclients_profile_photo"], "media/clients");
                    
                    ClientsInputsArr.profile_photo = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateClients(newId, { profile_photo: filePath }, body, authData,  `primkey='${clients_dataNode_value}'`)
                    
                    let fileToDelete = body.media_clients_profile_photo;
                      
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
        clients_dataNode: clients_dataNode_value
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


