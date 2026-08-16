'use client';
import { SmartpaymentrequestsSchema } from '../SmartpaymentrequestsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import SmartpaymentrequestsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function SmartpaymentrequestsList() {
//   return <SmartGrid moduleActions={SmartpaymentrequestsActions} schema={SmartpaymentrequestsSchema} title="Smartpaymentrequests" />;
// }PaidInvoicesSchema.label
export default function SmartpaymentrequestsList({
  fixedQuery = {},
  dataOut = {},
  title = SmartpaymentrequestsSchema.label,
  description = `${SmartpaymentrequestsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = SmartpaymentrequestsActions,
  schema = SmartpaymentrequestsSchema,
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