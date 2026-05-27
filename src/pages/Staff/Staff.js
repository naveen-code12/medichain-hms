import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const SAMPLE_RFID = [
  { uid:'D1E2F3A4', name:'Dr. Priya Sharma', role:'Doctor', dept:'Cardiology' },
  { uid:'S1A2B3C4', name:'Nurse Kavya', role:'Nurse', dept:'ICU' },
  { uid:'S5B6C7D8', name:'Lab Tech Ravi', role:'Lab Tech', dept:'Pathology' },
]

export default function Staff() {
  const [staff, setStaff] = useState([])
  const [logs, setLogs] = useState([])
  const [scanning, setScanning] = useState(false)
  const [lastScan, setLastScan] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ staffId:'', name:'', role:'Doctor', department:'', phone:'', rfidUID:'' })
  const [search, setSearch] = useState('')
  const [logIdx, setLogIdx] = useState(0)

  useEffect(() => {
    API.get('/doctors').then(r => setStaff(r.data.doctors || [])).catch(() => {})
    setLogs([
      { uid:'D1E2F3A4', name:'Dr. Priya Sharma', type:'Entry', time:'09:12 AM', gate:'Main Gate' },
      { uid:'S1A2B3C4', name:'Nurse Kavya', type:'Entry', time:'08:30 AM', gate:'Ward B' },
    ])
  }, [])

  const simulateScan = () => {
    if (scanning) return
    setScanning(true)
    setTimeout(() => {
      const profile = SAMPLE_RFID[logIdx % SAMPLE_RFID.length]
      setLogIdx(p => p + 1)
      const type = Math.random() > 0.5 ? 'Entry' : 'Exit'
      const now = new Date().toLocaleTimeString()
      const log = { uid: profile.uid, name: profile.name, type, time: now, gate: 'Main Gate' }
      setLastScan({ ...profile, type, time: now })
      setLogs(prev => [log, ...prev])
      toast.success(`RFID Scan: ${profile.name} — ${type}`)
      setScanning(false)
    }, 1200)
  }

  const save = async () => {
    try {
      await API.post('/doctors', { doctorId: form.staffId, name: form.name, department: form.department, phone: form.phone })
      toast.success('Staff added!')
      setShowModal(false)
    } catch { toast.error('Error saving!') }
  }

  const filtered = staff.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">👷 Staff Management + RFID</div><div className="page-sub">Employee attendance via RFID tracking</div></div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Staff</button>
      </div>

      {/* RFID PANEL */}
      <div style={{ background:'linear-gradient(135deg,#0D2137,#1565C0)', borderRadius:'14px', padding:'20px', color:'#fff', marginBottom:'16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
          <div style={{ fontSize:'16px', fontWeight:'800' }}>📡 RFID Scanner — Staff Attendance</div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'rgba(255,255,255,0.7)' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4CAF50', animation:'none' }}></div>
            Reader Online
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
          <div
            onClick={simulateScan}
            style={{ border:'2px dashed rgba(255,255,255,0.3)', borderRadius:'12px', padding:'24px', textAlign:'center', cursor:'pointer', transition:'all 0.2s', background: scanning ? 'rgba(255,255,255,0.1)' : 'transparent' }}
          >
            <div style={{ fontSize:'40px', marginBottom:'8px' }}>{scanning ? '🔄' : '📡'}</div>
            <div style={{ fontSize:'15px', fontWeight:'700', marginBottom:'4px' }}>
              {scanning ? 'Scanning...' : 'Click to Simulate Scan'}
            </div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>
              Real RFID ready aina tarvata — Arduino tho auto avutundi
            </div>
          </div>

          <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:'12px', padding:'16px' }}>
            {lastScan ? (
              <>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'1px' }}>Last Scan</div>
                <div style={{ fontFamily:'monospace', fontSize:'18px', fontWeight:'800', color:'#4FC3F7', letterSpacing:'3px', marginBottom:'10px' }}>{lastScan.uid}</div>
                <div style={{ fontSize:'14px', fontWeight:'700' }}>{lastScan.name}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>{lastScan.role} · {lastScan.dept}</div>
                <div style={{ marginTop:'10px' }}>
                  <span style={{ padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', background: lastScan.type==='Entry' ? '#E8F5E9' : '#FFEBEE', color: lastScan.type==='Entry' ? '#2E7D32' : '#C62828' }}>
                    {lastScan.type==='Entry' ? '✅ Entry' : '🚪 Exit'} — {lastScan.time}
                  </span>
                </div>
              </>
            ) : (
              <div style={{ textAlign:'center', color:'rgba(255,255,255,0.4)', paddingTop:'20px' }}>
                <div style={{ fontSize:'24px' }}>👆</div>
                <div style={{ fontSize:'12px', marginTop:'8px' }}>Scan result ikkada vostundi</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop:'14px' }}>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'1px' }}>Recent Scans</div>
          {logs.slice(0,4).map((l,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'rgba(255,255,255,0.7)', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              <span>{l.uid} — {l.name}</span>
              <span style={{ color: l.type==='Entry' ? '#4CAF50' : '#EF5350' }}>{l.type} · {l.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STAFF TABLE */}
      <div className="search-bar">
        <div className="search-input">🔍 <input placeholder="Search staff..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>
      <div className="card">
        <div className="card-body" style={{padding:0}}>
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Phone</th><th>Experience</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.length ? filtered.map((s,i)=>(
                  <tr key={i}>
                    <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{s.doctorId}</code></td>
                    <td><strong>{s.name}</strong></td>
                    <td><span className="badge badge-teal">{s.department}</span></td>
                    <td>{s.phone}</td><td>{s.experience}</td>
                    <td><span className="badge badge-green">{s.status||'Active'}</span></td>
                  </tr>
                )) : <tr><td colSpan="6"><div className="empty">No staff records</div></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👷 Add Staff Member</h3>
            <div className="form-grid">
              {[['staffId','Staff ID','S001'],['name','Full Name','Dr. Name'],['phone','Phone','9XXXXXXXXX'],['rfidUID','RFID UID (if available)','Auto']].map(([k,l,p])=>(
                <div className="form-group" key={k}>
                  <label>{l}</label>
                  <input placeholder={p} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>
                </div>
              ))}
              <div className="form-group"><label>Role</label><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>Doctor</option><option>Nurse</option><option>Lab Tech</option><option>Admin</option><option>Security</option></select></div>
              <div className="form-group"><label>Department</label><input placeholder="Cardiology" value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>💾 Save Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}