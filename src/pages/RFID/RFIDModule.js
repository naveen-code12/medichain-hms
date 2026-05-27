import { useState } from 'react';
import { useRFID } from '../../context/RFIDContext';

const RFID_PROFILES = [
  { uid:'A3F2B1C4', type:'Patient', name:'Ravi Kumar', ward:'ICU', pid:'P001' },
  { uid:'D1E2F3A4', type:'Staff', name:'Dr. Priya Sharma', dept:'Cardiology', role:'Doctor' },
  { uid:'S1A2B3C4', type:'Staff', name:'Nurse Kavya', dept:'ICU', role:'Nurse' },
  { uid:'M7C8D9E0', type:'Medicine', name:'Paracetamol Batch #24', qty:'500 units' },
];

export default function RFIDModule() {
  const { rfidConnected, lastScan, scanLog } = useRFID();
  const [manualUID, setManualUID] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  const lookup = (uid) => {
    const found = RFID_PROFILES.find(p => p.uid === uid.toUpperCase());
    setLookupResult(found || { uid, type:'Unknown', name:'Not registered in system' });
  };

  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📡 RFID Manager</div><div className="page-sub">Hardware status and scan management</div></div>
      </div>

      {/* STATUS CARD */}
      <div style={{background: rfidConnected?'linear-gradient(135deg,#1B5E20,#2E7D32)':'linear-gradient(135deg,#7f0000,#C62828)', borderRadius:'14px', padding:'24px', color:'#fff', marginBottom:'16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:'18px', fontWeight:'800', marginBottom:'6px'}}>
              {rfidConnected ? '✅ RFID Reader Online' : '🚫 RFID Reader Offline'}
            </div>
            <div style={{fontSize:'13px', color:'rgba(255,255,255,0.7)'}}>
              {rfidConnected
                ? 'Hardware connected — All RFID modules active'
                : 'Hardware not detected — Connect RC522 reader to enable RFID modules'}
            </div>
          </div>
          <div style={{fontSize:'56px'}}>{rfidConnected ? '📡' : '🔌'}</div>
        </div>
        {!rfidConnected && (
          <div style={{marginTop:'16px', background:'rgba(0,0,0,0.2)', borderRadius:'10px', padding:'14px', fontSize:'13px', lineHeight:'2'}}>
          </div>
        )}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
        {/* MANUAL LOOKUP */}
        <div className="card">
          <div className="card-header"><span className="card-title">🔍 UID Lookup</span></div>
          <div className="card-body">
            <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
              <input value={manualUID} onChange={e=>setManualUID(e.target.value.toUpperCase())}
                placeholder="Enter UID (e.g. A3F2B1C4)"
                style={{flex:1, padding:'9px 12px', border:'1px solid var(--border)', borderRadius:'8px', background:'var(--bg)', color:'var(--text)', fontSize:'13px'}}/>
              <button className="btn btn-primary" onClick={()=>lookup(manualUID)}>Lookup</button>
            </div>
            {lookupResult && (
              <div style={{background:'var(--bg)', borderRadius:'8px', padding:'12px'}}>
                <div style={{fontSize:'11px', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px'}}>Result</div>
                <div style={{fontFamily:'monospace', fontSize:'16px', fontWeight:'800', color:'var(--blue)', marginBottom:'8px'}}>{lookupResult.uid}</div>
                {Object.entries(lookupResult).filter(([k])=>k!=='uid').map(([k,v])=>(
                  <div key={k} style={{display:'flex', justifyContent:'space-between', fontSize:'13px', padding:'4px 0', borderBottom:'1px solid var(--border)'}}>
                    <span style={{color:'var(--text3)', textTransform:'capitalize'}}>{k}</span>
                    <span style={{fontWeight:'600'}}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{marginTop:'12px'}}>
              <div style={{fontSize:'12px', color:'var(--text3)', marginBottom:'8px'}}>Registered UIDs (Demo):</div>
              {RFID_PROFILES.map(p=>(
                <div key={p.uid} onClick={()=>{setManualUID(p.uid);lookup(p.uid)}}
                  style={{display:'flex', justifyContent:'space-between', fontSize:'12px', padding:'6px 8px', borderRadius:'6px', cursor:'pointer', marginBottom:'4px', background:'var(--bg)', border:'1px solid var(--border)'}}>
                  <span style={{fontFamily:'monospace', fontWeight:'700', color:'var(--blue)'}}>{p.uid}</span>
                  <span style={{color:'var(--text2)'}}>{p.name}</span>
                  <span className={`badge ${p.type==='Patient'?'badge-blue':p.type==='Staff'?'badge-green':'badge-amber'}`}>{p.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCAN LOG */}
        <div className="card">
          <div className="card-header"><span className="card-title">📋 Scan Log</span></div>
          <div className="card-body" style={{padding:0}}>
            {scanLog.length ? scanLog.map((s,i)=>(
              <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'10px 16px', borderBottom:'1px solid var(--border)', fontSize:'13px'}}>
                <div>
                  <div style={{fontFamily:'monospace', fontWeight:'700', color:'var(--blue)'}}>{s.uid}</div>
                  <div style={{fontSize:'11px', color:'var(--text3)'}}>{s.type}</div>
                </div>
                <div style={{color:'var(--text3)', fontSize:'12px'}}>{s.time}</div>
              </div>
            )) : (
              <div className="empty">No scans yet — {rfidConnected?'Scan a card to begin':'Connect hardware first'}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}