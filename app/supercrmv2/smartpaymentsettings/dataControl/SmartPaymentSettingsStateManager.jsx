
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSmartPaymentSettingsStateDefaults = {

  //state management for list page
  smartPaymentSettingsListData : [],
  smartPaymentSettingsListPageCount : 1,
  smartPaymentSettingsLoading: true,  
  parentUseEffectKey : 'loadSmartPaymentSettingsList',
  localEventSignature: 'loadSmartPaymentSettingsList',
  smartPaymentSettingsQuerySearchStr: '',

  
  //for profile page
  smart_payment_settingsNode : {},
  smartPaymentSettingsActionStatus : 'add_smart_payment_settings',
  paramsmartPaymentSettingsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  smartPaymentSettingsUptoken:'',
  smartPaymentSettingsNode : {},
  activeScrollId : 'SmartPaymentSettingsProfileTray',
  
  //dataScript
  smartPaymentSettingsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useSmartPaymentSettingsState(overrides = {}) {
  const combinedDefaults = { ...defaultSmartPaymentSettingsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

