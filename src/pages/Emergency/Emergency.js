import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const INITIAL = [
  { id:'E001', patient:'Unknown Male ~40yrs', type:'Cardiac Arrest', ward:'ICU', doctor:'Dr. Sharma', status:'Critical', time:'09:15 AM', rfid:'SCAN PENDING' },
  { id:'E002', patient:'Sita Devi, 65', type:'Stroke', ward:'Neuro ICU', doctor:'Dr. Reddy', status:'Stable', time:'08:45 AM', rfid:'C7D8E9F0' },
]

export default function Emergency() {
  const [alerts, setAlerts] = useState(INITIAL)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ patient:'', type:'', ward:'ICU', doctor:'' })
  const [pulse, setPulse] = useState(true)

  useEffect(() => { const t = setInterval(()=>setPulse(p=>!p),800); return ()=>clearInterval(t) }, [])

  const add = () => {
    const alert = { ...form, id:'E00'+(alerts.length+1), status:'Critical', time:new Date().toLocaleTimeString(), rfid:'SCAN PENDING' }
    setAlerts(prev => [alert, ...prev])
    toast.error('🚨 Emergency Alert Created!')
    setShowModal(false)
  }

  const resolve = (id) => {
    setAlerts(prev => prev.map(a => a.id===id ? {...a, status:'Resolved'} : a))
    toast.success('Alert resolved')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title" style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span style={{display:'inline-block',width:'12px',height:'12px',borderRadius:'50%',background:'#C62828',opacity:pulse?1:0.3,transition:'opacity 0.2s'}}></span>
            🚨 Emergency Alerts
          </div>
          <div className="page-sub">Real-time emergency monitoring</div>
        </div>
        <button className="btn btn-danger" onClick={()=>setShowModal(true)}>🚨 Raise Alert</button>
      </div>

      <div className="stat-grid" style={{marginBottom:'16px'}}>
        <div className="stat-card" style={{borderTop:'3px solid #C62828'}}>
          <div className="stat-icon">🚨</div>
          <div className="stat-val" style={{color:'#C62828'}}>{alerts.filter(a=>a.status==='Critical').length}</div>
          <div className="stat-label">Critical Alerts</div>
        </div>
        <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}>
          <div className="stat-icon">⚠️</div>
          <div className="stat-val" style={{color:'#F57F17'}}>{alerts.filter(a=>a.status==='Stable').length}</div>
          <div className="stat-label">Stable / Monitoring</div>
        </div>
        <div className="stat-card" style={{borderTop:'3px solid #2E7D32'}}>
          <div className="stat-icon">✅</div>
          <div className="stat-val" style={{color:'#2E7D32'}}>{alerts.filter(a=>a.status==='Resolved').length}</div>
          <div className="stat-label">Resolved Today</div>
        </div>
      </div>

      {alerts.filter(a=>a.status==='Critical').map(a=>(
        <div key={a.id} className="alert alert-danger" style={{marginBottom:'8px',justifyContent:'space-between'}}>
          <div>
            <strong>🚨 {a.id} — {a.type}</strong> | Patient: {a.patient} | Doctor: {a.doctor} | Ward: {a.ward} | {a.time}
          </div>
          <button className="btn btn-sm btn-success" onClick={()=>resolve(a.id)}>✅ Resolve</button>
        </div>
      ))}

      <div className="card">
        <div className="card-header"><span className="card-title">All Emergency Cases</span></div>
        <div className="card-body" style={{padding:0}}>
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Patient</th><th>Emergency Type</th><th>Ward</th><th>Doctor</th><th>RFID</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {alerts.map(a=>(
                  <tr key={a.id}>
                    <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{a.id}</code></td>
                    <td><strong>{a.patient}</strong></td>
                    <td>{a.type}</td><td>{a.ward}</td><td>{a.doctor}</td>
                    <td><code style={{fontSize:'11px'}}>{a.rfid}</code></td>
                    <td style={{color:'var(--text3)'}}>{a.time}</td>
                    <td><span className={`badge ${a.status==='Critical'?'badge-red':a.status==='Resolved'?'badge-green':'badge-amber'}`}>{a.status}</span></td>
                    <td>{a.status!=='Resolved'&&<button className="btn btn-sm btn-success" onClick={()=>resolve(a.id)}>Resolve</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🚨 Raise Emergency Alert</h3>
            <div className="form-grid">
              <div className="form-group full"><label>Patient Name/Description</label><input placeholder="Patient name or description" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/></div>
              <div className="form-group"><label>Emergency Type</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Cardiac Arrest</option><option>Stroke</option><option>Trauma</option><option>Respiratory Failure</option><option>Seizure</option><option>Other</option></select></div>
              <div className="form-group"><label>Ward</label><select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}><option>ICU</option><option>Neuro ICU</option><option>Emergency Room</option><option>Surgical ICU</option></select></div>
              <div className="form-group full"><label>Assigned Doctor</label><input placeholder="Doctor name" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={add}>🚨 Raise Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}