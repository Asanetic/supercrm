
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { StaffBatchMutations } from './StaffBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddStaff, UpdateStaff } from './StaffDbGateway';

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
      table: 'staff',
      source: 'Staff',
      action : 'select',
      role: 'view_staff',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // staff column DictionaryMap
  const StaffColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    fullName : "full_name", 
    staffNumber : "staff_number", 
    phoneNumber : "phone_number", 
    emailAddress : "email_address", 
    department : "department", 
    position : "position", 
    advanceLimit : "advance_limit", 
    currentOutstandingBalance : "current_outstanding_balance", 
    staffStatus : "staff_status", 
    registeredOn : "registered_on", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `staff`,
      recordIdColumn: `record_id`,
      dictionary: StaffColumnDictionary,
      searchParams,
      authData,
      batchMutations: StaffBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Staff data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Staff failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(StaffRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = StaffRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await StaffRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await StaffRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(StaffRequest);
     
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
      table: 'staff',
      source: 'Staff',
      action : 'create',
      role: 'manage_staff',
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

		
  
  //--- Begin  staff inputs array ---// 
  const StaffInputsArr = {

    "full_name" : "?", 
    "staff_number" : "?", 
    "phone_number" : "?", 
    "email_address" : "?", 
    "department" : "?", 
    "position" : "?", 
    "advance_limit" : "?", 
    "current_outstanding_balance" : "?", 
    "staff_status" : "?", 
    "registered_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End staff inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('staff',StaffInputsArr, StaffRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Staff
      const result = await AddStaff(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        staff_dataNode: result.record_id
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

export async function PUT(StaffRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = StaffRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await StaffRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await StaffRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(StaffRequest);
     
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
      table: 'staff',
      source: 'Staff',
      action : 'update',
      role: 'manage_staff',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const StaffFormAction = body.staff_mosy_action;
    const staff_dataNode_value = base64Decode(body.staff_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  staff inputs array ---// 
  const StaffInputsArr = {

    "full_name" : "?", 
    "staff_number" : "?", 
    "phone_number" : "?", 
    "email_address" : "?", 
    "department" : "?", 
    "position" : "?", 
    "advance_limit" : "?", 
    "current_outstanding_balance" : "?", 
    "staff_status" : "?", 
    "registered_on" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End staff inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('staff',StaffInputsArr, StaffRequest, newId, authData)
       
      // update table Staff
      const result = await UpdateStaff(newId, mutatedDataArray, body, authData, `primkey='${staff_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        staff_dataNode: staff_dataNode_value
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


