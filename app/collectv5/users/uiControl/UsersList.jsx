'use client';
import { UsersSchema } from '../UsersSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import UsersActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function UsersList() {
//   return <SmartGrid moduleActions={UsersActions} schema={UsersSchema} title="Users" />;
// }PaidInvoicesSchema.label
export default function UsersList({
  fixedQuery = {},
  dataOut = {},
  title = UsersSchema.label,
  description = `${UsersSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = UsersActions,
  schema = UsersSchema,
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