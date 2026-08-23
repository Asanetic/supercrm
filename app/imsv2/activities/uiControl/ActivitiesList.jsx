'use client';
import { ActivitiesSchema } from '../ActivitiesSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ActivitiesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ActivitiesList() {
//   return <SmartGrid moduleActions={ActivitiesActions} schema={ActivitiesSchema} title="Activities" />;
// }PaidInvoicesSchema.label
export default function ActivitiesList({
  fixedQuery = {},
  dataOut = {},
  title = ActivitiesSchema.label,
  description = `${ActivitiesSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = ActivitiesActions,
  schema = ActivitiesSchema,
  hiddenActions=[],

}) {
  return (
    <SmartGrid
      moduleActions={moduleActions}
      schema={schema}
      title={title}
      description={description}
      customProfilePath={customProfilePath}
      fixedQuery={fixedQuery}
      dataOut={dataOut}
      hiddenActions={hiddenActions}
    />
  );
}