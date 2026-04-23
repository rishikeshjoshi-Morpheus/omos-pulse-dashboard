import React, { useState, useRef } from 'react';

function Ico({ d, size = 13, stroke = 'currentColor', sw = 1.8, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

export default function WalletTopUpPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.csv')) {
      showToast('Please upload an .xlsx or .csv file', 'error');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploadedFile(file);
      setUploading(false);
      showToast(`${file.name} uploaded successfully`);
    }, 1200);
  }

  return (
    <div style={{ padding: '20px 24px', fontFamily: "'Open Sans', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: toast.type === 'error' ? '#dc2626' : '#16a34a', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{toast.msg}</div>
      )}

      <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header */}
        <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, background: 'var(--osmos-brand-primary-muted)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico stroke="var(--osmos-brand-primary)" d={<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--osmos-fg)' }}>Wallet Top Up</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--osmos-fg-muted)', lineHeight: 1.6 }}>
            Bulk top-up advertiser wallets by uploading a spreadsheet. Download the template, fill in Advertiser IDs and amounts, then upload for processing.
          </p>
        </div>

        {/* Template */}
        <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6 }}>Step 1 — Download Template</div>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>
            Template columns: <strong>Advertiser ID</strong>, <strong>Top-Up Amount (₹)</strong>, <strong>Payment Method</strong>, <strong>Reference Number</strong>.
          </p>
          <button onClick={() => showToast('Template downloaded')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 6, padding: '8px 14px', fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
            <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} />
            Download Template (.xlsx)
          </button>
        </div>

        {/* Upload */}
        <div style={{ background: '#fff', border: '1px solid var(--osmos-border)', borderRadius: 8, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg)', marginBottom: 6 }}>Step 2 — Upload Filled Template</div>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--osmos-fg-muted)' }}>Supports .xlsx. Maximum 500 rows per upload.</p>

          {!uploadedFile ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? 'var(--osmos-brand-primary)' : 'var(--osmos-border)'}`,
                borderRadius: 8, padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 10, cursor: 'pointer',
                background: dragOver ? 'var(--osmos-brand-primary-muted)' : 'var(--osmos-bg-subtle)', transition: 'all 0.2s',
              }}>
              {uploading ? (
                <>
                  <div style={{ width: 32, height: 32, border: '3px solid var(--osmos-brand-primary-muted)', borderTop: '3px solid var(--osmos-brand-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: 13, color: 'var(--osmos-fg-muted)' }}>Uploading…</span>
                </>
              ) : (
                <>
                  <Ico d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>} size={32} stroke="var(--osmos-fg-subtle)" sw={1.5} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--osmos-fg-muted)' }}>Drag & drop your file here</span>
                  <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)' }}>or click to browse (.xlsx, max 500 rows)</span>
                </>
              )}
              <input ref={fileRef} type="file" accept=".xlsx,.csv" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <div style={{ border: '1px solid #16a34a', borderRadius: 8, padding: '16px 20px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Ico d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>} size={20} stroke="#16a34a" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>{uploadedFile.name}</div>
                  <div style={{ fontSize: 11, color: '#4ade80' }}>{(uploadedFile.size / 1024).toFixed(1)} KB · Uploaded successfully</div>
                </div>
              </div>
              <button onClick={() => { setUploadedFile(null); showToast('File cleared'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a' }}>
                <Ico d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} size={16} stroke="#16a34a" />
              </button>
            </div>
          )}

          {uploadedFile && (
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => { showToast('Top-ups submitted for processing'); setUploadedFile(null); }} style={{ background: 'var(--osmos-brand-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
                Submit Top-Ups
              </button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Ico d={<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} stroke="#92400e" size={16} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>Important Notes</div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 12, color: '#92400e', lineHeight: 1.8 }}>
                <li>Ensure Advertiser IDs match exactly — invalid IDs will be skipped</li>
                <li>Amounts must be in INR (₹) without commas or currency symbols</li>
                <li>Processing may take up to 30 minutes after submission</li>
                <li>A summary report will be emailed to your registered address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
