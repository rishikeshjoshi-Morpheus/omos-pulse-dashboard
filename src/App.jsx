import React, { useState } from 'react';
import LeftNav from './components/LeftNav';
import TopBar from './components/TopBar';
import StatCards from './components/StatCards';
import Charts from './components/Charts';
import CampaignsTable from './components/CampaignsTable';
import DeviceTable from './components/DeviceTable';
import ReferrerTable from './components/ReferrerTable';
import GeoTable from './components/GeoTable';
import HomePage from './components/HomePage';
import AdvertisersPage from './components/AdvertisersPage';
import LiveAnalyticsPage from './components/LiveAnalyticsPage';
import DemandSupplyPage from './components/DemandSupplyPage';
import AdvertiserInsightsPage from './components/AdvertiserInsightsPage';
import SegmentManagerPage from './components/SegmentManagerPage';
import ScheduledReportsPage from './components/ScheduledReportsPage';
import HealthReportPage from './components/HealthReportPage';
import SellerAdvertiserOnboardingPage from './components/SellerAdvertiserOnboardingPage';
import BrandAdvertiserOnboardingPage from './components/BrandAdvertiserOnboardingPage';

/* ── Analytics dashboard (the original page) ─────────────────── */
function AnalyticsDashboard({ bare = false }) {
  if (bare) {
    return (
      <div style={{ padding: '24px', fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg-muted)', fontSize: 14 }}>
        Page coming soon…
      </div>
    );
  }
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <TopBar section="Analytics" page="Sponsored Ads" />
      <main style={{ flex: 1, padding: '24px 24px 40px', overflowY: 'auto' }}>
        <StatCards />
        <Charts />
        <CampaignsTable />
        <DeviceTable />
        <ReferrerTable />
        <GeoTable />
      </main>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState('advertiser-insights');

  function renderPage() {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'control-center':
        return <AdvertisersPage />;
      case 'manage-segments':
        return (
          <>
            <TopBar section="Control Center" page="Segment Manager" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <SegmentManagerPage />
            </main>
          </>
        );
      case 'advertiser-insights':
        return (
          <>
            <TopBar section="Analytics" page="Advertiser Insights" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <AdvertiserInsightsPage />
            </main>
          </>
        );
      case 'live-insights':
        return (
          <>
            <TopBar section="Analytics" page="Live Insights" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <LiveAnalyticsPage />
            </main>
          </>
        );
      case 'demand-supply':
        return (
          <>
            <TopBar section="Analytics" page="Demand & Supply" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <DemandSupplyPage />
            </main>
          </>
        );
      case 'scheduled-reports':
        return (
          <>
            <TopBar section="Analytics" page="Scheduled Reports" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <ScheduledReportsPage />
            </main>
          </>
        );
      case 'bu-analytics':
        return (
          <>
            <TopBar section="Analytics" page="BU Analytics" />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <AnalyticsDashboard bare />
            </main>
          </>
        );
      case 'brand-onboarding':
        return (
          <>
            <TopBar section="Control Center" page="Brand Advertiser Onboarding" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <BrandAdvertiserOnboardingPage />
            </main>
          </>
        );
      case 'seller-onboarding':
        return (
          <>
            <TopBar section="Control Center" page="Seller Advertiser Onboarding" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <SellerAdvertiserOnboardingPage />
            </main>
          </>
        );
      case 'overview':
      case 'budget-health':
      case 'delivery-health':
        return (
          <>
            <TopBar section="Health" page="Health Report" onNavigate={setActivePage} />
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--osmos-bg-subtle)' }}>
              <HealthReportPage />
            </main>
          </>
        );
      default:
        return <AnalyticsDashboard />;
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--osmos-bg-subtle)' }}>
      <LeftNav activePage={activePage} onPageChange={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {renderPage()}
      </div>
    </div>
  );
}
