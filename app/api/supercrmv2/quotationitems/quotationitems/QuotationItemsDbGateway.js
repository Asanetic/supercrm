
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert quotation_items 
export async function AddQuotationItems(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("quotation_items", mutatedDataArray, body);
   
  return result;
}


//update quotation_items 
export async function UpdateQuotationItems(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("quotation_items", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete quotation_items 
export async function DeleteQuotationItems(tokenId, whereStr)
{  
  const result = await mosySqlDelete("quotation_items", whereStr);

  return result;
}

