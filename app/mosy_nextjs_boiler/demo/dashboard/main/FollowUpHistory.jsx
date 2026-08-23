'use client';

import { mosyFormatDateTime } from '../../../MosyUtils/hiveUtils';

export default function FollowUpHistory({ items = [] }) {
  return (
    <div className="dash-section">
      <div className="dash-section-head">
        <h5>Follow-up History</h5>
      </div>

      {items.length === 0 ? (
        <div className="dash-empty">No follow-ups logged yet.</div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Project</th>
                <th>Venue</th>
                <th>Agenda</th>
                <th>Outcome</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="dash-table-time">{mosyFormatDateTime(item.activity_date)}</td>
                  <td>{item.contact_name || '—'}</td>
                  <td>{item.title || '—'}</td>
                  <td>{item.venue || '—'}</td>
                  <td>{item.agenda || '—'}</td>
                  <td>{item.outcome || '—'}</td>
                  <td>{item.status || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .dash-section {
          background: #fff;
          border: 1px solid #e6e8ec;
          border-radius: 14px;
          padding: 18px;
        }
        .dash-section-head h5 {
          margin: 0 0 12px;
          font-weight: 700;
          font-size: 1rem;
          color: #0f172a;
        }
        .dash-empty {
          color: #94a3b8;
          font-size: 0.88rem;
          padding: 18px 4px;
        }
        .dash-table-wrap {
          overflow-x: auto;
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .dash-table th {
          text-align: left;
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 6px 8px;
          border-bottom: 1px solid #f1f5f9;
          white-space: nowrap;
        }
        .dash-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #f8fafc;
          color: #334155;
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dash-table-time {
          font-weight: 600;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}
