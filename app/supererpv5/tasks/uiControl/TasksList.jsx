'use client';
import { TasksSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import TasksActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function TasksList() {
//   return <SmartGrid moduleActions={TasksActions} schema={TasksSchema} title="Tasks" />;
// }
export default function TasksList({
  fixedQuery = {},
  dataOut = {},
  title = 'Tasks',
  description = 'Tasks list ',
  customProfilePath = './profile',
  moduleActions = TasksActions,
  schema = TasksSchema,
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