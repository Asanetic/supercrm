'use client';
import { IncomeplanSchema } from '../IncomeplanSchema';
import IncomeplanActions from '../logicControl/actionsRegistry';
import SmartGridInsight from '../../moduleControl/UiControl/SmartGridInsight';

const num = (v) => Number(String(v ?? 0).replace(/,/g, '')) || 0;
const money = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
const labelOf = (r, key) => String(r[key] ?? '').trim() || 'Unspecified';

// Sum expected_amt per distinct value of `key` (largest first unless sorted by label).
function groupSum(rows, key, { sortByLabel = false, valueKey = 'expected_amt' } = {}) {
  const map = new Map();
  rows.forEach((r) => {
    const label = labelOf(r, key);
    map.set(label, (map.get(label) || 0) + num(r[valueKey]));
  });
  const items = [...map].map(([label, value]) => ({ label, value, display: money(value) }));
  return sortByLabel ? items.sort((a, b) => a.label.localeCompare(b.label)) : items.sort((a, b) => b.value - a.value);
}

const TONES = ['blue', 'green', 'purple', 'amber', 'red', 'teal'];

// Stats/charts are computed from the rows currently loaded in the grid (respects filters/search).
const buildStats = (g) => {
  const rows = g.rows || [];
  return groupSum(rows, 'status').map(({ label, value }, i) => {
    const count = rows.filter((r) => labelOf(r, 'status') === label).length;
    return {
      key: `status-${label}`,
      label,
      value: money(value),
      sub: `${count} ${count === 1 ? 'plan' : 'plans'}`,
      icon: 'flag',
      tone: TONES[i % TONES.length],
    };
  });
};

const buildBreakdowns = (g) => {
  const rows = g.rows || [];
  const total = rows.reduce((s, r) => s + num(r.expected_amt), 0);
  return [
    { key: 'status', title: 'Expected amount by status', type: 'donut', centerLabel: 'Total', centerValue: money(total), items: groupSum(rows, 'status') },
    { key: 'month', title: 'Expected amount by plan month', type: 'columns', items: groupSum(rows, 'plan_month', { sortByLabel: true }) },
    { key: 'activities', title: 'Activities by plan month', type: 'columns', color: '#8b5cf6', items: groupSum(rows, 'plan_month', { sortByLabel: true, valueKey: 'activities' }) },
  ];
};

export default function IncomeplanList({
  fixedQuery = {},
  dataOut = {},
  title = IncomeplanSchema.label,
  description = `${IncomeplanSchema.label} list`,
  customProfilePath = './profile',
  moduleActions = IncomeplanActions,
  schema = IncomeplanSchema,
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
