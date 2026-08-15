'use client';
import { CompleteTasksSchema } from '../CompleteTasksSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import TasksActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function CompleteTasksList() {
//   return <SmartGrid moduleActions={TasksActions} schema={CompleteTasksSchema} title="Tasks" />;
// }PaidInvoicesSchema.label
export default function CompleteTasksList({
  fixedQuery = {},
  dataOut = {},
  title = CompleteTasksSchema.label,
  description = `${CompleteTasksSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = TasksActions,
  schema = CompleteTasksSchema,
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