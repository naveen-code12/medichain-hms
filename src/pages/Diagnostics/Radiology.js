import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_radiology'); return s ? JSON.parse(s) : [{"scan_id": "R001", "patient": "Ravi Kumar", "scan_type": "Chest X-Ray", "doctor": "Dr. Sharma", "report": "Mild infiltrates", "status": "Reported"}, {"scan_id": "R002", "patient": "Sita Devi", "scan_type": "MRI Brain", "doctor": "Dr. Reddy", "report": "Pending", "status": "Pending"}]; } catch { return [{"scan_id": "R001", "patient": "Ravi Kumar", "scan_type": "Chest X-Ray", "doctor": "Dr. Sharma", "report": "Mild infiltrates", "status": "Reported"}, {"scan_id": "R002", "patient": "Sita Devi", "scan_type": "MRI Brain", "doctor": "Dr. Reddy", "report": "Pending", "status": "Pending"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_radiology', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({scan_id:'',patient:'',scan_type:'',doctor:'',report:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({scan_id:'',patient:'',scan_type:'',doctor:'',report:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🩻 Radiology</div><div className="page-sub">Radiology management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Scan ID</th><th>Patient</th><th>Scan Type</th><th>Doctor</th><th>Report</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['scan_id']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['scan_type']||'—'}</td><td>{r['doctor']||'—'}</td><td>{r['report']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🩻 Add Radiology Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Scan ID</label>
                <input placeholder="R001" value={form.scan_id} onChange={e=>setForm({...form,scan_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Scan Type</label>
                <select value={form.scan_type} onChange={e=>setForm({...form,scan_type:e.target.value})}><option>X-Ray</option><option>CT Scan</option><option>MRI</option><option>Ultrasound</option><option>ECHO</option><option>PET Scan</option><option>Mammography</option></select>
              </div>
              <div className="form-group"><label>Referring Doctor</label>
                <input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Report</label>
                <input placeholder="Findings" value={form.report} onChange={e=>setForm({...form,report:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>Processing</option><option>Reported</option></select>
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