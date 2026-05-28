import { Suspense } from 'react';

import ServiceCategoriesList from '../uiControl/ServiceCategoriesList';

import { InteprateServiceCategoriesEvent } from '../dataControl/ServiceCategoriesRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Service Categories "//searchParams?.mosyTitle || "Service Categories";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Service Categories`,
    description: 'supercrm Service Categories',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ServiceCategoriesMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <ServiceCategoriesList  
                    
                     dataIn={{ parentUseEffectKey: "loadServiceCategoriesList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateServiceCategoriesEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }