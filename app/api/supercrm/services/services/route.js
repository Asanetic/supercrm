
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ServicesBatchMutations } from './ServicesBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddServices, UpdateServices } from './ServicesDbGateway';

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
      table: 'services',
      source: 'Services',
      action : 'select',
      role: 'view_services',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // services column DictionaryMap
  const ServicesColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    serviceName : "service_name", 
    serviceCode : "service_code", 
    serviceCategoryId : "service_category_id", 
    serviceDescription : "service_description", 
    serviceImage : "service_image", 
    servicePrice : "service_price", 
    estimatedDuration : "estimated_duration", 
    billingType : "billing_type", 
    serviceStatus : "service_status", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `services`,
      recordIdColumn: `record_id`,
      dictionary: ServicesColumnDictionary,
      searchParams,
      authData,
      batchMutations: ServicesBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Services data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Services failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ServicesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ServicesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ServicesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ServicesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ServicesRequest);
     
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
      table: 'services',
      source: 'Services',
      action : 'create',
      role: 'manage_services',
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

		
  
  //--- Begin  services inputs array ---// 
  const ServicesInputsArr = {

    "service_name" : "?", 
    "service_code" : "?", 
    "service_category_id" : "?", 
    "service_description" : "?", 
    "service_image" : "?", 
    "service_price" : "?", 
    "estimated_duration" : "?", 
    "billing_type" : "?", 
    "service_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End services inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('services',ServicesInputsArr, ServicesRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Services
      const result = await AddServices(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for service_image, if any
                if (body.fileservices_service_image) {
                  if(body["fileservices_service_image"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileservices_service_image"], "media/services");
                    
                    ServicesInputsArr.service_image = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateServices(newId, { service_image: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_services_service_image;
                      
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
        services_dataNode: result.record_id
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

export async function PUT(ServicesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ServicesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ServicesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ServicesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ServicesRequest);
     
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
      table: 'services',
      source: 'Services',
      action : 'update',
      role: 'manage_services',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ServicesFormAction = body.services_mosy_action;
    const services_dataNode_value = base64Decode(body.services_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  services inputs array ---// 
  const ServicesInputsArr = {

    "service_name" : "?", 
    "service_code" : "?", 
    "service_category_id" : "?", 
    "service_description" : "?", 
    "service_image" : "?", 
    "service_price" : "?", 
    "estimated_duration" : "?", 
    "billing_type" : "?", 
    "service_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End services inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('services',ServicesInputsArr, ServicesRequest, newId, authData)
       
      // update table Services
      const result = await UpdateServices(newId, mutatedDataArray, body, authData, `primkey='${services_dataNode_value}'`)

      
                // Now handle the file upload for service_image, if any
                if (body.fileservices_service_image) {
                  if(body["fileservices_service_image"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileservices_service_image"], "media/services");
                    
                    ServicesInputsArr.service_image = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateServices(newId, { service_image: filePath }, body, authData,  `primkey='${services_dataNode_value}'`)
                    
                    let fileToDelete = body.media_services_service_image;
                      
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
        services_dataNode: services_dataNode_value
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


