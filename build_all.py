import os

base = r"C:\Users\nagul\medichain-frontend\src"

files = {}

# ============================================================
# RFID CONTEXT - Global RFID state manager
# ============================================================
files["context/RFIDContext.js"] = """
import { createContext, useContext, useState, useEffect } from 'react';

const RFIDContext = createContext();

export function RFIDProvider({ children }) {
  const [rfidConnected, setRfidConnected] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanLog, setScanLog] = useState([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if RFID hardware is connected via backend
    const checkRFID = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rfid/status');
        const data = await res.json();
        setRfidConnected(data.connected || false);
      } catch {
        setRfidConnected(false);
      }
      setChecking(false);
    };
    checkRFID();
    const interval = setInterval(checkRFID, 5000);
    return () => clearInterval(interval);
  }, []);

  const addScan = (scan) => {
    setLastScan(scan);
    setScanLog(prev => [scan, ...prev.slice(0, 49)]);
  };

  // Simulate scan (only for demo — blocked in strict mode)
  const simulateScan = () => {
    if (!rfidConnected) return false;
    const uid = Math.random().toString(16).substr(2, 8).toUpperCase();
    addScan({ uid, time: new Date().toLocaleTimeString(), type: 'Simulated' });
    return uid;
  };

  return (
    <RFIDContext.Provider value={{ rfidConnected, lastScan, scanLog, addScan, simulateScan, checking }}>
      {children}
    </RFIDContext.Provider>
  );
}

export const useRFID = () => useContext(RFIDContext);
"""

# ============================================================
# RFID GATE COMPONENT - Blocks page if RFID not connected
# ============================================================
files["components/common/RFIDGate.js"] = """
import { useRFID } from '../../context/RFIDContext';

export default function RFIDGate({ children, requireScan = false, scannedUID, onScan }) {
  const { rfidConnected, checking } = useRFID();

  if (checking) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', flexDirection:'column', gap:'16px' }}>
        <div style={{ fontSize:'48px' }}>🔄</div>
        <div style={{ fontSize:'16px', color:'var(--text2)' }}>Checking RFID connection...</div>
      </div>
    );
  }

  if (!rfidConnected) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'70vh' }}>
        <div style={{ background:'var(--card)', border:'2px solid var(--red)', borderRadius:'16px', padding:'40px', maxWidth:'480px', textAlign:'center', boxShadow:'0 8px 32px rgba(198,40,40,0.15)' }}>
          <div style={{ fontSize:'64px', marginBottom:'16px' }}>🚫</div>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'var(--red)', marginBottom:'12px' }}>RFID Reader Not Connected</div>
          <div style={{ fontSize:'14px', color:'var(--text2)', marginBottom:'24px', lineHeight:'1.6' }}>
            This module requires an RFID reader to be connected.<br/>
            Hardware connect chesaka ikkade automatic ga unlock avutundi.
          </div>
          <div style={{ background:'var(--bg)', borderRadius:'12px', padding:'16px', marginBottom:'20px', textAlign:'left' }}>
            <div style={{ fontSize:'13px', fontWeight:'700', marginBottom:'8px' }}>Connection Steps:</div>
            <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:'2' }}>
              1. RC522 RFID Reader ni Arduino ki connect cheyyandi<br/>
              2. Arduino ni USB tho PC ki connect cheyyandi<br/>
              3. Backend lo COM port set cheyyandi<br/>
              4. Server restart cheyyandi — auto detect avutundi
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center', fontSize:'13px', color:'var(--red)' }}>
            <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'var(--red)' }}></div>
            Reader Offline — Waiting for hardware...
          </div>
        </div>
      </div>
    );
  }

  if (requireScan && !scannedUID) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'70vh' }}>
        <div style={{ background:'linear-gradient(135deg,#0D2137,#1565C0)', borderRadius:'16px', padding:'40px', maxWidth:'480px', textAlign:'center', color:'#fff' }}>
          <div style={{ fontSize:'64px', marginBottom:'16px' }}>📡</div>
          <div style={{ fontSize:'22px', fontWeight:'800', marginBottom:'12px' }}>Scan RFID Card to Continue</div>
          <div style={{ fontSize:'14px', color:'rgba(255,255,255,0.7)', marginBottom:'24px' }}>
            Patient RFID card scan chesaka proceed avutundi
          </div>
          <div style={{ border:'2px dashed rgba(255,255,255,0.4)', borderRadius:'12px', padding:'24px', cursor:'pointer', animation:'pulse 2s infinite' }}
            onClick={onScan}>
            <div style={{ fontSize:'40px' }}>🔖</div>
            <div style={{ marginTop:'8px', fontSize:'13px', color:'rgba(255,255,255,0.6)' }}>Tap card on reader</div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
"""

# ============================================================
# RFID SCANNER COMPONENT
# ============================================================
files["components/common/RFIDScanner.js"] = """
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
"""

# ============================================================
# UPDATE App.js
# ============================================================
files["App.js"] = """
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RFIDProvider } from './context/RFIDContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Patients from './pages/Patients/Patients';
import InPatients from './pages/Patients/InPatients';
import Appointments from './pages/Patients/Appointments';
import Emergency from './pages/Emergency/Emergency';
import OT from './pages/OT/OT';
import NurseStation from './pages/Nurse/NurseStation';
import Discharge from './pages/Discharge/Discharge';
import Doctors from './pages/Doctors/Doctors';
import Laboratory from './pages/Diagnostics/Laboratory';
import Radiology from './pages/Diagnostics/Radiology';
import BloodBank from './pages/Diagnostics/BloodBank';
import Phlebotomy from './pages/Diagnostics/Phlebotomy';
import Billing from './pages/Finance/Billing';
import Insurance from './pages/Finance/Insurance';
import MedicineInventory from './pages/Support/MedicineInventory';
import Ambulance from './pages/Support/Ambulance';
import Linen from './pages/Support/Linen';
import CSSD from './pages/Support/CSSD';
import Mortuary from './pages/Support/Mortuary';
import Feedback from './pages/Support/Feedback';
import HRManagement from './pages/Admin/HRManagement';
import MRD from './pages/Admin/MRD';
import MISReports from './pages/Admin/MISReports';
import Security from './pages/Admin/Security';
import SystemControl from './pages/Admin/SystemControl';
import RFIDModule from './pages/RFID/RFIDModule';

const PrivateRoute = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/login" />;

export default function App() {
  return (
    <RFIDProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="inpatients" element={<InPatients />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="ot" element={<OT />} />
            <Route path="nurse" element={<NurseStation />} />
            <Route path="discharge" element={<Discharge />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="laboratory" element={<Laboratory />} />
            <Route path="radiology" element={<Radiology />} />
            <Route path="bloodbank" element={<BloodBank />} />
            <Route path="phlebotomy" element={<Phlebotomy />} />
            <Route path="billing" element={<Billing />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="medicine" element={<MedicineInventory />} />
            <Route path="ambulance" element={<Ambulance />} />
            <Route path="linen" element={<Linen />} />
            <Route path="cssd" element={<CSSD />} />
            <Route path="mortuary" element={<Mortuary />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="hr" element={<HRManagement />} />
            <Route path="mrd" element={<MRD />} />
            <Route path="reports" element={<MISReports />} />
            <Route path="security" element={<Security />} />
            <Route path="system" element={<SystemControl />} />
            <Route path="rfid" element={<RFIDModule />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RFIDProvider>
  );
}
"""

# ============================================================
# LAYOUT with full sidebar
# ============================================================
files["components/layout/Layout.js"] = """
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRFID } from '../../context/RFIDContext';
import './Layout.css';

const nav = [
  { to:'/', icon:'📊', label:'MIS Dashboard', end:true },
  { to:'/rfid', icon:'📡', label:'RFID Manager' },
  { section:'Clinical' },
  { to:'/patients', icon:'🧑‍⚕️', label:'Patient Registration' },
  { to:'/inpatients', icon:'🛏️', label:'In-Patient Mgmt' },
  { to:'/appointments', icon:'📅', label:'Appointments' },
  { to:'/emergency', icon:'🚨', label:'Emergency', badge:'live' },
  { to:'/ot', icon:'🏥', label:'Operation Theatre' },
  { to:'/nurse', icon:'💉', label:'Nurse Station' },
  { to:'/discharge', icon:'📋', label:'Discharge Summary' },
  { to:'/doctors', icon:'👨‍⚕️', label:'Doctor Management' },
  { section:'Diagnostics' },
  { to:'/laboratory', icon:'🔬', label:'Laboratory' },
  { to:'/radiology', icon:'🩻', label:'Radiology' },
  { to:'/bloodbank', icon:'🩸', label:'Blood Bank' },
  { to:'/phlebotomy', icon:'💊', label:'Phlebotomy' },
  { section:'Finance' },
  { to:'/billing', icon:'💰', label:'Billing & Collection' },
  { to:'/insurance', icon:'🛡️', label:'Insurance & E-Claim' },
  { section:'Support' },
  { to:'/medicine', icon:'💊', label:'Medicine Inventory' },
  { to:'/ambulance', icon:'🚑', label:'Ambulance' },
  { to:'/linen', icon:'🧺', label:'Linen & Laundry' },
  { to:'/cssd', icon:'⚗️', label:'CSSD' },
  { to:'/mortuary', icon:'🏛️', label:'Mortuary Mgmt' },
  { to:'/feedback', icon:'💬', label:'Feedback' },
  { section:'Admin' },
  { to:'/hr', icon:'👥', label:'HR Management' },
  { to:'/mrd', icon:'🗂️', label:'MRD' },
  { to:'/reports', icon:'📈', label:'MIS Reports' },
  { to:'/security', icon:'🔒', label:'Security & Audit' },
  { to:'/system', icon:'⚙️', label:'System Control' },
];

export default function Layout() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const { rfidConnected } = useRFID();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">
          <span style={{fontSize:'26px'}}>🏥</span>
          <div>
            <div className="logo-title">MediChain HMS</div>
            <div className="logo-sub">RFID + Blockchain</div>
          </div>
        </div>
        <div style={{padding:'8px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:'4px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'12px'}}>
            <div style={{width:'8px', height:'8px', borderRadius:'50%', background: rfidConnected?'#4CAF50':'#f44336', flexShrink:0}}></div>
            <span style={{color: rfidConnected?'#4CAF50':'#f44336', fontWeight:'600'}}>
              RFID {rfidConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <nav className="nav">
          {nav.map((item, i) => item.section ? (
            <div key={i} className="nav-section">{item.section}</div>
          ) : (
            <NavLink key={i} to={item.to} end={item.end}
              className={({isActive}) => `nav-item${isActive?' active':''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span style={{flex:1}}>{item.label}</span>
              {item.badge === 'live' && <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#f44336',animation:'blink 1s infinite'}}></span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div><div className="user-name">Admin</div><div className="user-email">admin@medichain.com</div></div>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-right">
            <div style={{fontSize:'12px', padding:'5px 12px', background: rfidConnected?'var(--green-light)':'var(--red-light)', color: rfidConnected?'var(--green)':'var(--red)', borderRadius:'20px', fontWeight:'600'}}>
              📡 RFID {rfidConnected?'Online':'Offline'}
            </div>
            <button className="icon-btn" onClick={()=>{setDark(!dark);document.body.classList.toggle('dark')}}>
              {dark?'☀️':'🌙'}
            </button>
            <button className="icon-btn logout-btn" onClick={()=>{localStorage.removeItem('token');navigate('/login')}}>
              🚪 Logout
            </button>
          </div>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
"""

# ============================================================
# RFID MODULE PAGE
# ============================================================
files["pages/RFID/RFIDModule.js"] = """
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
            <strong>Hardware connect cheyyataniki:</strong><br/>
            1. RC522 module → Arduino Mega (SDA:53, SCK:52, MOSI:51, MISO:50, RST:5, 3.3V, GND)<br/>
            2. Arduino → USB cable → PC<br/>
            3. Backend .env lo: RFID_PORT=COM3 (Device Manager lo check cheyyandi)<br/>
            4. node server.js restart cheyyandi — auto connect avutundi ✅
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
"""

# ============================================================
# HELPER: Make a simple full-featured module page
# ============================================================
def make_page(title, icon, columns, sample_data, form_fields, api_path=None, rfid_required=False):
    col_headers = ''.join([f'<th>{c}</th>' for c in columns])
    
    rfid_import = "import RFIDGate from '../../components/common/RFIDGate';" if rfid_required else ""
    rfid_wrap_open = "<RFIDGate>" if rfid_required else ""
    rfid_wrap_close = "</RFIDGate>" if rfid_required else ""

    form_state = "{" + ",".join([f"{f['key']}:''" for f in form_fields]) + "}"
    
    form_inputs = ""
    for f in form_fields:
        span = " full" if f.get('full') else ""
        if f.get('type') == 'select':
            opts = ''.join([f"<option>{o}</option>" for o in f['options']])
            form_inputs += f"""
              <div className="form-group{span}"><label>{f['label']}</label>
                <select value={{form.{f['key']}}} onChange={{e=>setForm({{...form,{f['key']}:e.target.value}})}}>{opts}</select>
              </div>"""
        elif f.get('type') == 'date':
            form_inputs += f"""
              <div className="form-group{span}"><label>{f['label']}</label>
                <input type="date" value={{form.{f['key']}}} onChange={{e=>setForm({{...form,{f['key']}:e.target.value}})}}/>
              </div>"""
        elif f.get('type') == 'number':
            form_inputs += f"""
              <div className="form-group{span}"><label>{f['label']}</label>
                <input type="number" placeholder="{f.get('placeholder','')}" value={{form.{f['key']}}} onChange={{e=>setForm({{...form,{f['key']}:e.target.value}})}}/>
              </div>"""
        else:
            form_inputs += f"""
              <div className="form-group{span}"><label>{f['label']}</label>
                <input placeholder="{f.get('placeholder','')}" value={{form.{f['key']}}} onChange={{e=>setForm({{...form,{f['key']}:e.target.value}})}}/>
              </div>"""

    # Build table rows from sample data
    row_cells = ""
    for col in columns:
        key = col.lower().replace(' ','_').replace('(','').replace(')','').replace('/','_')
        row_cells += f"<td>{{r['{key}']||'—'}}</td>"

    sample_js = str(sample_data).replace("'",'"').replace('True','true').replace('False','false')

    return f"""
import {{ useState }} from 'react';
{rfid_import}
export default function Page() {{
  const [records, setRecords] = useState({sample_js});
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({form_state});
  const save = () => {{ setRecords(prev=>[...prev,{{...form,id:'#{"{"}records.length+1{"}"}'}});setShowModal(false);setForm({form_state}); }};
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    {rfid_wrap_open}
    <div>
      <div className="page-header">
        <div><div className="page-title">{icon} {title}</div><div className="page-sub">{title} management module</div></div>
        <button className="btn btn-primary" onClick={{()=>setShowModal(true)}}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={{search}} onChange={{e=>setSearch(e.target.value)}}/></div></div>
      <div className="card"><div className="card-body" style={{{{padding:0}}}}><div className="table-wrap">
        <table><thead><tr>{col_headers}</tr></thead>
        <tbody>{{filtered.length ? filtered.map((r,i)=>(
          <tr key={{i}}>{row_cells}</tr>
        )) : <tr><td colSpan="{len(columns)}"><div className="empty">No records yet</div></td></tr>}}</tbody>
        </table>
      </div></div></div>
      {{showModal && (
        <div className="modal-overlay" onClick={{()=>setShowModal(false)}}>
          <div className="modal" onClick={{e=>e.stopPropagation()}}>
            <h3>{icon} Add {title} Record</h3>
            <div className="form-grid">{form_inputs}</div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={{()=>setShowModal(false)}}>Cancel</button>
              <button className="btn btn-primary" onClick={{save}}>✅ Save</button>
            </div>
          </div>
        </div>
      )}}
    </div>
    {rfid_wrap_close}
  )
}}
"""

# ============================================================
# ALL PAGES
# ============================================================

files["pages/OT/OT.js"] = make_page(
  "Operation Theatre", "🏥",
  ["OT No","Patient","Surgeon","Procedure","Date","Time","Status"],
  [{"ot_no":"OT-1","patient":"Ravi Kumar","surgeon":"Dr. Sharma","procedure":"Appendectomy","date":"2026-05-27","time":"09:00","status":"Scheduled"},
   {"ot_no":"OT-2","patient":"Anita Reddy","surgeon":"Dr. Kumar","procedure":"C-Section","date":"2026-05-27","time":"11:00","status":"In Progress"}],
  [{"key":"ot_no","label":"OT Number","placeholder":"OT-1"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient name"},
   {"key":"surgeon","label":"Surgeon","placeholder":"Dr. Name"},
   {"key":"procedure","label":"Procedure","placeholder":"Surgery name","full":True},
   {"key":"date","label":"Date","type":"date"},
   {"key":"time","label":"Time","type":"select","options":["07:00","09:00","11:00","13:00","15:00","17:00"]},
   {"key":"status","label":"Status","type":"select","options":["Scheduled","In Progress","Completed","Cancelled"]}]
)

files["pages/Nurse/NurseStation.js"] = make_page(
  "Nurse Station", "💉",
  ["Patient","Ward","Bed","Nurse","Task","Time","Status"],
  [{"patient":"Ravi Kumar","ward":"ICU","bed":"B01","nurse":"Nurse Kavya","task":"IV Drip Change","time":"09:00","status":"Pending"},
   {"patient":"Anita Reddy","ward":"General","bed":"B03","nurse":"Nurse Priya","task":"Vitals Check","time":"10:00","status":"Done"}],
  [{"key":"patient","label":"Patient","placeholder":"Patient name"},
   {"key":"ward","label":"Ward","type":"select","options":["ICU","General","Surgical","Maternity"]},
   {"key":"bed","label":"Bed No","placeholder":"B01"},
   {"key":"nurse","label":"Nurse","placeholder":"Nurse name"},
   {"key":"task","label":"Task","placeholder":"e.g. IV Drip","full":True},
   {"key":"time","label":"Time","type":"select","options":["06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00"]},
   {"key":"status","label":"Status","type":"select","options":["Pending","In Progress","Done"]}]
)

files["pages/Discharge/Discharge.js"] = make_page(
  "Discharge Summary", "📋",
  ["Patient ID","Name","Doctor","Ward","Diagnosis","Bill","Condition"],
  [{"patient_id":"P003","name":"Suresh Babu","doctor":"Dr. Kumar","ward":"Surgical","diagnosis":"Appendicitis","bill":"22000","condition":"Recovered"}],
  [{"key":"patient_id","label":"Patient ID","placeholder":"P001"},
   {"key":"name","label":"Patient Name","placeholder":"Name"},
   {"key":"doctor","label":"Doctor","placeholder":"Doctor"},
   {"key":"ward","label":"Ward","placeholder":"Ward"},
   {"key":"diagnosis","label":"Diagnosis","placeholder":"Final diagnosis","full":True},
   {"key":"bill","label":"Bill Amount","type":"number","placeholder":"15000"},
   {"key":"condition","label":"Condition","type":"select","options":["Stable","Recovered","Critical","Referred"]}]
)

files["pages/Doctors/Doctors.js"] = make_page(
  "Doctor Management", "👨‍⚕️",
  ["Doctor ID","Name","Department","Phone","Specialization","Status"],
  [{"doctor_id":"D001","name":"Dr. Priya Sharma","department":"Cardiology","phone":"9876543210","specialization":"Interventional Cardiology","status":"Active"},
   {"doctor_id":"D002","name":"Dr. Arun Reddy","department":"Neurology","phone":"9876543211","specialization":"Stroke Medicine","status":"Active"}],
  [{"key":"doctor_id","label":"Doctor ID","placeholder":"D001"},
   {"key":"name","label":"Full Name","placeholder":"Dr. Name"},
   {"key":"department","label":"Department","type":"select","options":["Cardiology","Neurology","Orthopaedics","General Medicine","Paediatrics","Gynaecology","Surgery","Radiology"]},
   {"key":"phone","label":"Phone","placeholder":"9XXXXXXXXX"},
   {"key":"specialization","label":"Specialization","placeholder":"Sub-specialty","full":True},
   {"key":"status","label":"Status","type":"select","options":["Active","On Leave","Inactive"]}]
)

files["pages/Diagnostics/Laboratory.js"] = make_page(
  "Laboratory", "🔬",
  ["Test ID","Patient","Test Name","Doctor","Result","Status"],
  [{"test_id":"T001","patient":"Ravi Kumar","test_name":"Blood CBC","doctor":"Dr. Sharma","result":"Abnormal","status":"Completed"},
   {"test_id":"T002","patient":"Anita Reddy","test_name":"HbA1c","doctor":"Dr. Reddy","result":"Pending","status":"Pending"}],
  [{"key":"test_id","label":"Test ID","placeholder":"T001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"test_name","label":"Test Name","type":"select","options":["Blood CBC","HbA1c","Urine Analysis","Liver Function","Kidney Function","Lipid Profile","Thyroid","Culture & Sensitivity"]},
   {"key":"doctor","label":"Referring Doctor","placeholder":"Doctor"},
   {"key":"result","label":"Result","type":"select","options":["Pending","Normal","Abnormal","Critical"]},
   {"key":"status","label":"Status","type":"select","options":["Pending","Processing","Completed"]}]
)

files["pages/Diagnostics/Radiology.js"] = make_page(
  "Radiology", "🩻",
  ["Scan ID","Patient","Scan Type","Doctor","Report","Status"],
  [{"scan_id":"R001","patient":"Ravi Kumar","scan_type":"Chest X-Ray","doctor":"Dr. Sharma","report":"Mild infiltrates","status":"Reported"},
   {"scan_id":"R002","patient":"Sita Devi","scan_type":"MRI Brain","doctor":"Dr. Reddy","report":"Pending","status":"Pending"}],
  [{"key":"scan_id","label":"Scan ID","placeholder":"R001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"scan_type","label":"Scan Type","type":"select","options":["X-Ray","CT Scan","MRI","Ultrasound","ECHO","PET Scan","Mammography"]},
   {"key":"doctor","label":"Referring Doctor","placeholder":"Doctor"},
   {"key":"report","label":"Report","placeholder":"Findings","full":True},
   {"key":"status","label":"Status","type":"select","options":["Pending","Processing","Reported"]}]
)

files["pages/Diagnostics/BloodBank.js"] = make_page(
  "Blood Bank", "🩸",
  ["Unit ID","Blood Group","Units","Donor","Collection Date","Expiry","Status"],
  [{"unit_id":"BB001","blood_group":"O+","units":"3","donor":"Rahul Sharma","collection_date":"2026-05-01","expiry":"2026-06-30","status":"Available"},
   {"unit_id":"BB002","blood_group":"AB-","units":"1","donor":"Priya K","collection_date":"2026-05-10","expiry":"2026-07-08","status":"Reserved"}],
  [{"key":"unit_id","label":"Unit ID","placeholder":"BB001"},
   {"key":"blood_group","label":"Blood Group","type":"select","options":["A+","A-","B+","B-","O+","O-","AB+","AB-"]},
   {"key":"units","label":"Units Available","type":"number","placeholder":"1"},
   {"key":"donor","label":"Donor Name","placeholder":"Donor name"},
   {"key":"collection_date","label":"Collection Date","type":"date"},
   {"key":"expiry","label":"Expiry Date","type":"date"},
   {"key":"status","label":"Status","type":"select","options":["Available","Reserved","Used","Expired"]}]
)

files["pages/Diagnostics/Phlebotomy.js"] = make_page(
  "Phlebotomy", "💉",
  ["Sample ID","Patient","Test","Collected By","Time","Status"],
  [{"sample_id":"S001","patient":"Ravi Kumar","test":"Blood CBC","collected_by":"Lab Tech Ravi","time":"08:30","status":"Sent to Lab"},
   {"sample_id":"S002","patient":"Anita Reddy","test":"HbA1c","collected_by":"Lab Tech Priya","time":"09:00","status":"Collected"}],
  [{"key":"sample_id","label":"Sample ID","placeholder":"S001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"test","label":"Test Required","type":"select","options":["Blood CBC","HbA1c","Urine","Lipid Profile","Liver Function","Culture"]},
   {"key":"collected_by","label":"Collected By","placeholder":"Lab Tech name"},
   {"key":"time","label":"Collection Time","type":"select","options":["07:00","08:00","09:00","10:00","11:00","12:00"]},
   {"key":"status","label":"Status","type":"select","options":["Collected","Sent to Lab","Processing","Done"]}]
)

files["pages/Finance/Billing.js"] = make_page(
  "Billing & Collection", "💰",
  ["Bill ID","Patient","Total","Paid","Balance","Status"],
  [{"bill_id":"B001","patient":"Ravi Kumar","total":"45000","paid":"20000","balance":"25000","status":"Partial"},
   {"bill_id":"B002","patient":"Anita Reddy","total":"18500","paid":"18500","balance":"0","status":"Paid"}],
  [{"key":"bill_id","label":"Bill ID","placeholder":"B001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"total","label":"Total Amount","type":"number","placeholder":"25000"},
   {"key":"paid","label":"Paid Amount","type":"number","placeholder":"0"},
   {"key":"balance","label":"Balance","type":"number","placeholder":"0"},
   {"key":"status","label":"Status","type":"select","options":["Pending","Partial","Paid","Waived"]}]
)

files["pages/Finance/Insurance.js"] = make_page(
  "Insurance & E-Claim", "🛡️",
  ["Claim ID","Patient","Insurance Co","Policy No","Amount","Status"],
  [{"claim_id":"CL001","patient":"Ravi Kumar","insurance_co":"Star Health","policy_no":"SH-1234567","amount":"40000","status":"Submitted"},
   {"claim_id":"CL002","patient":"Anita Reddy","insurance_co":"HDFC Ergo","policy_no":"HE-9876543","amount":"15000","status":"Approved"}],
  [{"key":"claim_id","label":"Claim ID","placeholder":"CL001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"insurance_co","label":"Insurance Company","placeholder":"Company name"},
   {"key":"policy_no","label":"Policy Number","placeholder":"Policy No"},
   {"key":"amount","label":"Claim Amount","type":"number","placeholder":"25000"},
   {"key":"status","label":"Status","type":"select","options":["Draft","Submitted","Under Review","Approved","Rejected","Paid"]}]
)

files["pages/Support/MedicineInventory.js"] = make_page(
  "Medicine Inventory", "💊",
  ["Medicine ID","Name","Category","Stock","Price","Expiry","Status"],
  [{"medicine_id":"M001","name":"Paracetamol 500mg","category":"Analgesic","stock":"450","price":"2.50","expiry":"2027-06","status":"Available"},
   {"medicine_id":"M002","name":"Amoxicillin 250mg","category":"Antibiotic","stock":"15","price":"8.00","expiry":"2026-12","status":"Low Stock"},
   {"medicine_id":"M003","name":"Metformin 500mg","category":"Antidiabetic","stock":"0","price":"3.00","expiry":"2027-03","status":"Out of Stock"}],
  [{"key":"medicine_id","label":"Medicine ID","placeholder":"M001"},
   {"key":"name","label":"Medicine Name","placeholder":"Name + strength"},
   {"key":"category","label":"Category","type":"select","options":["Analgesic","Antibiotic","Antidiabetic","Statin","Antihypertensive","Vitamin","Antacid","Antihistamine"]},
   {"key":"stock","label":"Stock (units)","type":"number","placeholder":"100"},
   {"key":"price","label":"Price per unit","type":"number","placeholder":"5"},
   {"key":"expiry","label":"Expiry","type":"date"},
   {"key":"status","label":"Status","type":"select","options":["Available","Low Stock","Out of Stock"]}]
)

files["pages/Support/Ambulance.js"] = make_page(
  "Ambulance", "🚑",
  ["Vehicle No","Driver","Contact","Status","Location","Last Service"],
  [{"vehicle_no":"KA-01-9999","driver":"Ramu","contact":"9876543210","status":"Available","location":"Main Gate","last_service":"2026-04-15"},
   {"vehicle_no":"KA-02-8888","driver":"Shiva","contact":"9876543211","status":"On Call","location":"Sector 4","last_service":"2026-05-01"}],
  [{"key":"vehicle_no","label":"Vehicle Number","placeholder":"KA-01-XXXX"},
   {"key":"driver","label":"Driver Name","placeholder":"Driver name"},
   {"key":"contact","label":"Contact","placeholder":"9XXXXXXXXX"},
   {"key":"status","label":"Status","type":"select","options":["Available","On Call","Maintenance","Out of Service"]},
   {"key":"location","label":"Current Location","placeholder":"Location"},
   {"key":"last_service","label":"Last Service Date","type":"date"}]
)

files["pages/Support/Linen.js"] = make_page(
  "Linen & Laundry", "🧺",
  ["Item","Ward","Quantity Sent","Quantity Received","Date","Status"],
  [{"item":"Bed Sheets","ward":"ICU","quantity_sent":"50","quantity_received":"48","date":"2026-05-27","status":"Completed"},
   {"item":"Pillow Covers","ward":"General","quantity_sent":"80","quantity_received":"0","date":"2026-05-27","status":"Sent"}],
  [{"key":"item","label":"Item Type","type":"select","options":["Bed Sheets","Pillow Covers","Towels","Patient Gowns","Curtains","OT Linen"]},
   {"key":"ward","label":"Ward","type":"select","options":["ICU","General","Surgical","Maternity","OT","Emergency"]},
   {"key":"quantity_sent","label":"Qty Sent","type":"number","placeholder":"50"},
   {"key":"quantity_received","label":"Qty Received","type":"number","placeholder":"0"},
   {"key":"date","label":"Date","type":"date"},
   {"key":"status","label":"Status","type":"select","options":["Sent","Washing","Returned","Completed"]}]
)

files["pages/Support/CSSD.js"] = make_page(
  "CSSD", "⚗️",
  ["Item","Department","Qty","Sterilization Method","Date","Status"],
  [{"item":"Surgical Instruments Set","department":"OT","qty":"5","sterilization_method":"Autoclave","date":"2026-05-27","status":"Sterilized"},
   {"item":"Endoscopy Kit","department":"Radiology","qty":"2","sterilization_method":"ETO","date":"2026-05-27","status":"Processing"}],
  [{"key":"item","label":"Item Name","placeholder":"Item name"},
   {"key":"department","label":"Department","type":"select","options":["OT","ICU","Emergency","Radiology","Labour Room","General Ward"]},
   {"key":"qty","label":"Quantity","type":"number","placeholder":"1"},
   {"key":"sterilization_method","label":"Method","type":"select","options":["Autoclave","ETO","UV","Chemical","Dry Heat"]},
   {"key":"date","label":"Date","type":"date"},
   {"key":"status","label":"Status","type":"select","options":["Received","Processing","Sterilized","Dispatched"]}]
)

files["pages/Support/Mortuary.js"] = make_page(
  "Mortuary Management", "🏛️",
  ["Body ID","Name","Age","Date of Death","Cause","Tray No","Status"],
  [{"body_id":"MRT001","name":"—","age":"—","date_of_death":"","cause":"—","tray_no":"T1","status":"Occupied"},
   {"body_id":"MRT002","name":"—","age":"—","date_of_death":"","cause":"—","tray_no":"T2","status":"Available"}],
  [{"key":"body_id","label":"Body ID","placeholder":"MRT001"},
   {"key":"name","label":"Name","placeholder":"Deceased name"},
   {"key":"age","label":"Age","type":"number","placeholder":"Age"},
   {"key":"date_of_death","label":"Date of Death","type":"date"},
   {"key":"cause","label":"Cause of Death","placeholder":"Cause","full":True},
   {"key":"tray_no","label":"Tray Number","placeholder":"T1"},
   {"key":"status","label":"Status","type":"select","options":["Occupied","Released","Pending Post Mortem"]}]
)

files["pages/Support/Feedback.js"] = make_page(
  "Patient Feedback", "💬",
  ["Feedback ID","Patient","Department","Rating","Comments","Date"],
  [{"feedback_id":"FB001","patient":"Ravi Kumar","department":"ICU","rating":"5","comments":"Excellent care","date":"2026-05-27"},
   {"feedback_id":"FB002","patient":"Anita Reddy","department":"General","rating":"4","comments":"Good service","date":"2026-05-26"}],
  [{"key":"feedback_id","label":"Feedback ID","placeholder":"FB001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"department","label":"Department","type":"select","options":["ICU","General","OPD","Emergency","OT","Radiology","Lab","Billing"]},
   {"key":"rating","label":"Rating","type":"select","options":["5 - Excellent","4 - Good","3 - Average","2 - Poor","1 - Very Poor"]},
   {"key":"comments","label":"Comments","placeholder":"Feedback comments","full":True},
   {"key":"date","label":"Date","type":"date"}]
)

files["pages/Admin/HRManagement.js"] = make_page(
  "HR Management", "👥",
  ["Staff ID","Name","Role","Department","Phone","Join Date","Status"],
  [{"staff_id":"HR001","name":"Dr. Priya Sharma","role":"Doctor","department":"Cardiology","phone":"9876543210","join_date":"2020-01-15","status":"Active"},
   {"staff_id":"HR002","name":"Nurse Kavya","role":"Nurse","department":"ICU","phone":"9876543211","join_date":"2022-06-01","status":"Active"}],
  [{"key":"staff_id","label":"Staff ID","placeholder":"HR001"},
   {"key":"name","label":"Full Name","placeholder":"Name"},
   {"key":"role","label":"Role","type":"select","options":["Doctor","Nurse","Lab Technician","Pharmacist","Admin","Security","Housekeeping","Driver"]},
   {"key":"department","label":"Department","type":"select","options":["ICU","General","OT","Emergency","Lab","Pharmacy","Admin","Security"]},
   {"key":"phone","label":"Phone","placeholder":"9XXXXXXXXX"},
   {"key":"join_date","label":"Join Date","type":"date"},
   {"key":"status","label":"Status","type":"select","options":["Active","On Leave","Resigned","Terminated"]}]
)

files["pages/Admin/MRD.js"] = make_page(
  "Medical Records Department", "🗂️",
  ["MR No","Patient","Doctor","Admission","Discharge","Diagnosis","Record Status"],
  [{"mr_no":"MR001","patient":"Ravi Kumar","doctor":"Dr. Sharma","admission":"2026-05-20","discharge":"2026-05-27","diagnosis":"Pneumonia","record_status":"Filed"},
   {"mr_no":"MR002","patient":"Anita Reddy","doctor":"Dr. Reddy","admission":"2026-05-18","discharge":"","diagnosis":"Diabetes T2","record_status":"Active"}],
  [{"key":"mr_no","label":"MR Number","placeholder":"MR001"},
   {"key":"patient","label":"Patient Name","placeholder":"Patient"},
   {"key":"doctor","label":"Doctor","placeholder":"Doctor"},
   {"key":"admission","label":"Admission Date","type":"date"},
   {"key":"discharge","label":"Discharge Date","type":"date"},
   {"key":"diagnosis","label":"Diagnosis","placeholder":"Diagnosis","full":True},
   {"key":"record_status","label":"Status","type":"select","options":["Active","Filed","Archived","Requested"]}]
)

files["pages/Admin/Security.js"] = make_page(
  "Security & Audit", "🔒",
  ["Log ID","User","Action","Module","IP Address","Timestamp","Result"],
  [{"log_id":"LOG001","user":"Admin","action":"Login","module":"Auth","ip_address":"192.168.1.1","timestamp":"09:15 AM","result":"Success"},
   {"log_id":"LOG002","user":"Dr. Sharma","action":"View Patient","module":"Patients","ip_address":"192.168.1.5","timestamp":"09:20 AM","result":"Success"},
   {"log_id":"LOG003","user":"Unknown","action":"Login Attempt","module":"Auth","ip_address":"10.0.0.5","timestamp":"09:25 AM","result":"Failed"}],
  [{"key":"log_id","label":"Log ID","placeholder":"LOG001"},
   {"key":"user","label":"User","placeholder":"Username"},
   {"key":"action","label":"Action","placeholder":"Action performed"},
   {"key":"module","label":"Module","type":"select","options":["Auth","Patients","Billing","Lab","Pharmacy","HR","Admin","RFID"]},
   {"key":"ip_address","label":"IP Address","placeholder":"192.168.x.x"},
   {"key":"result","label":"Result","type":"select","options":["Success","Failed","Warning"]}]
)

files["pages/Admin/SystemControl.js"] = """
import { useState } from 'react';
import { useRFID } from '../../context/RFIDContext';

export default function SystemControl() {
  const { rfidConnected } = useRFID();
  const [settings, setSettings] = useState({
    rfidStrictMode: true,
    blockchainEnabled: true,
    autoBackup: true,
    sessionTimeout: '30',
    hospitalName: 'MediChain Hospital',
    hospitalCode: 'MCH-001',
  });

  const toggle = (key) => setSettings(prev=>({...prev,[key]:!prev[key]}));

  const ToggleRow = ({label, desc, k}) => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid var(--border)'}}>
      <div>
        <div style={{fontWeight:'600',fontSize:'14px'}}>{label}</div>
        <div style={{fontSize:'12px',color:'var(--text3)',marginTop:'2px'}}>{desc}</div>
      </div>
      <div onClick={()=>toggle(k)}
        style={{width:'44px',height:'24px',borderRadius:'12px',background:settings[k]?'var(--green)':'var(--border)',cursor:'pointer',position:'relative',transition:'all 0.2s'}}>
        <div style={{position:'absolute',top:'3px',left:settings[k]?'22px':'3px',width:'18px',height:'18px',borderRadius:'50%',background:'white',transition:'all 0.2s'}}></div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">⚙️ System Control</div><div className="page-sub">Hospital system configuration</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
        <div className="card">
          <div className="card-header"><span className="card-title">🔧 System Settings</span></div>
          <div className="card-body">
            <ToggleRow k="rfidStrictMode" label="RFID Strict Mode" desc="RFID ledante modules block avutayi"/>
            <ToggleRow k="blockchainEnabled" label="Blockchain Logging" desc="All transactions blockchain lo store"/>
            <ToggleRow k="autoBackup" label="Auto Backup" desc="Daily midnight backup"/>
            <div style={{marginTop:'16px'}}>
              <div style={{fontSize:'13px',fontWeight:'600',marginBottom:'6px'}}>Session Timeout (mins)</div>
              <select value={settings.sessionTimeout} onChange={e=>setSettings({...settings,sessionTimeout:e.target.value})}
                style={{width:'100%',padding:'9px 12px',border:'1px solid var(--border)',borderRadius:'8px',background:'var(--bg)',color:'var(--text)'}}>
                {['15','30','60','120'].map(v=><option key={v} value={v}>{v} minutes</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">🏥 Hospital Info</span></div>
          <div className="card-body">
            {[['hospitalName','Hospital Name','MediChain Hospital'],['hospitalCode','Hospital Code','MCH-001']].map(([k,l,p])=>(
              <div key={k} style={{marginBottom:'14px'}}>
                <div style={{fontSize:'12px',fontWeight:'600',color:'var(--text2)',marginBottom:'5px'}}>{l}</div>
                <input value={settings[k]} onChange={e=>setSettings({...settings,[k]:e.target.value})}
                  style={{width:'100%',padding:'9px 12px',border:'1px solid var(--border)',borderRadius:'8px',background:'var(--bg)',color:'var(--text)',fontSize:'13px'}}/>
              </div>
            ))}
            <div style={{marginTop:'8px'}}>
              <div style={{fontSize:'12px',fontWeight:'600',color:'var(--text2)',marginBottom:'8px'}}>RFID Hardware Status</div>
              <div style={{padding:'10px 14px',borderRadius:'8px',background:rfidConnected?'var(--green-light)':'var(--red-light)',color:rfidConnected?'var(--green)':'var(--red)',fontWeight:'600',fontSize:'13px'}}>
                {rfidConnected ? '✅ RC522 Reader Connected' : '🚫 No Reader Detected — Check USB connection'}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{gridColumn:'1/-1'}}>
          <div className="card-header"><span className="card-title">📊 System Status</span></div>
          <div className="card-body">
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px'}}>
              {[
                {label:'RFID Reader',value:rfidConnected?'Online':'Offline',ok:rfidConnected},
                {label:'Blockchain',value:settings.blockchainEnabled?'Active':'Disabled',ok:settings.blockchainEnabled},
                {label:'Database',value:'MongoDB Connected',ok:true},
                {label:'Backend Server',value:'Running :5000',ok:true},
                {label:'Auto Backup',value:settings.autoBackup?'Enabled':'Disabled',ok:settings.autoBackup},
                {label:'RFID Strict Mode',value:settings.rfidStrictMode?'ON':'OFF',ok:settings.rfidStrictMode},
              ].map(s=>(
                <div key={s.label} style={{padding:'12px',background:'var(--bg)',borderRadius:'8px',border:`1px solid ${s.ok?'rgba(46,125,50,0.3)':'rgba(198,40,40,0.3)'}`}}>
                  <div style={{fontSize:'11px',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.5px'}}>{s.label}</div>
                  <div style={{fontSize:'14px',fontWeight:'700',color:s.ok?'var(--green)':'var(--red)',marginTop:'4px'}}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

files["pages/Admin/MISReports.js"] = """
import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const C = ['#1565C0','#C62828','#2E7D32','#F57F17','#00695C','#6A1B9A'];
export default function MISReports() {
  const [tab, setTab] = useState('overview');
  const admissions = [{month:'Dec',count:24},{month:'Jan',count:31},{month:'Feb',count:28},{month:'Mar',count:35},{month:'Apr',count:40},{month:'May',count:38}];
  const revenue = [{month:'Dec',revenue:85000,expenses:60000},{month:'Jan',revenue:120000,expenses:80000},{month:'Feb',revenue:98000,expenses:70000},{month:'Mar',revenue:145000,expenses:90000},{month:'Apr',revenue:132000,expenses:85000},{month:'May',revenue:160000,expenses:95000}];
  const dept = [{name:'General',value:40},{name:'ICU',value:20},{name:'Surgical',value:25},{name:'Maternity',value:15}];
  const tabs = ['overview','revenue','patients','departments'];
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📈 MIS Reports</div><div className="page-sub">Management Information System Analytics</div></div>
        <button className="btn btn-primary" onClick={()=>window.print()}>🖨️ Print Report</button>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {tabs.map(t=><button key={t} className={`btn ${tab===t?'btn-primary':'btn-outline'}`} onClick={()=>setTab(t)} style={{textTransform:'capitalize'}}>{t}</button>)}
      </div>
      {tab==='overview' && (
        <div>
          <div className="stat-grid" style={{marginBottom:'16px'}}>
            {[['👥','124','Total Patients','#1565C0'],['🛏️','18','Occupied Beds','#2E7D32'],['💰','Rs.7.4L','Revenue (6m)','#F57F17'],['🧪','284','Lab Tests (6m)','#6A1B9A']].map(([icon,val,label,color])=>(
              <div key={label} className="stat-card" style={{borderTop:`3px solid ${color}`}}><div className="stat-icon">{icon}</div><div className="stat-val">{val}</div><div className="stat-label">{label}</div></div>
            ))}
          </div>
          <div className="card"><div className="card-header"><span className="card-title">Monthly Admissions</span></div>
          <div className="card-body"><ResponsiveContainer width="100%" height={250}>
            <BarChart data={admissions}><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="count" fill="#1565C0" radius={[4,4,0,0]} name="Admissions"/></BarChart>
          </ResponsiveContainer></div></div>
        </div>
      )}
      {tab==='revenue' && (
        <div className="card"><div className="card-header"><span className="card-title">Revenue vs Expenses</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenue}><XAxis dataKey="month"/><YAxis tickFormatter={v=>'Rs.'+v/1000+'K'}/><Tooltip formatter={v=>'Rs.'+v.toLocaleString()}/><Legend/>
          <Bar dataKey="revenue" fill="#1565C0" radius={[4,4,0,0]} name="Revenue"/><Bar dataKey="expenses" fill="#C62828" radius={[4,4,0,0]} name="Expenses"/></BarChart>
        </ResponsiveContainer></div></div>
      )}
      {tab==='patients' && (
        <div className="card"><div className="card-header"><span className="card-title">Patient Admissions Trend</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <LineChart data={admissions}><XAxis dataKey="month"/><YAxis/><Tooltip/><Line type="monotone" dataKey="count" stroke="#1565C0" strokeWidth={2} dot={{r:4}} name="Admissions"/></LineChart>
        </ResponsiveContainer></div></div>
      )}
      {tab==='departments' && (
        <div className="card"><div className="card-header"><span className="card-title">Department Distribution</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <PieChart><Pie data={dept} cx="50%" cy="50%" outerRadius={120} dataKey="value" label={({name,percent})=>name+' '+Math.round(percent*100)+'%'}>{dept.map((_,i)=><Cell key={i} fill={C[i]}/>)}</Pie><Tooltip/></PieChart>
        </ResponsiveContainer></div></div>
      )}
    </div>
  );
}
"""

# ============================================================
# BACKEND: RFID STATUS ROUTE
# ============================================================
files["../../../medichain-hms/backend/routes/rfid.js"] = """
const express = require('express');
const router = express.Router();

let rfidConnected = false;
let lastUID = null;

// Try to connect to RFID serial port
try {
  const { SerialPort } = require('serialport');
  const { ReadlineParser } = require('@serialport/parser-readline');
  const port = process.env.RFID_PORT || 'COM3';

  const serial = new SerialPort({ path: port, baudRate: 9600 });
  const parser = serial.pipe(new ReadlineParser({ delimiter: '\\n' }));

  serial.on('open', () => { rfidConnected = true; console.log('RFID Reader Connected on ' + port); });
  serial.on('error', () => { rfidConnected = false; console.log('RFID Reader not found on ' + port); });

  parser.on('data', (line) => {
    line = line.trim();
    if (line.startsWith('UID:')) {
      lastUID = line.replace('UID:', '').trim();
      console.log('RFID Scan:', lastUID);
    }
  });
} catch (err) {
  rfidConnected = false;
  console.log('SerialPort not available — RFID disabled');
}

// GET /api/rfid/status
router.get('/status', (req, res) => {
  res.json({ connected: rfidConnected });
});

// GET /api/rfid/scan — returns last scanned UID
router.get('/scan', (req, res) => {
  if (!rfidConnected) return res.status(503).json({ error: 'RFID not connected' });
  res.json({ uid: lastUID });
});

module.exports = router;
"""

# ============================================================
# WRITE ALL FILES
# ============================================================
for rel_path, content in files.items():
    # Handle frontend files
    if not rel_path.startswith('../'):
        full_path = os.path.join(base, rel_path.replace('/', os.sep))
    else:
        # Backend file
        clean = rel_path.replace('../../../', '')
        full_path = os.path.join(r"C:\Users\nagul", clean.replace('/', os.sep))

    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"✅ Created: {rel_path}")

print("\n🎉 All files created! Now run: npm start")
print("📡 RFID: Hardware connect chesaka auto-unlock avutundi!")