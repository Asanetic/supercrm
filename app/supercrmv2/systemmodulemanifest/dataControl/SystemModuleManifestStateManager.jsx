
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultSystemModuleManifestStateDefaults = {

  //state management for list page
  systemModuleManifestListData : [],
  systemModuleManifestListPageCount : 1,
  systemModuleManifestLoading: true,  
  parentUseEffectKey : 'loadSystemModuleManifestList',
  localEventSignature: 'loadSystemModuleManifestList',
  systemModuleManifestQuerySearchStr: '',

  
  //for profile page
  system_module_manifest_Node : {},
  systemModuleManifestActionStatus : 'add_system_module_manifest_',
  paramsystemModuleManifestUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  systemModuleManifestUptoken:'',
  systemModuleManifestNode : {},
  activeScrollId : 'SystemModuleManifestProfileTray',
  
  //dataScript
  systemModuleManifestCustomProfileQuery : '',
  pageManifestCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useSystemModuleManifestState(overrides = {}) {
  const combinedDefaults = { ...defaultSystemModuleManifestStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

