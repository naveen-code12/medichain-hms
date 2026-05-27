import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"mr_no": "MR001", "patient": "Ravi Kumar", "doctor": "Dr. Sharma", "admission": "2026-05-20", "discharge": "2026-05-27", "diagnosis": "Pneumonia", "record_status": "Filed"}, {"mr_no": "MR002", "patient": "Anita Reddy", "doctor": "Dr. Reddy", "admission": "2026-05-18", "discharge": "", "diagnosis": "Diabetes T2", "record_status": "Active"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({mr_no:'',patient:'',doctor:'',admission:'',discharge:'',diagnosis:'',record_status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({mr_no:'',patient:'',doctor:'',admission:'',discharge:'',diagnosis:'',record_status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🗂️ Medical Records Department</div><div className="page-sub">Medical Records Department management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>MR No</th><th>Patient</th><th>Doctor</th><th>Admission</th><th>Discharge</th><th>Diagnosis</th><th>Record Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['mr_no']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['doctor']||'—'}</td><td>{r['admission']||'—'}</td><td>{r['discharge']||'—'}</td><td>{r['diagnosis']||'—'}</td><td>{r['record_status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🗂️ Add Medical Records Department Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>MR Number</label>
                <input placeholder="MR001" value={form.mr_no} onChange={e=>setForm({...form,mr_no:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Doctor</label>
                <input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/>
              </div>
              <div className="form-group"><label>Admission Date</label>
                <input type="date" value={form.admission} onChange={e=>setForm({...form,admission:e.target.value})}/>
              </div>
              <div className="form-group"><label>Discharge Date</label>
                <input type="date" value={form.discharge} onChange={e=>setForm({...form,discharge:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Diagnosis</label>
                <input placeholder="Diagnosis" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.record_status} onChange={e=>setForm({...form,record_status:e.target.value})}><option>Active</option><option>Filed</option><option>Archived</option><option>Requested</option></select>
              </div></div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>✅ Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  )
}