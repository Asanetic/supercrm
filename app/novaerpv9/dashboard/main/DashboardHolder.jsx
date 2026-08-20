'use client';

import { useEffect, useState } from 'react';

import DashboardCards from './DashboardCards';
import DashboardCharts from './DashboardCharts';
import { MosySpace, MosyTitleTag } from '../../UiControl/componentControl';

import { mosyGetData,  } from '../../../MosyUtils/hiveUtils';

import { MosyNotify , closeMosyModal } from '../../../MosyUtils/ActionModals';

import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';
import { MosyProfileSection } from '../../UiControl/dataMapUiControl';

const apiRoutes = getApiRoutes()

export default function DashboardHolder() {
  const [chartData, setChartData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      MosyNotify({ message: 'Loading dashboard...', icon: 'line-chart', addTimer: false });

      const response = await mosyGetData({
        endpoint: apiRoutes.dashboard.admin,
        params: {}
      });

      closeMosyModal();

      if (response?.status === 'success') {
        setChartData(response?.chart_data || []);
        setCardData(response?.cards_data || []);
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
	<>
    <DashboardCards cards={cardData} />
    <div className="col-md-12 p-0 m-0  rounded-xl ">
      <div className="row justify-content-center m-0 p-0  col-md-12">
        <DashboardCharts chartData={chartData} />

      </div>
      <MosySpace spaceClass="p-2" />


    </div>
    </>

  );
}