import { Suspense } from 'react';

import DisbursementsProfile from '../uiControl/DisbursementsProfile';

import { InteprateDisbursementsEvent } from '../dataControl/DisbursementsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Disbursements "//searchParams?.mosyTitle || "Disbursements";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Disbursements`,
    description: 'supercrmv2 Disbursements',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function DisbursementsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <DisbursementsProfile 
                    dataIn={{ parentUseEffectKey: "initDisbursementsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateDisbursementsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}