'use client';

import ElforgeChart from '../../../components/ElforgeChart';

function ChartBox({ title, empty, children }) {
  return (
    <div className="col-md-6 mb-3">
      <div className="dash-section">
        <div className="dash-section-head">
          <h5>{title}</h5>
        </div>
        {empty ? <div className="dash-empty">No data yet.</div> : children}
      </div>

      <style jsx>{`
        .dash-section {
          background: #fff;
          border: 1px solid #e6e8ec;
          border-radius: 14px;
          padding: 18px;
          height: 100%;
        }
        .dash-section-head h5 {
          margin: 0 0 8px;
          font-weight: 700;
          font-size: 1rem;
          color: #0f172a;
        }
        .dash-empty {
          color: #94a3b8;
          font-size: 0.88rem;
          padding: 40px 4px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default function DashboardCharts({
  paymentByClient = [],
  paymentByMonth = [],
  expectedByMonth = [],
  callsMessagesByMonth = [],
}) {
  return (
    <div className="row m-0">
      <ChartBox title="Payment by Client" empty={paymentByClient.length === 0}>
        <ElforgeChart
          chartType="bar"
          dataKey="label"
          data={paymentByClient}
          series={[{ key: 'value', color: '#2E6CF5', name: 'Paid' }]}
          height={280}
        />
      </ChartBox>

      <ChartBox title="Payment by Month" empty={paymentByMonth.length === 0}>
        <ElforgeChart
          chartType="bar"
          dataKey="label"
          data={paymentByMonth}
          series={[{ key: 'value', color: '#16a34a', name: 'Paid' }]}
          height={280}
        />
      </ChartBox>

      <ChartBox title="Expected by Month" empty={expectedByMonth.length === 0}>
        <ElforgeChart
          chartType="bar"
          dataKey="label"
          data={expectedByMonth}
          series={[{ key: 'value', color: '#94a3b8', name: 'Expected' }]}
          height={280}
        />
      </ChartBox>

      <ChartBox title="Calls & Messages by Month" empty={callsMessagesByMonth.length === 0}>
        <ElforgeChart
          chartType="bar"
          dataKey="label"
          data={callsMessagesByMonth}
          series={[
            { key: 'calls', color: '#16a34a', name: 'Calls' },
            { key: 'messages', color: '#2563eb', name: 'Messages' },
          ]}
          height={280}
        />
      </ChartBox>
    </div>
  );
}
