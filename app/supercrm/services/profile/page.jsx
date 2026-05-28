import { Suspense } from 'react';

import ServicesProfile from '../uiControl/ServicesProfile';

import { InteprateServicesEvent } from '../dataControl/ServicesRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Services "//searchParams?.mosyTitle || "Services";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Services`,
    description: 'supercrm Services',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ServicesMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ServicesProfile 
                    dataIn={{ parentUseEffectKey: "initServicesProfile" }} 
                                           
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