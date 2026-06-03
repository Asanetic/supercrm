/**
 * Final FILE: won-deals.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: won-deals.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterWonDeals
// ════════════════════════════════════════════════════════════════
export function filterWonDeals({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterWonDeals");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
