
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultDealsStateDefaults = {

  //state management for list page
  dealsListData : [],
  dealsListPageCount : 1,
  dealsLoading: true,  
  parentUseEffectKey : 'loadDealsList',
  localEventSignature: 'loadDealsList',
  dealsQuerySearchStr: '',

  
  //for profile page
  dealsNode : {},
  dealsActionStatus : 'add_deals',
  paramdealsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  dealsUptoken:'',
  dealsNode : {},
  activeScrollId : 'DealsProfileTray',
  
  //dataScript
  dealsCustomProfileQuery : '',
  clientsCustomProfileQuery : ``,
quotationsCustomProfileQuery : ``,
invoicesCustomProfileQuery : ``,
paymentsCustomProfileQuery : ``,
tasksCustomProfileQuery : ``,
activitiesCustomProfileQuery : ``,
expectedRevenueCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useDealsState(overrides = {}) {
  const combinedDefaults = { ...defaultDealsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

