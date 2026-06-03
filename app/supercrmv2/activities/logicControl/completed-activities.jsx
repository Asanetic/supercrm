/**
 * Final FILE: completed-activities.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';

/**
 * FILE: completed-activities.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterCompletedActivities
// ════════════════════════════════════════════════════════════════
export function filterCompletedActivities({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterCompletedActivities");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
