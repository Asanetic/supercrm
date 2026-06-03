import { Suspense } from 'react';

import ServicesList from '../uiControl/ServicesList';

import { InteprateServicesEvent } from '../dataControl/ServicesRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Services "//searchParams?.mosyTitle || "Services";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Services`,
    description: 'supercrmv2 Services',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ServicesMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <ServicesList  
                    
                     dataIn={{ parentUseEffectKey: "loadServicesList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateServicesEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }