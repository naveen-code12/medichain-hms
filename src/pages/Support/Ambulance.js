import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_ambulance'); return s ? JSON.parse(s) : [{"vehicle_no": "KA-01-9999", "driver": "Ramu", "contact": "9876543210", "status": "Available", "location": "Main Gate", "last_service": "2026-04-15"}, {"vehicle_no": "KA-02-8888", "driver": "Shiva", "contact": "9876543211", "status": "On Call", "location": "Sector 4", "last_service": "2026-05-01"}]; } catch { return [{"vehicle_no": "KA-01-9999", "driver": "Ramu", "contact": "9876543210", "status": "Available", "location": "Main Gate", "last_service": "2026-04-15"}, {"vehicle_no": "KA-02-8888", "driver": "Shiva", "contact": "9876543211", "status": "On Call", "location": "Sector 4", "last_service": "2026-05-01"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_ambulance', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({vehicle_no:'',driver:'',contact:'',status:'',location:'',last_service:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({vehicle_no:'',driver:'',contact:'',status:'',location:'',last_service:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🚑 Ambulance</div><div className="page-sub">Ambulance management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Vehicle No</th><th>Driver</th><th>Contact</th><th>Status</th><th>Location</th><th>Last Service</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['vehicle_no']||'—'}</td><td>{r['driver']||'—'}</td><td>{r['contact']||'—'}</td><td>{r['status']||'—'}</td><td>{r['location']||'—'}</td><td>{r['last_service']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🚑 Add Ambulance Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Vehicle Number</label>
                <input placeholder="KA-01-XXXX" value={form.vehicle_no} onChange={e=>setForm({...form,vehicle_no:e.target.value})}/>
              </div>
              <div className="form-group"><label>Driver Name</label>
                <input placeholder="Driver name" value={form.driver} onChange={e=>setForm({...form,driver:e.target.value})}/>
              </div>
              <div className="form-group"><label>Contact</label>
                <input placeholder="9XXXXXXXXX" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Available</option><option>On Call</option><option>Maintenance</option><option>Out of Service</option></select>
              </div>
              <div className="form-group"><label>Current Location</label>
                <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
              </div>
              <div className="form-group"><label>Last Service Date</label>
                <input type="date" value={form.last_service} onChange={e=>setForm({...form,last_service:e.target.value})}/>
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