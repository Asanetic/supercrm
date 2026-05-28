import { Suspense } from 'react';

import DealsProfile from '../uiControl/DealsProfile';

import { InteprateDealsEvent } from '../dataControl/DealsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Deals "//searchParams?.mosyTitle || "Deals";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Deals`,
    description: 'supercrm Deals',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function DealsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <DealsProfile 
                    dataIn={{ parentUseEffectKey: "initDealsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateDealsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}