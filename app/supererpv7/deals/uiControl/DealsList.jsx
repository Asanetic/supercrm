'use client';
import { DealsSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import DealsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function DealsList() {
//   return <SmartGrid moduleActions={DealsActions} schema={DealsSchema} title="Deals" />;
// }
export default function DealsList({
  fixedQuery = {},
  dataOut = {},
  title = 'Deals',
  description = 'Deals list ',
  customProfilePath = './profile',
  moduleActions = DealsActions,
  schema = DealsSchema,
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