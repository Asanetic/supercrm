'use client';
import { OpportunitiesSchema } from '../OpportunitiesSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import OpportunitiesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function OpportunitiesList() {
//   return <SmartGrid moduleActions={OpportunitiesActions} schema={OpportunitiesSchema} title="Opportunities" />;
// }PaidInvoicesSchema.label
export default function OpportunitiesList({
  fixedQuery = {},
  dataOut = {},
  title = OpportunitiesSchema.label,
  description = `${OpportunitiesSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = OpportunitiesActions,
  schema = OpportunitiesSchema,
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