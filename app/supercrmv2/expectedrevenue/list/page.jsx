import { Suspense } from 'react';

import ExpectedRevenueList from '../uiControl/ExpectedRevenueList';

import { InteprateExpectedRevenueEvent } from '../dataControl/ExpectedRevenueRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Expected Revenue "//searchParams?.mosyTitle || "Expected Revenue";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Expected Revenue`,
    description: 'supercrmv2 Expected Revenue',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ExpectedRevenueMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <ExpectedRevenueList  
                    
                     dataIn={{ parentUseEffectKey: "loadExpectedRevenueList" }}
                       
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