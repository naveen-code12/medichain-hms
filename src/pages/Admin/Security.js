import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_security'); return s ? JSON.parse(s) : [{"log_id": "LOG001", "user": "Admin", "action": "Login", "module": "Auth", "ip_address": "192.168.1.1", "timestamp": "09:15 AM", "result": "Success"}, {"log_id": "LOG002", "user": "Dr. Sharma", "action": "View Patient", "module": "Patients", "ip_address": "192.168.1.5", "timestamp": "09:20 AM", "result": "Success"}, {"log_id": "LOG003", "user": "Unknown", "action": "Login Attempt", "module": "Auth", "ip_address": "10.0.0.5", "timestamp": "09:25 AM", "result": "Failed"}]; } catch { return [{"log_id": "LOG001", "user": "Admin", "action": "Login", "module": "Auth", "ip_address": "192.168.1.1", "timestamp": "09:15 AM", "result": "Success"}, {"log_id": "LOG002", "user": "Dr. Sharma", "action": "View Patient", "module": "Patients", "ip_address": "192.168.1.5", "timestamp": "09:20 AM", "result": "Success"}, {"log_id": "LOG003", "user": "Unknown", "action": "Login Attempt", "module": "Auth", "ip_address": "10.0.0.5", "timestamp": "09:25 AM", "result": "Failed"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_security', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({log_id:'',user:'',action:'',module:'',ip_address:'',result:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({log_id:'',user:'',action:'',module:'',ip_address:'',result:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🔒 Security & Audit</div><div className="page-sub">Security & Audit management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Log ID</th><th>User</th><th>Action</th><th>Module</th><th>IP Address</th><th>Timestamp</th><th>Result</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['log_id']||'—'}</td><td>{r['user']||'—'}</td><td>{r['action']||'—'}</td><td>{r['module']||'—'}</td><td>{r['ip_address']||'—'}</td><td>{r['timestamp']||'—'}</td><td>{r['result']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🔒 Add Security & Audit Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Log ID</label>
                <input placeholder="LOG001" value={form.log_id} onChange={e=>setForm({...form,log_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>User</label>
                <input placeholder="Username" value={form.user} onChange={e=>setForm({...form,user:e.target.value})}/>
              </div>
              <div className="form-group"><label>Action</label>
                <input placeholder="Action performed" value={form.action} onChange={e=>setForm({...form,action:e.target.value})}/>
              </div>
              <div className="form-group"><label>Module</label>
                <select value={form.module} onChange={e=>setForm({...form,module:e.target.value})}><option>Auth</option><option>Patients</option><option>Billing</option><option>Lab</option><option>Pharmacy</option><option>HR</option><option>Admin</option><option>RFID</option></select>
              </div>
              <div className="form-group"><label>IP Address</label>
                <input placeholder="192.168.x.x" value={form.ip_address} onChange={e=>setForm({...form,ip_address:e.target.value})}/>
              </div>
              <div className="form-group"><label>Result</label>
                <select value={form.result} onChange={e=>setForm({...form,result:e.target.value})}><option>Success</option><option>Failed</option><option>Warning</option></select>
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