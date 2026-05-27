import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import API from '../../utils/api'

const COLORS = ['#1565C0','#C62828','#2E7D32','#F57F17','#00695C','#6A1B9A']

const admData = [
  {month:'Dec',patients:24},{month:'Jan',patients:31},{month:'Feb',patients:28},
  {month:'Mar',patients:35},{month:'Apr',patients:40},{month:'May',patients:38}
]
const deptData = [
  {name:'General',value:40},{name:'ICU',value:20},{name:'Surgical',value:25},{name:'Maternity',value:15}
]
const revenueData = [
  {month:'Dec',revenue:85000},{month:'Jan',revenue:120000},{month:'Feb',revenue:98000},
  {month:'Mar',revenue:145000},{month:'Apr',revenue:132000},{month:'May',revenue:160000}
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ patients:0, inpatients:0, appointments:0, doctors:0, lab:0, billing:'₹0' })

  useEffect(() => {
    const load = async () => {
      try {
        const [p, ip, a, d, l, b] = await Promise.all([
          API.get('/patients'), API.get('/inpatients'), API.get('/appointments'),
          API.get('/doctors'), API.get('/lab'), API.get('/billing')
        ])
        const totalRev = b.data.bills?.reduce((s,x)=>s+x.totalAmount,0)||0
        setStats({
          patients: p.data.patients?.length||0,
          inpatients: ip.data.patients?.length||0,
          appointments: a.data.appointments?.length||0,
          doctors: d.data.doctors?.length||0,
          lab: l.data.tests?.length||0,
          billing: '₹'+(totalRev/1000).toFixed(0)+'K'
        })
      } catch {}
    }
    load()
  }, [])

  const cards = [
    { icon:'👥', label:'Total Patients', val:stats.patients, color:'#1565C0', bg:'#E3F2FD', path:'/patients' },
    { icon:'🛏️', label:'In-Patients', val:stats.inpatients, color:'#2E7D32', bg:'#E8F5E9', path:'/inpatients' },
    { icon:'📅', label:'Appointments', val:stats.appointments, color:'#F57F17', bg:'#FFF8E1', path:'/appointments' },
    { icon:'👨‍⚕️', label:'Doctors', val:stats.doctors, color:'#00695C', bg:'#E0F2F1', path:'/doctors' },
    { icon:'🧪', label:'Lab Tests', val:stats.lab, color:'#6A1B9A', bg:'#F3E5F5', path:'/lab' },
    { icon:'💰', label:'Revenue', val:stats.billing, color:'#C62828', bg:'#FFEBEE', path:'/billing' },
  ]

  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">📊 Dashboard</div><div className="page-sub">MediChain HMS — Real-time overview</div></div>
        <span className="chain-badge">🔗 Blockchain: Connected</span>
      </div>

      <div className="stat-grid">
        {cards.map(c => (
          <div key={c.label} className="stat-card" style={{ cursor:'pointer', borderTop:`3px solid ${c.color}` }} onClick={() => navigate(c.path)}>
            <div className="stat-icon" style={{ fontSize:'24px' }}>{c.icon}</div>
            <div className="stat-val">{c.val}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
        <div className="card">
          <div className="card-header"><span className="card-title">📈 Patient Admissions (6 months)</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={admData}><XAxis dataKey="month" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/><Tooltip/><Bar dataKey="patients" fill="#1565C0" radius={[4,4,0,0]}/></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">🏥 Department Distribution</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={deptData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                {deptData.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie><Tooltip/></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">💰 Revenue Trend</span></div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={revenueData}><XAxis dataKey="month" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}} tickFormatter={v=>'₹'+v/1000+'K'}/><Tooltip formatter={v=>'₹'+v.toLocaleString()}/><Line type="monotone" dataKey="revenue" stroke="#1565C0" strokeWidth={2} dot={{r:4}}/></LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">🔗 Recent Blockchain Transactions</span></div>
        <div className="card-body" style={{padding:0}}>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Tx Hash</th><th>Type</th><th>Entity</th><th>Block</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  {hash:'0x7a3f...d12e',type:'Lab Record',entity:'Ravi Kumar',block:1247},
                  {hash:'0x8b4e...e23f',type:'Patient Reg',entity:'Anita Reddy',block:1246},
                  {hash:'0xa1b2...f34g',type:'Billing',entity:'Suresh Babu',block:1245},
                ].map((tx,i)=>(
                  <tr key={i}>
                    <td><code style={{fontSize:'11px',background:'var(--bg)',padding:'2px 6px',borderRadius:'4px'}}>{tx.hash}</code></td>
                    <td><span className="badge badge-blue">{tx.type}</span></td>
                    <td>{tx.entity}</td>
                    <td><span className="badge badge-gray">#{tx.block}</span></td>
                    <td><span className="badge badge-green">✅ Confirmed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}