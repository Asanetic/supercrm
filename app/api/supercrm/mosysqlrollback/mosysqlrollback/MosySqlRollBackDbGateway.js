
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert mosy_sql_roll_back 
export async function AddMosySqlRollBack(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("mosy_sql_roll_back", mutatedDataArray, body);
   
  return result;
}


//update mosy_sql_roll_back 
export async function UpdateMosySqlRollBack(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("mosy_sql_roll_back", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete mosy_sql_roll_back 
export async function DeleteMosySqlRollBack(tokenId, whereStr)
{  
  const result = await mosySqlDelete("mosy_sql_roll_back", whereStr);

  return result;
}

