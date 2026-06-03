import { Suspense } from 'react';

import ApprovalsProfile from '../uiControl/ApprovalsProfile';

import { InteprateApprovalsEvent } from '../dataControl/ApprovalsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Approvals "//searchParams?.mosyTitle || "Approvals";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Approvals`,
    description: 'supercrmv2 Approvals',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ApprovalsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ApprovalsProfile 
                    dataIn={{ parentUseEffectKey: "initApprovalsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateApprovalsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}