import { Suspense } from 'react';

import ImportCSVComponent from '../../import/uploadData';
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

const apiRoutes = getApiRoutes()

export async function generateMetadata({ searchParams }) {
  const mosyTitle = 'Import Expected Revenue data ';

  return {
    title: mosyTitle ,
    description: 'Import csv data',
    
    icons: {
        icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}
                      

export default function UploadCsvPage() {

   const colsArray = ['primkey','record_id','revenue_month','client_id','deal_id','expected_amount','currency_code','payment_status','payment_ref_no','expected_close_date','probability_percent','revenue_source_type','revenue_title','invoice_id','lead_id','revenue_status','revenue_description','assigned_to','created_at','updated_at','hive_site_id','hive_site_name']

   return (
     <>
       <div className='main-wrapper'>
          <div className='page-wrapper'>
             <div className='content container-fluid p-0 m-0'>
              <div className='p-3'>
               <Suspense fallback={<div className='col-md-12 p-5 text-center h3'>Loading...</div>}>
               <ImportCSVComponent colsArray={colsArray} title='Import Expected Revenue data ' endpoint={apiRoutes.expectedrevenue.import} templateName='import_expected_revenue_data__template.csv'/>
              </Suspense>
            </div>
             </div>
           </div>
         </div>
       </>
     );
}