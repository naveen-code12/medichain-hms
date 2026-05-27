import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"patient": "Ravi Kumar", "ward": "ICU", "bed": "B01", "nurse": "Nurse Kavya", "task": "IV Drip Change", "time": "09:00", "status": "Pending"}, {"patient": "Anita Reddy", "ward": "General", "bed": "B03", "nurse": "Nurse Priya", "task": "Vitals Check", "time": "10:00", "status": "Done"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patient:'',ward:'',bed:'',nurse:'',task:'',time:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({patient:'',ward:'',bed:'',nurse:'',task:'',time:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">💉 Nurse Station</div><div className="page-sub">Nurse Station management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Patient</th><th>Ward</th><th>Bed</th><th>Nurse</th><th>Task</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['patient']||'—'}</td><td>{r['ward']||'—'}</td><td>{r['bed']||'—'}</td><td>{r['nurse']||'—'}</td><td>{r['task']||'—'}</td><td>{r['time']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💉 Add Nurse Station Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient</label>
                <input placeholder="Patient name" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Ward</label>
                <select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}><option>ICU</option><option>General</option><option>Surgical</option><option>Maternity</option></select>
              </div>
              <div className="form-group"><label>Bed No</label>
                <input placeholder="B01" value={form.bed} onChange={e=>setForm({...form,bed:e.target.value})}/>
              </div>
              <div className="form-group"><label>Nurse</label>
                <input placeholder="Nurse name" value={form.nurse} onChange={e=>setForm({...form,nurse:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Task</label>
                <input placeholder="e.g. IV Drip" value={form.task} onChange={e=>setForm({...form,task:e.target.value})}/>
              </div>
              <div className="form-group"><label>Time</label>
                <select value={form.time} onChange={e=>setForm({...form,time:e.target.value})}><option>06:00</option><option>08:00</option><option>10:00</option><option>12:00</option><option>14:00</option><option>16:00</option><option>18:00</option><option>20:00</option></select>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>In Progress</option><option>Done</option></select>
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