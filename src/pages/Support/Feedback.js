import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"feedback_id": "FB001", "patient": "Ravi Kumar", "department": "ICU", "rating": "5", "comments": "Excellent care", "date": "2026-05-27"}, {"feedback_id": "FB002", "patient": "Anita Reddy", "department": "General", "rating": "4", "comments": "Good service", "date": "2026-05-26"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({feedback_id:'',patient:'',department:'',rating:'',comments:'',date:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({feedback_id:'',patient:'',department:'',rating:'',comments:'',date:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">💬 Patient Feedback</div><div className="page-sub">Patient Feedback management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Feedback ID</th><th>Patient</th><th>Department</th><th>Rating</th><th>Comments</th><th>Date</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['feedback_id']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['department']||'—'}</td><td>{r['rating']||'—'}</td><td>{r['comments']||'—'}</td><td>{r['date']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💬 Add Patient Feedback Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Feedback ID</label>
                <input placeholder="FB001" value={form.feedback_id} onChange={e=>setForm({...form,feedback_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>ICU</option><option>General</option><option>OPD</option><option>Emergency</option><option>OT</option><option>Radiology</option><option>Lab</option><option>Billing</option></select>
              </div>
              <div className="form-group"><label>Rating</label>
                <select value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})}><option>5 - Excellent</option><option>4 - Good</option><option>3 - Average</option><option>2 - Poor</option><option>1 - Very Poor</option></select>
              </div>
              <div className="form-group full"><label>Comments</label>
                <input placeholder="Feedback comments" value={form.comments} onChange={e=>setForm({...form,comments:e.target.value})}/>
              </div>
              <div className="form-group"><label>Date</label>
                <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
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