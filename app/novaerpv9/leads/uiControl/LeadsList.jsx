'use client';
import { LeadsSchema } from '../LeadsSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import LeadsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function LeadsList() {
//   return <SmartGrid moduleActions={LeadsActions} schema={LeadsSchema} title="Leads" />;
// }PaidInvoicesSchema.label
export default function LeadsList({
  fixedQuery = {},
  dataOut = {},
  title = LeadsSchema.label,
  description = `${LeadsSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = LeadsActions,
  schema = LeadsSchema,
  hiddenActions=[],

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
      hiddenActions={hiddenActions}
    />
  );
}