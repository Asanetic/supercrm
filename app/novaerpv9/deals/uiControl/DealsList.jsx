'use client';
import { DealsSchema } from '../DealsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import DealsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function DealsList() {
//   return <SmartGrid moduleActions={DealsActions} schema={DealsSchema} title="Deals" />;
// }PaidInvoicesSchema.label
export default function DealsList({
  fixedQuery = {},
  dataOut = {},
  title = DealsSchema.label,
  description = `${DealsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = DealsActions,
  schema = DealsSchema,
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