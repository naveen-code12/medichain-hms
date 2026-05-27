import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function InPatients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',name:'',ward:'General',doctor:'',admittedDate:'',bed:''});
  useEffect(() => { API.get('/inpatients').then(r => setPatients(r.data.patients||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/inpatients', form); const r = await API.get('/inpatients'); setPatients(r.data.patients||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = patients.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">🛏️ In-Patients</div><div className="page-sub">Currently admitted patients</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Admit Patient</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Name</th><th>Ward</th><th>Doctor</th><th>Admitted</th><th>Days</th><th>Bed</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((p,i)=>{ const days=p.admittedDate?Math.floor((new Date()-new Date(p.admittedDate))/86400000):0; return (
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{p.patientId}</code></td>
            <td><strong>{p.name}</strong></td><td>{p.ward}</td><td>{p.doctor}</td><td>{p.admittedDate}</td>
            <td><span className={`badge ${days>7?'badge-red':days>3?'badge-amber':'badge-green'}`}>{days}d</span></td>
            <td>{p.bed||'—'}</td>
            <td><span className={`badge ${p.status==='Discharged'?'badge-green':'badge-blue'}`}>{p.status||'Active'}</span></td>
          </tr>
        )}) : <tr><td colSpan="8"><div className="empty">No in-patients</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🛏️ Admit In-Patient</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Name</label><input placeholder="Patient name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Ward</label><select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}><option>General</option><option>ICU</option><option>Surgical</option><option>Maternity</option></select></div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group"><label>Admission Date</label><input type="date" value={form.admittedDate} onChange={e=>setForm({...form,admittedDate:e.target.value})}/></div>
              <div className="form-group"><label>Bed No</label><input placeholder="B12" value={form.bed} onChange={e=>setForm({...form,bed:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Admit + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
