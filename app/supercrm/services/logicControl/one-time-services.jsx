/**
 * Final FILE: one-time-services.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: one-time-services.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterOneTimeServices
// ════════════════════════════════════════════════════════════════
export function filterOneTimeServices({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterOneTimeServices");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
