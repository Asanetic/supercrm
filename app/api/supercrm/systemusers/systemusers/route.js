
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SystemUsersBatchMutations } from './SystemUsersBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSystemUsers, UpdateSystemUsers } from './SystemUsersDbGateway';

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
      table: 'system_users',
      source: 'SystemUsers',
      action : 'select',
      role: 'view_system_users',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // system_users column DictionaryMap
  const SystemUsersColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    name : "name", 
    email : "email", 
    tel : "tel", 
    loginPassword : "login_password", 
    refId : "ref_id", 
    regdate : "regdate", 
    userNo : "user_no", 
    userPic : "user_pic", 
    userGender : "user_gender", 
    lastSeen : "last_seen", 
    about : "about", 
    authToken : "auth_token", 
    tokenStatus : "token_status", 
    tokenExpiringIn : "token_expiring_in", 
    projectId : "project_id", 
    projectName : "project_name", 
    userRole : "user_role", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `system_users`,
      recordIdColumn: `record_id`,
      dictionary: SystemUsersColumnDictionary,
      searchParams,
      authData,
      batchMutations: SystemUsersBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SystemUsers data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SystemUsers failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SystemUsersRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SystemUsersRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SystemUsersRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SystemUsersRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SystemUsersRequest);
     
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
      table: 'system_users',
      source: 'SystemUsers',
      action : 'create',
      role: 'manage_system_users',
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

		
  
  //--- Begin  system_users inputs array ---// 
  const SystemUsersInputsArr = {

    "name" : "?", 
    "email" : "?", 
    "tel" : "?", 
    "login_password" : "?", 
    "ref_id" : "?", 
    "regdate" : "?", 
    "user_no" : "?", 
    "user_pic" : "?", 
    "user_gender" : "?", 
    "last_seen" : "?", 
    "about" : "?", 
    "auth_token" : "?", 
    "token_status" : "?", 
    "token_expiring_in" : "?", 
    "project_id" : "?", 
    "project_name" : "?", 
    "user_role" : "?", 

  };

  //--- End system_users inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('system_users',SystemUsersInputsArr, SystemUsersRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SystemUsers
      const result = await AddSystemUsers(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        system_users_dataNode: result.record_id
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

export async function PUT(SystemUsersRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SystemUsersRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SystemUsersRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SystemUsersRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SystemUsersRequest);
     
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
      table: 'system_users',
      source: 'SystemUsers',
      action : 'update',
      role: 'manage_system_users',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SystemUsersFormAction = body.system_users_mosy_action;
    const system_users_dataNode_value = base64Decode(body.system_users_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  system_users inputs array ---// 
  const SystemUsersInputsArr = {

    "name" : "?", 
    "email" : "?", 
    "tel" : "?", 
    "login_password" : "?", 
    "ref_id" : "?", 
    "regdate" : "?", 
    "user_no" : "?", 
    "user_pic" : "?", 
    "user_gender" : "?", 
    "last_seen" : "?", 
    "about" : "?", 
    "auth_token" : "?", 
    "token_status" : "?", 
    "token_expiring_in" : "?", 
    "project_id" : "?", 
    "project_name" : "?", 
    "user_role" : "?", 

  };

  //--- End system_users inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('system_users',SystemUsersInputsArr, SystemUsersRequest, newId, authData)
       
      // update table SystemUsers
      const result = await UpdateSystemUsers(newId, mutatedDataArray, body, authData, `primkey='${system_users_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        system_users_dataNode: system_users_dataNode_value
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


