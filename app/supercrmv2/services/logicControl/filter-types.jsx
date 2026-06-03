/**
 * Final FILE: filter-types.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartTagColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: filter-types.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterByCategory
// ════════════════════════════════════════════════════════════════
export function filterByCategory({title, customQueryStr, stateItemSetters,parentColName, parentTableName}) 
{
    //alert("filterByCategory");

    MosySmartTagColumnFilter({title:title, customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, parentColName:parentColName, parentTableName:parentTableName});

}
