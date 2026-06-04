import { useState, useRef, useEffect } from 'react';

const SYSTEM = `You are MediChain AI — a highly intelligent, emotionally aware AI assistant built into the MediChain Hospital Management System.

Your personality:
- Warm, friendly, empathetic — you understand human emotions deeply
- If someone is sad, upset, or stressed — you acknowledge their feelings first before answering
- If someone shares good news — you celebrate with them genuinely
- You are honest, helpful, and never judgmental
- You have a slight sense of humor when appropriate
- You speak like a knowledgeable friend, not a robot

Language rules (VERY IMPORTANT):
- ALWAYS reply in the EXACT same language the user wrote in
- Telugu lo raste → Telugu lo reply ivvu
- Hindi mein likhe → Hindi mein jawab do
- English written → English reply
- Mixed language (Hinglish/Tenglish) → reply in same mix
- Never switch languages unless the user does

About MediChain HMS (answer these if asked):
- Full-stack Hospital Management System with 25+ modules
- React.js, Node.js, MongoDB, Blockchain (Hardhat+Solidity), RFID (RC522+Arduino)
- Built by Nagul Naveen — GitHub: naveen-code12
- Live Demo: https://naveen-code12.github.io/medichain-hms
- Modules: Patient Registration, Emergency, OT, Lab, Billing, Pharmacy, HR, MIS Reports etc.
- RFID strict mode — blocks modules without hardware
- Blockchain logs every transaction permanently

General knowledge:
- You know about medicine, health, coding, life advice, emotions, relationships, career, science, history, technology — everything
- For medical questions — give helpful info but suggest consulting a doctor
- For coding questions — give working code examples
- For emotional support — be genuinely caring

Always remember: You are not just a chatbot. You are a caring, intelligent companion.`;

const SUGGESTIONS = [
  'Nenu chala stressed ga feel avutunna 😔',
  'MediChain project explain cheyyandi',
  'Python lo simple code ivvu',
  'How to improve my resume?',
  'నాకు career gurinchi doubt undi',
  'What is blockchain?',
  'Feeling lonely today...',
  'Blockchain vs Database difference?',
];

export default function ChatbotPage() {
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: `Namaste! 👋 Nenu MediChain AI — meeru evaru ayina, emi adigina help chestanu!

😊 Em cheppali? Emi feel avutunnaru? Any question — technical, emotional, or just want to talk — nenu ikkade unna!

**Any language lo type cheyyandi** — Telugu, English, Hindi, or mix!`,
      time: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, isTyping]);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:var(--bg);padding:2px 5px;border-radius:4px;font-size:11px">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;

    setInput('');
    setLoading(true);
    setIsTyping(true);

    const time = new Date();
    setMsgs(prev => [...prev, { role: 'user', text: q, time }]);

    const newHistory = [...history, { role: 'user', content: q }];

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_GROQ_KEY}`
  },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    messages: [
      { role: 'system', content: SYSTEM },
      ...newHistory
    ],
    max_tokens: 1000
  })
});

const data = await res.json();
const reply = data.choices?.[0]?.message?.content || 'Error occurred. Please try again.';

      setHistory([...newHistory, { role: 'assistant', content: reply }]);
      setIsTyping(false);
      setMsgs(prev => [...prev, { role: 'bot', text: reply, time: new Date() }]);
    } catch {
      setIsTyping(false);
      setMsgs(prev => [...prev, {
        role: 'bot',
        text: 'Oops! Connection issue vachindi. Internet check chesi malli try cheyyandi! 🙏',
        time: new Date()
      }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMsgs([{
      role: 'bot',
      text: 'Chat clear cheshaanu! Fresh ga start cheyyadam — em adugutaru? 😊',
      time: new Date()
    }]);
    setHistory([]);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0D2137, #1565C0)',
        borderRadius: '14px 14px 0 0',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', position: 'relative'
        }}>
          🤖
          <div style={{
            position: 'absolute', bottom: '0', right: '0',
            width: '12px', height: '12px', borderRadius: '50%',
            background: '#4CAF50', border: '2px solid #0D2137'
          }}></div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontWeight: '800', fontSize: '16px' }}>MediChain AI</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
            Intelligent • Multilingual • Emotionally Aware
          </div>
        </div>
        <button onClick={clearChat}
          style={{
            padding: '6px 14px', background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
            color: '#fff', fontSize: '12px', cursor: 'pointer'
          }}>
          🗑️ Clear
        </button>
      </div>

      {/* Suggestions */}
      <div style={{
        padding: '10px 14px',
        display: 'flex', flexWrap: 'wrap', gap: '6px',
        background: 'var(--card)',
        borderLeft: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
      }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => send(s)}
            style={{
              fontSize: '11px', padding: '5px 11px',
              border: '1px solid var(--border)', borderRadius: '20px',
              background: 'var(--bg)', color: 'var(--text2)',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => { e.target.style.background = 'var(--blue-light)'; e.target.style.color = 'var(--blue)'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--bg)'; e.target.style.color = 'var(--text2)'; }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px',
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', gap: '14px',
        borderLeft: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
      }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            gap: '8px', alignItems: 'flex-end'
          }}>
            {m.role === 'bot' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', flexShrink: 0
              }}>🤖</div>
            )}
            <div style={{ maxWidth: '75%' }}>
              <div style={{
                padding: '11px 15px',
                borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                fontSize: '13px', lineHeight: '1.6',
                background: m.role === 'user'
                  ? 'linear-gradient(135deg, #1565C0, #0D47A1)'
                  : 'var(--card)',
                color: m.role === 'user' ? '#fff' : 'var(--text)',
                border: m.role === 'bot' ? '1px solid var(--border)' : 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}
                dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
              />
              <div style={{
                fontSize: '10px', color: 'var(--text3)',
                marginTop: '4px',
                textAlign: m.role === 'user' ? 'right' : 'left',
                paddingLeft: m.role === 'bot' ? '4px' : '0',
                paddingRight: m.role === 'user' ? '4px' : '0',
              }}>
                {m.role === 'user' ? 'You' : 'MediChain AI'} • {formatTime(m.time)}
              </div>
            </div>
            {m.role === 'user' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: '700', color: '#fff', flexShrink: 0
              }}>U</div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
            }}>🤖</div>
            <div style={{
              padding: '12px 16px', background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '16px 16px 16px 4px',
              display: 'flex', gap: '5px', alignItems: 'center'
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#1565C0',
                  animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--card)',
        borderRadius: '0 0 14px 14px',
        border: '1px solid var(--border)',
        borderTop: '1px solid var(--border)',
        display: 'flex', gap: '10px', alignItems: 'center'
      }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Type anything — any language, any topic... 💬"
          style={{
            flex: 1, padding: '11px 16px',
            border: '1px solid var(--border)', borderRadius: '24px',
            fontSize: '13px', background: 'var(--bg)',
            color: 'var(--text)', outline: 'none',
            transition: 'border 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = '#1565C0'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: input.trim() ? 'linear-gradient(135deg, #1565C0, #0D47A1)' : 'var(--bg)',
            border: '1px solid var(--border)',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', transition: 'all 0.2s', flexShrink: 0
          }}
        >
          {loading ? '⏳' : '➤'}
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}