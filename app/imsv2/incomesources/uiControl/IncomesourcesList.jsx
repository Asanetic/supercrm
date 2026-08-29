'use client';
import { IncomesourcesSchema } from '../IncomesourcesSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import IncomesourcesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function IncomesourcesList() {
//   return <SmartGrid moduleActions={IncomesourcesActions} schema={IncomesourcesSchema} title="Incomesources" />;
// }PaidInvoicesSchema.label
export default function IncomesourcesList({
  fixedQuery = {},
  dataOut = {},
  title = IncomesourcesSchema.label,
  description = `${IncomesourcesSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = IncomesourcesActions,
  schema = IncomesourcesSchema,
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