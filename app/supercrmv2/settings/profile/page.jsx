import { Suspense } from 'react';

import SettingsProfile from '../uiControl/SettingsProfile';

import { InteprateSettingsEvent } from '../dataControl/SettingsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Settings "//searchParams?.mosyTitle || "Settings";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Settings`,
    description: 'supercrmv2 Settings',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function SettingsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <SettingsProfile 
                    dataIn={{ parentUseEffectKey: "initSettingsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateSettingsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}