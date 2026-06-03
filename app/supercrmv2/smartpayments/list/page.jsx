import { Suspense } from 'react';

import SmartPaymentsList from '../uiControl/SmartPaymentsList';

import { InteprateSmartPaymentsEvent } from '../dataControl/SmartPaymentsRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Smart Payments "//searchParams?.mosyTitle || "Smart Payments";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Smart Payments`,
    description: 'supercrmv2 Smart Payments',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function SmartPaymentsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <SmartPaymentsList  
                    
                     dataIn={{ parentUseEffectKey: "loadSmartPaymentsList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateSmartPaymentsEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }