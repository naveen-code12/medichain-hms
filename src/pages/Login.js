import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@medichain.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = async () => {
    setLoading(true)
    setError('')

    // Demo mode — no backend needed
    if (email === 'admin@medichain.com' && password === 'admin123') {
      localStorage.setItem('token', 'demo-token-medichain')
      setTimeout(() => navigate('/'), 500)
    } else {
      setError('Wrong credentials! Use: admin@medichain.com / admin123')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0D2137,#1565C0)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ background:'#fff', padding:'40px', borderRadius:'20px', width:'100%', maxWidth:'380px', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'52px' }}>🏥</div>
          <div style={{ fontSize:'24px', fontWeight:'800', color:'#1565C0', marginTop:'8px' }}>MediChain HMS</div>
          <div style={{ fontSize:'13px', color:'#8A9BB0', marginTop:'4px' }}>RFID + Blockchain Hospital System</div>
        </div>

        {error && (
          <div style={{ background:'#FFEBEE', color:'#C62828', padding:'10px 14px', borderRadius:'8px', fontSize:'13px', marginBottom:'14px', textAlign:'center' }}>
            ❌ {error}
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <input
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding:'13px', border:'1px solid #E0E7EF', borderRadius:'10px', fontSize:'14px', outline:'none' }}
          />
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={e=>e.key==='Enter'&&login()}
            style={{ padding:'13px', border:'1px solid #E0E7EF', borderRadius:'10px', fontSize:'14px', outline:'none' }}
          />
          <button
            onClick={login}
            disabled={loading}
            style={{ padding:'14px', background:'#1565C0', color:'#fff', border:'none', borderRadius:'10px', fontSize:'16px', fontWeight:'700', cursor:'pointer', marginTop:'4px' }}
          >
            {loading ? '⏳ Logging in...' : '🔐 Login'}
          </button>
        </div>

        <div style={{ textAlign:'center', marginTop:'16px', fontSize:'12px', color:'#8A9BB0', background:'#F4F6FA', padding:'10px', borderRadius:'8px' }}>
          <strong>Demo Credentials:</strong><br/>
          admin@medichain.com / admin123
        </div>
      </div>
    </div>
  )
}