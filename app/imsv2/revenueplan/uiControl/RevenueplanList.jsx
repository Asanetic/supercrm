'use client';
import { RevenueplanSchema } from '../RevenueplanSchema';
import RevenueplanActions from '../logicControl/actionsRegistry';
import SmartGridInsight from '../../moduleControl/UiControl/SmartGridInsight';

const num = (v) => Number(String(v ?? 0).replace(/,/g, '')) || 0;
const money = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

// Sum expected_amount per distinct value of `key` (largest first unless sorted by label).
function groupSum(rows, key, { sortByLabel = false } = {}) {
  const map = new Map();
  rows.forEach((r) => {
    const label = String(r[key] ?? '').trim() || 'Unspecified';
    map.set(label, (map.get(label) || 0) + num(r.expected_amount));
  });
  const items = [...map].map(([label, value]) => ({ label, value, display: money(value) }));
  return sortByLabel ? items.sort((a, b) => a.label.localeCompare(b.label)) : items.sort((a, b) => b.value - a.value);
}

// Stats are computed from the rows currently loaded in the grid (respects filters/search).
const buildBreakdowns = (g) => {
  const rows = g.rows || [];
  const total = rows.reduce((s, r) => s + num(r.expected_amount), 0);
  return [
    { key: 'collection', title: 'Income by collection type', type: 'columns', centerLabel: 'Total', centerValue: money(total), items: groupSum(rows, 'collection_status') },
    { key: 'status', title: 'Income by status', type: 'donut', centerLabel: 'Total', centerValue: money(total), items: groupSum(rows, 'payment_status') },
    { key: 'month', title: 'Income by month', type: 'columns', items: groupSum(rows, 'revenue_month', { sortByLabel: true }) },
  ];
};

const TONES = ['blue', 'green', 'purple', 'amber', 'red', 'teal'];
const STATUS_TONE = { paid: 'green', unpaid: 'red', 'partially paid': 'amber' };
const STATUS_ICON = { paid: 'check-circle', unpaid: 'clock-o', 'partially paid': 'adjust' };

// One card per distinct status and per distinct tag: amount + record count.
const buildStats = (g) => {
  const rows = g.rows || [];
  const card = (field, label, i, toneMap, iconMap) => {
    const items = rows.filter((r) => (String(r[field] ?? '').trim() || 'Unspecified') === label);
    const amt = items.reduce((s, r) => s + num(r.expected_amount), 0);
    const k = label.toLowerCase();
    return {
      key: `${field}-${label}`,
      label,
      value: money(amt),
      sub: `${items.length} ${items.length === 1 ? 'plan' : 'plans'}`,
      icon: iconMap?.[k] || (field === 'collection_status' ? 'bolt' : 'flag'),
      tone: toneMap?.[k] || TONES[i % TONES.length],
    };
  };
  const statuses = groupSum(rows, 'payment_status').map((x) => x.label);
  const types = groupSum(rows, 'collection_status').map((x) => x.label);
  return [
    ...statuses.map((l, i) => card('payment_status', l, i, STATUS_TONE, STATUS_ICON)),
    ...types.map((l, i) => card('collection_status', l, i + 1)),
  ];
};

export default function RevenueplanList({
  fixedQuery = {},
  dataOut = {},
  title = RevenueplanSchema.label,
  description = `${RevenueplanSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = RevenueplanActions,
  schema = RevenueplanSchema,
  hiddenActions = [],
}) {
  return (
    <SmartGridInsight
      moduleActions={moduleActions}
      schema={schema}
      title={title}
      description={description}
      customProfilePath={customProfilePath}
      fixedQuery={fixedQuery}
      dataOut={dataOut}
      hiddenActions={hiddenActions}
      stats={buildStats}
      breakdowns={buildBreakdowns}
    />
  );
}
