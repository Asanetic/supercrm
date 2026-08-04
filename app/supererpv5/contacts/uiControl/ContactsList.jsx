'use client';
import { ContactsSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ContactsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ContactsList() {
//   return <SmartGrid moduleActions={ContactsActions} schema={ContactsSchema} title="Contacts" />;
// }
export default function ContactsList({
  fixedQuery = {},
  dataOut = {},
  title = 'Contacts',
  description = 'Contacts list ',
  customProfilePath = './profile',
  moduleActions = ContactsActions,
  schema = ContactsSchema,
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