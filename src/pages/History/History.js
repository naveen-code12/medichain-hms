import { useState } from 'react';
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
