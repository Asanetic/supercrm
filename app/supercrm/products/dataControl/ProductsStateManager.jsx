
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultProductsStateDefaults = {

  //state management for list page
  productsListData : [],
  productsListPageCount : 1,
  productsLoading: true,  
  parentUseEffectKey : 'loadProductsList',
  localEventSignature: 'loadProductsList',
  productsQuerySearchStr: '',

  
  //for profile page
  productsNode : {},
  productsActionStatus : 'add_products',
  paramproductsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  productsUptoken:'',
  productsNode : {},
  activeScrollId : 'ProductsProfileTray',
  
  //dataScript
  productsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useProductsState(overrides = {}) {
  const combinedDefaults = { ...defaultProductsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

