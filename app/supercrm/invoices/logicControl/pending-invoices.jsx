/**
 * Final FILE: pending-invoices.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: pending-invoices.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterPendingInvoices
// ════════════════════════════════════════════════════════════════
export function filterPendingInvoices({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterPendingInvoices");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
