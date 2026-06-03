
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert disbursements 
export async function AddDisbursements(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("disbursements", mutatedDataArray, body);
   
  return result;
}


//update disbursements 
export async function UpdateDisbursements(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("disbursements", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete disbursements 
export async function DeleteDisbursements(tokenId, whereStr)
{  
  const result = await mosySqlDelete("disbursements", whereStr);

  return result;
}

