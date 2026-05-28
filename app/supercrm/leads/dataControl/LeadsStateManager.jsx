
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultLeadsStateDefaults = {

  //state management for list page
  leadsListData : [],
  leadsListPageCount : 1,
  leadsLoading: true,  
  parentUseEffectKey : 'loadLeadsList',
  localEventSignature: 'loadLeadsList',
  leadsQuerySearchStr: '',

  
  //for profile page
  leadsNode : {},
  leadsActionStatus : 'add_leads',
  paramleadsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  leadsUptoken:'',
  leadsNode : {},
  activeScrollId : 'LeadsProfileTray',
  
  //dataScript
  leadsCustomProfileQuery : '',
  usersCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useLeadsState(overrides = {}) {
  const combinedDefaults = { ...defaultLeadsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

