
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultProductCategoriesStateDefaults = {

  //state management for list page
  productCategoriesListData : [],
  productCategoriesListPageCount : 1,
  productCategoriesLoading: true,  
  parentUseEffectKey : 'loadProductCategoriesList',
  localEventSignature: 'loadProductCategoriesList',
  productCategoriesQuerySearchStr: '',

  
  //for profile page
  Node : {},
  productCategoriesActionStatus : 'add_',
  paramproductCategoriesUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  productCategoriesUptoken:'',
  productCategoriesNode : {},
  activeScrollId : 'ProductCategoriesProfileTray',
  
  //dataScript
  productCategoriesCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useProductCategoriesState(overrides = {}) {
  const combinedDefaults = { ...defaultProductCategoriesStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

