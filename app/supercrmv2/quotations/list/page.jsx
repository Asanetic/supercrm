import { Suspense } from 'react';

import QuotationsList from '../uiControl/QuotationsList';

import { InteprateQuotationsEvent } from '../dataControl/QuotationsRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Quotations "//searchParams?.mosyTitle || "Quotations";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Quotations`,
    description: 'supercrmv2 Quotations',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function QuotationsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <QuotationsList  
                    
                     dataIn={{ parentUseEffectKey: "loadQuotationsList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateQuotationsEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }