
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultQuotationItemsStateDefaults = {

  //state management for list page
  quotationItemsListData : [],
  quotationItemsListPageCount : 1,
  quotationItemsLoading: true,  
  parentUseEffectKey : 'loadQuotationItemsList',
  localEventSignature: 'loadQuotationItemsList',
  quotationItemsQuerySearchStr: '',

  
  //for profile page
  quotation_itemsNode : {},
  quotationItemsActionStatus : 'add_quotation_items',
  paramquotationItemsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  quotationItemsUptoken:'',
  quotationItemsNode : {},
  activeScrollId : 'QuotationItemsProfileTray',
  
  //dataScript
  quotationItemsCustomProfileQuery : '',
  quotationsCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useQuotationItemsState(overrides = {}) {
  const combinedDefaults = { ...defaultQuotationItemsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

