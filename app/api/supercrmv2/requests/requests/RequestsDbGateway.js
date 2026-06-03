
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert requests 
export async function AddRequests(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("requests", mutatedDataArray, body);
   
  return result;
}


//update requests 
export async function UpdateRequests(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("requests", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete requests 
export async function DeleteRequests(tokenId, whereStr)
{  
  const result = await mosySqlDelete("requests", whereStr);

  return result;
}

