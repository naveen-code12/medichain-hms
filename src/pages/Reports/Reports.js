import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#1565C0','#C62828','#2E7D32','#F57F17','#00695C','#6A1B9A'];
export default function Reports() {
  const [tab, setTab] = useState('revenue');
  const revenue = [{month:'Dec',revenue:85000,expenses:60000},{month:'Jan',revenue:120000,expenses:80000},{month:'Feb',revenue:98000,expenses:70000},{month:'Mar',revenue:145000,expenses:90000},{month:'Apr',revenue:132000,expenses:85000},{month:'May',revenue:160000,expenses:95000}];
  const dept = [{name:'General',patients:40},{name:'ICU',patients:20},{name:'Surgical',patients:25},{name:'Maternity',patients:15},{name:'Neuro',patients:12}];
  const billing = [{name:'Paid',value:45},{name:'Pending',value:30},{name:'Partial',value:25}];
  const tabs = [{id:'revenue',label:'Revenue'},{id:'patients',label:'Patients'},{id:'billing',label:'Billing'}];
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📈 Reports and Analytics</div><div className="page-sub">Hospital performance overview</div></div>
        <button className="btn btn-primary" onClick={()=>window.print()}>Print Report</button>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {tabs.map(t=>(<button key={t.id} className={`btn ${tab===t.id?'btn-primary':'btn-outline'}`} onClick={()=>setTab(t.id)}>{t.label}</button>))}
      </div>
      {tab==='revenue' && (
        <div>
          <div className="stat-grid" style={{marginBottom:'16px'}}>
            <div className="stat-card" style={{borderTop:'3px solid #1565C0'}}><div className="stat-icon">💰</div><div className="stat-val">Rs.7.4L</div><div className="stat-label">Total Revenue (6m)</div></div>
            <div className="stat-card" style={{borderTop:'3px solid #2E7D32'}}><div className="stat-icon">📈</div><div className="stat-val">Rs.4.8L</div><div className="stat-label">Total Expenses (6m)</div></div>
            <div className="stat-card" style={{borderTop:'3px solid #F57F17'}}><div className="stat-icon">💹</div><div className="stat-val">Rs.2.6L</div><div className="stat-label">Net Profit (6m)</div></div>
          </div>
          <div className="card"><div className="card-header"><span className="card-title">Revenue vs Expenses</span></div>
          <div className="card-body"><ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenue}><XAxis dataKey="month"/><YAxis tickFormatter={v=>'Rs.'+v/1000+'K'}/><Tooltip formatter={v=>'Rs.'+v.toLocaleString()}/><Legend/><Bar dataKey="revenue" fill="#1565C0" radius={[4,4,0,0]} name="Revenue"/><Bar dataKey="expenses" fill="#C62828" radius={[4,4,0,0]} name="Expenses"/></BarChart>
          </ResponsiveContainer></div></div>
        </div>
      )}
      {tab==='patients' && (
        <div className="card"><div className="card-header"><span className="card-title">Patients by Department</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <PieChart><Pie data={dept} cx="50%" cy="50%" outerRadius={110} dataKey="patients" label={({name,percent})=>name+' '+Math.round(percent*100)+'%'}>{dept.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart>
        </ResponsiveContainer></div></div>
      )}
      {tab==='billing' && (
        <div className="card"><div className="card-header"><span className="card-title">Bill Payment Status</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <PieChart><Pie data={billing} cx="50%" cy="50%" outerRadius={110} dataKey="value" label={({name,value})=>name+': '+value+'%'}>{billing.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/><Legend/></PieChart>
        </ResponsiveContainer></div></div>
      )}
    </div>
  )
}
