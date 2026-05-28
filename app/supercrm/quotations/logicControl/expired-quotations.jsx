/**
 * Final FILE: expired-quotations.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: expired-quotations.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterExpiredQuotations
// ════════════════════════════════════════════════════════════════
export function filterExpiredQuotations({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterExpiredQuotations");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
