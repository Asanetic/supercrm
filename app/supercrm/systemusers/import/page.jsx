import { Suspense } from 'react';

import ImportCSVComponent from '../../import/uploadData';
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

const apiRoutes = getApiRoutes()

export async function generateMetadata({ searchParams }) {
  const mosyTitle = 'Import System Users data ';

  return {
    title: mosyTitle ,
    description: 'Import csv data',
    
    icons: {
        icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}
                      

export default function UploadCsvPage() {

   const colsArray = ['primkey','record_id','name','email','tel','login_password','ref_id','regdate','user_no','user_pic','user_gender','last_seen','about','hive_site_id','hive_site_name','auth_token','token_status','token_expiring_in','project_id','project_name','user_role']

   return (
     <>
       <div className='main-wrapper'>
          <div className='page-wrapper'>
             <div className='content container-fluid p-0 m-0'>
              <div className='p-3'>
               <Suspense fallback={<div className='col-md-12 p-5 text-center h3'>Loading...</div>}>
               <ImportCSVComponent colsArray={colsArray} title='Import System Users data ' endpoint={apiRoutes.systemusers.import} templateName='import_system_users_data__template.csv'/>
              </Suspense>
            </div>
             </div>
           </div>
         </div>
       </>
     );
}