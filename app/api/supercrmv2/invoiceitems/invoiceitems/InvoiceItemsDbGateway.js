
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert invoice_items 
export async function AddInvoiceItems(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("invoice_items", mutatedDataArray, body);
   
  return result;
}


//update invoice_items 
export async function UpdateInvoiceItems(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("invoice_items", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete invoice_items 
export async function DeleteInvoiceItems(tokenId, whereStr)
{  
  const result = await mosySqlDelete("invoice_items", whereStr);

  return result;
}

