
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert service_categories 
export async function AddServiceCategories(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("service_categories", mutatedDataArray, body);
   
  return result;
}


//update service_categories 
export async function UpdateServiceCategories(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("service_categories", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete service_categories 
export async function DeleteServiceCategories(tokenId, whereStr)
{  
  const result = await mosySqlDelete("service_categories", whereStr);

  return result;
}

