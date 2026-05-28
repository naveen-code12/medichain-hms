import { useState, useEffect } from 'react';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({doctorId:'',name:'',department:'Cardiology',phone:'',email:'',experience:''});
  
  const save = async () => {
    try { await API.post('/doctors', form); const r = await API.get('/doctors'); setDoctors(r.data.doctors||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = doctors.filter(d => d.name?.toLowerCase().includes(search.toLowerCase())||d.department?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">👨‍⚕️ Doctors</div><div className="page-sub">Medical staff directory</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Doctor</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search doctors..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Phone</th><th>Email</th><th>Experience</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((d,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{d.doctorId}</code></td>
            <td><strong>{d.name}</strong></td>
            <td><span className="badge badge-teal">{d.department}</span></td>
            <td>{d.phone}</td><td>{d.email||'—'}</td><td>{d.experience}</td>
            <td><span className="badge badge-green">{d.status||'Active'}</span></td>
          </tr>
        )) : <tr><td colSpan="7"><div className="empty">No doctors added</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👨‍⚕️ Add Doctor</h3>
            <div className="form-grid">
              <div className="form-group"><label>Doctor ID</label><input placeholder="D001" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})}/></div>
              <div className="form-group"><label>Full Name</label><input placeholder="Dr. Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}>
                  <option>Cardiology</option><option>Neurology</option><option>Orthopaedics</option><option>General Medicine</option><option>Paediatrics</option><option>Gynaecology</option>
                </select>
              </div>
              <div className="form-group"><label>Phone</label><input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="form-group full"><label>Email</label><input placeholder="doctor@hospital.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div className="form-group"><label>Experience</label><input placeholder="5 years" value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>✅ Add Doctor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
