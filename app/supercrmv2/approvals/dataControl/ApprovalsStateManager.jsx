
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultApprovalsStateDefaults = {

  //state management for list page
  approvalsListData : [],
  approvalsListPageCount : 1,
  approvalsLoading: true,  
  parentUseEffectKey : 'loadApprovalsList',
  localEventSignature: 'loadApprovalsList',
  approvalsQuerySearchStr: '',

  
  //for profile page
  approvalsNode : {},
  approvalsActionStatus : 'add_approvals',
  paramapprovalsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  approvalsUptoken:'',
  approvalsNode : {},
  activeScrollId : 'ApprovalsProfileTray',
  
  //dataScript
  approvalsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useApprovalsState(overrides = {}) {
  const combinedDefaults = { ...defaultApprovalsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

