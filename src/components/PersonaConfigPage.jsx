import React, { useState } from 'react';

const PERSONAS = ['Platinum', 'Gold', 'Silver', 'Beta'];

const PERSONA_COLORS = {
  Platinum: { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' },
  Gold: { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  Silver: { bg: '#f1f5f9', color: '#64748b', dot: '#94a3b8' },
  Beta: { bg: '#ede9fe', color: '#5b21b6', dot: '#8b5cf6' },
};

const FEATURES = [
  { id: 'smart_shopping', label: 'Smart Shopping Campaign', category: 'Campaign Type' },
  { id: 'manual_cpc', label: 'Manual CPC Campaign', category: 'Campaign Type' },
  { id: 'product_ads_search', label: 'Product Ads Search Campaign', category: 'Campaign Type' },
  { id: 'display_ads', label: 'Display Ads', category: 'Campaign Type' },
  { id: 'custom_ads', label: 'Custom Ads', category: 'Campaign Type' },
  { id: 'video_ads', label: 'Video Ads', category: 'Campaign Type' },
  { id: 'dayparting', label: 'Dayparting', category: 'Features' },
  { id: 'audience_targeting', label: 'Audience Targeting', category: 'Features' },
  { id: 'negative_keywords', label: 'Negative Keywords', category: 'Features' },
  { id: 'bid_strategy', label: 'Bid Strategy', category: 'Features' },
  { id: 'campaign_budget', label: 'Campaign Budget Optimization', category: 'Features' },
  { id: 'segment_targeting', label: 'Segment Targeting', category: 'Features' },
  { id: 'advanced_analytics', label: 'Advanced Analytics', category: 'Reporting' },
  { id: 'roas_reporting', label: 'ROAS Reporting', category: 'Reporting' },
  { id: 'competitor_insights', label: 'Competitor Insights', category: 'Reporting' },
];

const DEFAULT_CONFIG = {
  Platinum: Object.fromEntries(FEATURES.map(f => [f.id, true])),
  Gold: Object.fromEntries(FEATURES.map(f => [f.id, !['custom_ads', 'competitor_insights'].includes(f.id)])),
  Silver: Object.fromEntries(FEATURES.map(f => [f.id, ['smart_shopping', 'manual_cpc', 'dayparting', 'roas_reporting'].includes(f.id)])),
  Beta: Object.fromEntries(FEATURES.map(f => [f.id, ['smart_shopping', 'display_ads', 'audience_targeting', 'advanced_analytics'].includes(f.id)])),
};

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{ width: 36, height: 20, borderRadius: 10, background: checked ? 'var(--osmos-brand-primary)' : '#d1d5db', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: checked ? 19 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  );
}

export default function PersonaConfigPage() {
  const [activeTab, setActiveTab] = useState('Platinum');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleToggle(featureId) {
    setConfig(c => ({
      ...c,
      [activeTab]: { ...c[activeTab], [featureId]: !c[activeTab][featureId] },
    }));
  }

  const categories = Array.from(new Set(FEATURES.map(f => f.category)));
  const pc = PERSONA_COLORS[activeTab];

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#16a34a', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{toast}</div>
      )}

      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico stroke="var(--osmos-brand-primary)" d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Persona Configuration</span>
          </div>
          <button onClick={() => showToast('Configuration saved successfully')} style={{ background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
            Save Changes
          </button>
        </div>

        {/* Persona Tabs */}
        <div style={{ borderBottom: '1px solid var(--osmos-border)', display: 'flex' }}>
          {PERSONAS.map(p => {
            const color = PERSONA_COLORS[p];
            return (
              <button key={p} onClick={() => setActiveTab(p)} style={{
                padding: '10px 20px', border: 'none', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                fontSize: 13, fontWeight: activeTab === p ? 700 : 400,
                background: 'transparent',
                color: activeTab === p ? 'var(--osmos-brand-primary)' : 'var(--osmos-fg-muted)',
                borderBottom: activeTab === p ? '2px solid var(--osmos-brand-primary)' : '2px solid transparent',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: color.dot, display: 'inline-block' }} />
                {p}
              </button>
            );
          })}
        </div>

        {/* Feature Toggles */}
        <div style={{ padding: '20px' }}>
          <div style={{ padding: '10px 14px', borderRadius: 8, background: pc.bg, color: pc.color, fontSize: 12, fontWeight: 600, marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: pc.dot, display: 'inline-block' }} />
            {activeTab} Persona — Feature Toggles
          </div>

          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--osmos-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{cat}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
                {FEATURES.filter(f => f.category === cat).map((feature, idx, arr) => (
                  <div key={feature.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: idx < arr.length - 1 ? '1px solid var(--osmos-border)' : 'none', background: '#fff' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                    <span style={{ fontSize: 13, color: 'var(--osmos-fg)' }}>{feature.label}</span>
                    <Toggle checked={config[activeTab][feature.id]} onChange={() => handleToggle(feature.id)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
