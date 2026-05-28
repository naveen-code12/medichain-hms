import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_mortuary'); return s ? JSON.parse(s) : [{"body_id": "MRT001", "name": "—", "age": "—", "date_of_death": "", "cause": "—", "tray_no": "T1", "status": "Occupied"}, {"body_id": "MRT002", "name": "—", "age": "—", "date_of_death": "", "cause": "—", "tray_no": "T2", "status": "Available"}]; } catch { return [{"body_id": "MRT001", "name": "—", "age": "—", "date_of_death": "", "cause": "—", "tray_no": "T1", "status": "Occupied"}, {"body_id": "MRT002", "name": "—", "age": "—", "date_of_death": "", "cause": "—", "tray_no": "T2", "status": "Available"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_mortuary', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({body_id:'',name:'',age:'',date_of_death:'',cause:'',tray_no:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({body_id:'',name:'',age:'',date_of_death:'',cause:'',tray_no:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🏛️ Mortuary Management</div><div className="page-sub">Mortuary Management management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Body ID</th><th>Name</th><th>Age</th><th>Date of Death</th><th>Cause</th><th>Tray No</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['body_id']||'—'}</td><td>{r['name']||'—'}</td><td>{r['age']||'—'}</td><td>{r['date_of_death']||'—'}</td><td>{r['cause']||'—'}</td><td>{r['tray_no']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🏛️ Add Mortuary Management Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Body ID</label>
                <input placeholder="MRT001" value={form.body_id} onChange={e=>setForm({...form,body_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Name</label>
                <input placeholder="Deceased name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="form-group"><label>Age</label>
                <input type="number" placeholder="Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/>
              </div>
              <div className="form-group"><label>Date of Death</label>
                <input type="date" value={form.date_of_death} onChange={e=>setForm({...form,date_of_death:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Cause of Death</label>
                <input placeholder="Cause" value={form.cause} onChange={e=>setForm({...form,cause:e.target.value})}/>
              </div>
              <div className="form-group"><label>Tray Number</label>
                <input placeholder="T1" value={form.tray_no} onChange={e=>setForm({...form,tray_no:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Occupied</option><option>Released</option><option>Pending Post Mortem</option></select>
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