import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Lab() {
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({testId:'',patientId:'',patientName:'',testName:'Blood CBC',doctor:''});
  useEffect(() => { API.get('/lab').then(r => setTests(r.data.tests||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/lab', form); const r = await API.get('/lab'); setTests(r.data.tests||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = tests.filter(t => t.patientName?.toLowerCase().includes(search.toLowerCase())||t.testName?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">🧪 Lab Tests</div><div className="page-sub">Laboratory test records</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Test</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search tests..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Test ID</th><th>Patient</th><th>Test Name</th><th>Doctor</th><th>Result</th><th>Status</th><th>Blockchain</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((t,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{t.testId}</code></td>
            <td><strong>{t.patientName}</strong></td><td>{t.testName}</td><td>{t.doctor}</td>
            <td><span className={`badge ${t.result==='Abnormal'?'badge-red':t.result==='Pending'?'badge-amber':'badge-green'}`}>{t.result||'Pending'}</span></td>
            <td><span className={`badge ${t.status==='Completed'?'badge-green':'badge-amber'}`}>{t.status||'Pending'}</span></td>
            <td><span className="chain-badge">🔗 On-Chain</span></td>
          </tr>
        )) : <tr><td colSpan="7"><div className="empty">No lab tests</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🧪 Add Lab Test</h3>
            <div className="form-grid">
              <div className="form-group"><label>Test ID</label><input placeholder="T001" value={form.testId} onChange={e=>setForm({...form,testId:e.target.value})}/></div>
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Patient Name</label><input placeholder="Patient name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group full"><label>Test Name</label>
                <select value={form.testName} onChange={e=>setForm({...form,testName:e.target.value})}>
                  <option>Blood CBC</option><option>Urine Analysis</option><option>X-Ray</option><option>MRI Scan</option><option>CT Scan</option><option>Liver Function</option><option>Kidney Function</option><option>ECG</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Add + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
