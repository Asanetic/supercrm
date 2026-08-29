'use client';
import { PaymenthistorySchema } from '../PaymenthistorySchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import PaymenthistoryActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function PaymenthistoryList() {
//   return <SmartGrid moduleActions={PaymenthistoryActions} schema={PaymenthistorySchema} title="Paymenthistory" />;
// }PaidInvoicesSchema.label
export default function PaymenthistoryList({
  fixedQuery = {},
  dataOut = {},
  title = PaymenthistorySchema.label,
  description = `${PaymenthistorySchema.label} list`,
  customProfilePath = './profile',
  moduleActions = PaymenthistoryActions,
  schema = PaymenthistorySchema,
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