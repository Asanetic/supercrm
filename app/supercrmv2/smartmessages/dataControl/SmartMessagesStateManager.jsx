
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSmartMessagesStateDefaults = {

  //state management for list page
  smartMessagesListData : [],
  smartMessagesListPageCount : 1,
  smartMessagesLoading: true,  
  parentUseEffectKey : 'loadSmartMessagesList',
  localEventSignature: 'loadSmartMessagesList',
  smartMessagesQuerySearchStr: '',

  
  //for profile page
  smart_messagesNode : {},
  smartMessagesActionStatus : 'add_smart_messages',
  paramsmartMessagesUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  smartMessagesUptoken:'',
  smartMessagesNode : {},
  activeScrollId : 'SmartMessagesProfileTray',
  
  //dataScript
  smartMessagesCustomProfileQuery : '',
  clientsCustomProfileQuery : ``,
leadsCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useSmartMessagesState(overrides = {}) {
  const combinedDefaults = { ...defaultSmartMessagesStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

