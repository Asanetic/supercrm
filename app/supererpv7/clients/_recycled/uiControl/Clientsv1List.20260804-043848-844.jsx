'use client';
import { Clientsv1Schema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import Clientsv1Actions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function Clientsv1List() {
//   return <SmartGrid moduleActions={Clientsv1Actions} schema={Clientsv1Schema} title="Clientsv1" />;
// }
export default function Clientsv1List({
  fixedQuery = {},
  dataOut = {},
  title = 'Clientsv1',
  description = 'Clientsv1 list ',
  customProfilePath = './profile',
  moduleActions = Clientsv1Actions,
  schema = Clientsv1Schema,
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