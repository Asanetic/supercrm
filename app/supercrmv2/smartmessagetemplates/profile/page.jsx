import { Suspense } from 'react';

import SmartMessageTemplatesProfile from '../uiControl/SmartMessageTemplatesProfile';

import { InteprateSmartMessageTemplatesEvent } from '../dataControl/SmartMessageTemplatesRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Smart Message Templates "//searchParams?.mosyTitle || "Smart Message Templates";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Smart Message Templates`,
    description: 'supercrmv2 Smart Message Templates',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function SmartMessageTemplatesMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <SmartMessageTemplatesProfile 
                    dataIn={{ parentUseEffectKey: "initSmartMessageTemplatesProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateSmartMessageTemplatesEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}