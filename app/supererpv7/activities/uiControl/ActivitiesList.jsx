'use client';
import { ActivitiesSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ActivitiesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ActivitiesList() {
//   return <SmartGrid moduleActions={ActivitiesActions} schema={ActivitiesSchema} title="Activities" />;
// }
export default function ActivitiesList({
  fixedQuery = {},
  dataOut = {},
  title = 'Activities',
  description = 'Activities list ',
  customProfilePath = './profile',
  moduleActions = ActivitiesActions,
  schema = ActivitiesSchema,
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