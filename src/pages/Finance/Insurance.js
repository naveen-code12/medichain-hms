import { useState, useEffect } from 'react';

export default function Page() {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem('medichain_insurance'); return s ? JSON.parse(s) : [{"claim_id": "CL001", "patient": "Ravi Kumar", "insurance_co": "Star Health", "policy_no": "SH-1234567", "amount": "40000", "status": "Submitted"}, {"claim_id": "CL002", "patient": "Anita Reddy", "insurance_co": "HDFC Ergo", "policy_no": "HE-9876543", "amount": "15000", "status": "Approved"}]; } catch { return [{"claim_id": "CL001", "patient": "Ravi Kumar", "insurance_co": "Star Health", "policy_no": "SH-1234567", "amount": "40000", "status": "Submitted"}, {"claim_id": "CL002", "patient": "Anita Reddy", "insurance_co": "HDFC Ergo", "policy_no": "HE-9876543", "amount": "15000", "status": "Approved"}]; } });

  useEffect(() => {
    try { localStorage.setItem('medichain_insurance', JSON.stringify(records)); } catch{}
  }, [records]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({claim_id:'',patient:'',insurance_co:'',policy_no:'',amount:'',status:''});
  const save = () => { setRecords(prev=>[...prev,{...form}]);setShowModal(false);setForm({claim_id:'',patient:'',insurance_co:'',policy_no:'',amount:'',status:''}); };
  const filtered = records.filter(r=>Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    
    <div>
      <div className="page-header">
        <div><div className="page-title">🛡️ Insurance & E-Claim</div><div className="page-sub">Insurance & E-Claim management module</div></div>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Record</button>
      </div>
      <div className="search-bar"><div className="search-input">🔍 <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="card"><div className="card-body" style={{padding:0}}><div className="table-wrap">
        <table><thead><tr><th>Claim ID</th><th>Patient</th><th>Insurance Co</th><th>Policy No</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>{filtered.length ? filtered.map((r,i)=>(
          <tr key={i}><td>{r['claim_id']||'—'}</td><td>{r['patient']||'—'}</td><td>{r['insurance_co']||'—'}</td><td>{r['policy_no']||'—'}</td><td>{r['amount']||'—'}</td><td>{r['status']||'—'}</td></tr>
        )) : <tr><td colSpan="6"><div className="empty">No records yet</div></td></tr>}</tbody>
        </table>
      </div></div></div>
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>🛡️ Add Insurance & E-Claim Record</h3>
            <div className="form-grid">
              <div className="form-group"><label>Claim ID</label>
                <input placeholder="CL001" value={form.claim_id} onChange={e=>setForm({...form,claim_id:e.target.value})}/>
              </div>
              <div className="form-group"><label>Patient Name</label>
                <input placeholder="Patient" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})}/>
              </div>
              <div className="form-group"><label>Insurance Company</label>
                <input placeholder="Company name" value={form.insurance_co} onChange={e=>setForm({...form,insurance_co:e.target.value})}/>
              </div>
              <div className="form-group"><label>Policy Number</label>
                <input placeholder="Policy No" value={form.policy_no} onChange={e=>setForm({...form,policy_no:e.target.value})}/>
              </div>
              <div className="form-group"><label>Claim Amount</label>
                <input type="number" placeholder="25000" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Draft</option><option>Submitted</option><option>Under Review</option><option>Approved</option><option>Rejected</option><option>Paid</option></select>
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