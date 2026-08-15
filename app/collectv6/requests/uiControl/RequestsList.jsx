'use client';
import { RequestsSchema } from '../RequestsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import RequestsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function RequestsList() {
//   return <SmartGrid moduleActions={RequestsActions} schema={RequestsSchema} title="Requests" />;
// }PaidInvoicesSchema.label
export default function RequestsList({
  fixedQuery = {},
  dataOut = {},
  title = RequestsSchema.label,
  description = `${RequestsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = RequestsActions,
  schema = RequestsSchema,
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