'use client';
import { QuicknotesSchema } from '../QuicknotesSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import QuicknotesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function QuicknotesList() {
//   return <SmartGrid moduleActions={QuicknotesActions} schema={QuicknotesSchema} title="Quicknotes" />;
// }PaidInvoicesSchema.label
export default function QuicknotesList({
  fixedQuery = {},
  dataOut = {},
  title = QuicknotesSchema.label,
  description = `${QuicknotesSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = QuicknotesActions,
  schema = QuicknotesSchema,
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