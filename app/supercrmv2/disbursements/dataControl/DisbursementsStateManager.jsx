
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultDisbursementsStateDefaults = {

  //state management for list page
  disbursementsListData : [],
  disbursementsListPageCount : 1,
  disbursementsLoading: true,  
  parentUseEffectKey : 'loadDisbursementsList',
  localEventSignature: 'loadDisbursementsList',
  disbursementsQuerySearchStr: '',

  
  //for profile page
  disbursementsNode : {},
  disbursementsActionStatus : 'add_disbursements',
  paramdisbursementsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  disbursementsUptoken:'',
  disbursementsNode : {},
  activeScrollId : 'DisbursementsProfileTray',
  
  //dataScript
  disbursementsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useDisbursementsState(overrides = {}) {
  const combinedDefaults = { ...defaultDisbursementsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

