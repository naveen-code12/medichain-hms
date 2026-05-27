import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"doctor_id": "D001", "name": "Dr. Priya Sharma", "department": "Cardiology", "phone": "9876543210", "specialization": "Interventional Cardiology", "status": "Active"}, {"doctor_id": "D002", "name": "Dr. Arun Reddy", "department": "Neurology", "phone": "9876543211", "specialization": "Stroke Medicine", "status": "Active"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({doctor_id:'',name:'',department:'',phone:'',specialization:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({doctor_id:'',name:'',department:'',phone:'',specialization:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">👨‍⚕️ Doctor Management</div><div className="page-sub">Doctor Management management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Doctor ID</th><th>Name</th><th>Department</th><th>Phone</th><th>Specialization</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['doctor_id']||'—'}</td><td>{r['name']||'—'}</td><td>{r['department']||'—'}</td><td>{r['phone']||'—'}</td><td>{r['specialization']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👨‍⚕️ Add Doctor Management Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Doctor ID</label>
                <input placeholder="D001" value={form.doctor_id} onChange={e=>setForm({...form,doctor_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Full Name</label>
                <input placeholder="Dr. Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="form-group"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>Cardiology</option><option>Neurology</option><option>Orthopaedics</option><option>General Medicine</option><option>Paediatrics</option><option>Gynaecology</option><option>Surgery</option><option>Radiology</option></select>
              </div>
              <div className="form-group"><label>Phone</label>
                <input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Specialization</label>
                <input placeholder="Sub-specialty" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Active</option><option>On Leave</option><option>Inactive</option></select>
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