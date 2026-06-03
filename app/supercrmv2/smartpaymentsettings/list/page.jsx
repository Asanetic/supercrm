import { Suspense } from 'react';

import SmartPaymentSettingsList from '../uiControl/SmartPaymentSettingsList';

import { InteprateSmartPaymentSettingsEvent } from '../dataControl/SmartPaymentSettingsRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Smart Payment Settings "//searchParams?.mosyTitle || "Smart Payment Settings";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Smart Payment Settings`,
    description: 'supercrmv2 Smart Payment Settings',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function SmartPaymentSettingsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <SmartPaymentSettingsList  
                    
                     dataIn={{ parentUseEffectKey: "loadSmartPaymentSettingsList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateSmartPaymentSettingsEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }