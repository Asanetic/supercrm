/**
 * Final FILE: lost-deals.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: lost-deals.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterLostDeals
// ════════════════════════════════════════════════════════════════
export function filterLostDeals({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterLostDeals");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
