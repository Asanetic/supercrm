'use client';
import { CallhistorySchema } from '../CallhistorySchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import CallhistoryActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function CallhistoryList() {
//   return <SmartGrid moduleActions={CallhistoryActions} schema={CallhistorySchema} title="Callhistory" />;
// }PaidInvoicesSchema.label
export default function CallhistoryList({
  fixedQuery = {},
  dataOut = {},
  title = CallhistorySchema.label,
  description = `${CallhistorySchema.label} list`,
  customProfilePath = './profile',
  moduleActions = CallhistoryActions,
  schema = CallhistorySchema,
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