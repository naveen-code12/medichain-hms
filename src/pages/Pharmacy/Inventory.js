import { useState } from 'react';
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
