import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"test_id": "T001", "patient": "Ravi Kumar", "test_name": "Blood CBC", "doctor": "Dr. Sharma", "result": "Abnormal", "status": "Completed"}, {"test_id": "T002", "patient": "Anita Reddy", "test_name": "HbA1c", "doctor": "Dr. Reddy", "result": "Pending", "status": "Pending"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({test_id:'',patient:'',test_name:'',doctor:'',result:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({test_id:'',patient:'',test_name:'',doctor:'',result:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🔬 Laboratory</div><div className="page-sub">Laboratory management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Test ID</th><th>Patient</th><th>Test Name</th><th>Doctor</th><th>Result</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['test_id']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['test_name']||'—'}</td><td>{r['doctor']||'—'}</td><td>{r['result']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🔬 Add Laboratory Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Test ID</label>
                <input placeholder="T001" value={form.test_id} onChange={e=>setForm({...form,test_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Test Name</label>
                <select value={form.test_name} onChange={e=>setForm({...form,test_name:e.target.value})}><option>Blood CBC</option><option>HbA1c</option><option>Urine Analysis</option><option>Liver Function</option><option>Kidney Function</option><option>Lipid Profile</option><option>Thyroid</option><option>Culture & Sensitivity</option></select>
              </div>
              <div className="form-group"><label>Referring Doctor</label>
                <input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/>
              </div>
              <div className="form-group"><label>Result</label>
                <select value={form.result} onChange={e=>setForm({...form,result:e.target.value})}><option>Pending</option><option>Normal</option><option>Abnormal</option><option>Critical</option></select>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>Processing</option><option>Completed</option></select>
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