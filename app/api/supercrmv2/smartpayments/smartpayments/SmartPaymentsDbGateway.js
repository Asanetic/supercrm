
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert smart_payments 
export async function AddSmartPayments(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("smart_payments", mutatedDataArray, body);
   
  return result;
}


//update smart_payments 
export async function UpdateSmartPayments(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("smart_payments", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete smart_payments 
export async function DeleteSmartPayments(tokenId, whereStr)
{  
  const result = await mosySqlDelete("smart_payments", whereStr);

  return result;
}

