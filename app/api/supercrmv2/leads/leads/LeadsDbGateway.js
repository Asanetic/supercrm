
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert leads 
export async function AddLeads(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("leads", mutatedDataArray, body);
   
  return result;
}


//update leads 
export async function UpdateLeads(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("leads", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete leads 
export async function DeleteLeads(tokenId, whereStr)
{  
  const result = await mosySqlDelete("leads", whereStr);

  return result;
}

