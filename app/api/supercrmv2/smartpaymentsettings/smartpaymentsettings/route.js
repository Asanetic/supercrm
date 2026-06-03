
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SmartPaymentSettingsBatchMutations } from './SmartPaymentSettingsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSmartPaymentSettings, UpdateSmartPaymentSettings } from './SmartPaymentSettingsDbGateway';

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
      table: 'smart_payment_settings',
      source: 'SmartPaymentSettings',
      action : 'select',
      role: 'view_smart_payment_settings',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // smart_payment_settings column DictionaryMap
  const SmartPaymentSettingsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    settingName : "setting_name", 
    settingCode : "setting_code", 
    settingValue : "setting_value", 
    settingCategory : "setting_category", 
    settingStatus : "setting_status", 
    createdBy : "created_by", 
    lastUpdatedBy : "last_updated_by", 
    createdOn : "created_on", 
    updatedOn : "updated_on", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `smart_payment_settings`,
      recordIdColumn: `record_id`,
      dictionary: SmartPaymentSettingsColumnDictionary,
      searchParams,
      authData,
      batchMutations: SmartPaymentSettingsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SmartPaymentSettings data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SmartPaymentSettings failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SmartPaymentSettingsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartPaymentSettingsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartPaymentSettingsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartPaymentSettingsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartPaymentSettingsRequest);
     
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
      table: 'smart_payment_settings',
      source: 'SmartPaymentSettings',
      action : 'create',
      role: 'manage_smart_payment_settings',
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

		
  
  //--- Begin  smart_payment_settings inputs array ---// 
  const SmartPaymentSettingsInputsArr = {

    "setting_name" : "?", 
    "setting_code" : "?", 
    "setting_value" : "?", 
    "setting_category" : "?", 
    "setting_status" : "?", 
    "created_by" : "?", 
    "last_updated_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_payment_settings inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_payment_settings',SmartPaymentSettingsInputsArr, SmartPaymentSettingsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SmartPaymentSettings
      const result = await AddSmartPaymentSettings(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        smart_payment_settings_dataNode: result.record_id
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

export async function PUT(SmartPaymentSettingsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartPaymentSettingsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartPaymentSettingsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartPaymentSettingsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartPaymentSettingsRequest);
     
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
      table: 'smart_payment_settings',
      source: 'SmartPaymentSettings',
      action : 'update',
      role: 'manage_smart_payment_settings',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SmartPaymentSettingsFormAction = body.smart_payment_settings_mosy_action;
    const smart_payment_settings_dataNode_value = base64Decode(body.smart_payment_settings_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  smart_payment_settings inputs array ---// 
  const SmartPaymentSettingsInputsArr = {

    "setting_name" : "?", 
    "setting_code" : "?", 
    "setting_value" : "?", 
    "setting_category" : "?", 
    "setting_status" : "?", 
    "created_by" : "?", 
    "last_updated_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_payment_settings inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_payment_settings',SmartPaymentSettingsInputsArr, SmartPaymentSettingsRequest, newId, authData)
       
      // update table SmartPaymentSettings
      const result = await UpdateSmartPaymentSettings(newId, mutatedDataArray, body, authData, `primkey='${smart_payment_settings_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        smart_payment_settings_dataNode: smart_payment_settings_dataNode_value
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


