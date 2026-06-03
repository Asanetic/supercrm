import { Suspense } from 'react';

import ActivitiesList from '../uiControl/ActivitiesList';

import { InteprateActivitiesEvent } from '../dataControl/ActivitiesRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Activities "//searchParams?.mosyTitle || "Activities";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Activities`,
    description: 'supercrmv2 Activities',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ActivitiesMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <ActivitiesList  
                    
                     dataIn={{ parentUseEffectKey: "loadActivitiesList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateActivitiesEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }