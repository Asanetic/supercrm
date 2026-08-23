'use client';
import { NotesSchema } from '../NotesSchema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import NotesActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function NotesList() {
//   return <SmartGrid moduleActions={NotesActions} schema={NotesSchema} title="Notes" />;
// }PaidInvoicesSchema.label
export default function NotesList({
  fixedQuery = {},
  dataOut = {},
  title = NotesSchema.label,
  description = `${NotesSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = NotesActions,
  schema = NotesSchema,
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