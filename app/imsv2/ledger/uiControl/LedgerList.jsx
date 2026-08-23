'use client';
import { LedgerSchema } from '../LedgerSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import LedgerActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function LedgerList() {
//   return <SmartGrid moduleActions={LedgerActions} schema={LedgerSchema} title="Ledger" />;
// }PaidInvoicesSchema.label
export default function LedgerList({
  fixedQuery = {},
  dataOut = {},
  title = LedgerSchema.label,
  description = `${LedgerSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = LedgerActions,
  schema = LedgerSchema,
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