import { Suspense } from 'react';

import ExpectedRevenueProfile from '../uiControl/ExpectedRevenueProfile';

import { InteprateExpectedRevenueEvent } from '../dataControl/ExpectedRevenueRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Expected Revenue "//searchParams?.mosyTitle || "Expected Revenue";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Expected Revenue`,
    description: 'supercrm Expected Revenue',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ExpectedRevenueMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ExpectedRevenueProfile 
                    dataIn={{ parentUseEffectKey: "initExpectedRevenueProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateExpectedRevenueEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}