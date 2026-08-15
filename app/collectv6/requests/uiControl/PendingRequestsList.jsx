'use client';
import { PendingRequestsSchema } from '../PendingRequestsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import RequestsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function PendingRequestsList() {
//   return <SmartGrid moduleActions={RequestsActions} schema={PendingRequestsSchema} title="Requests" />;
// }PaidInvoicesSchema.label
export default function PendingRequestsList({
  fixedQuery = {},
  dataOut = {},
  title = PendingRequestsSchema.label,
  description = `${PendingRequestsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = RequestsActions,
  schema = PendingRequestsSchema,
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