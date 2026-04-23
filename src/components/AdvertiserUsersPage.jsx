import React, { useState } from 'react';

const INITIAL_DATA = [
  { id: 1, name: 'John Doe', phone: '+91 98000 11111', email: 'john.doe@sportsworld.com', role: 'Admin', merchant: 'Sports World (OS_M002)' },
  { id: 2, name: 'Jane Smith', phone: '+91 97000 22222', email: 'jane.smith@techretailers.com', role: 'Read', merchant: 'Tech Retailers (OS_M003)' },
  { id: 3, name: 'Mark Lee', phone: '+91 96000 33333', email: 'mark.lee@gourmetgrocery.com', role: 'Admin', merchant: 'Gourmet Grocery (OS_M004)' },
  { id: 4, name: 'Sara Kim', phone: '+91 95000 44444', email: 'sara.kim@homeessentials.com', role: 'Read', merchant: 'Home Essentials Mart (OS_M005)' },
  { id: 5, name: 'Tom Chen', phone: '+91 94000 55555', email: 'tom.chen@electronicshub.com', role: 'Admin', merchant: 'Electronics Hub (OS_M006)' },
];

const MERCHANTS = ['Sports World (OS_M002)', 'Tech Retailers (OS_M003)', 'Gourmet Grocery (OS_M004)', 'Home Essentials Mart (OS_M005)', 'Electronics Hub (OS_M006)'];
const ROLES = ['Admin', 'Read'];

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

export default function AdvertiserUsersPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'Read', merchant: MERCHANTS[0] });
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.merchant.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!form.name || !form.email) return;
    setData(d => [...d, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', phone: '', role: 'Read', merchant: MERCHANTS[0] });
    setShowModal(false);
    showToast('Advertiser user added successfully');
  }

  const inputStyle = {
    width: '100%', padding: '8px 10px', border: '1px solid var(--osmos-border)', borderRadius: 6,
    fontSize: 13, fontFamily: "'Open Sans', sans-serif", color: 'var(--osmos-fg)', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', marginBottom: 4, display: 'block' };

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#16a34a', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{toast}</div>
      )}

      <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico stroke="var(--osmos-brand-primary)" d={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Advertiser Users</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--osmos-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '0 10px', height: 30 }}>
            <Ico d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} stroke="var(--osmos-fg-subtle)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…" style={{ border: 'none', outline: 'none', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif", width: 200 }} />
          </div>
          <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
            <Ico d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} size={12} stroke="#fff" sw={2.5} />
            Add New User
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                {['Name', 'Phone', 'Email', 'Role', 'Merchant', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 500, color: 'var(--osmos-fg-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--osmos-border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg)', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.phone}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)' }}>{row.email}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: row.role === 'Admin' ? '#fef3c7' : '#f0fdf4', color: row.role === 'Admin' ? '#92400e' : '#16a34a' }}>{row.role}</span>
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--osmos-fg-muted)', fontSize: 12 }}>{row.merchant}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => { setData(d => d.filter(r => r.id !== row.id)); showToast('User removed'); }} style={{ background: 'none', border: '1px solid #ef4444', borderRadius: 5, color: '#ef4444', fontSize: 11, padding: '3px 10px', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 10, width: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--osmos-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--osmos-fg)' }}>Add New Advertiser User</span>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--osmos-fg-muted)' }}><Ico d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} size={16} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Enter email address" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Enter phone number" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Role <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} style={{ ...inputStyle }}>
                  {ROLES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Merchant <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={form.merchant} onChange={e => setForm(f => ({ ...f, merchant: e.target.value }))} style={{ ...inputStyle }}>
                  {MERCHANTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--osmos-border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 18px', border: '1px solid var(--osmos-border)', borderRadius: 6, background: '#fff', color: 'var(--osmos-fg-muted)', fontSize: 13, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleAdd} style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: 'var(--osmos-brand-primary)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
