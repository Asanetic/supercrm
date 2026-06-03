import { Suspense } from 'react';

import QuotationItemsList from '../uiControl/QuotationItemsList';

import { InteprateQuotationItemsEvent } from '../dataControl/QuotationItemsRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Quotation Items "//searchParams?.mosyTitle || "Quotation Items";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Quotation Items`,
    description: 'supercrmv2 Quotation Items',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function QuotationItemsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <QuotationItemsList  
                    
                     dataIn={{ parentUseEffectKey: "loadQuotationItemsList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateQuotationItemsEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }