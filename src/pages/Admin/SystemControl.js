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