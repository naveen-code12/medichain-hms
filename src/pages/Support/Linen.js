import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_linen'); return s ? JSON.parse(s) : [{"item": "Bed Sheets", "ward": "ICU", "quantity_sent": "50", "quantity_received": "48", "date": "2026-05-27", "status": "Completed"}, {"item": "Pillow Covers", "ward": "General", "quantity_sent": "80", "quantity_received": "0", "date": "2026-05-27", "status": "Sent"}]; } catch { return [{"item": "Bed Sheets", "ward": "ICU", "quantity_sent": "50", "quantity_received": "48", "date": "2026-05-27", "status": "Completed"}, {"item": "Pillow Covers", "ward": "General", "quantity_sent": "80", "quantity_received": "0", "date": "2026-05-27", "status": "Sent"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_linen', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({item:'',ward:'',quantity_sent:'',quantity_received:'',date:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({item:'',ward:'',quantity_sent:'',quantity_received:'',date:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🧺 Linen & Laundry</div><div className="page-sub">Linen & Laundry management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Item</th><th>Ward</th><th>Quantity Sent</th><th>Quantity Received</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['item']||'—'}</td><td>{r['ward']||'—'}</td><td>{r['quantity_sent']||'—'}</td><td>{r['quantity_received']||'—'}</td><td>{r['date']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🧺 Add Linen & Laundry Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Item Type</label>
                <select value={form.item} onChange={e=>setForm({...form,item:e.target.value})}><option>Bed Sheets</option><option>Pillow Covers</option><option>Towels</option><option>Patient Gowns</option><option>Curtains</option><option>OT Linen</option></select>
              </div>
              <div className="form-group"><label>Ward</label>
                <select value={form.ward} onChange={e=>setForm({...form,ward:e.target.value})}><option>ICU</option><option>General</option><option>Surgical</option><option>Maternity</option><option>OT</option><option>Emergency</option></select>
              </div>
              <div className="form-group"><label>Qty Sent</label>
                <input type="number" placeholder="50" value={form.quantity_sent} onChange={e=>setForm({...form,quantity_sent:e.target.value})}/>
              </div>
              <div className="form-group"><label>Qty Received</label>
                <input type="number" placeholder="0" value={form.quantity_received} onChange={e=>setForm({...form,quantity_received:e.target.value})}/>
              </div>
              <div className="form-group"><label>Date</label>
                <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Sent</option><option>Washing</option><option>Returned</option><option>Completed</option></select>
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