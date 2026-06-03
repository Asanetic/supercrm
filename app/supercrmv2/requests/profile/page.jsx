import { Suspense } from 'react';

import RequestsProfile from '../uiControl/RequestsProfile';

import { InteprateRequestsEvent } from '../dataControl/RequestsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Requests "//searchParams?.mosyTitle || "Requests";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Requests`,
    description: 'supercrmv2 Requests',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function RequestsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <RequestsProfile 
                    dataIn={{ parentUseEffectKey: "initRequestsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateRequestsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}