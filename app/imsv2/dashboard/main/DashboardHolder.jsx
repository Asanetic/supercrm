'use client';

import { useEffect, useState } from 'react';

import DashboardHeader from './DashboardHeader';
import SimpleCards from './SimpleCards';
import DashboardCharts from './DashboardCharts';
import FollowUpHistory from './FollowUpHistory';

import { mosyGetData } from '../../../MosyUtils/hiveUtils';
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

const apiRoutes = getApiRoutes();

const EMPTY_DATA = {
  cards: [],
  payment_by_client: [],
  payment_by_month: [],
  expected_by_month: [],
  calls_messages_by_month: [],
  follow_up_history: [],
};

export default function DashboardHolder() {
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await mosyGetData({
        endpoint: apiRoutes.dashboard.admin,
        params: {},
      });

      if (response?.status === 'success') {
        setData({
          cards: response?.cards || [],
          payment_by_client: response?.payment_by_client || [],
          payment_by_month: response?.payment_by_month || [],
          expected_by_month: response?.expected_by_month || [],
          calls_messages_by_month: response?.calls_messages_by_month || [],
          follow_up_history: response?.follow_up_history || [],
        });
        setError(null);
      } else {
        setError(response?.message || 'Failed to load dashboard data');
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="col-md-12 text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
          <span className="visually-hidden d-none">Loading...</span>
        </div>
        <p className="text-muted mt-3 mb-0">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-12 py-5">
        <div className="alert alert-danger text-center mb-0">
          <i className="fa fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dash-wrapper col-md-12 p-0 m-0">
      <DashboardHeader />

      <SimpleCards cards={data.cards} />

      <DashboardCharts
        paymentByClient={data.payment_by_client}
        paymentByMonth={data.payment_by_month}
        expectedByMonth={data.expected_by_month}
        callsMessagesByMonth={data.calls_messages_by_month}
      />

      <div className="row m-0">
        <div className="col-md-12 mb-3">
          <FollowUpHistory items={data.follow_up_history} />
        </div>
      </div>

      <style jsx global>{`
        .dash-wrapper .row > div {
          padding-left: 8px;
          padding-right: 8px;
        }
        .dash-wrapper .row {
          margin-left: -8px;
          margin-right: -8px;
        }
      `}</style>
    </div>
  );
}
