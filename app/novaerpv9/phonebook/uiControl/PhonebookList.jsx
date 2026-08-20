'use client';
import { PhonebookSchema } from '../PhonebookSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import PhonebookActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function PhonebookList() {
//   return <SmartGrid moduleActions={PhonebookActions} schema={PhonebookSchema} title="Phonebook" />;
// }PaidInvoicesSchema.label
export default function PhonebookList({
  fixedQuery = {},
  dataOut = {},
  title = PhonebookSchema.label,
  description = `${PhonebookSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = PhonebookActions,
  schema = PhonebookSchema,
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