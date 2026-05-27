import { useRFID } from '../../context/RFIDContext';

export default function RFIDGate({ children, requireScan = false, scannedUID, onScan }) {
  const { rfidConnected, checking } = useRFID();

  if (checking) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', flexDirection:'column', gap:'16px' }}>
        <div style={{ fontSize:'48px' }}>🔄</div>
        <div style={{ fontSize:'16px', color:'var(--text2)' }}>Checking RFID connection...</div>
      </div>
    );
  }

  if (!rfidConnected) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'70vh' }}>
        <div style={{ background:'var(--card)', border:'2px solid var(--red)', borderRadius:'16px', padding:'40px', maxWidth:'480px', textAlign:'center', boxShadow:'0 8px 32px rgba(198,40,40,0.15)' }}>
          <div style={{ fontSize:'64px', marginBottom:'16px' }}>🚫</div>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'var(--red)', marginBottom:'12px' }}>RFID Reader Not Connected</div>
          <div style={{ fontSize:'14px', color:'var(--text2)', marginBottom:'24px', lineHeight:'1.6' }}>
            This module requires an RFID reader to be connected.<br/>
            Hardware connect chesaka ikkade automatic ga unlock avutundi.
          </div>
          <div style={{ background:'var(--bg)', borderRadius:'12px', padding:'16px', marginBottom:'20px', textAlign:'left' }}>
            <div style={{ fontSize:'13px', fontWeight:'700', marginBottom:'8px' }}>Connection Steps:</div>
            <div style={{ fontSize:'12px', color:'var(--text2)', lineHeight:'2' }}>
              1. RC522 RFID Reader ni Arduino ki connect cheyyandi<br/>
              2. Arduino ni USB tho PC ki connect cheyyandi<br/>
              3. Backend lo COM port set cheyyandi<br/>
              4. Server restart cheyyandi — auto detect avutundi
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center', fontSize:'13px', color:'var(--red)' }}>
            <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'var(--red)' }}></div>
            Reader Offline — Waiting for hardware...
          </div>
        </div>
      </div>
    );
  }

  if (requireScan && !scannedUID) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'70vh' }}>
        <div style={{ background:'linear-gradient(135deg,#0D2137,#1565C0)', borderRadius:'16px', padding:'40px', maxWidth:'480px', textAlign:'center', color:'#fff' }}>
          <div style={{ fontSize:'64px', marginBottom:'16px' }}>📡</div>
          <div style={{ fontSize:'22px', fontWeight:'800', marginBottom:'12px' }}>Scan RFID Card to Continue</div>
          <div style={{ fontSize:'14px', color:'rgba(255,255,255,0.7)', marginBottom:'24px' }}>
            Patient RFID card scan chesaka proceed avutundi
          </div>
          <div style={{ border:'2px dashed rgba(255,255,255,0.4)', borderRadius:'12px', padding:'24px', cursor:'pointer', animation:'pulse 2s infinite' }}
            onClick={onScan}>
            <div style={{ fontSize:'40px' }}>🔖</div>
            <div style={{ marginTop:'8px', fontSize:'13px', color:'rgba(255,255,255,0.6)' }}>Tap card on reader</div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}