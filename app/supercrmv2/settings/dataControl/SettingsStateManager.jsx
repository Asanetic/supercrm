
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSettingsStateDefaults = {

  //state management for list page
  settingsListData : [],
  settingsListPageCount : 1,
  settingsLoading: true,  
  parentUseEffectKey : 'loadSettingsList',
  localEventSignature: 'loadSettingsList',
  settingsQuerySearchStr: '',

  
  //for profile page
  settingsNode : {},
  settingsActionStatus : 'add_settings',
  paramsettingsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  settingsUptoken:'',
  settingsNode : {},
  activeScrollId : 'SettingsProfileTray',
  
  //dataScript
  settingsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useSettingsState(overrides = {}) {
  const combinedDefaults = { ...defaultSettingsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

