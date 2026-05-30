
//utils 
import {base64Decode, mosyUploadFile, mosyDeleteFile, magicRandomStr , mosySecureSelect} from '../../../apiUtils/dataControl/dataUtils';

import { ProductsBatchMutations } from './ProductsBatchMutations';

//be gate keeper and auth 
import { mosyMutateQuery, mutateInputArray } from '../../beMonitor';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';

import { processAuthToken } from '../../../auth/authManager';

import { AddProducts, UpdateProducts } from './ProductsDbGateway';

export async function GET(request) {

  try {
    const { searchParams } = new URL(request.url);

    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canSelect = validateRoleAccess({
      table: 'products',
      source: 'Products',
      action : 'select',
      role: 'view_products',
      authData
    });

    if (!canSelect.valid) {
      return Response.json({
        status: 'error',
        message: canSelect.message,
        data: []
      });
    }

    
    // products column DictionaryMap
  const ProductsColumnDictionary={

    Node : "primkey", 
    NodeId : "record_id", 
    recordId : "record_id", 
    productName : "product_name", 
    priceRange : "price_range", 
    unitPrice : "unit_price", 
    productCode : "product_code", 
    category : "category", 
    productDescription : "product_description", 
    productImage : "product_image", 
    discountPrice : "discount_price", 
    taxPercentage : "tax_percentage", 
    currencyCode : "currency_code", 
    stockQuantity : "stock_quantity", 
    productStatus : "product_status", 
    createdAt : "created_at", 
    updatedAt : "updated_at", 

  }


    
    
    
    
   const result = await mosySecureSelect({
      table: `products`,
      recordIdColumn: `record_id`,
      dictionary: ProductsColumnDictionary,
      searchParams,
      authData,
      batchMutations: ProductsBatchMutations,
      defaultOrderColumn : `primkey`
    });

    return Response.json({
      status: 'success',
      message: 'Products data retrieved',
      ...result
    });
      
   
  } catch (err) {
    console.error('GET Products failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ProductsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ProductsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ProductsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ProductsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ProductsRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canPost = validateRoleAccess({
      table: 'products',
      source: 'Products',
      action : 'create',
      role: 'manage_products',
      authData
    });

    if (!canPost.valid) {
      return Response.json({
        status: 'error',
        message: canPost.message,
        data: []
      });
    }
    
    //generate Record id 
    const newId = magicRandomStr(7);

		
  
  //--- Begin  products inputs array ---// 
  const ProductsInputsArr = {

    "product_name" : "?", 
    "price_range" : "?", 
    "unit_price" : "?", 
    "product_code" : "?", 
    "category" : "?", 
    "product_description" : "?", 
    "product_image" : "?", 
    "discount_price" : "?", 
    "tax_percentage" : "?", 
    "currency_code" : "?", 
    "stock_quantity" : "?", 
    "product_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End products inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('products',ProductsInputsArr, ProductsRequest, newId, authData)

      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Products
      const result = await AddProducts(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for product_image, if any
                if (body.fileproducts_product_image) {
                  if(body["fileproducts_product_image"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileproducts_product_image"], "media/products");
                    
                    ProductsInputsArr.product_image = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateProducts(newId, { product_image: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_products_product_image;
                      
                    //Delete file if need be

                  } catch (fileErr) {
                    console.error("File upload failed:", fileErr);
                    // You can either handle this error or return a partial success message
                  }
                }
               }

      return Response.json({
        status: 'success',
        message: result.message,
        products_dataNode: result.record_id
      });
      
    
 
  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(ProductsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ProductsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ProductsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ProductsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ProductsRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canUpdate = validateRoleAccess({
      table: 'products',
      source: 'Products',
      action : 'update',
      role: 'manage_products',
      authData
    });

    if (!canUpdate.valid) {
      return Response.json({
        status: 'error',
        message: canUpdate.message,
        data: []
      });
    }
    
    const ProductsFormAction = body.products_mosy_action;
    const products_dataNode_value = base64Decode(body.products_dataNode);
    
    const newId = magicRandomStr(7);

		
  
  //--- Begin  products inputs array ---// 
  const ProductsInputsArr = {

    "product_name" : "?", 
    "price_range" : "?", 
    "unit_price" : "?", 
    "product_code" : "?", 
    "category" : "?", 
    "product_description" : "?", 
    "product_image" : "?", 
    "discount_price" : "?", 
    "tax_percentage" : "?", 
    "currency_code" : "?", 
    "stock_quantity" : "?", 
    "product_status" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 

  };

  //--- End products inputs array --//

    //mutate requested values eg add authData.hive_site_id or add more values that only the back end control etc 
    const mutatedDataArray =mutateInputArray('products',ProductsInputsArr, ProductsRequest, newId, authData)
       
      // update table Products
      const result = await UpdateProducts(newId, mutatedDataArray, body, authData, `primkey='${products_dataNode_value}'`)

      
                // Now handle the file upload for product_image, if any
                if (body.fileproducts_product_image) {
                  if(body["fileproducts_product_image"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "fileproducts_product_image"], "media/products");
                    
                    ProductsInputsArr.product_image = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateProducts(newId, { product_image: filePath }, body, authData,  `primkey='${products_dataNode_value}'`)
                    
                    let fileToDelete = body.media_products_product_image;
                      
                    //Delete old file
mosyDeleteFile(fileToDelete);
// Log or store deleted file: fileToDelete

                  } catch (fileErr) {
                    console.error("File upload failed:", fileErr);
                    // You can either handle this error or return a partial success message
                  }
                }
               }

      return Response.json({
        status: 'success',
        message: result.message,
        products_dataNode: products_dataNode_value
      });
 

  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}


