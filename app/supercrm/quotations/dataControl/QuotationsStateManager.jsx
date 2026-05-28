
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultQuotationsStateDefaults = {

  //state management for list page
  quotationsListData : [],
  quotationsListPageCount : 1,
  quotationsLoading: true,  
  parentUseEffectKey : 'loadQuotationsList',
  localEventSignature: 'loadQuotationsList',
  quotationsQuerySearchStr: '',

  
  //for profile page
  quotationsNode : {},
  quotationsActionStatus : 'add_quotations',
  paramquotationsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  quotationsUptoken:'',
  quotationsNode : {},
  activeScrollId : 'QuotationsProfileTray',
  
  //dataScript
  quotationsCustomProfileQuery : '',
  clientsCustomProfileQuery : ``,
dealsCustomProfileQuery : ``,
quotationItemsCustomProfileQuery : ``,
invoicesCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useQuotationsState(overrides = {}) {
  const combinedDefaults = { ...defaultQuotationsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

