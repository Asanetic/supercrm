
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultExpectedRevenueStateDefaults = {

  //state management for list page
  expectedRevenueListData : [],
  expectedRevenueListPageCount : 1,
  expectedRevenueLoading: true,  
  parentUseEffectKey : 'loadExpectedRevenueList',
  localEventSignature: 'loadExpectedRevenueList',
  expectedRevenueQuerySearchStr: '',

  
  //for profile page
  expected_revenueNode : {},
  expectedRevenueActionStatus : 'add_expected_revenue',
  paramexpectedRevenueUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  expectedRevenueUptoken:'',
  expectedRevenueNode : {},
  activeScrollId : 'ExpectedRevenueProfileTray',
  
  //dataScript
  expectedRevenueCustomProfileQuery : '',
  clientsCustomProfileQuery : ``,
dealsCustomProfileQuery : ``,
invoicesCustomProfileQuery : ``,
paymentsCustomProfileQuery : ``,
activitiesCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useExpectedRevenueState(overrides = {}) {
  const combinedDefaults = { ...defaultExpectedRevenueStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

