
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultInvoiceItemsStateDefaults = {

  //state management for list page
  invoiceItemsListData : [],
  invoiceItemsListPageCount : 1,
  invoiceItemsLoading: true,  
  parentUseEffectKey : 'loadInvoiceItemsList',
  localEventSignature: 'loadInvoiceItemsList',
  invoiceItemsQuerySearchStr: '',

  
  //for profile page
  invoice_itemsNode : {},
  invoiceItemsActionStatus : 'add_invoice_items',
  paraminvoiceItemsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  invoiceItemsUptoken:'',
  invoiceItemsNode : {},
  activeScrollId : 'InvoiceItemsProfileTray',
  
  //dataScript
  invoiceItemsCustomProfileQuery : '',
  invoicesCustomProfileQuery : ``,

  
  // ... other base defaults
};

export function useInvoiceItemsState(overrides = {}) {
  const combinedDefaults = { ...defaultInvoiceItemsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

