import { Suspense } from 'react';
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';
import Dealsv1Profile from '../uiControl/Dealsv1Profile';


export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Dealsv1 profile"//searchParams?.mosyTitle || "Tasks";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Dealsv1 Profile`,
    description: 'Dealsv1 profile / item details',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}
export default function Page() {

return (
     <>
        <div className="main-wrapper">
          <div className="page-wrapper">
            <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <Dealsv1Profile />
               </Suspense>
            </div>
          </div>
        </div>
    </>
)
}

