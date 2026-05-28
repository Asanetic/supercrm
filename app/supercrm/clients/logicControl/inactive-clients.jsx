/**
 * Final FILE: inactive-clients.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: inactive-clients.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterInactiveClients
// ════════════════════════════════════════════════════════════════
export function filterInactiveClients({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterInactiveClients");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
