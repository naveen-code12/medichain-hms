import { useState } from 'react';

export default function Page() {
  const [records, setRecords] = useState([{"item": "Surgical Instruments Set", "department": "OT", "qty": "5", "sterilization_method": "Autoclave", "date": "2026-05-27", "status": "Sterilized"}, {"item": "Endoscopy Kit", "department": "Radiology", "qty": "2", "sterilization_method": "ETO", "date": "2026-05-27", "status": "Processing"}]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({item:'',department:'',qty:'',sterilization_method:'',date:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({item:'',department:'',qty:'',sterilization_method:'',date:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">⚗️ CSSD</div><div className="page-sub">CSSD management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Item</th><th>Department</th><th>Qty</th><th>Sterilization Method</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['item']||'—'}</td><td>{r['department']||'—'}</td><td>{r['qty']||'—'}</td><td>{r['sterilization_method']||'—'}</td><td>{r['date']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>⚗️ Add CSSD Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Item Name</label>
                <input placeholder="Item name" value={form.item} onChange={e=>setForm({...form,item:e.target.value})}/>
              </div>
              <div className="form-group"><label>Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}><option>OT</option><option>ICU</option><option>Emergency</option><option>Radiology</option><option>Labour Room</option><option>General Ward</option></select>
              </div>
              <div className="form-group"><label>Quantity</label>
                <input type="number" placeholder="1" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})}/>
              </div>
              <div className="form-group"><label>Method</label>
                <select value={form.sterilization_method} onChange={e=>setForm({...form,sterilization_method:e.target.value})}><option>Autoclave</option><option>ETO</option><option>UV</option><option>Chemical</option><option>Dry Heat</option></select>
              </div>
              <div className="form-group"><label>Date</label>
                <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Received</option><option>Processing</option><option>Sterilized</option><option>Dispatched</option></select>
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