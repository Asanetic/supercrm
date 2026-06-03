
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSmartPaymentsStateDefaults = {

  //state management for list page
  smartPaymentsListData : [],
  smartPaymentsListPageCount : 1,
  smartPaymentsLoading: true,  
  parentUseEffectKey : 'loadSmartPaymentsList',
  localEventSignature: 'loadSmartPaymentsList',
  smartPaymentsQuerySearchStr: '',

  
  //for profile page
  smart_paymentsNode : {},
  smartPaymentsActionStatus : 'add_smart_payments',
  paramsmartPaymentsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  smartPaymentsUptoken:'',
  smartPaymentsNode : {},
  activeScrollId : 'SmartPaymentsProfileTray',
  
  //dataScript
  smartPaymentsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useSmartPaymentsState(overrides = {}) {
  const combinedDefaults = { ...defaultSmartPaymentsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

