import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"unit_id": "BB001", "blood_group": "O+", "units": "3", "donor": "Rahul Sharma", "collection_date": "2026-05-01", "expiry": "2026-06-30", "status": "Available"}, {"unit_id": "BB002", "blood_group": "AB-", "units": "1", "donor": "Priya K", "collection_date": "2026-05-10", "expiry": "2026-07-08", "status": "Reserved"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({unit_id:'',blood_group:'',units:'',donor:'',collection_date:'',expiry:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({unit_id:'',blood_group:'',units:'',donor:'',collection_date:'',expiry:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🩸 Blood Bank</div><div className="page-sub">Blood Bank management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Unit ID</th><th>Blood Group</th><th>Units</th><th>Donor</th><th>Collection Date</th><th>Expiry</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['unit_id']||'—'}</td><td>{r['blood_group']||'—'}</td><td>{r['units']||'—'}</td><td>{r['donor']||'—'}</td><td>{r['collection_date']||'—'}</td><td>{r['expiry']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🩸 Add Blood Bank Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Unit ID</label>
                <input placeholder="BB001" value={form.unit_id} onChange={e=>setForm({...form,unit_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Blood Group</label>
                <select value={form.blood_group} onChange={e=>setForm({...form,blood_group:e.target.value})}><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option></select>
              </div>
              <div className="form-group"><label>Units Available</label>
                <input type="number" placeholder="1" value={form.units} onChange={e=>setForm({...form,units:e.target.value})}/>
              </div>
              <div className="form-group"><label>Donor Name</label>
                <input placeholder="Donor name" value={form.donor} onChange={e=>setForm({...form,donor:e.target.value})}/>
              </div>
              <div className="form-group"><label>Collection Date</label>
                <input type="date" value={form.collection_date} onChange={e=>setForm({...form,collection_date:e.target.value})}/>
              </div>
              <div className="form-group"><label>Expiry Date</label>
                <input type="date" value={form.expiry} onChange={e=>setForm({...form,expiry:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Available</option><option>Reserved</option><option>Used</option><option>Expired</option></select>
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