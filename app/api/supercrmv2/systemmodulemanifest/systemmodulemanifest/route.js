
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SystemModuleManifestBatchMutations } from './SystemModuleManifestBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSystemModuleManifest, UpdateSystemModuleManifest } from './SystemModuleManifestDbGateway';

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
      table: 'system_module_manifest_',
      source: 'SystemModuleManifest',
      action : 'select',
      role: 'view_system_module_manifest_',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // system_module_manifest_ column DictionaryMap
  const SystemModuleManifestColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    componentName : "component_name", 
    moduleKey : "module_key", 
    moduleName : "module_name", 
    permissionType : "permission_type", 
    capabilityKey : "capability_key", 
    accessName : "access_name", 
    relativePath : "relative_path", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `system_module_manifest_`,
      recordIdColumn: `record_id`,
      dictionary: SystemModuleManifestColumnDictionary,
      searchParams,
      authData,
      batchMutations: SystemModuleManifestBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SystemModuleManifest data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SystemModuleManifest failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SystemModuleManifestRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SystemModuleManifestRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SystemModuleManifestRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SystemModuleManifestRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SystemModuleManifestRequest);
     
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
      table: 'system_module_manifest_',
      source: 'SystemModuleManifest',
      action : 'create',
      role: 'manage_system_module_manifest_',
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

		
  
  //--- Begin  system_module_manifest_ inputs array ---// 
  const SystemModuleManifestInputsArr = {

    "component_name" : "?", 
    "module_key" : "?", 
    "module_name" : "?", 
    "permission_type" : "?", 
    "capability_key" : "?", 
    "access_name" : "?", 
    "relative_path" : "?", 

  };

  //--- End system_module_manifest_ inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('system_module_manifest_',SystemModuleManifestInputsArr, SystemModuleManifestRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SystemModuleManifest
      const result = await AddSystemModuleManifest(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        system_module_manifest__dataNode: result.record_id
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

export async function PUT(SystemModuleManifestRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SystemModuleManifestRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SystemModuleManifestRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SystemModuleManifestRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SystemModuleManifestRequest);
     
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
      table: 'system_module_manifest_',
      source: 'SystemModuleManifest',
      action : 'update',
      role: 'manage_system_module_manifest_',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SystemModuleManifestFormAction = body.system_module_manifest__mosy_action;
    const system_module_manifest__dataNode_value = base64Decode(body.system_module_manifest__dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  system_module_manifest_ inputs array ---// 
  const SystemModuleManifestInputsArr = {

    "component_name" : "?", 
    "module_key" : "?", 
    "module_name" : "?", 
    "permission_type" : "?", 
    "capability_key" : "?", 
    "access_name" : "?", 
    "relative_path" : "?", 

  };

  //--- End system_module_manifest_ inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('system_module_manifest_',SystemModuleManifestInputsArr, SystemModuleManifestRequest, newId, authData)
       
      // update table SystemModuleManifest
      const result = await UpdateSystemModuleManifest(newId, mutatedDataArray, body, authData, `primkey='${system_module_manifest__dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        system_module_manifest__dataNode: system_module_manifest__dataNode_value
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


