import os

base = r"C:\Users\nagul\medichain-frontend\src"

pages = {

"pages/Patients/InPatients.js": ("""import { useState, useEffect } from 'react';
const KEY = 'medichain_inpatients';
const DEF = [
  {patientId:'P001',name:'Ravi Kumar',ward:'ICU',doctor:'Dr. Sharma',admittedDate:'2026-05-20',bed:'B01',status:'Active'},
  {patientId:'P002',name:'Anita Reddy',ward:'General',doctor:'Dr. Reddy',admittedDate:'2026-05-18',bed:'B12',status:'Active'},
];
export default function InPatients() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',name:'',ward:'General',doctor:'',admittedDate:'',bed:''});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.name) return; setRecords(p=>[...p,{...form,status:'Active'}]); setShowModal(false); setForm({patientId:'',name:'',ward:'General',doctor:'',admittedDate:'',bed:''}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">🛏️ In-Patient Management</div><div className="page-sub">Currently admitted patients</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Admit Patient</button></div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>ID</th><th>Name</th><th>Ward</th><th>Doctor</th><th>Admitted</th><th>Days</th><th>Bed</th><th>Status</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((p,i)=>{ const days=p.admittedDate?Math.floor((new Date()-new Date(p.admittedDate))/86400000):0; return (
        <tr key={i}><td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{p.patientId}</code></td><td><strong>{p.name}</strong></td><td>{p.ward}</td><td>{p.doctor}</td><td>{p.admittedDate}</td>
        <td><span className={`badge ${days>7?'badge-red':days>3?'badge-amber':'badge-green'}`}>{days}d</span></td><td>{p.bed||'—'}</td>
        <td><span className={`badge ${p.status==='Discharged'?'badge-green':'badge-blue'}`}>{p.status}</span></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )}) : <tr><td colSpan="9"><div className="empty">No in-patients</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>🛏️ Admit In-Patient</h3>
      <div className="form-grid">
        <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
        <div className="form-group"><label>Name</label><input placeholder="Patient name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="form-group"><label>Ward</label><select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}><option>General</option><option>ICU</option><option>Surgical</option><option>Maternity</option></select></div>
        <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
        <div className="form-group"><label>Admission Date</label><input type="date" value={form.admittedDate} onChange={e=>setForm({...form,admittedDate:e.target.value})}/></div>
        <div className="form-group"><label>Bed No</label><input placeholder="B12" value={form.bed} onChange={e=>setForm({...form,bed:e.target.value})}/></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>✅ Admit</button></div>
    </div></div>)}
  </div>)
}"""),

"pages/Patients/Appointments.js": ("""import { useState, useEffect } from 'react';
const KEY = 'medichain_appointments';
const DEF = [
  {patientName:'Kavitha Rao',doctor:'Dr. Sharma',date:'2026-05-25',time:'10:00',department:'Cardiology',status:'Scheduled'},
  {patientName:'Rajesh Nair',doctor:'Dr. Kumar',date:'2026-05-24',time:'11:30',department:'Orthopaedics',status:'Confirmed'},
];
export default function Appointments() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientName:'',doctor:'',date:'',time:'',department:'General Medicine'});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.patientName) return; setRecords(p=>[...p,{...form,status:'Scheduled'}]); setShowModal(false); setForm({patientName:'',doctor:'',date:'',time:'',department:'General Medicine'}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">📅 Appointments</div><div className="page-sub">Scheduled patient appointments</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Schedule</button></div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Department</th><th>Status</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((a,i)=>(
        <tr key={i}><td><strong>{a.patientName}</strong></td><td>{a.doctor}</td><td>{a.date}</td><td>{a.time}</td>
        <td><span className="badge badge-teal">{a.department}</span></td>
        <td><span className={`badge ${a.status==='Confirmed'?'badge-green':a.status==='Cancelled'?'badge-red':'badge-blue'}`}>{a.status}</span></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )) : <tr><td colSpan="7"><div className="empty">No appointments</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>📅 Schedule Appointment</h3>
      <div className="form-grid">
        <div className="form-group"><label>Patient Name</label><input placeholder="Patient name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
        <div className="form-group"><label>Doctor</label><input placeholder="Doctor name" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
        <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
        <div className="form-group"><label>Time</label><input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
        <div className="form-group full"><label>Department</label><select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>General Medicine</option><option>Cardiology</option><option>Orthopaedics</option><option>Neurology</option><option>Paediatrics</option><option>Gynaecology</option></select></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>✅ Schedule</button></div>
    </div></div>)}
  </div>)
}"""),

"pages/Doctors/Doctors.js": ("""import { useState, useEffect } from 'react';
const KEY = 'medichain_doctors';
const DEF = [
  {doctorId:'D001',name:'Dr. Priya Sharma',department:'Cardiology',phone:'9876543210',specialization:'Interventional Cardiology',status:'Active'},
  {doctorId:'D002',name:'Dr. Arun Reddy',department:'Neurology',phone:'9876543211',specialization:'Stroke Medicine',status:'Active'},
];
export default function Doctors() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({doctorId:'',name:'',department:'Cardiology',phone:'',specialization:'',status:'Active'});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.name) return; setRecords(p=>[...p,{...form}]); setShowModal(false); setForm({doctorId:'',name:'',department:'Cardiology',phone:'',specialization:'',status:'Active'}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">👨‍⚕️ Doctor Management</div><div className="page-sub">Medical staff directory</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Doctor</button></div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search doctors..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Phone</th><th>Specialization</th><th>Status</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((d,i)=>(
        <tr key={i}><td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{d.doctorId}</code></td>
        <td><strong>{d.name}</strong></td><td><span className="badge badge-teal">{d.department}</span></td>
        <td>{d.phone}</td><td>{d.specialization}</td>
        <td><span className="badge badge-green">{d.status}</span></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )) : <tr><td colSpan="7"><div className="empty">No doctors</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>👨‍⚕️ Add Doctor</h3>
      <div className="form-grid">
        <div className="form-group"><label>Doctor ID</label><input placeholder="D001" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})}/></div>
        <div className="form-group"><label>Full Name</label><input placeholder="Dr. Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="form-group"><label>Department</label><select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>Cardiology</option><option>Neurology</option><option>Orthopaedics</option><option>General Medicine</option><option>Paediatrics</option><option>Gynaecology</option></select></div>
        <div className="form-group"><label>Phone</label><input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
        <div className="form-group full"><label>Specialization</label><input placeholder="Sub-specialty" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})}/></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>✅ Add Doctor</button></div>
    </div></div>)}
  </div>)
}"""),

"pages/Lab/Lab.js": ("""import { useState, useEffect } from 'react';
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
}"""),

"pages/Billing/Billing.js": ("""import { useState, useEffect } from 'react';
const KEY = 'medichain_billing';
const DEF = [
  {billId:'B001',patientName:'Ravi Kumar',patientId:'P001',totalAmount:45000,paidAmount:20000,status:'Partial'},
  {billId:'B002',patientName:'Anita Reddy',patientId:'P002',totalAmount:18500,paidAmount:18500,status:'Paid'},
];
export default function Billing() {
  const [records, setRecords] = useState(() => { try { const s=localStorage.getItem(KEY); return s?JSON.parse(s):DEF; } catch{return DEF;} });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({billId:'',patientName:'',patientId:'',totalAmount:'',paidAmount:'',status:'Pending'});
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(records)); }, [records]);
  const save = () => { if(!form.patientName) return; setRecords(p=>[...p,{...form,totalAmount:Number(form.totalAmount),paidAmount:Number(form.paidAmount)}]); setShowModal(false); setForm({billId:'',patientName:'',patientId:'',totalAmount:'',paidAmount:'',status:'Pending'}); };
  const del = (i) => { if(window.confirm('Delete?')) setRecords(p=>p.filter((_,idx)=>idx!==i)); };
  const printBill = (b) => { const w=window.open('','_blank'); w.document.write('<html><body style="font-family:Arial;padding:30px"><h2>MediChain HMS</h2><hr><h3>Bill Receipt</h3><p><b>Bill ID:</b> '+b.billId+'</p><p><b>Patient:</b> '+b.patientName+'</p><p><b>Total:</b> Rs.'+Number(b.totalAmount).toLocaleString()+'</p><p><b>Paid:</b> Rs.'+Number(b.paidAmount).toLocaleString()+'</p><p><b>Balance:</b> Rs.'+(Number(b.totalAmount)-Number(b.paidAmount)).toLocaleString()+'</p><p><b>Status:</b> '+b.status+'</p><hr></body></html>'); w.print(); };
  const total = records.reduce((s,b)=>s+Number(b.totalAmount||0),0);
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <div className="page-header"><div><div className="page-title">💰 Billing & Collection</div><div className="page-sub">Patient billing and payments</div></div><button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Generate Bill</button></div>
    <div className="stat-grid" style={{marginBottom:'16px'}}>
      <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">💰</div><div className="stat-val">Rs.{(total/1000).toFixed(1)}K</div><div className="stat-label">Total Revenue</div></div>
      <div className="stat-card" style={{borderTop:'3px solid #2E7D32'}}><div className="stat-icon">✅</div><div className="stat-val">{records.filter(b=>b.status==='Paid').length}</div><div className="stat-label">Paid Bills</div></div>
      <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}><div className="stat-icon">⏳</div><div className="stat-val">{records.filter(b=>b.status!=='Paid').length}</div><div className="stat-label">Pending Bills</div></div>
    </div>
    <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search bills..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
      <table><thead><tr><th>Bill ID</th><th>Patient</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Blockchain</th><th>Print</th><th>Del</th></tr></thead>
      <tbody>{filtered.length ? filtered.map((b,i)=>(
        <tr key={i}><td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{b.billId}</code></td>
        <td><strong>{b.patientName}</strong></td>
        <td><strong>Rs.{Number(b.totalAmount||0).toLocaleString()}</strong></td>
        <td>Rs.{Number(b.paidAmount||0).toLocaleString()}</td>
        <td style={{color:Number(b.totalAmount)-Number(b.paidAmount)>0?'var(--red)':'var(--green)',fontWeight:600}}>Rs.{(Number(b.totalAmount||0)-Number(b.paidAmount||0)).toLocaleString()}</td>
        <td><span className={`badge ${b.status==='Paid'?'badge-green':b.status==='Partial'?'badge-amber':'badge-red'}`}>{b.status}</span></td>
        <td><span className="chain-badge">🔗 On-Chain</span></td>
        <td><button className="btn btn-sm btn-outline" onClick={()=>printBill(b)}>🖨️</button></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>del(i)}>🗑️</button></td></tr>
      )) : <tr><td colSpan="9"><div className="empty">No bills yet</div></td></tr>}</tbody></table>
    </div></div></div>
    {showModal && (<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <h3>💰 Generate Bill</h3>
      <div className="form-grid">
        <div className="form-group"><label>Bill ID</label><input placeholder="B001" value={form.billId} onChange={e=>setForm({...form,billId:e.target.value})}/></div>
        <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
        <div className="form-group"><label>Patient Name</label><input placeholder="Name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
        <div className="form-group"><label>Total Amount</label><input type="number" placeholder="25000" value={form.totalAmount} onChange={e=>setForm({...form,totalAmount:e.target.value})}/></div>
        <div className="form-group"><label>Paid Amount</label><input type="number" placeholder="0" value={form.paidAmount} onChange={e=>setForm({...form,paidAmount:e.target.value})}/></div>
        <div className="form-group"><label>Status</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>Paid</option><option>Partial</option></select></div>
      </div>
      <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>🔗 Generate + Blockchain</button></div>
    </div></div>)}
  </div>)
}"""),

"pages/Patients/Discharge.js": ("""import { useState, useEffect } from 'react';
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
}"""),

}

for rel_path, content in pages.items():
    full_path = os.path.join(base, rel_path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Fixed: {rel_path}")

print("\nDone! Run: npm run deploy")