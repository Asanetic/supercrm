
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultServiceCategoriesStateDefaults = {

  //state management for list page
  serviceCategoriesListData : [],
  serviceCategoriesListPageCount : 1,
  serviceCategoriesLoading: true,  
  parentUseEffectKey : 'loadServiceCategoriesList',
  localEventSignature: 'loadServiceCategoriesList',
  serviceCategoriesQuerySearchStr: '',

  
  //for profile page
  Node : {},
  serviceCategoriesActionStatus : 'add_',
  paramserviceCategoriesUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  serviceCategoriesUptoken:'',
  serviceCategoriesNode : {},
  activeScrollId : 'ServiceCategoriesProfileTray',
  
  //dataScript
  serviceCategoriesCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useServiceCategoriesState(overrides = {}) {
  const combinedDefaults = { ...defaultServiceCategoriesStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

