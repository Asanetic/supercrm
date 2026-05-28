
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert services 
export async function AddServices(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("services", mutatedDataArray, body);
   
  return result;
}


//update services 
export async function UpdateServices(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("services", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete services 
export async function DeleteServices(tokenId, whereStr)
{  
  const result = await mosySqlDelete("services", whereStr);

  return result;
}

