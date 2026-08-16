'use client';
import { QuotationsSchema } from '../QuotationsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import QuotationsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function QuotationsList() {
//   return <SmartGrid moduleActions={QuotationsActions} schema={QuotationsSchema} title="Quotations" />;
// }PaidInvoicesSchema.label
export default function QuotationsList({
  fixedQuery = {},
  dataOut = {},
  title = QuotationsSchema.label,
  description = `${QuotationsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = QuotationsActions,
  schema = QuotationsSchema,
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