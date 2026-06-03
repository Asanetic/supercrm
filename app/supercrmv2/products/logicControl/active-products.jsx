/**
 * Final FILE: active-products.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: active-products.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterActiveProducts
// ════════════════════════════════════════════════════════════════
export function filterActiveProducts({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterActiveProducts");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
