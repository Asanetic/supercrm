'use client';
import { ActiveUsersSchema } from '../ActiveUsersSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import UsersActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ActiveUsersList() {
//   return <SmartGrid moduleActions={UsersActions} schema={ActiveUsersSchema} title="Users" />;
// }PaidInvoicesSchema.label
export default function ActiveUsersList({
  fixedQuery = {},
  dataOut = {},
  title = ActiveUsersSchema.label,
  description = `${ActiveUsersSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = UsersActions,
  schema = ActiveUsersSchema,
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