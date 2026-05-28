import { Suspense } from 'react';

import QuotationsProfile from '../uiControl/QuotationsProfile';

import { InteprateQuotationsEvent } from '../dataControl/QuotationsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Quotations "//searchParams?.mosyTitle || "Quotations";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Quotations`,
    description: 'supercrm Quotations',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function QuotationsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <QuotationsProfile 
                    dataIn={{ parentUseEffectKey: "initQuotationsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateQuotationsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}