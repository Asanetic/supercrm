
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultServicesStateDefaults = {

  //state management for list page
  servicesListData : [],
  servicesListPageCount : 1,
  servicesLoading: true,  
  parentUseEffectKey : 'loadServicesList',
  localEventSignature: 'loadServicesList',
  servicesQuerySearchStr: '',

  
  //for profile page
  servicesNode : {},
  servicesActionStatus : 'add_services',
  paramservicesUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  servicesUptoken:'',
  servicesNode : {},
  activeScrollId : 'ServicesProfileTray',
  
  //dataScript
  servicesCustomProfileQuery : '',
  serviceCategoriesCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useServicesState(overrides = {}) {
  const combinedDefaults = { ...defaultServicesStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

