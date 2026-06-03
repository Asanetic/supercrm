/**
 * Final FILE: filter-prod-types.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartTagColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: filter-prod-types.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterProdByCategory
// ════════════════════════════════════════════════════════════════
export function filterProdByCategory({title, customQueryStr, stateItemSetters,parentColName, parentTableName}) 
{
    //alert("filterProdByCategory");

    MosySmartTagColumnFilter({title:title, customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, parentColName:parentColName, parentTableName:parentTableName});

}
