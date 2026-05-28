/**
 * Final FILE: failed-payments.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: failed-payments.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterFailedPayments
// ════════════════════════════════════════════════════════════════
export function filterFailedPayments({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterFailedPayments");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
