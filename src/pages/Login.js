import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import API from '../utils/api'

export default function Login() {
  const [email, setEmail] = useState('admin@medichain.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async () => {
    setLoading(true)
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      toast.success('Welcome to MediChain!')
      navigate('/')
    } catch {
      toast.error('Wrong email or password!')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0D2137,#1565C0)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#fff', padding:'40px', borderRadius:'20px', width:'380px', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'48px' }}>🏥</div>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'#1565C0', marginTop:'8px' }}>MediChain HMS</div>
          <div style={{ fontSize:'13px', color:'#8A9BB0', marginTop:'4px' }}>RFID + Blockchain Hospital System</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"
            style={{ padding:'12px', border:'1px solid #E0E7EF', borderRadius:'8px', fontSize:'14px', outline:'none' }}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"
            style={{ padding:'12px', border:'1px solid #E0E7EF', borderRadius:'8px', fontSize:'14px', outline:'none' }}/>
          <button onClick={login} disabled={loading}
            style={{ padding:'13px', background:'#1565C0', color:'#fff', border:'none', borderRadius:'8px', fontSize:'15px', fontWeight:'700', cursor:'pointer', marginTop:'4px' }}>
            {loading ? 'Logging in...' : '🔐 Login'}
          </button>
        </div>
        <div style={{ textAlign:'center', marginTop:'16px', fontSize:'12px', color:'#8A9BB0' }}>
          admin@medichain.com / admin123
        </div>
      </div>
    </div>
  )
}