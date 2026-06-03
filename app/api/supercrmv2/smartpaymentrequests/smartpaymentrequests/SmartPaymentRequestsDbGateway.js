
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert smart_payment_requests 
export async function AddSmartPaymentRequests(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("smart_payment_requests", mutatedDataArray, body);
   
  return result;
}


//update smart_payment_requests 
export async function UpdateSmartPaymentRequests(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("smart_payment_requests", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete smart_payment_requests 
export async function DeleteSmartPaymentRequests(tokenId, whereStr)
{  
  const result = await mosySqlDelete("smart_payment_requests", whereStr);

  return result;
}

