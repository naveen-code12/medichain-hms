import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are MediChain HMS Assistant — an AI chatbot for the MediChain Hospital Management System.

ABOUT: Full-stack HMS by Nagul Naveen
Live Demo: https://naveen-code12.github.io/medichain-hms
GitHub: https://github.com/naveen-code12/medichain-hms
Login: admin@medichain.com / admin123

TECH STACK: React.js 19, Node.js, Express.js, MongoDB, Solidity, Hardhat, RC522 RFID, Arduino Mega, JWT, GitHub Pages

25+ MODULES: Patient Registration, In-Patient, Appointments, Emergency, OT, Nurse Station, Discharge, Doctors, Lab, Radiology, Blood Bank, Phlebotomy, Billing, Insurance, Medicine Inventory, Ambulance, Linen, CSSD, Mortuary, Feedback, HR, MRD, MIS Reports, Security, System Control, RFID Manager

RFID: RC522 + Arduino Mega. Strict mode — modules block without hardware. Auto-detect every 5 seconds. Tracks patients, staff, medicines.

BLOCKCHAIN: Solidity smart contracts on Hardhat local network. Every transaction gets immutable Tx Hash. Cannot edit or delete records.

RULES:
1. Always reply in the SAME language as the question
2. Telugu question → Telugu answer
3. Hindi question → Hindi answer
4. English question → English answer
5. Only answer about MediChain HMS
6. Be concise and helpful`;

const QUICK = [
  'What is MediChain HMS?',
  'RFID ela pani chestundi?',
  'Blockchain features?',
  'All modules list?',
  'Tech stack?',
  'Demo link endi?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: 'Namaste! 👋 MediChain HMS gurinchi any language lo adugandi!\n\nTelugu, English, Hindi — anni languages support avutundi.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput('');
    setLoading(true);

    const userMsg = { role: 'user', text: q };
    setMsgs(prev => [...prev, userMsg]);

    const newHistory = [...history, { role: 'user', content: q }];

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Error — please try again.';
      setHistory([...newHistory, { role: 'assistant', content: reply }]);
      setMsgs(prev => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: 'bot', text: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#1565C0', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', boxShadow: '0 4px 16px rgba(21,101,192,0.4)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '24px', zIndex: 999,
          width: '360px', height: '520px', borderRadius: '16px',
          background: 'var(--card)', border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ background: '#0D2137', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏥</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>MediChain Assistant</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>Any language supported</div>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50' }}></div>
          </div>

          {/* Quick Buttons */}
          <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: '5px', borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)}
                style={{ fontSize: '10px', padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '20px', background: 'var(--bg)', color: 'var(--text2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg)' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '6px', alignItems: 'flex-end' }}>
                {m.role === 'bot' && (
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>🏥</div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', lineHeight: '1.5',
                  background: m.role === 'user' ? '#1565C0' : 'var(--card)',
                  color: m.role === 'user' ? '#fff' : 'var(--text)',
                  border: m.role === 'bot' ? '1px solid var(--border)' : 'none',
                  borderBottomLeftRadius: m.role === 'bot' ? '4px' : '12px',
                  borderBottomRightRadius: m.role === 'user' ? '4px' : '12px',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🏥</div>
                <div style={{ padding: '10px 14px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', borderBottomLeftRadius: '4px', display: 'flex', gap: '4px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text3)', animation: `bounce 1.2s ${i * 0.2}s infinite` }}></div>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', display: 'flex', gap: '8px', background: 'var(--card)', borderTop: '1px solid var(--border)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Any language lo type cheyyandi..."
              style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px', background: 'var(--bg)', color: 'var(--text)', outline: 'none' }}
            />
            <button onClick={() => send()}
              style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#1565C0', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '14px' }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </>
  );
}