
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SmartMessageTemplatesBatchMutations } from './SmartMessageTemplatesBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSmartMessageTemplates, UpdateSmartMessageTemplates } from './SmartMessageTemplatesDbGateway';

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
      table: 'smart_message_templates',
      source: 'SmartMessageTemplates',
      action : 'select',
      role: 'view_smart_message_templates',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // smart_message_templates column DictionaryMap
  const SmartMessageTemplatesColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    templateName : "template_name", 
    templateCode : "template_code", 
    templateCategory : "template_category", 
    messageChannel : "message_channel", 
    subject : "subject", 
    messageContent : "message_content", 
    templateStatus : "template_status", 
    createdBy : "created_by", 
    lastUpdatedBy : "last_updated_by", 
    createdOn : "created_on", 
    updatedOn : "updated_on", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `smart_message_templates`,
      recordIdColumn: `record_id`,
      dictionary: SmartMessageTemplatesColumnDictionary,
      searchParams,
      authData,
      batchMutations: SmartMessageTemplatesBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SmartMessageTemplates data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SmartMessageTemplates failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SmartMessageTemplatesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartMessageTemplatesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartMessageTemplatesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartMessageTemplatesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartMessageTemplatesRequest);
     
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
      table: 'smart_message_templates',
      source: 'SmartMessageTemplates',
      action : 'create',
      role: 'manage_smart_message_templates',
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

		
  
  //--- Begin  smart_message_templates inputs array ---// 
  const SmartMessageTemplatesInputsArr = {

    "template_name" : "?", 
    "template_code" : "?", 
    "template_category" : "?", 
    "message_channel" : "?", 
    "subject" : "?", 
    "message_content" : "?", 
    "template_status" : "?", 
    "created_by" : "?", 
    "last_updated_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_message_templates inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_message_templates',SmartMessageTemplatesInputsArr, SmartMessageTemplatesRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SmartMessageTemplates
      const result = await AddSmartMessageTemplates(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        smart_message_templates_dataNode: result.record_id
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

export async function PUT(SmartMessageTemplatesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartMessageTemplatesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartMessageTemplatesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartMessageTemplatesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartMessageTemplatesRequest);
     
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
      table: 'smart_message_templates',
      source: 'SmartMessageTemplates',
      action : 'update',
      role: 'manage_smart_message_templates',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SmartMessageTemplatesFormAction = body.smart_message_templates_mosy_action;
    const smart_message_templates_dataNode_value = base64Decode(body.smart_message_templates_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  smart_message_templates inputs array ---// 
  const SmartMessageTemplatesInputsArr = {

    "template_name" : "?", 
    "template_code" : "?", 
    "template_category" : "?", 
    "message_channel" : "?", 
    "subject" : "?", 
    "message_content" : "?", 
    "template_status" : "?", 
    "created_by" : "?", 
    "last_updated_by" : "?", 
    "created_on" : "?", 
    "updated_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_message_templates inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_message_templates',SmartMessageTemplatesInputsArr, SmartMessageTemplatesRequest, newId, authData)
       
      // update table SmartMessageTemplates
      const result = await UpdateSmartMessageTemplates(newId, mutatedDataArray, body, authData, `primkey='${smart_message_templates_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        smart_message_templates_dataNode: smart_message_templates_dataNode_value
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


