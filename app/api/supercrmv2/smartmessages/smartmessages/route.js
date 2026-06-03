
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { SmartMessagesBatchMutations } from './SmartMessagesBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddSmartMessages, UpdateSmartMessages } from './SmartMessagesDbGateway';

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
      table: 'smart_messages',
      source: 'SmartMessages',
      action : 'select',
      role: 'view_smart_messages',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // smart_messages column DictionaryMap
  const SmartMessagesColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    messageNumber : "message_number", 
    relatedRecordId : "related_record_id", 
    recipientName : "recipient_name", 
    recipientPhone : "recipient_phone", 
    recipientEmail : "recipient_email", 
    messageChannel : "message_channel", 
    messageSubject : "message_subject", 
    messageContent : "message_content", 
    messageStatus : "message_status", 
    deliveryStatus : "delivery_status", 
    requestSource : "request_source", 
    requestId : "request_id", 
    sentBy : "sent_by", 
    scheduledFor : "scheduled_for", 
    sentOn : "sent_on", 
    deliveredOn : "delivered_on", 
    readOn : "read_on", 
    failedOn : "failed_on", 
    failureReason : "failure_reason", 
    createdOn : "created_on", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `smart_messages`,
      recordIdColumn: `record_id`,
      dictionary: SmartMessagesColumnDictionary,
      searchParams,
      authData,
      batchMutations: SmartMessagesBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'SmartMessages data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET SmartMessages failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(SmartMessagesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartMessagesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartMessagesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartMessagesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartMessagesRequest);
     
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
      table: 'smart_messages',
      source: 'SmartMessages',
      action : 'create',
      role: 'manage_smart_messages',
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

		
  
  //--- Begin  smart_messages inputs array ---// 
  const SmartMessagesInputsArr = {

    "message_number" : "?", 
    "related_record_id" : "?", 
    "recipient_name" : "?", 
    "recipient_phone" : "?", 
    "recipient_email" : "?", 
    "message_channel" : "?", 
    "message_subject" : "?", 
    "message_content" : "?", 
    "message_status" : "?", 
    "delivery_status" : "?", 
    "request_source" : "?", 
    "request_id" : "?", 
    "sent_by" : "?", 
    "scheduled_for" : "?", 
    "sent_on" : "?", 
    "delivered_on" : "?", 
    "read_on" : "?", 
    "failed_on" : "?", 
    "failure_reason" : "?", 
    "created_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_messages inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_messages',SmartMessagesInputsArr, SmartMessagesRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table SmartMessages
      const result = await AddSmartMessages(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        smart_messages_dataNode: result.record_id
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

export async function PUT(SmartMessagesRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = SmartMessagesRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await SmartMessagesRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await SmartMessagesRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(SmartMessagesRequest);
     
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
      table: 'smart_messages',
      source: 'SmartMessages',
      action : 'update',
      role: 'manage_smart_messages',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const SmartMessagesFormAction = body.smart_messages_mosy_action;
    const smart_messages_dataNode_value = base64Decode(body.smart_messages_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  smart_messages inputs array ---// 
  const SmartMessagesInputsArr = {

    "message_number" : "?", 
    "related_record_id" : "?", 
    "recipient_name" : "?", 
    "recipient_phone" : "?", 
    "recipient_email" : "?", 
    "message_channel" : "?", 
    "message_subject" : "?", 
    "message_content" : "?", 
    "message_status" : "?", 
    "delivery_status" : "?", 
    "request_source" : "?", 
    "request_id" : "?", 
    "sent_by" : "?", 
    "scheduled_for" : "?", 
    "sent_on" : "?", 
    "delivered_on" : "?", 
    "read_on" : "?", 
    "failed_on" : "?", 
    "failure_reason" : "?", 
    "created_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End smart_messages inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('smart_messages',SmartMessagesInputsArr, SmartMessagesRequest, newId, authData)
       
      // update table SmartMessages
      const result = await UpdateSmartMessages(newId, mutatedDataArray, body, authData, `primkey='${smart_messages_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        smart_messages_dataNode: smart_messages_dataNode_value
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


