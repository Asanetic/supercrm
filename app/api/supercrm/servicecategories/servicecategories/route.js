
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ServiceCategoriesBatchMutations } from './ServiceCategoriesBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddServiceCategories, UpdateServiceCategories } from './ServiceCategoriesDbGateway';

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
      table: 'service_categories',
      source: 'ServiceCategories',
      action : 'select',
      role: 'view_service_categories',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // service_categories column DictionaryMap
  const ServiceCategoriesColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    categoryName : "category_name", 
    categoryDescription : "category_description", 
    parentCategoryId : "parent_category_id", 
    categoryImage : "category_image", 
    categoryStatus : "category_status", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `service_categories`,
      recordIdColumn: `record_id`,
      dictionary: ServiceCategoriesColumnDictionary,
      searchParams,
      authData,
      batchMutations: ServiceCategoriesBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'ServiceCategories data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET ServiceCategories failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ServiceCategoriesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ServiceCategoriesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ServiceCategoriesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ServiceCategoriesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ServiceCategoriesRequest);
     
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
      table: 'service_categories',
      source: 'ServiceCategories',
      action : 'create',
      role: 'manage_service_categories',
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

		
  
  //--- Begin  service_categories inputs array ---// 
  const ServiceCategoriesInputsArr = {

    "category_name" : "?", 
    "category_description" : "?", 
    "parent_category_id" : "?", 
    "category_image" : "?", 
    "category_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End service_categories inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('service_categories',ServiceCategoriesInputsArr, ServiceCategoriesRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table ServiceCategories
      const result = await AddServiceCategories(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        service_categories_dataNode: result.record_id
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

export async function PUT(ServiceCategoriesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ServiceCategoriesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ServiceCategoriesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ServiceCategoriesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ServiceCategoriesRequest);
     
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
      table: 'service_categories',
      source: 'ServiceCategories',
      action : 'update',
      role: 'manage_service_categories',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ServiceCategoriesFormAction = body.service_categories_mosy_action;
    const service_categories_dataNode_value = base64Decode(body.service_categories_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  service_categories inputs array ---// 
  const ServiceCategoriesInputsArr = {

    "category_name" : "?", 
    "category_description" : "?", 
    "parent_category_id" : "?", 
    "category_image" : "?", 
    "category_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End service_categories inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('service_categories',ServiceCategoriesInputsArr, ServiceCategoriesRequest, newId, authData)
       
      // update table ServiceCategories
      const result = await UpdateServiceCategories(newId, mutatedDataArray, body, authData, `primkey='${service_categories_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        service_categories_dataNode: service_categories_dataNode_value
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


