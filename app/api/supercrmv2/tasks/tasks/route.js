
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { TasksBatchMutations } from './TasksBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddTasks, UpdateTasks } from './TasksDbGateway';

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
      table: 'tasks',
      source: 'Tasks',
      action : 'select',
      role: 'view_tasks',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // tasks column DictionaryMap
  const TasksColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    taskTitle : "task_title", 
    taskDescription : "task_description", 
    taskType : "task_type", 
    taskPriority : "task_priority", 
    taskStatus : "task_status", 
    clientId : "client_id", 
    leadId : "lead_id", 
    dealId : "deal_id", 
    dueDate : "due_date", 
    completedOn : "completed_on", 
    taskNotes : "task_notes", 
    createdAt : "created_at", 
    assignedSalesRep : "assigned_sales_rep", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `tasks`,
      recordIdColumn: `record_id`,
      dictionary: TasksColumnDictionary,
      searchParams,
      authData,
      batchMutations: TasksBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Tasks data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Tasks failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(TasksRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = TasksRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await TasksRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await TasksRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(TasksRequest);
     
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
      table: 'tasks',
      source: 'Tasks',
      action : 'create',
      role: 'manage_tasks',
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

		
  
  //--- Begin  tasks inputs array ---// 
  const TasksInputsArr = {

    "task_title" : "?", 
    "task_description" : "?", 
    "task_type" : "?", 
    "task_priority" : "?", 
    "task_status" : "?", 
    "client_id" : "?", 
    "lead_id" : "?", 
    "deal_id" : "?", 
    "due_date" : "?", 
    "completed_on" : "?", 
    "task_notes" : "?", 
    "created_at" : "?", 
    "assigned_sales_rep" : "?", 
    "updated_at" : "?", 

  };

  //--- End tasks inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('tasks',TasksInputsArr, TasksRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Tasks
      const result = await AddTasks(newId, mutatedDataArray, body, authData);     

       

      return Response.json({
        status: 'success',
        message: result.message,
        tasks_dataNode: result.record_id
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

export async function PUT(TasksRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = TasksRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await TasksRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await TasksRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(TasksRequest);
     
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
      table: 'tasks',
      source: 'Tasks',
      action : 'update',
      role: 'manage_tasks',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const TasksFormAction = body.tasks_mosy_action;
    const tasks_dataNode_value = base64Decode(body.tasks_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  tasks inputs array ---// 
  const TasksInputsArr = {

    "task_title" : "?", 
    "task_description" : "?", 
    "task_type" : "?", 
    "task_priority" : "?", 
    "task_status" : "?", 
    "client_id" : "?", 
    "lead_id" : "?", 
    "deal_id" : "?", 
    "due_date" : "?", 
    "completed_on" : "?", 
    "task_notes" : "?", 
    "created_at" : "?", 
    "assigned_sales_rep" : "?", 
    "updated_at" : "?", 

  };

  //--- End tasks inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('tasks',TasksInputsArr, TasksRequest, newId, authData)
       
      // update table Tasks
      const result = await UpdateTasks(newId, mutatedDataArray, body, authData, `primkey='${tasks_dataNode_value}'`)

      

      return Response.json({
        status: 'success',
        message: result.message,
        tasks_dataNode: tasks_dataNode_value
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


