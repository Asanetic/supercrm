
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert deals 
export async function AddDeals(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("deals", mutatedDataArray, body);
   
  return result;
}


//update deals 
export async function UpdateDeals(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("deals", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete deals 
export async function DeleteDeals(tokenId, whereStr)
{  
  const result = await mosySqlDelete("deals", whereStr);

  return result;
}

