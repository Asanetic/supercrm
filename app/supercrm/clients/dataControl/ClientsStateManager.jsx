
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultClientsStateDefaults = {

  //state management for list page
  clientsListData : [],
  clientsListPageCount : 1,
  clientsLoading: true,  
  parentUseEffectKey : 'loadClientsList',
  localEventSignature: 'loadClientsList',
  clientsQuerySearchStr: '',

  
  //for profile page
  clientsNode : {},
  clientsActionStatus : 'add_clients',
  paramclientsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  clientsUptoken:'',
  clientsNode : {},
  activeScrollId : 'ClientsProfileTray',
  
  //dataScript
  clientsCustomProfileQuery : '',
  dealsCustomProfileQuery : ``,
quotationsCustomProfileQuery : ``,
invoicesCustomProfileQuery : ``,
paymentsCustomProfileQuery : ``,
tasksCustomProfileQuery : ``,
activitiesCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useClientsState(overrides = {}) {
  const combinedDefaults = { ...defaultClientsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

