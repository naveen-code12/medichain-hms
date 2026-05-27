import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"staff_id": "HR001", "name": "Dr. Priya Sharma", "role": "Doctor", "department": "Cardiology", "phone": "9876543210", "join_date": "2020-01-15", "status": "Active"}, {"staff_id": "HR002", "name": "Nurse Kavya", "role": "Nurse", "department": "ICU", "phone": "9876543211", "join_date": "2022-06-01", "status": "Active"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({staff_id:'',name:'',role:'',department:'',phone:'',join_date:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({staff_id:'',name:'',role:'',department:'',phone:'',join_date:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">👥 HR Management</div><div className="page-sub">HR Management management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Staff ID</th><th>Name</th><th>Role</th><th>Department</th><th>Phone</th><th>Join Date</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['staff_id']||'—'}</td><td>{r['name']||'—'}</td><td>{r['role']||'—'}</td><td>{r['department']||'—'}</td><td>{r['phone']||'—'}</td><td>{r['join_date']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👥 Add HR Management Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Staff ID</label>
                <input placeholder="HR001" value={form.staff_id} onChange={e=>setForm({...form,staff_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Full Name</label>
                <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="form-group"><label>Role</label>
                <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>Doctor</option><option>Nurse</option><option>Lab Technician</option><option>Pharmacist</option><option>Admin</option><option>Security</option><option>Housekeeping</option><option>Driver</option></select>
              </div>
              <div className="form-group"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>ICU</option><option>General</option><option>OT</option><option>Emergency</option><option>Lab</option><option>Pharmacy</option><option>Admin</option><option>Security</option></select>
              </div>
              <div className="form-group"><label>Phone</label>
                <input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              </div>
              <div className="form-group"><label>Join Date</label>
                <input type="date" value={form.join_date} onChange={e=>setForm({...form,join_date:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Active</option><option>On Leave</option><option>Resigned</option><option>Terminated</option></select>
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