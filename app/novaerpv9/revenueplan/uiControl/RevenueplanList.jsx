'use client';
import { RevenueplanSchema } from '../RevenueplanSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import RevenueplanActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function RevenueplanList() {
//   return <SmartGrid moduleActions={RevenueplanActions} schema={RevenueplanSchema} title="Revenueplan" />;
// }PaidInvoicesSchema.label
export default function RevenueplanList({
  fixedQuery = {},
  dataOut = {},
  title = RevenueplanSchema.label,
  description = `${RevenueplanSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = RevenueplanActions,
  schema = RevenueplanSchema,
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