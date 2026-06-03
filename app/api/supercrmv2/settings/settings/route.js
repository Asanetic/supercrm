
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SettingsBatchMutations } from './SettingsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSettings, UpdateSettings } from './SettingsDbGateway';

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
      table: 'settings',
      source: 'Settings',
      action : 'select',
      role: 'view_settings',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // settings column DictionaryMap
  const SettingsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    approvalLevels : "approval_levels", 
    defaultCurrency : "default_currency", 
    smsNotifications : "sms_notifications", 
    emailNotifications : "email_notifications", 
    allowPartialPayments : "allow_partial_payments", 
    allowPartialRecoveries : "allow_partial_recoveries", 
    autoGenerateRequestNumbers : "auto_generate_request_numbers", 
    defaultApprovalWorkflow : "default_approval_workflow", 
    systemStatus : "system_status", 
    settingRemarks : "setting_remarks", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `settings`,
      recordIdColumn: `record_id`,
      dictionary: SettingsColumnDictionary,
      searchParams,
      authData,
      batchMutations: SettingsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Settings data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Settings failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SettingsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SettingsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SettingsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SettingsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SettingsRequest);
     
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
      table: 'settings',
      source: 'Settings',
      action : 'create',
      role: 'manage_settings',
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

		
  
  //--- Begin  settings inputs array ---// 
  const SettingsInputsArr = {

    "approval_levels" : "?", 
    "default_currency" : "?", 
    "sms_notifications" : "?", 
    "email_notifications" : "?", 
    "allow_partial_payments" : "?", 
    "allow_partial_recoveries" : "?", 
    "auto_generate_request_numbers" : "?", 
    "default_approval_workflow" : "?", 
    "system_status" : "?", 
    "setting_remarks" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End settings inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('settings',SettingsInputsArr, SettingsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Settings
      const result = await AddSettings(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        settings_dataNode: result.record_id
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

export async function PUT(SettingsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SettingsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SettingsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SettingsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SettingsRequest);
     
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
      table: 'settings',
      source: 'Settings',
      action : 'update',
      role: 'manage_settings',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SettingsFormAction = body.settings_mosy_action;
    const settings_dataNode_value = base64Decode(body.settings_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  settings inputs array ---// 
  const SettingsInputsArr = {

    "approval_levels" : "?", 
    "default_currency" : "?", 
    "sms_notifications" : "?", 
    "email_notifications" : "?", 
    "allow_partial_payments" : "?", 
    "allow_partial_recoveries" : "?", 
    "auto_generate_request_numbers" : "?", 
    "default_approval_workflow" : "?", 
    "system_status" : "?", 
    "setting_remarks" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End settings inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('settings',SettingsInputsArr, SettingsRequest, newId, authData)
       
      // update table Settings
      const result = await UpdateSettings(newId, mutatedDataArray, body, authData, `primkey='${settings_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        settings_dataNode: settings_dataNode_value
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


