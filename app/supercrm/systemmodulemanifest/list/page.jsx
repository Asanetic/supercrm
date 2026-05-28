import { Suspense } from 'react';

import SystemModuleManifestList from '../uiControl/SystemModuleManifestList';

import { InteprateSystemModuleManifestEvent } from '../dataControl/SystemModuleManifestRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "System Module Manifest  "//searchParams?.mosyTitle || "System Module Manifest ";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `System Module Manifest `,
    description: 'supercrm System Module Manifest ',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function SystemModuleManifestMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <SystemModuleManifestList  
                    
                     dataIn={{ parentUseEffectKey: "loadSystemModuleManifestList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateSystemModuleManifestEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }