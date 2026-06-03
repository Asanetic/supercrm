import { Suspense } from 'react';

import SmartMessagesProfile from '../uiControl/SmartMessagesProfile';

import { InteprateSmartMessagesEvent } from '../dataControl/SmartMessagesRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Smart Messages "//searchParams?.mosyTitle || "Smart Messages";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Smart Messages`,
    description: 'supercrmv2 Smart Messages',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function SmartMessagesMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <SmartMessagesProfile 
                    dataIn={{ parentUseEffectKey: "initSmartMessagesProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateSmartMessagesEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}