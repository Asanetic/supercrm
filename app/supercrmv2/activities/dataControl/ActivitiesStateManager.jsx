
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultActivitiesStateDefaults = {

  //state management for list page
  activitiesListData : [],
  activitiesListPageCount : 1,
  activitiesLoading: true,  
  parentUseEffectKey : 'loadActivitiesList',
  localEventSignature: 'loadActivitiesList',
  activitiesQuerySearchStr: '',

  
  //for profile page
  activitiesNode : {},
  activitiesActionStatus : 'add_activities',
  paramactivitiesUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  activitiesUptoken:'',
  activitiesNode : {},
  activeScrollId : 'ActivitiesProfileTray',
  
  //dataScript
  activitiesCustomProfileQuery : '',
  clientsCustomProfileQuery : ``,
dealsCustomProfileQuery : ``,
usersCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useActivitiesState(overrides = {}) {
  const combinedDefaults = { ...defaultActivitiesStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

