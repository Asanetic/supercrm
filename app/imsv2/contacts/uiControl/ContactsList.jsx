'use client';
import { ContactsSchema } from '../ContactsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ContactsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ContactsList() {
//   return <SmartGrid moduleActions={ContactsActions} schema={ContactsSchema} title="Contacts" />;
// }PaidInvoicesSchema.label
export default function ContactsList({
  fixedQuery = {},
  dataOut = {},
  title = ContactsSchema.label,
  description = `${ContactsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = ContactsActions,
  schema = ContactsSchema,
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