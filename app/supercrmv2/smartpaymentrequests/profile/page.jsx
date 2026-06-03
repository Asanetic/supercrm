import { Suspense } from 'react';

import SmartPaymentRequestsProfile from '../uiControl/SmartPaymentRequestsProfile';

import { InteprateSmartPaymentRequestsEvent } from '../dataControl/SmartPaymentRequestsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Smart Payment Requests "//searchParams?.mosyTitle || "Smart Payment Requests";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Smart Payment Requests`,
    description: 'supercrmv2 Smart Payment Requests',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function SmartPaymentRequestsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <SmartPaymentRequestsProfile 
                    dataIn={{ parentUseEffectKey: "initSmartPaymentRequestsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateSmartPaymentRequestsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}