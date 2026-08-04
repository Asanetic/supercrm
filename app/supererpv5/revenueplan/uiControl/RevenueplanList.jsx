'use client';
import { RevenueplanSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import RevenueplanActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function RevenueplanList() {
//   return <SmartGrid moduleActions={RevenueplanActions} schema={RevenueplanSchema} title="Revenueplan" />;
// }
export default function RevenueplanList({
  fixedQuery = {},
  dataOut = {},
  title = 'Revenueplan',
  description = 'Revenueplan list ',
  customProfilePath = './profile',
  moduleActions = RevenueplanActions,
  schema = RevenueplanSchema,
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
    />
  );
}