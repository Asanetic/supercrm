
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert products 
export async function AddProducts(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("products", mutatedDataArray, body);
   
  return result;
}


//update products 
export async function UpdateProducts(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("products", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete products 
export async function DeleteProducts(tokenId, whereStr)
{  
  const result = await mosySqlDelete("products", whereStr);

  return result;
}

