
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { MosySqlRollBackBatchMutations } from './MosySqlRollBackBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddMosySqlRollBack, UpdateMosySqlRollBack } from './MosySqlRollBackDbGateway';

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
      table: 'mosy_sql_roll_back',
      source: 'MosySqlRollBack',
      action : 'select',
      role: 'view_mosy_sql_roll_back',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // mosy_sql_roll_back column DictionaryMap
  const MosySqlRollBackColumnDictionary={

    Node : "primkey", 
    NodeId : "roll_bk_key", 
    rollBkKey : "roll_bk_key", 
    tableName : "table_name", 
    rollType : "roll_type", 
    whereStr : "where_str", 
    rollTimestamp : "roll_timestamp", 
    valueEntries : "value_entries", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `mosy_sql_roll_back`,
      recordIdColumn: `roll_bk_key`,
      dictionary: MosySqlRollBackColumnDictionary,
      searchParams,
      authData,
      batchMutations: MosySqlRollBackBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'MosySqlRollBack data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET MosySqlRollBack failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(MosySqlRollBackRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = MosySqlRollBackRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await MosySqlRollBackRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await MosySqlRollBackRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(MosySqlRollBackRequest);
     
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
      table: 'mosy_sql_roll_back',
      source: 'MosySqlRollBack',
      action : 'create',
      role: 'manage_mosy_sql_roll_back',
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

		
  
  //--- Begin  mosy_sql_roll_back inputs array ---// 
  const MosySqlRollBackInputsArr = {

    "table_name" : "?", 
    "roll_type" : "?", 
    "where_str" : "?", 
    "roll_timestamp" : "?", 
    "value_entries" : "?", 

  };

  //--- End mosy_sql_roll_back inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('mosy_sql_roll_back',MosySqlRollBackInputsArr, MosySqlRollBackRequest, newId, authData)

      
      mutatedDataArray.roll_bk_key = newId;
      
      // Insert into table MosySqlRollBack
      const result = await AddMosySqlRollBack(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        mosy_sql_roll_back_dataNode: result.record_id
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

export async function PUT(MosySqlRollBackRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = MosySqlRollBackRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await MosySqlRollBackRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await MosySqlRollBackRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(MosySqlRollBackRequest);
     
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
      table: 'mosy_sql_roll_back',
      source: 'MosySqlRollBack',
      action : 'update',
      role: 'manage_mosy_sql_roll_back',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const MosySqlRollBackFormAction = body.mosy_sql_roll_back_mosy_action;
    const mosy_sql_roll_back_dataNode_value = base64Decode(body.mosy_sql_roll_back_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  mosy_sql_roll_back inputs array ---// 
  const MosySqlRollBackInputsArr = {

    "table_name" : "?", 
    "roll_type" : "?", 
    "where_str" : "?", 
    "roll_timestamp" : "?", 
    "value_entries" : "?", 

  };

  //--- End mosy_sql_roll_back inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('mosy_sql_roll_back',MosySqlRollBackInputsArr, MosySqlRollBackRequest, newId, authData)
       
      // update table MosySqlRollBack
      const result = await UpdateMosySqlRollBack(newId, mutatedDataArray, body, authData, `primkey='${mosy_sql_roll_back_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        mosy_sql_roll_back_dataNode: mosy_sql_roll_back_dataNode_value
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


