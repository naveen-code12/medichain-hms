import { useState, useEffect } from 'react';
const KEY = 'medichain_lab';
const DEF = [
  {testId:'T001',patientName:'Ravi Kumar',testName:'Blood CBC',doctor:'Dr. Sharma',result:'Abnormal',status:'Completed'},
  {testId:'T002',patientName:'Anita Reddy',testName:'HbA1c',doctor:'Dr. Reddy',result:'Pending',status:'Pending'},
];
export default function Lab() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({testId:'',patientName:'',testName:'Blood CBC',doctor:'',result:'Pending',status:'Pending'});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.patientName) return; setRecords(p=>[...p,{...form}]); setShowModal(false); setForm({testId:'',patientName:'',testName:'Blood CBC',doctor:'',result:'Pending',status:'Pending'}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">🧪 Laboratory</div><div className="page-sub">Lab test records</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Test</button></div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search tests..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>Test ID</th><th>Patient</th><th>Test Name</th><th>Doctor</th><th>Result</th><th>Status</th><th>Blockchain</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((t,i)=>(
        <tr key={i}><td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{t.testId}</code></td>
        <td><strong>{t.patientName}</strong></td><td>{t.testName}</td><td>{t.doctor}</td>
        <td><span className={`badge ${t.result==='Abnormal'?'badge-red':t.result==='Pending'?'badge-amber':'badge-green'}`}>{t.result}</span></td>
        <td><span className={`badge ${t.status==='Completed'?'badge-green':'badge-amber'}`}>{t.status}</span></td>
        <td><span className="chain-badge">🔗 On-Chain</span></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )) : <tr><td colSpan="8"><div className="empty">No lab tests</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>🧪 Add Lab Test</h3>
      <div className="form-grid">
        <div className="form-group"><label>Test ID</label><input placeholder="T001" value={form.testId} onChange={e=>setForm({...form,testId:e.target.value})}/></div>
        <div className="form-group"><label>Patient Name</label><input placeholder="Patient" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
        <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
        <div className="form-group"><label>Result</label><select value={form.result} onChange={e=>setForm({...form,result:e.target.value})}><option>Pending</option><option>Normal</option><option>Abnormal</option><option>Critical</option></select></div>
        <div className="form-group full"><label>Test Name</label><select value={form.testName} onChange={e=>setForm({...form,testName:e.target.value})}><option>Blood CBC</option><option>HbA1c</option><option>Urine Analysis</option><option>Liver Function</option><option>Kidney Function</option><option>Lipid Profile</option><option>ECG</option><option>X-Ray</option><option>MRI Scan</option></select></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>🔗 Add + Blockchain</button></div>
    </div></div>)}
  </div>)
}