
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSmartMessageTemplatesStateDefaults = {

  //state management for list page
  smartMessageTemplatesListData : [],
  smartMessageTemplatesListPageCount : 1,
  smartMessageTemplatesLoading: true,  
  parentUseEffectKey : 'loadSmartMessageTemplatesList',
  localEventSignature: 'loadSmartMessageTemplatesList',
  smartMessageTemplatesQuerySearchStr: '',

  
  //for profile page
  smart_message_templatesNode : {},
  smartMessageTemplatesActionStatus : 'add_smart_message_templates',
  paramsmartMessageTemplatesUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  smartMessageTemplatesUptoken:'',
  smartMessageTemplatesNode : {},
  activeScrollId : 'SmartMessageTemplatesProfileTray',
  
  //dataScript
  smartMessageTemplatesCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useSmartMessageTemplatesState(overrides = {}) {
  const combinedDefaults = { ...defaultSmartMessageTemplatesStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

