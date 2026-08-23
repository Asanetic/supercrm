'use client';

import { useEffect, useState } from 'react';
import { mosyGetLSData } from '../../../MosyUtils/hiveUtils';
import saAuthConfigs from '../../../auth/featureConfig/saAuthConfigs';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardHeader() {
  const [name, setName] = useState('there');
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    try {
      const { sessionPrefix, usernameCol } = saAuthConfigs;
      const cookieKey = `${sessionPrefix}_sa_authsess_${usernameCol}_val`;
      const raw = mosyGetLSData(cookieKey);
      if (raw) setName(String(raw).split(' ')[0]);
    } catch {
      // stay on the "there" fallback
    }
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dash-header">
      <div>
        <h3 className="dash-header-title">{greeting()}, {name}</h3>
        <div className="dash-header-date">{today}</div>
      </div>

      <div className="dash-header-right">
        <div className="dash-notif-wrap">
          <button
            type="button"
            className="dash-icon-btn"
            onClick={() => setShowNotif((v) => !v)}
            aria-label="Notifications"
          >
            <i className="fa fa-bell-o" />
          </button>
          {showNotif && (
            <div className="dash-notif-pop">
              <div className="dash-notif-empty">No new notifications</div>
            </div>
          )}
        </div>

        <div className="dash-profile">
          <img src="/img/useravatar.png" alt="" className="dash-avatar" />
          <span className="dash-profile-name">{name}</span>
        </div>
      </div>

      <style jsx>{`
        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 4px 2px 18px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .dash-header-title {
          margin: 0;
          font-weight: 700;
          font-size: 1.4rem;
          color: #0f172a;
        }
        .dash-header-date {
          color: #64748b;
          font-size: 0.85rem;
          margin-top: 2px;
        }
        .dash-header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .dash-notif-wrap {
          position: relative;
        }
        .dash-icon-btn {
          border: 1px solid #e6e8ec;
          background: #fff;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          cursor: pointer;
        }
        .dash-icon-btn:hover {
          background: #f8fafc;
        }
        .dash-notif-pop {
          position: absolute;
          right: 0;
          top: 46px;
          width: 220px;
          background: #fff;
          border: 1px solid #e6e8ec;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(16, 24, 40, 0.1);
          padding: 14px;
          z-index: 20;
        }
        .dash-notif-empty {
          color: #94a3b8;
          font-size: 0.85rem;
          text-align: center;
        }
        .dash-profile {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dash-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #e6e8ec;
        }
        .dash-profile-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
