/**
 * Final FILE: hot-leads.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: hot-leads.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterHotLeads
// ════════════════════════════════════════════════════════════════
export function filterHotLeads({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterHotLeads");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
