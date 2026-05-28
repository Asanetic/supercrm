import { Suspense } from 'react';

import InvoiceItemsList from '../uiControl/InvoiceItemsList';

import { InteprateInvoiceItemsEvent } from '../dataControl/InvoiceItemsRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Invoice Items "//searchParams?.mosyTitle || "Invoice Items";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Invoice Items`,
    description: 'supercrm Invoice Items',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function InvoiceItemsMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <InvoiceItemsList  
                    
                     dataIn={{ parentUseEffectKey: "loadInvoiceItemsList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateInvoiceItemsEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }