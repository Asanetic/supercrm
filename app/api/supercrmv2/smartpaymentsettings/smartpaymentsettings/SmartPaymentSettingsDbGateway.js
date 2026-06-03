
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert smart_payment_settings 
export async function AddSmartPaymentSettings(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("smart_payment_settings", mutatedDataArray, body);
   
  return result;
}


//update smart_payment_settings 
export async function UpdateSmartPaymentSettings(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("smart_payment_settings", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete smart_payment_settings 
export async function DeleteSmartPaymentSettings(tokenId, whereStr)
{  
  const result = await mosySqlDelete("smart_payment_settings", whereStr);

  return result;
}

