import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_discharge2'); return s ? JSON.parse(s) : [{"patient_id": "P003", "name": "Suresh Babu", "doctor": "Dr. Kumar", "ward": "Surgical", "diagnosis": "Appendicitis", "bill": "22000", "condition": "Recovered"}]; } catch { return [{"patient_id": "P003", "name": "Suresh Babu", "doctor": "Dr. Kumar", "ward": "Surgical", "diagnosis": "Appendicitis", "bill": "22000", "condition": "Recovered"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_discharge2', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patient_id:'',name:'',doctor:'',ward:'',diagnosis:'',bill:'',condition:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({patient_id:'',name:'',doctor:'',ward:'',diagnosis:'',bill:'',condition:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">📋 Discharge Summary</div><div className="page-sub">Discharge Summary management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Patient ID</th><th>Name</th><th>Doctor</th><th>Ward</th><th>Diagnosis</th><th>Bill</th><th>Condition</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['patient_id']||'—'}</td><td>{r['name']||'—'}</td><td>{r['doctor']||'—'}</td><td>{r['ward']||'—'}</td><td>{r['diagnosis']||'—'}</td><td>{r['bill']||'—'}</td><td>{r['condition']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>📋 Add Discharge Summary Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient ID</label>
                <input placeholder="P001" value={form.patient_id} onChange={e=>setForm({...form,patient_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="form-group"><label>Doctor</label>
                <input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/>
              </div>
              <div className="form-group"><label>Ward</label>
                <input placeholder="Ward" value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}/>
              </div>
              <div className="form-group full"><label>Diagnosis</label>
                <input placeholder="Final diagnosis" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/>
              </div>
              <div className="form-group"><label>Bill Amount</label>
                <input type="number" placeholder="15000" value={form.bill} onChange={e=>setForm({...form,bill:e.target.value})}/>
              </div>
              <div className="form-group"><label>Condition</label>
                <select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})}><option>Stable</option><option>Recovered</option><option>Critical</option><option>Referred</option></select>
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