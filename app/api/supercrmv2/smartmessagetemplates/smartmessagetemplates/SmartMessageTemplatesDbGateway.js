
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert smart_message_templates 
export async function AddSmartMessageTemplates(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("smart_message_templates", mutatedDataArray, body);
   
  return result;
}


//update smart_message_templates 
export async function UpdateSmartMessageTemplates(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("smart_message_templates", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete smart_message_templates 
export async function DeleteSmartMessageTemplates(tokenId, whereStr)
{  
  const result = await mosySqlDelete("smart_message_templates", whereStr);

  return result;
}

