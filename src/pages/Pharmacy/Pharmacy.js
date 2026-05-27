import { useState } from 'react';
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
