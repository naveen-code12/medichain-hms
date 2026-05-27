import os

pages = {
  "src/pages/Patients/Patients.js": """import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',name:'',bloodGroup:'A+',ward:'General',doctor:'',diagnosis:'',age:'',phone:''});
  useEffect(() => { API.get('/patients').then(r => setPatients(r.data.patients||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/patients', form); const r = await API.get('/patients'); setPatients(r.data.patients||[]); setShowModal(false); }
    catch(e) { alert('Error saving!') }
  };
  const filtered = patients.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">👥 Patients</div><div className="page-sub">All registered patients</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Patient</button>
      </div>
      <div className="search-bar">
        <div className="search-input">🔍 <input placeholder="Search patients..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Blood</th><th>Ward</th><th>Doctor</th><th>Diagnosis</th><th>Blockchain</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((p,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{p.patientId}</code></td>
            <td><strong>{p.name}</strong></td><td>{p.age||'—'}</td>
            <td><span className="badge badge-red">{p.bloodGroup}</span></td>
            <td>{p.ward}</td><td>{p.doctor}</td><td>{p.diagnosis}</td>
            <td><span className="chain-badge">🔗 On-Chain</span></td>
          </tr>
        )) : <tr><td colSpan="8"><div className="empty">No patients yet. Add one!</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👥 Add New Patient</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Full Name</label><input placeholder="Patient name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Age</label><input type="number" placeholder="35" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
              <div className="form-group"><label>Phone</label><input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="form-group"><label>Blood Group</label>
                <select value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})}>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="form-group"><label>Ward</label>
                <select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}>
                  <option>General</option><option>ICU</option><option>Surgical</option><option>Maternity</option><option>Paediatric</option>
                </select>
              </div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor name" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group"><label>Diagnosis</label><input placeholder="Primary diagnosis" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Save + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Patients/InPatients.js": """import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function InPatients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',name:'',ward:'General',doctor:'',admittedDate:'',bed:''});
  useEffect(() => { API.get('/inpatients').then(r => setPatients(r.data.patients||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/inpatients', form); const r = await API.get('/inpatients'); setPatients(r.data.patients||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = patients.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">🛏️ In-Patients</div><div className="page-sub">Currently admitted patients</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Admit Patient</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Name</th><th>Ward</th><th>Doctor</th><th>Admitted</th><th>Days</th><th>Bed</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((p,i)=>{ const days=p.admittedDate?Math.floor((new Date()-new Date(p.admittedDate))/86400000):0; return (
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{p.patientId}</code></td>
            <td><strong>{p.name}</strong></td><td>{p.ward}</td><td>{p.doctor}</td><td>{p.admittedDate}</td>
            <td><span className={`badge ${days>7?'badge-red':days>3?'badge-amber':'badge-green'}`}>{days}d</span></td>
            <td>{p.bed||'—'}</td>
            <td><span className={`badge ${p.status==='Discharged'?'badge-green':'badge-blue'}`}>{p.status||'Active'}</span></td>
          </tr>
        )}) : <tr><td colSpan="8"><div className="empty">No in-patients</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🛏️ Admit In-Patient</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Name</label><input placeholder="Patient name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Ward</label><select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}><option>General</option><option>ICU</option><option>Surgical</option><option>Maternity</option></select></div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group"><label>Admission Date</label><input type="date" value={form.admittedDate} onChange={e=>setForm({...form,admittedDate:e.target.value})}/></div>
              <div className="form-group"><label>Bed No</label><input placeholder="B12" value={form.bed} onChange={e=>setForm({...form,bed:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Admit + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Patients/Appointments.js": """import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Appointments() {
  const [appts, setAppts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientName:'',doctor:'',date:'',time:'',department:'General Medicine'});
  useEffect(() => { API.get('/appointments').then(r => setAppts(r.data.appointments||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/appointments', form); const r = await API.get('/appointments'); setAppts(r.data.appointments||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = appts.filter(a => a.patientName?.toLowerCase().includes(search.toLowerCase())||a.doctor?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📅 Appointments</div><div className="page-sub">Scheduled patient appointments</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Schedule</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search appointments..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Department</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((a,i)=>(
          <tr key={i}>
            <td><strong>{a.patientName}</strong></td><td>{a.doctor}</td><td>{a.date}</td><td>{a.time}</td>
            <td><span className="badge badge-teal">{a.department}</span></td>
            <td><span className={`badge ${a.status==='Confirmed'?'badge-green':a.status==='Cancelled'?'badge-red':'badge-blue'}`}>{a.status||'Scheduled'}</span></td>
          </tr>
        )) : <tr><td colSpan="6"><div className="empty">No appointments</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>📅 Schedule Appointment</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient Name</label><input placeholder="Patient name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor name" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
              <div className="form-group"><label>Time</label><input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
              <div className="form-group full"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}>
                  <option>General Medicine</option><option>Cardiology</option><option>Orthopaedics</option><option>Neurology</option><option>Paediatrics</option><option>Gynaecology</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>✅ Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Patients/Doctors.js": """import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({doctorId:'',name:'',department:'Cardiology',phone:'',email:'',experience:''});
  useEffect(() => { API.get('/doctors').then(r => setDoctors(r.data.doctors||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/doctors', form); const r = await API.get('/doctors'); setDoctors(r.data.doctors||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = doctors.filter(d => d.name?.toLowerCase().includes(search.toLowerCase())||d.department?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">👨‍⚕️ Doctors</div><div className="page-sub">Medical staff directory</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Doctor</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search doctors..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Phone</th><th>Email</th><th>Experience</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((d,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{d.doctorId}</code></td>
            <td><strong>{d.name}</strong></td>
            <td><span className="badge badge-teal">{d.department}</span></td>
            <td>{d.phone}</td><td>{d.email||'—'}</td><td>{d.experience}</td>
            <td><span className="badge badge-green">{d.status||'Active'}</span></td>
          </tr>
        )) : <tr><td colSpan="7"><div className="empty">No doctors added</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>👨‍⚕️ Add Doctor</h3>
            <div className="form-grid">
              <div className="form-group"><label>Doctor ID</label><input placeholder="D001" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})}/></div>
              <div className="form-group"><label>Full Name</label><input placeholder="Dr. Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}>
                  <option>Cardiology</option><option>Neurology</option><option>Orthopaedics</option><option>General Medicine</option><option>Paediatrics</option><option>Gynaecology</option>
                </select>
              </div>
              <div className="form-group"><label>Phone</label><input placeholder="9XXXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="form-group full"><label>Email</label><input placeholder="doctor@hospital.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div className="form-group"><label>Experience</label><input placeholder="5 years" value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>✅ Add Doctor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Patients/Discharge.js": """import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Discharge() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({patientId:'',patientName:'',doctor:'',ward:'',diagnosis:'',billAmount:'',condition:'Stable'});
  useEffect(() => { API.get('/discharge').then(r => setList(r.data.discharges||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/discharge', form); const r = await API.get('/discharge'); setList(r.data.discharges||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const filtered = list.filter(d => d.patientName?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">🚪 Discharge</div><div className="page-sub">Patient discharge records</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Discharge Patient</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Patient ID</th><th>Name</th><th>Doctor</th><th>Diagnosis</th><th>Bill</th><th>Condition</th><th>Blockchain</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((d,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{d.patientId}</code></td>
            <td><strong>{d.patientName}</strong></td><td>{d.doctor}</td><td>{d.diagnosis}</td>
            <td><strong>Rs.{Number(d.billAmount||0).toLocaleString()}</strong></td>
            <td><span className={`badge ${d.condition==='Recovered'||d.condition==='Stable'?'badge-green':d.condition==='Critical'?'badge-red':'badge-amber'}`}>{d.condition}</span></td>
            <td><span className="chain-badge">On-Chain</span></td>
          </tr>
        )) : <tr><td colSpan="7"><div className="empty">No discharge records</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🚪 Discharge Patient</h3>
            <div className="form-grid">
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Patient Name</label><input placeholder="Name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
              <div className="form-group"><label>Doctor</label><input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}/></div>
              <div className="form-group"><label>Ward</label><input placeholder="ICU" value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}/></div>
              <div className="form-group full"><label>Diagnosis</label><input placeholder="Final diagnosis" value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})}/></div>
              <div className="form-group"><label>Bill Amount</label><input type="number" placeholder="15000" value={form.billAmount} onChange={e=>setForm({...form,billAmount:e.target.value})}/></div>
              <div className="form-group"><label>Condition</label><select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})}><option>Stable</option><option>Recovered</option><option>Critical</option><option>Referred</option></select></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Discharge + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Lab/Lab.js": """import { useState, useEffect } from 'react';
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
""",

  "src/pages/Billing/Billing.js": """import { useState, useEffect } from 'react';
import API from '../../utils/api';
export default function Billing() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({billId:'',patientId:'',patientName:'',totalAmount:'',paidAmount:'',status:'Pending'});
  useEffect(() => { API.get('/billing').then(r => setBills(r.data.bills||[])).catch(()=>{}) }, []);
  const save = async () => {
    try { await API.post('/billing', form); const r = await API.get('/billing'); setBills(r.data.bills||[]); setShowModal(false); }
    catch(e) { alert('Error!') }
  };
  const printBill = (b) => {
    const w = window.open('','_blank');
    w.document.write('<html><head><title>Bill Receipt</title></head><body style="font-family:Arial;padding:30px;max-width:500px;margin:auto">');
    w.document.write('<h2 style="color:#1565C0">MediChain HMS</h2><hr/>');
    w.document.write('<h3>Bill Receipt</h3>');
    w.document.write('<p><b>Bill ID:</b> ' + b.billId + '</p>');
    w.document.write('<p><b>Patient:</b> ' + b.patientName + '</p>');
    w.document.write('<p><b>Total:</b> Rs.' + Number(b.totalAmount).toLocaleString() + '</p>');
    w.document.write('<p><b>Paid:</b> Rs.' + Number(b.paidAmount).toLocaleString() + '</p>');
    w.document.write('<p><b>Balance:</b> Rs.' + (Number(b.totalAmount)-Number(b.paidAmount)).toLocaleString() + '</p>');
    w.document.write('<p><b>Status:</b> ' + b.status + '</p>');
    w.document.write('<hr/><p style="color:#999;font-size:12px">MediChain HMS - RFID + Blockchain Hospital System</p>');
    w.document.write('</body></html>');
    w.print();
  };
  const filtered = bills.filter(b => b.patientName?.toLowerCase().includes(search.toLowerCase()));
  const total = bills.reduce((s,b)=>s+Number(b.totalAmount||0),0);
  const paid = bills.filter(b=>b.status==='Paid').length;
  const pending = bills.filter(b=>b.status!=='Paid').length;
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">💰 Billing</div><div className="page-sub">Patient billing and payments</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Generate Bill</button>
      </div>
      <div className="stat-grid" style={{marginBottom:'16px'}}>
        <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">💰</div><div className="stat-val">Rs.{(total/1000).toFixed(1)}K</div><div className="stat-label">Total Revenue</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #2E7D32'}}><div className="stat-icon">✅</div><div className="stat-val">{paid}</div><div className="stat-label">Paid Bills</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}><div className="stat-icon">⏳</div><div className="stat-val">{pending}</div><div className="stat-label">Pending Bills</div></div>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search bills..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Bill ID</th><th>Patient</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Blockchain</th><th>Print</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((b,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{b.billId}</code></td>
            <td><strong>{b.patientName}</strong><br/><span style={{fontSize:'11px',color:'var(--text3)'}}>{b.patientId}</span></td>
            <td><strong>Rs.{Number(b.totalAmount||0).toLocaleString()}</strong></td>
            <td>Rs.{Number(b.paidAmount||0).toLocaleString()}</td>
            <td style={{color:Number(b.totalAmount)-Number(b.paidAmount)>0?'var(--red)':'var(--green)',fontWeight:600}}>Rs.{(Number(b.totalAmount||0)-Number(b.paidAmount||0)).toLocaleString()}</td>
            <td><span className={`badge ${b.status==='Paid'?'badge-green':b.status==='Partial'?'badge-amber':'badge-red'}`}>{b.status}</span></td>
            <td><span className="chain-badge">🔗 On-Chain</span></td>
            <td><button className="btn btn-sm btn-outline" onClick={()=>printBill(b)}>🖨️</button></td>
          </tr>
        )) : <tr><td colSpan="8"><div className="empty">No bills yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💰 Generate Bill</h3>
            <div className="form-grid">
              <div className="form-group"><label>Bill ID</label><input placeholder="B001" value={form.billId} onChange={e=>setForm({...form,billId:e.target.value})}/></div>
              <div className="form-group"><label>Patient ID</label><input placeholder="P001" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})}/></div>
              <div className="form-group"><label>Patient Name</label><input placeholder="Name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/></div>
              <div className="form-group"><label>Total Amount</label><input type="number" placeholder="25000" value={form.totalAmount} onChange={e=>setForm({...form,totalAmount:e.target.value})}/></div>
              <div className="form-group"><label>Paid Amount</label><input type="number" placeholder="0" value={form.paidAmount} onChange={e=>setForm({...form,paidAmount:e.target.value})}/></div>
              <div className="form-group"><label>Status</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>Paid</option><option>Partial</option></select></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>🔗 Generate + Blockchain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Pharmacy/Pharmacy.js": """import { useState } from 'react';
export default function Pharmacy() {
  const [meds, setMeds] = useState([
    {id:'M001',name:'Paracetamol 500mg',category:'Analgesic',stock:450,price:2.5,expiry:'2027-06',status:'Available'},
    {id:'M002',name:'Amoxicillin 250mg',category:'Antibiotic',stock:120,price:8,expiry:'2026-12',status:'Available'},
    {id:'M003',name:'Metformin 500mg',category:'Antidiabetic',stock:15,price:3,expiry:'2027-03',status:'Low Stock'},
    {id:'M004',name:'Atorvastatin 10mg',category:'Statin',stock:0,price:12,expiry:'2026-09',status:'Out of Stock'},
  ]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({id:'',name:'',category:'Analgesic',stock:'',price:'',expiry:''});
  const save = () => {
    const status = Number(form.stock)>50?'Available':Number(form.stock)>0?'Low Stock':'Out of Stock';
    setMeds(prev=>[...prev,{...form,stock:Number(form.stock),price:Number(form.price),status}]);
    setShowModal(false);
  };
  const filtered = meds.filter(m=>m.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">💊 Pharmacy</div><div className="page-sub">Medicine stock and dispensing</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Medicine</button>
      </div>
      <div className="stat-grid" style={{marginBottom:'16px'}}>
        <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">💊</div><div className="stat-val">{meds.length}</div><div className="stat-label">Total Medicines</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}><div className="stat-icon">⚠️</div><div className="stat-val">{meds.filter(m=>m.status==='Low Stock').length}</div><div className="stat-label">Low Stock</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #C62828'}}><div className="stat-icon">❌</div><div className="stat-val">{meds.filter(m=>m.status==='Out of Stock').length}</div><div className="stat-label">Out of Stock</div></div>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search medicines..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Medicine Name</th><th>Category</th><th>Stock</th><th>Price</th><th>Expiry</th><th>Status</th></tr></thead>
        <tbody>{filtered.map((m,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{m.id}</code></td>
            <td><strong>{m.name}</strong></td>
            <td><span className="badge badge-teal">{m.category}</span></td>
            <td><strong>{m.stock}</strong> units</td><td>Rs.{m.price}</td><td>{m.expiry}</td>
            <td><span className={`badge ${m.status==='Available'?'badge-green':m.status==='Low Stock'?'badge-amber':'badge-red'}`}>{m.status}</span></td>
          </tr>
        ))}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💊 Add Medicine</h3>
            <div className="form-grid">
              <div className="form-group"><label>Medicine ID</label><input placeholder="M001" value={form.id} onChange={e=>setForm({...form,id:e.target.value})}/></div>
              <div className="form-group"><label>Medicine Name</label><input placeholder="Paracetamol 500mg" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Analgesic</option><option>Antibiotic</option><option>Antidiabetic</option><option>Statin</option><option>Antihypertensive</option><option>Vitamin</option></select></div>
              <div className="form-group"><label>Stock (units)</label><input type="number" placeholder="100" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/></div>
              <div className="form-group"><label>Price per unit</label><input type="number" placeholder="5" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></div>
              <div className="form-group"><label>Expiry Date</label><input type="month" value={form.expiry} onChange={e=>setForm({...form,expiry:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>✅ Add Medicine</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Pharmacy/Inventory.js": """import { useState } from 'react';
export default function Inventory() {
  const [items, setItems] = useState([
    {id:'INV001',name:'Surgical Gloves (Box)',category:'PPE',qty:200,minQty:50,unit:'Box',supplier:'MedSupply Co',lastUpdated:'2026-05-20'},
    {id:'INV002',name:'Syringe 5ml',category:'Consumable',qty:1500,minQty:500,unit:'Pcs',supplier:'HealthCare Ltd',lastUpdated:'2026-05-19'},
    {id:'INV003',name:'IV Drip Set',category:'Consumable',qty:30,minQty:100,unit:'Pcs',supplier:'MedSupply Co',lastUpdated:'2026-05-18'},
    {id:'INV004',name:'BP Monitor',category:'Equipment',qty:8,minQty:5,unit:'Units',supplier:'TechMed',lastUpdated:'2026-05-15'},
    {id:'INV005',name:'Oxygen Cylinder',category:'Equipment',qty:3,minQty:10,unit:'Units',supplier:'GasCorp',lastUpdated:'2026-05-10'},
  ]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({id:'',name:'',category:'Consumable',qty:'',minQty:'',unit:'',supplier:''});
  const save = () => {
    setItems(prev=>[...prev,{...form,qty:Number(form.qty),minQty:Number(form.minQty),lastUpdated:new Date().toISOString().split('T')[0]}]);
    setShowModal(false);
  };
  const filtered = items.filter(i=>i.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = items.filter(i=>i.qty<i.minQty);
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📦 Inventory</div><div className="page-sub">Hospital supplies tracking</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Item</button>
      </div>
      {lowStock.length>0 && <div className="alert alert-warning" style={{marginBottom:'16px'}}>⚠️ <strong>{lowStock.length} items</strong> below minimum: {lowStock.map(i=>i.name).join(', ')}</div>}
      <div className="stat-grid" style={{marginBottom:'16px'}}>
        <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">📦</div><div className="stat-val">{items.length}</div><div className="stat-label">Total Items</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #C62828'}}><div className="stat-icon">⚠️</div><div className="stat-val">{lowStock.length}</div><div className="stat-label">Low / Critical</div></div>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search inventory..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>ID</th><th>Item Name</th><th>Category</th><th>Qty</th><th>Min</th><th>Unit</th><th>Supplier</th><th>Updated</th><th>Status</th></tr></thead>
        <tbody>{filtered.map((item,i)=>(
          <tr key={i}>
            <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{item.id}</code></td>
            <td><strong>{item.name}</strong></td>
            <td><span className="badge badge-blue">{item.category}</span></td>
            <td><strong style={{color:item.qty<item.minQty?'var(--red)':'inherit'}}>{item.qty}</strong></td>
            <td>{item.minQty}</td><td>{item.unit}</td><td>{item.supplier}</td>
            <td style={{color:'var(--text3)',fontSize:'12px'}}>{item.lastUpdated}</td>
            <td><span className={`badge ${item.qty>=item.minQty?'badge-green':item.qty>0?'badge-amber':'badge-red'}`}>{item.qty>=item.minQty?'OK':item.qty>0?'Low':'Critical'}</span></td>
          </tr>
        ))}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>📦 Add Inventory Item</h3>
            <div className="form-grid">
              <div className="form-group"><label>Item ID</label><input placeholder="INV001" value={form.id} onChange={e=>setForm({...form,id:e.target.value})}/></div>
              <div className="form-group"><label>Item Name</label><input placeholder="Item name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Consumable</option><option>PPE</option><option>Equipment</option><option>Medicine</option></select></div>
              <div className="form-group"><label>Quantity</label><input type="number" placeholder="100" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})}/></div>
              <div className="form-group"><label>Min Stock Level</label><input type="number" placeholder="50" value={form.minQty} onChange={e=>setForm({...form,minQty:e.target.value})}/></div>
              <div className="form-group"><label>Unit</label><input placeholder="Box / Pcs / Units" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/></div>
              <div className="form-group full"><label>Supplier</label><input placeholder="Supplier name" value={form.supplier} onChange={e=>setForm({...form,supplier:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>✅ Add Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",

  "src/pages/Beds/Beds.js": """import { useState } from 'react';
export default function Beds() {
  const [beds] = useState([
    {id:'B01',ward:'ICU',type:'ICU Bed',patient:'Ravi Kumar',status:'Occupied',since:'2026-05-20'},
    {id:'B02',ward:'ICU',type:'ICU Bed',patient:'',status:'Available',since:''},
    {id:'B03',ward:'General',type:'General Bed',patient:'Anita Reddy',status:'Occupied',since:'2026-05-18'},
    {id:'B04',ward:'General',type:'General Bed',patient:'',status:'Available',since:''},
    {id:'B05',ward:'General',type:'General Bed',patient:'',status:'Maintenance',since:''},
    {id:'B06',ward:'Surgical',type:'Surgical Bed',patient:'',status:'Available',since:''},
    {id:'B07',ward:'Maternity',type:'Maternity Bed',patient:'Sita Devi',status:'Occupied',since:'2026-05-22'},
    {id:'B08',ward:'Maternity',type:'Maternity Bed',patient:'',status:'Available',since:''},
  ]);
  const wards = [...new Set(beds.map(b=>b.ward))];
  const statusColor = {Available:'badge-green',Occupied:'badge-red',Maintenance:'badge-amber'};
  const wardOcc = (w) => { const wb=beds.filter(b=>b.ward===w); return {total:wb.length,occ:wb.filter(b=>b.status==='Occupied').length} };
  return (
    <div>
      <div className="page-header"><div><div className="page-title">🏥 Bed Management</div><div className="page-sub">Real-time bed availability</div></div></div>
      <div className="stat-grid" style={{marginBottom:'16px'}}>
        <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">🛏️</div><div className="stat-val">{beds.length}</div><div className="stat-label">Total Beds</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #2E7D32'}}><div className="stat-icon">✅</div><div className="stat-val">{beds.filter(b=>b.status==='Available').length}</div><div className="stat-label">Available</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #C62828'}}><div className="stat-icon">🔴</div><div className="stat-val">{beds.filter(b=>b.status==='Occupied').length}</div><div className="stat-label">Occupied</div></div>
        <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}><div className="stat-icon">🔧</div><div className="stat-val">{beds.filter(b=>b.status==='Maintenance').length}</div><div className="stat-label">Maintenance</div></div>
      </div>
      {wards.map(w=>{ const {total,occ}=wardOcc(w); const pct=Math.round(occ/total*100); return (
        <div className="card" key={w} style={{marginBottom:'14px'}}>
          <div className="card-header"><span className="card-title">🏥 {w}</span><span className="badge badge-blue">{occ}/{total} Occupied - {pct}%</span></div>
          <div className="card-body">
            <div className="progress-bar" style={{marginBottom:'16px'}}><div className="progress-fill" style={{width:pct+'%',background:pct>80?'var(--red)':pct>50?'var(--amber)':'var(--green)'}}></div></div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'10px'}}>
              {beds.filter(b=>b.ward===w).map(bed=>(
                <div key={bed.id} style={{border:'1px solid var(--border)',borderRadius:'10px',padding:'12px',background:bed.status==='Available'?'var(--green-light)':bed.status==='Occupied'?'var(--red-light)':'var(--amber-light)'}}>
                  <div style={{fontWeight:700,fontSize:'14px'}}>🛏️ {bed.id}</div>
                  <div style={{fontSize:'12px',color:'var(--text2)',marginTop:'4px'}}>{bed.status==='Occupied'?bed.patient:'—'}</div>
                  <span className={`badge ${statusColor[bed.status]}`} style={{marginTop:'8px',display:'inline-flex'}}>{bed.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )})}
    </div>
  )
}
""",

  "src/pages/History/History.js": """import { useState } from 'react';
export default function History() {
  const [pid, setPid] = useState('');
  const [history, setHistory] = useState(null);
  const MOCK = {
    'P001':{name:'Ravi Kumar',age:45,blood:'B+',phone:'9876543210',visits:[
      {date:'2026-05-20',type:'Admission',doctor:'Dr. Sharma',diagnosis:'Pneumonia',notes:'Admitted to ICU. Started antibiotics.',tx:'0x7a3f...'},
      {date:'2026-05-15',type:'OPD',doctor:'Dr. Kumar',diagnosis:'Fever',notes:'Prescribed Paracetamol for 5 days.',tx:'0x8b4e...'},
      {date:'2025-12-10',type:'Lab Test',doctor:'Dr. Reddy',diagnosis:'Blood CBC',notes:'Slightly low haemoglobin.',tx:'0x9c5f...'},
    ]},
    'P002':{name:'Anita Reddy',age:55,blood:'O+',phone:'9876543211',visits:[
      {date:'2026-05-18',type:'Admission',doctor:'Dr. Reddy',diagnosis:'Diabetes Type 2',notes:'Blood sugar: 320mg/dL. Started insulin.',tx:'0xa1b2...'},
      {date:'2026-03-05',type:'OPD',doctor:'Dr. Reddy',diagnosis:'Routine Checkup',notes:'HbA1c: 8.2%. Diet advice given.',tx:'0xb2c3...'},
    ]},
  };
  const search = () => setHistory(MOCK[pid]||null);
  const typeColor = {Admission:'badge-red',OPD:'badge-blue','Lab Test':'badge-teal',Discharge:'badge-green'};
  return (
    <div>
      <div className="page-header"><div><div className="page-title">📋 Medical History</div><div className="page-sub">Blockchain-verified patient records</div></div></div>
      <div className="card" style={{marginBottom:'16px'}}><div className="card-body">
        <div style={{display:'flex',gap:'10px'}}>
          <div className="search-input" style={{flex:1}}>
            <input placeholder="Enter Patient ID (P001 or P002)..." value={pid} onChange={e=>setPid(e.target.value.toUpperCase())} onKeyDown={e=>e.key==='Enter'&&search()}/>
          </div>
          <button className="btn btn-primary" onClick={search}>🔍 Search</button>
        </div>
      </div></div>
      {history ? (
        <div>
          <div className="card" style={{marginBottom:'16px'}}><div className="card-body">
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'var(--blue-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px'}}>👤</div>
              <div>
                <div style={{fontSize:'20px',fontWeight:'800'}}>{history.name}</div>
                <div style={{fontSize:'13px',color:'var(--text3)',marginTop:'4px'}}>Age: {history.age} | Blood: <span className="badge badge-red">{history.blood}</span> | Phone: {history.phone}</div>
                <div style={{marginTop:'8px'}}><span className="chain-badge">🔗 All records on Blockchain</span></div>
              </div>
            </div>
          </div></div>
          <div className="card"><div className="card-header"><span className="card-title">Visit History ({history.visits.length} records)</span></div>
          <div className="card-body" style={{padding:0}}><div className="table-wrap">
            <table><thead><tr><th>Date</th><th>Type</th><th>Doctor</th><th>Diagnosis</th><th>Notes</th><th>Blockchain</th></tr></thead>
            <tbody>{history.visits.map((v,i)=>(
              <tr key={i}>
                <td>{v.date}</td>
                <td><span className={`badge ${typeColor[v.type]||'badge-gray'}`}>{v.type}</span></td>
                <td>{v.doctor}</td><td><strong>{v.diagnosis}</strong></td>
                <td style={{fontSize:'12px',color:'var(--text2)'}}>{v.notes}</td>
                <td><code style={{fontSize:'10px'}}>{v.tx}</code></td>
              </tr>
            ))}</tbody>
            </table>
          </div></div></div>
        </div>
      ) : (
        <div className="card"><div className="card-body"><div className="empty">{pid ? 'Patient not found. Try P001 or P002.' : 'Enter Patient ID to view history.'}</div></div></div>
      )}
    </div>
  )
}
""",

  "src/pages/Reports/Reports.js": """import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#1565C0','#C62828','#2E7D32','#F57F17','#00695C','#6A1B9A'];
export default function Reports() {
  const [tab, setTab] = useState('revenue');
  const revenue = [{month:'Dec',revenue:85000,expenses:60000},{month:'Jan',revenue:120000,expenses:80000},{month:'Feb',revenue:98000,expenses:70000},{month:'Mar',revenue:145000,expenses:90000},{month:'Apr',revenue:132000,expenses:85000},{month:'May',revenue:160000,expenses:95000}];
  const dept = [{name:'General',patients:40},{name:'ICU',patients:20},{name:'Surgical',patients:25},{name:'Maternity',patients:15},{name:'Neuro',patients:12}];
  const billing = [{name:'Paid',value:45},{name:'Pending',value:30},{name:'Partial',value:25}];
  const tabs = [{id:'revenue',label:'Revenue'},{id:'patients',label:'Patients'},{id:'billing',label:'Billing'}];
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📈 Reports and Analytics</div><div className="page-sub">Hospital performance overview</div></div>
        <button className="btn btn-primary" onClick={()=>window.print()}>Print Report</button>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {tabs.map(t=>(<button key={t.id} className={`btn ${tab===t.id?'btn-primary':'btn-outline'}`} onClick={()=>setTab(t.id)}>{t.label}</button>))}
      </div>
      {tab==='revenue' && (
        <div>
          <div className="stat-grid" style={{marginBottom:'16px'}}>
            <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">💰</div><div className="stat-val">Rs.7.4L</div><div className="stat-label">Total Revenue (6m)</div></div>
            <div className="stat-card" style={{borderTop:'3px solid #2E7D32'}}><div className="stat-icon">📈</div><div className="stat-val">Rs.4.8L</div><div className="stat-label">Total Expenses (6m)</div></div>
            <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}><div className="stat-icon">💹</div><div className="stat-val">Rs.2.6L</div><div className="stat-label">Net Profit (6m)</div></div>
          </div>
          <div className="card"><div className="card-header"><span className="card-title">Revenue vs Expenses</span></div>
          <div className="card-body"><ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenue}><XAxis dataKey="month"/><YAxis tickFormatter={v=>'Rs.'+v/1000+'K'}/><Tooltip formatter={v=>'Rs.'+v.toLocaleString()}/><Legend/><Bar dataKey="revenue" fill="#1565C0" radius={[4,4,0,0]} name="Revenue"/><Bar dataKey="expenses" fill="#C62828" radius={[4,4,0,0]} name="Expenses"/></BarChart>
          </ResponsiveContainer></div></div>
        </div>
      )}
      {tab==='patients' && (
        <div className="card"><div className="card-header"><span className="card-title">Patients by Department</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <PieChart><Pie data={dept} cx="50%" cy="50%" outerRadius={110} dataKey="patients" label={({name,percent})=>name+' '+Math.round(percent*100)+'%'}>{dept.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart>
        </ResponsiveContainer></div></div>
      )}
      {tab==='billing' && (
        <div className="card"><div className="card-header"><span className="card-title">Bill Payment Status</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <PieChart><Pie data={billing} cx="50%" cy="50%" outerRadius={110} dataKey="value" label={({name,value})=>name+': '+value+'%'}>{billing.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/><Legend/></PieChart>
        </ResponsiveContainer></div></div>
      )}
    </div>
  )
}
""",
}

base = r"C:\Users\nagul\medichain-frontend"
for path, content in pages.items():
    full_path = os.path.join(base, path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: {path}")

print("\nAll pages created successfully!")