
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ProductCategoriesBatchMutations } from './ProductCategoriesBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddProductCategories, UpdateProductCategories } from './ProductCategoriesDbGateway';

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
      table: '',
      source: 'ProductCategories',
      action : 'select',
      role: 'view_',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    
    
    
    
    
   const result = await mosySecureSelect({
      table: ``,
      recordIdColumn: `record_id`,
      dictionary: ProductCategoriesColumnDictionary,
      searchParams,
      authData,
      batchMutations: ProductCategoriesBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'ProductCategories data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET ProductCategories failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ProductCategoriesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ProductCategoriesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ProductCategoriesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ProductCategoriesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ProductCategoriesRequest);
     
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
      table: '',
      source: 'ProductCategories',
      action : 'create',
      role: 'manage_',
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

		
    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('',ProductCategoriesInputsArr, ProductCategoriesRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table ProductCategories
      const result = await AddProductCategories(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        _dataNode: result.record_id
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

export async function PUT(ProductCategoriesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ProductCategoriesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ProductCategoriesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ProductCategoriesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ProductCategoriesRequest);
     
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
      table: '',
      source: 'ProductCategories',
      action : 'update',
      role: 'manage_',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ProductCategoriesFormAction = body._mosy_action;
    const _dataNode_value = base64Decode(body._dataNode);
    
    const newId = magicRandomStr(7);

		
    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('',ProductCategoriesInputsArr, ProductCategoriesRequest, newId, authData)
       
      // update table ProductCategories
      const result = await UpdateProductCategories(newId, mutatedDataArray, body, authData, `primkey='${_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        _dataNode: _dataNode_value
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


