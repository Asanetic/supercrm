'use client';
import { ClientsSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ClientsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ClientsList() {
//   return <SmartGrid moduleActions={ClientsActions} schema={ClientsSchema} title="Clients" />;
// }
export default function ClientsList({
  fixedQuery = {},
  dataOut = {},
  title = 'Clients',
  description = 'Clients list ',
  customProfilePath = './profile',
  moduleActions = ClientsActions,
  schema = ClientsSchema,
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