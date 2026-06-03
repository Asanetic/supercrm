import { Suspense } from 'react';

import LeadsList from '../uiControl/LeadsList';

import { InteprateLeadsEvent } from '../dataControl/LeadsRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Leads "//searchParams?.mosyTitle || "Leads";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Leads`,
    description: 'supercrmv2 Leads',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function LeadsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <LeadsList  
                    
                     dataIn={{ parentUseEffectKey: "loadLeadsList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateLeadsEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }