import { Suspense } from 'react';

import ClientsProfile from '../uiControl/ClientsProfile';

import { InteprateClientsEvent } from '../dataControl/ClientsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Clients "//searchParams?.mosyTitle || "Clients";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Clients`,
    description: 'supercrmv2 Clients',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ClientsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ClientsProfile 
                    dataIn={{ parentUseEffectKey: "initClientsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateClientsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}