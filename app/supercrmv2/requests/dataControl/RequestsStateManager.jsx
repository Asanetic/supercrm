
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultRequestsStateDefaults = {

  //state management for list page
  requestsListData : [],
  requestsListPageCount : 1,
  requestsLoading: true,  
  parentUseEffectKey : 'loadRequestsList',
  localEventSignature: 'loadRequestsList',
  requestsQuerySearchStr: '',

  
  //for profile page
  requestsNode : {},
  requestsActionStatus : 'add_requests',
  paramrequestsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  requestsUptoken:'',
  requestsNode : {},
  activeScrollId : 'RequestsProfileTray',
  
  //dataScript
  requestsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useRequestsState(overrides = {}) {
  const combinedDefaults = { ...defaultRequestsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

