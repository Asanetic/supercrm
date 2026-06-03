
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert approvals 
export async function AddApprovals(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("approvals", mutatedDataArray, body);
   
  return result;
}


//update approvals 
export async function UpdateApprovals(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("approvals", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete approvals 
export async function DeleteApprovals(tokenId, whereStr)
{  
  const result = await mosySqlDelete("approvals", whereStr);

  return result;
}

