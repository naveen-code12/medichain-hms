import { useState, useEffect } from 'react';
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
