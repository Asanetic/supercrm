/**
 * Final FILE: active-clients.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: active-clients.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterActiveClients
// ════════════════════════════════════════════════════════════════
export function filterActiveClients({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterActiveClients");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
