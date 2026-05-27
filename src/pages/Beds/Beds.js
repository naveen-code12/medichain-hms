import { useState } from 'react';
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
