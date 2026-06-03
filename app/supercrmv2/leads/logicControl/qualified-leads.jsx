/**
 * Final FILE: qualified-leads.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: qualified-leads.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterQualifiedLeads
// ════════════════════════════════════════════════════════════════
export function filterQualifiedLeads({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterQualifiedLeads");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
