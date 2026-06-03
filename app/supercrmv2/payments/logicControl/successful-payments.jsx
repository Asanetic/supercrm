/**
 * Final FILE: successful-payments.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: successful-payments.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterSuccessfulPayments
// ════════════════════════════════════════════════════════════════
export function filterSuccessfulPayments({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterSuccessfulPayments");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
