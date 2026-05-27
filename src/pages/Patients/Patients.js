import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',name:'',bloodGroup:'A+',ward:'General',doctor:'',diagnosis:'',age:'',phone:''});
  useEffect(() => { API.get('/patients').then(r => setPatients(r.data.patients||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/patients', form); const r = await API.get('/patients'); setPatients(r.data.patients||[]); setShowModal(false); }
    catch(e) { alert('Error saving!') }
  };
  const filtered = patients.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">👥 Patients</div><div className="page-sub">All registered patients</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Patient</button>
      </div>
      <div className="search-bar">
        <div className="search-input">🔍 <input placeholder="Search patients..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Blood</th><th>Ward</th><th>Doctor</th><th>Diagnosis</th><th>Blockchain</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((p,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{p.patientId}</code></td>
            <td><strong>{p.name}</strong></td><td>{p.age||'—'}</td>
            <td><span className="badge badge-red">{p.bloodGroup}</span></td>
            <td>{p.ward}</td><td>{p.doctor}</td><td>{p.diagnosis}</td>
            <td><span className="chain-badge">🔗 On-Chain</span></td>
          </tr>
        )) : <tr><td colSpan="8"><div className="empty">No patients yet. Add one!</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👥 Add New Patient</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Full Name</label><input placeholder="Patient name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Age</label><input type="number" placeholder="35" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
              <div className="form-group"><label>Phone</label><input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="form-group"><label>Blood Group</label>
                <select value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})}>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="form-group"><label>Ward</label>
                <select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}>
                  <option>General</option><option>ICU</option><option>Surgical</option><option>Maternity</option><option>Paediatric</option>
                </select>
              </div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor name" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group"><label>Diagnosis</label><input placeholder="Primary diagnosis" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Save + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
