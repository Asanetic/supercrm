'use client';

export default function SimpleCards({ cards = [] }) {
  return (
    <div className="dash-cards row m-0">
      {cards.map((c, i) => (
        <div className="col-lg-3 col-sm-6 mb-3" key={c.key || i}>
          <div className="dash-card">
            <div className="dash-card-label">{c.label}</div>
            <div className="dash-card-value">{c.value}</div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .dash-card {
          background: #fff;
          border: 1px solid #e6e8ec;
          border-radius: 14px;
          padding: 18px;
          height: 100%;
        }
        .dash-card-label {
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .dash-card-value {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}
