import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_ot'); return s ? JSON.parse(s) : [{"ot_no": "OT-1", "patient": "Ravi Kumar", "surgeon": "Dr. Sharma", "procedure": "Appendectomy", "date": "2026-05-27", "time": "09:00", "status": "Scheduled"}, {"ot_no": "OT-2", "patient": "Anita Reddy", "surgeon": "Dr. Kumar", "procedure": "C-Section", "date": "2026-05-27", "time": "11:00", "status": "In Progress"}]; } catch { return [{"ot_no": "OT-1", "patient": "Ravi Kumar", "surgeon": "Dr. Sharma", "procedure": "Appendectomy", "date": "2026-05-27", "time": "09:00", "status": "Scheduled"}, {"ot_no": "OT-2", "patient": "Anita Reddy", "surgeon": "Dr. Kumar", "procedure": "C-Section", "date": "2026-05-27", "time": "11:00", "status": "In Progress"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_ot', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ot_no:'',patient:'',surgeon:'',procedure:'',date:'',time:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({ot_no:'',patient:'',surgeon:'',procedure:'',date:'',time:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🏥 Operation Theatre</div><div className="page-sub">Operation Theatre management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>OT No</th><th>Patient</th><th>Surgeon</th><th>Procedure</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['ot_no']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['surgeon']||'—'}</td><td>{r['procedure']||'—'}</td><td>{r['date']||'—'}</td><td>{r['time']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🏥 Add Operation Theatre Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>OT Number</label>
                <input placeholder="OT-1" value={form.ot_no} onChange={e=>setForm({...form,ot_no:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient name" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Surgeon</label>
                <input placeholder="Dr. Name" value={form.surgeon} onChange={e=>setForm({...form,surgeon:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Procedure</label>
                <input placeholder="Surgery name" value={form.procedure} onChange={e=>setForm({...form,procedure:e.target.value})}/>
              </div>
              <div className="form-group"><label>Date</label>
                <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
              </div>
              <div className="form-group"><label>Time</label>
                <select value={form.time} onChange={e=>setForm({...form,time:e.target.value})}><option>07:00</option><option>09:00</option><option>11:00</option><option>13:00</option><option>15:00</option><option>17:00</option></select>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Scheduled</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select>
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