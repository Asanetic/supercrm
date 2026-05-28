
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultMosySqlRollBackStateDefaults = {

  //state management for list page
  mosySqlRollBackListData : [],
  mosySqlRollBackListPageCount : 1,
  mosySqlRollBackLoading: true,  
  parentUseEffectKey : 'loadMosySqlRollBackList',
  localEventSignature: 'loadMosySqlRollBackList',
  mosySqlRollBackQuerySearchStr: '',

  
  //for profile page
  mosy_sql_roll_backNode : {},
  mosySqlRollBackActionStatus : 'add_mosy_sql_roll_back',
  parammosySqlRollBackUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  mosySqlRollBackUptoken:'',
  mosySqlRollBackNode : {},
  activeScrollId : 'MosySqlRollBackProfileTray',
  
  //dataScript
  mosySqlRollBackCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useMosySqlRollBackState(overrides = {}) {
  const combinedDefaults = { ...defaultMosySqlRollBackStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

