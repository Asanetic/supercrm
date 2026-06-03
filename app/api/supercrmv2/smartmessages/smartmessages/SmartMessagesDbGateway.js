
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert smart_messages 
export async function AddSmartMessages(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("smart_messages", mutatedDataArray, body);
   
  return result;
}


//update smart_messages 
export async function UpdateSmartMessages(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("smart_messages", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete smart_messages 
export async function DeleteSmartMessages(tokenId, whereStr)
{  
  const result = await mosySqlDelete("smart_messages", whereStr);

  return result;
}

