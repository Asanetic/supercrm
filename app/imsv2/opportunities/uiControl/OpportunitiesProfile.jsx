'use client';
import { useSearchParams } from 'next/navigation';
import DynamicForm from '../../moduleControl/UiControl/DynamicForm';
import { OpportunitiesSchema } from '../OpportunitiesSchema';
import { useEntityFormController } from '../../moduleControl/dataControl/useEntityFormController';
import { mosyGetSchemaTitle } from '../../../MosyUtils/hiveUtils';
import OpportunitiesActions from '../logicControl/actionsRegistry';
import OpportunitiesList from './OpportunitiesList';
import { MosyTitleTag } from '../../UiControl/componentControl';

// OpportunitiesProfile — pure shell. It resolves the id, wires up the
// controller, and hands DynamicForm the two strings that make this page
// look like a Company profile: `eyebrow` and `title`. DynamicForm owns
// every pixel of how those get laid out and styled (including the
// profileActions toolbar) — this file has no markup of its own. Point
// the same pattern at a different schema and both the fields AND the
// header/button set change with zero edits here.
export default function OpportunitiesProfile({ id: idProp, onDone, hiddenActions = [], presetValues, schemaOverride }) {
  const searchParams = useSearchParams();
  const schema = schemaOverride || OpportunitiesSchema;
  const id = idProp ?? searchParams.get(`${OpportunitiesSchema.entity}_dataNode`);
  const form = useEntityFormController(schema, OpportunitiesActions, {
    id,
    onDone,
    redirectOnDelete: './list',
    initialValues: presetValues,
  });

  return (
    <div className='col-md-12'>
    <DynamicForm
      controller={form}
      eyebrow={form.isEditing ? `${schema.label}  Profile` : `${schema.label}  Directory`}
      title={form.isEditing ? mosyGetSchemaTitle(schema, form.values, '') : `New ${schema.label}`}
      hiddenActions={hiddenActions}
    />

        {form.isEditing && !!form.values?.contact_id && (
          <>
            <MosyTitleTag title={`Opportunities history for ${form.values?.contact_name || ''}`}/>
            <OpportunitiesList customProfilePath='../opportunities/profile' title={`${form.values?.contact_name || ''} - Deal history`}  hiddenActions={['new']} fixedQuery={{ contactId: btoa(form.values?.contact_id) }}/>
          </>
        )}
        </div>
  );
}


 