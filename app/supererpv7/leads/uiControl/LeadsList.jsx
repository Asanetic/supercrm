'use client';
import { LeadsSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import LeadsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function LeadsList() {
//   return <SmartGrid moduleActions={LeadsActions} schema={LeadsSchema} title="Leads" />;
// }
export default function LeadsList({
  fixedQuery = {},
  dataOut = {},
  title = 'Leads',
  description = 'Leads list ',
  customProfilePath = './profile',
  moduleActions = LeadsActions,
  schema = LeadsSchema,
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