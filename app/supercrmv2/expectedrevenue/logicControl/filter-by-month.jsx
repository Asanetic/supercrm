/**
 * Final FILE: filter-by-month.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySmartTagColumnFilter } from "../../UiControl/smartFilterUiControl";

/**
 * FILE: filter-by-month.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: filterRevenueByMonth
// ════════════════════════════════════════════════════════════════
export function filterRevenueByMonth({title, customQueryStr, stateItemSetters,parentColName, parentTableName}) 
{
    //alert("filterRevenueByMonth");

    MosySmartTagColumnFilter({title:title, customQueryStr:customQueryStr, stateItemSetters:stateItemSetters, parentColName:parentColName, parentTableName:parentTableName});

}
