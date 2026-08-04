'use client';
import { Activitiesv1Schema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import Activitiesv1Actions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function Activitiesv1List() {
//   return <SmartGrid moduleActions={Activitiesv1Actions} schema={Activitiesv1Schema} title="Activitiesv1" />;
// }
export default function Activitiesv1List({
  fixedQuery = {},
  dataOut = {},
  title = 'Activitiesv1',
  description = 'Activitiesv1 list ',
  customProfilePath = './profile',
  moduleActions = Activitiesv1Actions,
  schema = Activitiesv1Schema,
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