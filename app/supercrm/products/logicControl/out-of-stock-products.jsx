/**
 * Final FILE: out-of-stock-products.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: out-of-stock-products.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterOutOfStockProducts
// ════════════════════════════════════════════════════════════════
export function filterOutOfStockProducts({customQueryStr, stateItemSetters, colName, colVal, tableName}) 
{
    //alert("filterOutOfStockProducts");

    MosySmartColumnFilter({customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, colName:colName, colVal:colVal, tableName:tableName});

}
