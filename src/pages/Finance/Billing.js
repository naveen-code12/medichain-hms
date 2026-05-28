import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_finance_billing'); return s ? JSON.parse(s) : [{"bill_id": "B001", "patient": "Ravi Kumar", "total": "45000", "paid": "20000", "balance": "25000", "status": "Partial"}, {"bill_id": "B002", "patient": "Anita Reddy", "total": "18500", "paid": "18500", "balance": "0", "status": "Paid"}]; } catch { return [{"bill_id": "B001", "patient": "Ravi Kumar", "total": "45000", "paid": "20000", "balance": "25000", "status": "Partial"}, {"bill_id": "B002", "patient": "Anita Reddy", "total": "18500", "paid": "18500", "balance": "0", "status": "Paid"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_finance_billing', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({bill_id:'',patient:'',total:'',paid:'',balance:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({bill_id:'',patient:'',total:'',paid:'',balance:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">💰 Billing & Collection</div><div className="page-sub">Billing & Collection management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Bill ID</th><th>Patient</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['bill_id']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['total']||'—'}</td><td>{r['paid']||'—'}</td><td>{r['balance']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>💰 Add Billing & Collection Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Bill ID</label>
                <input placeholder="B001" value={form.bill_id} onChange={e=>setForm({...form,bill_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Total Amount</label>
                <input type="number" placeholder="25000" value={form.total} onChange={e=>setForm({...form,total:e.target.value})}/>
              </div>
              <div className="form-group"><label>Paid Amount</label>
                <input type="number" placeholder="0" value={form.paid} onChange={e=>setForm({...form,paid:e.target.value})}/>
              </div>
              <div className="form-group"><label>Balance</label>
                <input type="number" placeholder="0" value={form.balance} onChange={e=>setForm({...form,balance:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>Partial</option><option>Paid</option><option>Waived</option></select>
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