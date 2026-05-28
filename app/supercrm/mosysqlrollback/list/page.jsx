import { Suspense } from 'react';

import MosySqlRollBackList from '../uiControl/MosySqlRollBackList';

import { InteprateMosySqlRollBackEvent } from '../dataControl/MosySqlRollBackRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Mosy Sql Roll Back "//searchParams?.mosyTitle || "Mosy Sql Roll Back";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Mosy Sql Roll Back`,
    description: 'supercrm Mosy Sql Roll Back',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function MosySqlRollBackMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <MosySqlRollBackList  
                    
                     dataIn={{ parentUseEffectKey: "loadMosySqlRollBackList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateMosySqlRollBackEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }