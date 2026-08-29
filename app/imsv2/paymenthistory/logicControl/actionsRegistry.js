/**
 * Register real behavior here, once per action key. Both grid rowLinks
 * AND profile-level buttons (schema.profileActions) route through this
 * SAME registry — one place to add new behavior, works everywhere.
 *
 * Every registered function receives ONE ctx object instead of a fixed
 * list of positional args — see actionRegistryDocs.md (same folder) for
 * the full ctx field list and worked examples for every action shape
 * used elsewhere in this app (cross-module popups, preset create forms,
 * quick-edit modals, grid-toolbar smart filters, sending messages, etc).
 * Copy the block that matches what you're building from there.
 *
 * NOTE: "delete" and "clone" are intercepted directly by
 * useEntityFormController before they ever reach this registry — don't
 * register functions under those two keys, they will never fire.
 */

import React from 'react';
import { MosyCard } from "../../../components/MosyCard";
import RevenueplanList from "../../revenueplan/uiControl/RevenueplanList";
import PaymentrequestsList from "../../paymentrequests/uiControl/PaymentrequestsList";
import { resolveContactRecipient } from "../../moduleControl/UiControl/contactTouchActions";
import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";

const PaymenthistoryActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Related-record popups. This payment's expected_income_id IS the
  // revenue plan's own record_id (see resolveField('expected_income_id',
  // ...) in PaymenthistorySchema.js), so both popups scope by that same
  // value — the plan itself via the built-in `recordId` alias, and any
  // payment requests raised against that plan via `relatedRecordId`
  // (revenueplan's own `request_payment` action sets a new request's
  // related_record_id to the plan's record_id — see
  // revenueplan/logicControl/actionsRegistry.js).
  view_expected_revenue: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.expected_income_id) return;
    MosyCard(
      '',
      React.createElement(RevenueplanList, {
        customProfilePath: '../revenueplan/profile',
        title: `Expected Revenue — ${row.title || row.contact_name || ''}`,
        fixedQuery: { recordId: btoa(row.expected_income_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_payment_request: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.expected_income_id) return;
    MosyCard(
      '',
      React.createElement(PaymentrequestsList, {
        customProfilePath: '../paymentrequests/profile',
        title: `Payment Requests — ${row.title || row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.expected_income_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  // Opens the shared Smart Messenger, prefilled with a receipt message
  // addressed to this payment's payer — resolveContactRecipient fetches
  // the linked contact's real phone_number/email (this row only carries
  // the cached contact_name, via resolveField('contact_id', ...) in
  // PaymenthistorySchema.js).
  send_payment_receipt: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const recipient = await resolveContactRecipient(row);
    const payerName = recipient?.full_name || row.contact_name || '';
    const amountLabel = row.amount != null ? `${row.currency ? `${row.currency} ` : ''}${row.amount}` : '';

    const receiptMessage = [
      `Hi ${payerName},`,
      '',
      `This confirms we received your payment of ${amountLabel}${row.payment_date ? ` on ${row.payment_date}` : ''}${row.payment_reference ? ` (Ref: ${row.payment_reference})` : ''}.`,
      row.title ? `Applied to: ${row.title}.` : '',
      '',
      'Thank you!',
    ].filter(Boolean).join('\n');

    MosySendSmartMessage({
      profileDataNode: recipient,
      uiOptions: {
        modalTitle: `Send Payment Receipt — ${payerName}`,
        subject: 'Payment Receipt',
        message: receiptMessage,
      },
    });
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default PaymenthistoryActions
