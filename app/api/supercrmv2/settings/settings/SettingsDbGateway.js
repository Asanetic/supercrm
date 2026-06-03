
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert settings 
export async function AddSettings(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("settings", mutatedDataArray, body);
   
  return result;
}


//update settings 
export async function UpdateSettings(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("settings", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete settings 
export async function DeleteSettings(tokenId, whereStr)
{  
  const result = await mosySqlDelete("settings", whereStr);

  return result;
}

