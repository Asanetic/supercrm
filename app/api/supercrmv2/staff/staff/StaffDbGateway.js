
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert staff 
export async function AddStaff(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("staff", mutatedDataArray, body);
   
  return result;
}


//update staff 
export async function UpdateStaff(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("staff", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete staff 
export async function DeleteStaff(tokenId, whereStr)
{  
  const result = await mosySqlDelete("staff", whereStr);

  return result;
}

