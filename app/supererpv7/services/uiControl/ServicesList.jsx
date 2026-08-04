'use client';
import { ServicesSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ServicesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ServicesList() {
//   return <SmartGrid moduleActions={ServicesActions} schema={ServicesSchema} title="Services" />;
// }
export default function ServicesList({
  fixedQuery = {},
  dataOut = {},
  title = 'Services',
  description = 'Services list ',
  customProfilePath = './profile',
  moduleActions = ServicesActions,
  schema = ServicesSchema,
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