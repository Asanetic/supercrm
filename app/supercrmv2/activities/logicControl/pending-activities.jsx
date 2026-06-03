/**
 * Final FILE: pending-activities.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';

/**
 * FILE: pending-activities.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterPendingActivities
// ════════════════════════════════════════════════════════════════
export function filterPendingActivities({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterPendingActivities");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
