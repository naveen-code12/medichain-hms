import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const C = ['#1565C0','#C62828','#2E7D32','#F57F17','#00695C','#6A1B9A'];
export default function MISReports() {
  const [tab, setTab] = useState('overview');
  const admissions = [{month:'Dec',count:24},{month:'Jan',count:31},{month:'Feb',count:28},{month:'Mar',count:35},{month:'Apr',count:40},{month:'May',count:38}];
  const revenue = [{month:'Dec',revenue:85000,expenses:60000},{month:'Jan',revenue:120000,expenses:80000},{month:'Feb',revenue:98000,expenses:70000},{month:'Mar',revenue:145000,expenses:90000},{month:'Apr',revenue:132000,expenses:85000},{month:'May',revenue:160000,expenses:95000}];
  const dept = [{name:'General',value:40},{name:'ICU',value:20},{name:'Surgical',value:25},{name:'Maternity',value:15}];
  const tabs = ['overview','revenue','patients','departments'];
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📈 MIS Reports</div><div className="page-sub">Management Information System Analytics</div></div>
        <button className="btn btn-primary" onClick={()=>window.print()}>🖨️ Print Report</button>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {tabs.map(t=><button key={t} className={`btn ${tab===t?'btn-primary':'btn-outline'}`} onClick={()=>setTab(t)} style={{textTransform:'capitalize'}}>{t}</button>)}
      </div>
      {tab==='overview' && (
        <div>
          <div className="stat-grid" style={{marginBottom:'16px'}}>
            {[['👥','124','Total Patients','#1565C0'],['🛏️','18','Occupied Beds','#2E7D32'],['💰','Rs.7.4L','Revenue (6m)','#F57F17'],['🧪','284','Lab Tests (6m)','#6A1B9A']].map(([icon,val,label,color])=>(
              <div key={label} className="stat-card" style={{borderTop:`3px solid ${color}`}}><div className="stat-icon">{icon}</div><div className="stat-val">{val}</div><div className="stat-label">{label}</div></div>
            ))}
          </div>
          <div className="card"><div className="card-header"><span className="card-title">Monthly Admissions</span></div>
          <div className="card-body"><ResponsiveContainer width="100%" height={250}>
            <BarChart data={admissions}><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="count" fill="#1565C0" radius={[4,4,0,0]} name="Admissions"/></BarChart>
          </ResponsiveContainer></div></div>
        </div>
      )}
      {tab==='revenue' && (
        <div className="card"><div className="card-header"><span className="card-title">Revenue vs Expenses</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenue}><XAxis dataKey="month"/><YAxis tickFormatter={v=>'Rs.'+v/1000+'K'}/><Tooltip formatter={v=>'Rs.'+v.toLocaleString()}/><Legend/>
          <Bar dataKey="revenue" fill="#1565C0" radius={[4,4,0,0]} name="Revenue"/><Bar dataKey="expenses" fill="#C62828" radius={[4,4,0,0]} name="Expenses"/></BarChart>
        </ResponsiveContainer></div></div>
      )}
      {tab==='patients' && (
        <div className="card"><div className="card-header"><span className="card-title">Patient Admissions Trend</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <LineChart data={admissions}><XAxis dataKey="month"/><YAxis/><Tooltip/><Line type="monotone" dataKey="count" stroke="#1565C0" strokeWidth={2} dot={{r:4}} name="Admissions"/></LineChart>
        </ResponsiveContainer></div></div>
      )}
      {tab==='departments' && (
        <div className="card"><div className="card-header"><span className="card-title">Department Distribution</span></div>
        <div className="card-body"><ResponsiveContainer width="100%" height={300}>
          <PieChart><Pie data={dept} cx="50%" cy="50%" outerRadius={120} dataKey="value" label={({name,percent})=>name+' '+Math.round(percent*100)+'%'}>{dept.map((_,i)=><Cell key={i} fill={C[i]}/>)}</Pie><Tooltip/></PieChart>
        </ResponsiveContainer></div></div>
      )}
    </div>
  );
}