
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert product_categories 
export async function AddProductCategories(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("product_categories", mutatedDataArray, body);
   
  return result;
}


//update product_categories 
export async function UpdateProductCategories(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("product_categories", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete product_categories 
export async function DeleteProductCategories(tokenId, whereStr)
{  
  const result = await mosySqlDelete("product_categories", whereStr);

  return result;
}

