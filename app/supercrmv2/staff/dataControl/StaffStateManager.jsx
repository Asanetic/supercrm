
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultStaffStateDefaults = {

  //state management for list page
  staffListData : [],
  staffListPageCount : 1,
  staffLoading: true,  
  parentUseEffectKey : 'loadStaffList',
  localEventSignature: 'loadStaffList',
  staffQuerySearchStr: '',

  
  //for profile page
  staffNode : {},
  staffActionStatus : 'add_staff',
  paramstaffUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  staffUptoken:'',
  staffNode : {},
  activeScrollId : 'StaffProfileTray',
  
  //dataScript
  staffCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useStaffState(overrides = {}) {
  const combinedDefaults = { ...defaultStaffStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

