import { useState, useEffect } from 'react';
const KEY = 'medichain_discharge';
const DEF = [{patientId:'P003',patientName:'Suresh Babu',doctor:'Dr. Kumar',ward:'Surgical',diagnosis:'Appendicitis',billAmount:22000,condition:'Recovered'}];
export default function Discharge() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',patientName:'',doctor:'',ward:'',diagnosis:'',billAmount:'',condition:'Stable'});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.patientName) return; setRecords(p=>[...p,{...form}]); setShowModal(false); setForm({patientId:'',patientName:'',doctor:'',ward:'',diagnosis:'',billAmount:'',condition:'Stable'}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">📋 Discharge Summary</div><div className="page-sub">Patient discharge records</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Discharge Patient</button></div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>Patient ID</th><th>Name</th><th>Doctor</th><th>Diagnosis</th><th>Bill</th><th>Condition</th><th>Blockchain</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((d,i)=>(
        <tr key={i}><td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{d.patientId}</code></td>
        <td><strong>{d.patientName}</strong></td><td>{d.doctor}</td><td>{d.diagnosis}</td>
        <td><strong>Rs.{Number(d.billAmount||0).toLocaleString()}</strong></td>
        <td><span className={`badge ${d.condition==='Recovered'||d.condition==='Stable'?'badge-green':d.condition==='Critical'?'badge-red':'badge-amber'}`}>{d.condition}</span></td>
        <td><span className="chain-badge">🔗 On-Chain</span></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )) : <tr><td colSpan="8"><div className="empty">No discharge records</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>📋 Discharge Patient</h3>
      <div className="form-grid">
        <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
        <div className="form-group"><label>Patient Name</label><input placeholder="Name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
        <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
        <div className="form-group"><label>Ward</label><input placeholder="ICU" value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}/></div>
        <div className="form-group full"><label>Diagnosis</label><input placeholder="Final diagnosis" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/></div>
        <div className="form-group"><label>Bill Amount</label><input type="number" placeholder="15000" value={form.billAmount} onChange={e=>setForm({...form,billAmount:e.target.value})}/></div>
        <div className="form-group"><label>Condition</label><select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})}><option>Stable</option><option>Recovered</option><option>Critical</option><option>Referred</option></select></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>🔗 Discharge + Blockchain</button></div>
    </div></div>)}
  </div>)
}