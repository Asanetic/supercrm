
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert tasks 
export async function AddTasks(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("tasks", mutatedDataArray, body);
   
  return result;
}


//update tasks 
export async function UpdateTasks(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("tasks", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete tasks 
export async function DeleteTasks(tokenId, whereStr)
{  
  const result = await mosySqlDelete("tasks", whereStr);

  return result;
}

