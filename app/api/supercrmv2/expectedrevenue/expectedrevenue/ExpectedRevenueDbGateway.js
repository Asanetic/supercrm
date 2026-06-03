
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert expected_revenue 
export async function AddExpectedRevenue(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("expected_revenue", mutatedDataArray, body);
   
  return result;
}


//update expected_revenue 
export async function UpdateExpectedRevenue(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("expected_revenue", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete expected_revenue 
export async function DeleteExpectedRevenue(tokenId, whereStr)
{  
  const result = await mosySqlDelete("expected_revenue", whereStr);

  return result;
}

