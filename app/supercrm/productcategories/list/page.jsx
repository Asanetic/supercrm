import { Suspense } from 'react';

import ProductCategoriesList from '../uiControl/ProductCategoriesList';

import { InteprateProductCategoriesEvent } from '../dataControl/ProductCategoriesRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = " "//searchParams?.mosyTitle || "";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : ``,
    description: 'supercrm ',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ProductCategoriesMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <ProductCategoriesList  
                    
                     dataIn={{ parentUseEffectKey: "loadProductCategoriesList" }}
                       
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