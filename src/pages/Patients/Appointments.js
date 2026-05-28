import { useState, useEffect } from 'react';
const KEY = 'medichain_appointments';
const DEF = [
  {patientName:'Kavitha Rao',doctor:'Dr. Sharma',date:'2026-05-25',time:'10:00',department:'Cardiology',status:'Scheduled'},
  {patientName:'Rajesh Nair',doctor:'Dr. Kumar',date:'2026-05-24',time:'11:30',department:'Orthopaedics',status:'Confirmed'},
];
export default function Appointments() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientName:'',doctor:'',date:'',time:'',department:'General Medicine'});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.patientName) return; setRecords(p=>[...p,{...form,status:'Scheduled'}]); setShowModal(false); setForm({patientName:'',doctor:'',date:'',time:'',department:'General Medicine'}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">📅 Appointments</div><div className="page-sub">Scheduled patient appointments</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Schedule</button></div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Department</th><th>Status</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((a,i)=>(
        <tr key={i}><td><strong>{a.patientName}</strong></td><td>{a.doctor}</td><td>{a.date}</td><td>{a.time}</td>
        <td><span className="badge badge-teal">{a.department}</span></td>
        <td><span className={`badge ${a.status==='Confirmed'?'badge-green':a.status==='Cancelled'?'badge-red':'badge-blue'}`}>{a.status}</span></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )) : <tr><td colSpan="7"><div className="empty">No appointments</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>📅 Schedule Appointment</h3>
      <div className="form-grid">
        <div className="form-group"><label>Patient Name</label><input placeholder="Patient name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
        <div className="form-group"><label>Doctor</label><input placeholder="Doctor name" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
        <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
        <div className="form-group"><label>Time</label><input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
        <div className="form-group full"><label>Department</label><select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>General Medicine</option><option>Cardiology</option><option>Orthopaedics</option><option>Neurology</option><option>Paediatrics</option><option>Gynaecology</option></select></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>✅ Schedule</button></div>
    </div></div>)}
  </div>)
}