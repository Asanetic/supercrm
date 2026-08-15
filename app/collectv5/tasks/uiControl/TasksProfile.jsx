'use client';
import { useSearchParams } from 'next/navigation';
import DynamicForm from '../../moduleControl/UiControl/DynamicForm';
import { TasksSchema } from '../TasksSchema';
import { useEntityFormController } from '../../moduleControl/dataControl/useEntityFormController';
import { mosyGetSchemaTitle } from '../../../MosyUtils/hiveUtils';
import TasksActions from '../logicControl/actionsRegistry';

// TasksProfile — pure shell. It resolves the id, wires up the
// controller, and hands DynamicForm the two strings that make this page
// look like a Company profile: `eyebrow` and `title`. DynamicForm owns
// every pixel of how those get laid out and styled (including the
// profileActions toolbar) — this file has no markup of its own. Point
// the same pattern at a different schema and both the fields AND the
// header/button set change with zero edits here.
export default function TasksProfile({ id: idProp, onDone, hiddenActions=[] }) {
  const searchParams = useSearchParams();
  const id = idProp ?? searchParams.get(`${TasksSchema.entity}_dataNode`);
  const form = useEntityFormController(TasksSchema, TasksActions, {
    id,
    onDone,
    redirectOnDelete: './list',
  });

  return (
    <DynamicForm
      controller={form}
      eyebrow={form.isEditing ? `${TasksSchema.label}  Profile` : `${TasksSchema.label}  Directory`}
      title={form.isEditing ? mosyGetSchemaTitle(TasksSchema, form.values, '') : `New ${TasksSchema.label}`}
      hiddenActions={hiddenActions}
    />
  );
}


 