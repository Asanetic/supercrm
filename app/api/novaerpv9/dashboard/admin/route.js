import { mosyFlexSelect, toNum } from '../../../apiUtils/dataControl/dataUtils';
import { processAuthToken } from '../../../auth/authManager';

// Rebuilt against the tables that actually exist in this app (clients,
// leads, deals, payments, quotations, expected_revenue, smart_messages,
// smart_calls, smart_payment_requests) — the previous version queried
// invoices/tasks/products/services/activities, none of which have a
// module or DB table here, so every request threw and the dashboard was
// permanently broken.
export async function GET(request) {
  try {
    const { valid: isTokenValid, reason: tokenError, data: authData } =
      processAuthToken(request);

    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }

    const safeHiveSiteId = String(authData.hive_site_id).replace(/'/g, "\\'");
    const siteScope = (tbl) => `WHERE ${tbl}.hive_site_id='${safeHiveSiteId}'`;

    // ---- Card totals ----
    const clients_countQ = {
      tbl: 'clients',
      colstr: btoa(`COUNT(*) as value`),
      q: btoa(siteScope('clients')),
    };

    const leads_countQ = {
      tbl: 'leads',
      colstr: btoa(`COUNT(*) as value`),
      q: btoa(siteScope('leads')),
    };

    const deals_countQ = {
      tbl: 'deals',
      colstr: btoa(`COUNT(*) as value`),
      q: btoa(siteScope('deals')),
    };

    const deals_total_valueQ = {
      tbl: 'deals',
      colstr: btoa(`COALESCE(SUM(deal_value),0) as value`),
      q: btoa(siteScope('deals')),
    };

    const payments_total_collectedQ = {
      tbl: 'payments',
      colstr: btoa(`COALESCE(SUM(amount_paid),0) as value`),
      q: btoa(siteScope('payments')),
    };

    const payment_requests_outstandingQ = {
      tbl: 'smart_payment_requests',
      colstr: btoa(`COALESCE(SUM(balance_amount),0) as value`),
      q: btoa(siteScope('smart_payment_requests')),
    };

    const quotations_countQ = {
      tbl: 'quotations',
      colstr: btoa(`COUNT(*) as value`),
      q: btoa(siteScope('quotations')),
    };

    const messages_countQ = {
      tbl: 'smart_messages',
      colstr: btoa(`COUNT(*) as value`),
      q: btoa(siteScope('smart_messages')),
    };

    // ---- Chart breakdowns ----
    const monthly_revenueQ = {
      tbl: 'payments',
      colstr: btoa(`
        DATE_FORMAT(paid_on, '%Y-%m') as label,
        COALESCE(SUM(amount_paid),0) as value
      `),
      q: btoa(`${siteScope('payments')} GROUP BY label ORDER BY label ASC`),
    };

    const monthly_deal_valueQ = {
      tbl: 'deals',
      colstr: btoa(`
        DATE_FORMAT(created_at, '%Y-%m') as label,
        COALESCE(SUM(deal_value),0) as value
      `),
      q: btoa(`${siteScope('deals')} GROUP BY label ORDER BY label ASC`),
    };

    const deal_status_breakdownQ = {
      tbl: 'deals',
      colstr: btoa(`deal_status as label, COUNT(*) as value`),
      q: btoa(`${siteScope('deals')} GROUP BY label ORDER BY value DESC`),
    };

    const pipeline_stage_distributionQ = {
      tbl: 'deals',
      colstr: btoa(`pipeline_stage as label, COUNT(*) as value`),
      q: btoa(`${siteScope('deals')} GROUP BY label ORDER BY value DESC`),
    };

    const monthly_lead_growthQ = {
      tbl: 'leads',
      colstr: btoa(`
        DATE_FORMAT(created_at, '%Y-%m') as label,
        COUNT(*) as value
      `),
      q: btoa(`${siteScope('leads')} GROUP BY label ORDER BY label ASC`),
    };

    const lead_source_breakdownQ = {
      tbl: 'leads',
      colstr: btoa(`lead_source as label, COUNT(*) as value`),
      q: btoa(`${siteScope('leads')} GROUP BY label ORDER BY value DESC`),
    };

    const client_status_breakdownQ = {
      tbl: 'clients',
      colstr: btoa(`client_status as label, COUNT(*) as value`),
      q: btoa(`${siteScope('clients')} GROUP BY label ORDER BY value DESC`),
    };

    const payment_status_breakdownQ = {
      tbl: 'payments',
      colstr: btoa(`payment_status as label, COUNT(*) as value`),
      q: btoa(`${siteScope('payments')} GROUP BY label ORDER BY value DESC`),
    };

    const [
      clients_countRes,
      leads_countRes,
      deals_countRes,
      deals_total_valueRes,
      payments_total_collectedRes,
      payment_requests_outstandingRes,
      quotations_countRes,
      messages_countRes,
      monthly_revenueRes,
      monthly_deal_valueRes,
      deal_status_breakdownRes,
      pipeline_stage_distributionRes,
      monthly_lead_growthRes,
      lead_source_breakdownRes,
      client_status_breakdownRes,
      payment_status_breakdownRes,
    ] = await Promise.all([
      mosyFlexSelect(clients_countQ),
      mosyFlexSelect(leads_countQ),
      mosyFlexSelect(deals_countQ),
      mosyFlexSelect(deals_total_valueQ),
      mosyFlexSelect(payments_total_collectedQ),
      mosyFlexSelect(payment_requests_outstandingQ),
      mosyFlexSelect(quotations_countQ),
      mosyFlexSelect(messages_countQ),
      mosyFlexSelect(monthly_revenueQ),
      mosyFlexSelect(monthly_deal_valueQ),
      mosyFlexSelect(deal_status_breakdownQ),
      mosyFlexSelect(pipeline_stage_distributionQ),
      mosyFlexSelect(monthly_lead_growthQ),
      mosyFlexSelect(lead_source_breakdownQ),
      mosyFlexSelect(client_status_breakdownQ),
      mosyFlexSelect(payment_status_breakdownQ),
    ]);

    const cardsData = [
      {
        title: 'Total Clients',
        value: `${toNum(clients_countRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaUsers',
      },
      {
        title: 'Total Leads',
        value: `${toNum(leads_countRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaBullseye',
      },
      {
        title: 'Total Deals',
        value: `${toNum(deals_countRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaSuitcase',
      },
      {
        title: 'Total Deal Value',
        value: `${toNum(deals_total_valueRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaBriefcase',
      },
      {
        title: 'Revenue Collected',
        value: `${toNum(payments_total_collectedRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaMoneyBillWave',
      },
      {
        title: 'Outstanding Requests',
        value: `${toNum(payment_requests_outstandingRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaFileInvoiceDollar',
      },
      {
        title: 'Total Quotations',
        value: `${toNum(quotations_countRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaFileTextO',
      },
      {
        title: 'Messages Sent',
        value: `${toNum(messages_countRes?.data?.[0]?.value || 0, 0)}`,
        percentage: '',
        icon: 'FaEnvelope',
      },
    ];

    const chartData = [
      {
        title: 'Monthly Revenue',
        chartType: 'bar',
        dataKey: 'label',
        data: monthly_revenueRes?.data ?? [],
        series: [{ key: 'value', color: '#661238', name: 'Revenue' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Monthly Deal Value',
        chartType: 'bar',
        dataKey: 'label',
        data: monthly_deal_valueRes?.data ?? [],
        series: [{ key: 'value', color: '#1d4ed8', name: 'Deal Value' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Deal Status Breakdown',
        chartType: 'pie',
        dataKey: 'label',
        data: deal_status_breakdownRes?.data ?? [],
        series: [{ key: 'value', color: '#661238', name: 'Deals' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Pipeline Stage Distribution',
        chartType: 'bar',
        dataKey: 'label',
        data: pipeline_stage_distributionRes?.data ?? [],
        series: [{ key: 'value', color: '#047857', name: 'Deals' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Monthly Lead Growth',
        chartType: 'line',
        dataKey: 'label',
        data: monthly_lead_growthRes?.data ?? [],
        series: [{ key: 'value', color: '#661238', name: 'Leads' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Lead Source Breakdown',
        chartType: 'pie',
        dataKey: 'label',
        data: lead_source_breakdownRes?.data ?? [],
        series: [{ key: 'value', color: '#661238', name: 'Leads' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Client Status Breakdown',
        chartType: 'pie',
        dataKey: 'label',
        data: client_status_breakdownRes?.data ?? [],
        series: [{ key: 'value', color: '#661238', name: 'Clients' }],
        height: 350,
        containerClass: 'col-md-6',
      },
      {
        title: 'Payment Status Breakdown',
        chartType: 'pie',
        dataKey: 'label',
        data: payment_status_breakdownRes?.data ?? [],
        series: [{ key: 'value', color: '#661238', name: 'Payments' }],
        height: 350,
        containerClass: 'col-md-6',
      },
    ];

    return Response.json({
      status: 'success',
      message: 'Dashboard ready!',
      cards_data: cardsData,
      chart_data: chartData,
      grid_data: [],
    });
  } catch (err) {
    console.error('GET dashboard/admin failed:', err);
    return Response.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
