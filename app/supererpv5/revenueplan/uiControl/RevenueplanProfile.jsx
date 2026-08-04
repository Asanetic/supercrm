'use client';
import { useSearchParams } from 'next/navigation';
import DynamicForm from '../../moduleControl/UiControl/DynamicForm';
import { RevenueplanSchema } from '../schema';
import { useEntityFormController } from '../../moduleControl/dataControl/useEntityFormController';
import { mosyGetSchemaTitle } from '../../../MosyUtils/hiveUtils';
import RevenueplanActions from '../logicControl/actionsRegistry';

// RevenueplanProfile — pure shell. It resolves the id, wires up the
// controller, and hands DynamicForm the two strings that make this page
// look like a Company profile: `eyebrow` and `title`. DynamicForm owns
// every pixel of how those get laid out and styled (including the
// profileActions toolbar) — this file has no markup of its own. Point
// the same pattern at a different schema and both the fields AND the
// header/button set change with zero edits here.
export default function RevenueplanProfile({ id: idProp, onDone, hiddenActions=[] }) {
  const searchParams = useSearchParams();
  const id = idProp ?? searchParams.get(`${RevenueplanSchema.entity}_dataNode`);
  const form = useEntityFormController(RevenueplanSchema, RevenueplanActions, {
    id,
    onDone,
    redirectOnDelete: './list',
  });

  return (
    <>
    <DynamicForm
      controller={form}
      eyebrow={form.isEditing ? 'Revenueplan Profile' : 'Revenueplan Directory'}
      title={form.isEditing ? mosyGetSchemaTitle(RevenueplanSchema, form.values, '') : 'New Revenueplan'}
      hiddenActions={hiddenActions}
    />

    {/* {form.fetching ? (
      <div className="text-muted py-3 row justify-content-center">Loading client history…</div>
    ) : form.record ? (
      <LeadsList
        title={`${form.record.contact_name} project history`}
        fixedQuery={{ contactId: btoa(form.record.record_id) }}
        customProfilePath="../leads/profile"
        hiddenActions={['new', 'export', 'print']}

      />
    ) : null} */}
  </>
  );
}


 