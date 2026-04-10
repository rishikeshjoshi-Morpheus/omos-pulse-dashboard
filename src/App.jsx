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

/* ── Analytics dashboard (the original page) ─────────────────── */
function AnalyticsDashboard() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <TopBar />
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
  const [activePage, setActivePage] = useState('control-center');

  function renderPage() {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'control-center':
        return <AdvertisersPage />;
      default:
        return <AnalyticsDashboard />;
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#EDF0F5' }}>
      <LeftNav activePage={activePage} onPageChange={setActivePage} />
      {renderPage()}
    </div>
  );
}
