
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert clients 
export async function AddClients(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("clients", mutatedDataArray, body);
   
  return result;
}


//update clients 
export async function UpdateClients(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("clients", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete clients 
export async function DeleteClients(tokenId, whereStr)
{  
  const result = await mosySqlDelete("clients", whereStr);

  return result;
}

