import { Suspense } from 'react';

import ProductCategoriesProfile from '../uiControl/ProductCategoriesProfile';

import { InteprateProductCategoriesEvent } from '../dataControl/ProductCategoriesRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Product Categories "//searchParams?.mosyTitle || "Product Categories";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Product Categories`,
    description: 'supercrm Product Categories',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ProductCategoriesMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ProductCategoriesProfile 
                    dataIn={{ parentUseEffectKey: "initProductCategoriesProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateProductCategoriesEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}