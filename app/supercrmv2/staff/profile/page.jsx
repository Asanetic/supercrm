import { Suspense } from 'react';

import StaffProfile from '../uiControl/StaffProfile';

import { InteprateStaffEvent } from '../dataControl/StaffRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Staff "//searchParams?.mosyTitle || "Staff";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Staff`,
    description: 'supercrmv2 Staff',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function StaffMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <StaffProfile 
                    dataIn={{ parentUseEffectKey: "initStaffProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateStaffEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}