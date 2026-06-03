
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSmartPaymentRequestsStateDefaults = {

  //state management for list page
  smartPaymentRequestsListData : [],
  smartPaymentRequestsListPageCount : 1,
  smartPaymentRequestsLoading: true,  
  parentUseEffectKey : 'loadSmartPaymentRequestsList',
  localEventSignature: 'loadSmartPaymentRequestsList',
  smartPaymentRequestsQuerySearchStr: '',

  
  //for profile page
  smart_payment_requestsNode : {},
  smartPaymentRequestsActionStatus : 'add_smart_payment_requests',
  paramsmartPaymentRequestsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  smartPaymentRequestsUptoken:'',
  smartPaymentRequestsNode : {},
  activeScrollId : 'SmartPaymentRequestsProfileTray',
  
  //dataScript
  smartPaymentRequestsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useSmartPaymentRequestsState(overrides = {}) {
  const combinedDefaults = { ...defaultSmartPaymentRequestsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

