import { Suspense } from 'react';

import ProductsProfile from '../uiControl/ProductsProfile';

import { InteprateProductsEvent } from '../dataControl/ProductsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Products "//searchParams?.mosyTitle || "Products";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Products`,
    description: 'supercrm Products',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ProductsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ProductsProfile 
                    dataIn={{ parentUseEffectKey: "initProductsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateProductsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}