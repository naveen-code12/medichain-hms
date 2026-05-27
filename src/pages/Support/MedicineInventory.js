import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"medicine_id": "M001", "name": "Paracetamol 500mg", "category": "Analgesic", "stock": "450", "price": "2.50", "expiry": "2027-06", "status": "Available"}, {"medicine_id": "M002", "name": "Amoxicillin 250mg", "category": "Antibiotic", "stock": "15", "price": "8.00", "expiry": "2026-12", "status": "Low Stock"}, {"medicine_id": "M003", "name": "Metformin 500mg", "category": "Antidiabetic", "stock": "0", "price": "3.00", "expiry": "2027-03", "status": "Out of Stock"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({medicine_id:'',name:'',category:'',stock:'',price:'',expiry:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({medicine_id:'',name:'',category:'',stock:'',price:'',expiry:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">💊 Medicine Inventory</div><div className="page-sub">Medicine Inventory management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Medicine ID</th><th>Name</th><th>Category</th><th>Stock</th><th>Price</th><th>Expiry</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['medicine_id']||'—'}</td><td>{r['name']||'—'}</td><td>{r['category']||'—'}</td><td>{r['stock']||'—'}</td><td>{r['price']||'—'}</td><td>{r['expiry']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="7"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💊 Add Medicine Inventory Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Medicine ID</label>
                <input placeholder="M001" value={form.medicine_id} onChange={e=>setForm({...form,medicine_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Medicine Name</label>
                <input placeholder="Name + strength" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="form-group"><label>Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Analgesic</option><option>Antibiotic</option><option>Antidiabetic</option><option>Statin</option><option>Antihypertensive</option><option>Vitamin</option><option>Antacid</option><option>Antihistamine</option></select>
              </div>
              <div className="form-group"><label>Stock (units)</label>
                <input type="number" placeholder="100" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/>
              </div>
              <div className="form-group"><label>Price per unit</label>
                <input type="number" placeholder="5" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
              </div>
              <div className="form-group"><label>Expiry</label>
                <input type="date" value={form.expiry} onChange={e=>setForm({...form,expiry:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Available</option><option>Low Stock</option><option>Out of Stock</option></select>
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