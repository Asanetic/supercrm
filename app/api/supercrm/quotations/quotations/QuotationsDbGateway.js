
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert quotations 
export async function AddQuotations(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("quotations", mutatedDataArray, body);
   
  return result;
}


//update quotations 
export async function UpdateQuotations(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("quotations", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete quotations 
export async function DeleteQuotations(tokenId, whereStr)
{  
  const result = await mosySqlDelete("quotations", whereStr);

  return result;
}

