import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_phlebotomy'); return s ? JSON.parse(s) : [{"sample_id": "S001", "patient": "Ravi Kumar", "test": "Blood CBC", "collected_by": "Lab Tech Ravi", "time": "08:30", "status": "Sent to Lab"}, {"sample_id": "S002", "patient": "Anita Reddy", "test": "HbA1c", "collected_by": "Lab Tech Priya", "time": "09:00", "status": "Collected"}]; } catch { return [{"sample_id": "S001", "patient": "Ravi Kumar", "test": "Blood CBC", "collected_by": "Lab Tech Ravi", "time": "08:30", "status": "Sent to Lab"}, {"sample_id": "S002", "patient": "Anita Reddy", "test": "HbA1c", "collected_by": "Lab Tech Priya", "time": "09:00", "status": "Collected"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_phlebotomy', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({sample_id:'',patient:'',test:'',collected_by:'',time:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({sample_id:'',patient:'',test:'',collected_by:'',time:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">💉 Phlebotomy</div><div className="page-sub">Phlebotomy management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Sample ID</th><th>Patient</th><th>Test</th><th>Collected By</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['sample_id']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['test']||'—'}</td><td>{r['collected_by']||'—'}</td><td>{r['time']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💉 Add Phlebotomy Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Sample ID</label>
                <input placeholder="S001" value={form.sample_id} onChange={e=>setForm({...form,sample_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Test Required</label>
                <select value={form.test} onChange={e=>setForm({...form,test:e.target.value})}><option>Blood CBC</option><option>HbA1c</option><option>Urine</option><option>Lipid Profile</option><option>Liver Function</option><option>Culture</option></select>
              </div>
              <div className="form-group"><label>Collected By</label>
                <input placeholder="Lab Tech name" value={form.collected_by} onChange={e=>setForm({...form,collected_by:e.target.value})}/>
              </div>
              <div className="form-group"><label>Collection Time</label>
                <select value={form.time} onChange={e=>setForm({...form,time:e.target.value})}><option>07:00</option><option>08:00</option><option>09:00</option><option>10:00</option><option>11:00</option><option>12:00</option></select>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Collected</option><option>Sent to Lab</option><option>Processing</option><option>Done</option></select>
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