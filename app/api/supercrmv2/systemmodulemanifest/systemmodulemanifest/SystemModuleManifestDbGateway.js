
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert system_module_manifest_ 
export async function AddSystemModuleManifest(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("system_module_manifest_", mutatedDataArray, body);
   
  return result;
}


//update system_module_manifest_ 
export async function UpdateSystemModuleManifest(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("system_module_manifest_", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete system_module_manifest_ 
export async function DeleteSystemModuleManifest(tokenId, whereStr)
{  
  const result = await mosySqlDelete("system_module_manifest_", whereStr);

  return result;
}

