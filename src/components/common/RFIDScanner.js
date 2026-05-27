import { useState } from 'react';
import { useRFID } from '../../context/RFIDContext';

export default function RFIDScanner({ onScan, label = 'Scan RFID Card', compact = false }) {
  const { rfidConnected, lastScan } = useRFID();
  const [scanning, setScanning] = useState(false);
  const [uid, setUid] = useState('');

  const handleScan = async () => {
    if (!rfidConnected) return;
    setScanning(true);
    try {
      const res = await fetch('http://localhost:5000/api/rfid/scan');
      const data = await res.json();
      if (data.uid) {
        setUid(data.uid);
        onScan && onScan(data.uid);
      }
    } catch {}
    setScanning(false);
  };

  if (!rfidConnected) {
    return (
      <div style={{ padding:'10px 14px', background:'var(--red-light)', border:'1px solid rgba(198,40,40,0.3)', borderRadius:'8px', fontSize:'13px', color:'var(--red)', display:'flex', alignItems:'center', gap:'8px' }}>
        🚫 RFID Reader not connected — This field requires hardware
      </div>
    );
  }

  if (compact) {
    return (
      <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
        <input value={uid} readOnly placeholder="Scan RFID card..." style={{ flex:1, padding:'9px 12px', border:'1px solid var(--border)', borderRadius:'8px', background:'var(--bg)', color:'var(--text)', fontSize:'13px' }}/>
        <button className="btn btn-primary btn-sm" onClick={handleScan} disabled={scanning}>
          {scanning ? '⏳' : '📡'} {scanning ? 'Scanning...' : 'Scan'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ background:'linear-gradient(135deg,#0D2137,#1565C0)', borderRadius:'12px', padding:'20px', color:'#fff', marginBottom:'16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
        <div style={{ fontWeight:'700', fontSize:'15px' }}>📡 RFID Scanner</div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px' }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4CAF50' }}></div>
          Reader Online
        </div>
      </div>
      <div onClick={handleScan} style={{ border:'2px dashed rgba(255,255,255,0.35)', borderRadius:'10px', padding:'22px', textAlign:'center', cursor:'pointer', transition:'all 0.2s', background: scanning?'rgba(255,255,255,0.1)':'transparent' }}>
        <div style={{ fontSize:'36px', marginBottom:'8px' }}>{scanning ? '🔄' : '📡'}</div>
        <div style={{ fontWeight:'700', fontSize:'15px' }}>{scanning ? 'Scanning...' : label}</div>
        <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', marginTop:'4px' }}>Click or tap card on reader</div>
      </div>
      {uid && (
        <div style={{ marginTop:'12px', background:'rgba(255,255,255,0.1)', borderRadius:'8px', padding:'12px' }}>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'1px' }}>Scanned UID</div>
          <div style={{ fontFamily:'monospace', fontSize:'18px', fontWeight:'800', color:'#4FC3F7', letterSpacing:'3px', marginTop:'4px' }}>{uid}</div>
        </div>
      )}
    </div>
  );
}