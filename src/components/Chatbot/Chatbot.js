import { useState, useRef, useEffect } from 'react';

const PROJECT = {
  name: 'MediChain HMS',
  creator: 'Nagula Naveen',
  demo: 'https://naveen-code12.github.io/medichain-hms/#/',
  github: 'https://github.com/naveen-code12/medichain-hms',
  login: 'admin@medichain.com / admin123',

  stack: [
    'React.js 19',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Solidity',
    'Hardhat',
    'RC522 RFID',
    'Arduino Mega',
    'JWT Authentication',
    'GitHub Pages'
  ],

  modules: [
    'MIS Dashboard',
    'RFID Manager',
    'Patient Registration',
    'In-Patient Management',
    'Appointments',
    'Emergency',
    'Operation Theatre',
    'Nurse Station',
    'Discharge Summary',
    'Doctor Management',
    'Laboratory',
    'Radiology',
    'Blood Bank',
    'Phlebotomy',
    'Billing & Collection',
    'Insurance & E-Claim',
    'Medicine Inventory',
    'Ambulance',
    'Linen & Laundry',
    'CSSD',
    'Mortuary Management',
    'Feedback',
    'HR Management',
    'MRD',
    'MIS Reports',
    'Security & Audit',
    'System Control'
  ]
};

const QUICK = [
  'What is MediChain HMS?',
  'RFID ela pani chestundi?',
  'Blockchain features?',
  'All modules list?',
  'Tech stack?',
  'Demo link endi?',
];

function detectLanguage(text) {
  const q = text.toLowerCase();

  const teluguWords = [
    'enti',
    'endi',
    'ela',
    'cheppu',
    'gurinchi',
    'ante',
    'avuthundi',
    'pani',
    'telugu',
    'kadha',
    'em',
    'idhi',
    'adhi'
  ];

  const hindiWords = [
    'kya',
    'kaise',
    'batao',
    'hai',
    'hindi',
    'kaam',
    'project ke baare'
  ];

  if (teluguWords.some(word => q.includes(word))) return 'telugu';
  if (hindiWords.some(word => q.includes(word))) return 'hindi';
  return 'english';
}

function projectIntro(lang) {
  if (lang === 'telugu') {
    return `MediChain HMS ante oka full-stack Hospital Management System. Idi hospital lo patients, doctors, appointments, in-patients, emergency, lab, radiology, blood bank, billing, pharmacy, HR, reports, security anni manage cheyyadaniki build chesina project.

Ee project special enti ante RFID + Blockchain integration undi. RFID tho patient/staff/medicine tracking cheyyachu. Blockchain tho important records ki transaction hash generate chesi data integrity maintain cheyyachu.

Project creator: ${PROJECT.creator}
Demo: ${PROJECT.demo}
Login: ${PROJECT.login}`;
  }

  if (lang === 'hindi') {
    return `MediChain HMS ek full-stack Hospital Management System hai. Isme patients, doctors, appointments, emergency, lab, billing, pharmacy, HR, reports aur security modules manage kiye ja sakte hain.

Is project ki speciality RFID aur Blockchain integration hai. RFID se tracking hoti hai, aur blockchain se records secure aur tamper-resistant ban sakte hain.

Creator: ${PROJECT.creator}
Demo: ${PROJECT.demo}
Login: ${PROJECT.login}`;
  }

  return `MediChain HMS is a full-stack Hospital Management System designed to manage hospital workflows like patients, doctors, appointments, in-patient care, emergency, laboratory, billing, pharmacy, HR, reports, and security.

The special part of this project is RFID and Blockchain integration. RFID is used for tracking patients, staff, and medicines. Blockchain is used to create transaction hashes and improve data integrity.

Creator: ${PROJECT.creator}
Demo: ${PROJECT.demo}
Login: ${PROJECT.login}`;
}

function modulesAnswer(lang) {
  const list = PROJECT.modules.map((m, i) => `${i + 1}. ${m}`).join('\n');

  if (lang === 'telugu') {
    return `MediChain HMS lo hospital workflow cover chese main modules ivvi:\n\n${list}`;
  }

  if (lang === 'hindi') {
    return `MediChain HMS me ye main modules hain:\n\n${list}`;
  }

  return `MediChain HMS includes these modules:\n\n${list}`;
}

function techAnswer(lang) {
  const list = PROJECT.stack.map(item => `• ${item}`).join('\n');

  if (lang === 'telugu') {
    return `Ee project lo use chesina tech stack:\n\n${list}\n\nSimple ga cheppali ante frontend React lo undi, backend Node.js/Express, database MongoDB, blockchain Solidity + Hardhat, RFID hardware RC522 + Arduino Mega.`;
  }

  if (lang === 'hindi') {
    return `Is project ka tech stack:\n\n${list}\n\nSimple words me, frontend React me hai, backend Node.js/Express me hai, database MongoDB hai, blockchain Solidity + Hardhat se hai, aur RFID hardware RC522 + Arduino Mega hai.`;
  }

  return `The tech stack used in MediChain HMS is:\n\n${list}\n\nIn simple terms, React handles the frontend, Node.js and Express handle backend APIs, MongoDB stores data, Solidity and Hardhat handle blockchain logic, and RC522 RFID with Arduino Mega handles hardware tracking.`;
}

function rfidAnswer(lang) {
  if (lang === 'telugu') {
    return `RFID feature lo RC522 RFID reader and Arduino Mega use chestaru. User RFID card scan chesthe, card UID read avuthundi. Aa UID ni patient, staff, or medicine record tho connect cheyyachu.

Strict mode ante RFID hardware connected lekapothe konni modules access block avuthayi. Idi real hospital security concept laga untundi. Example: patient details access cheyyali ante RFID verification compulsory laga pettachu.

Simple ga: RFID = identity tracking + secure access.`;
  }

  if (lang === 'hindi') {
    return `RFID feature me RC522 RFID reader aur Arduino Mega use hota hai. Jab RFID card scan hota hai, card ka UID read hota hai. Us UID ko patient, staff ya medicine record ke saath connect kiya ja sakta hai.

Strict mode ka matlab hai RFID hardware connect nahi hoga to kuch modules block ho sakte hain.

Simple words me: RFID = identity tracking + secure access.`;
  }

  return `The RFID feature uses an RC522 RFID reader with Arduino Mega. When an RFID card is scanned, the card UID is read and can be mapped with a patient, staff member, or medicine record.

Strict mode means some modules can be blocked if RFID hardware is not connected. This makes the project closer to a real hospital security workflow.

In short: RFID = identity tracking + secure access.`;
}

function blockchainAnswer(lang) {
  if (lang === 'telugu') {
    return `Blockchain feature main purpose data security and trust. Hospital lo important actions ki transaction hash generate cheyyachu.

Example:
• Patient record update
• Billing transaction
• Medicine issue
• RFID activity
• Audit log

Blockchain lo store aina record immutable nature lo untundi. Ante once transaction create ayyaka easy ga edit/delete cheyyadam possible kaadu. So project lo data integrity and audit trail strong ga untayi.`;
  }

  if (lang === 'hindi') {
    return `Blockchain feature ka main purpose data security aur trust hai. Hospital ke important actions ke liye transaction hash generate kiya ja sakta hai.

Example:
• Patient record update
• Billing transaction
• Medicine issue
• RFID activity
• Audit log

Blockchain records immutable hote hain, isliye data integrity aur audit trail strong hota hai.`;
  }

  return `The main purpose of blockchain in MediChain HMS is data security, trust, and auditability. Important hospital actions can generate transaction hashes.

Examples:
• Patient record updates
• Billing transactions
• Medicine issue logs
• RFID activities
• Audit logs

Blockchain records are immutable in nature, so they improve data integrity and make the system more secure.`;
}

function demoAnswer(lang) {
  if (lang === 'telugu') {
    return `MediChain HMS demo details:

Demo link:
${PROJECT.demo}

Login:
${PROJECT.login}

GitHub:
${PROJECT.github}

Ee details use chesi project demo open chesi dashboard and modules check cheyyachu.`;
  }

  if (lang === 'hindi') {
    return `MediChain HMS demo details:

Demo link:
${PROJECT.demo}

Login:
${PROJECT.login}

GitHub:
${PROJECT.github}`;
  }

  return `MediChain HMS demo details:

Demo link:
${PROJECT.demo}

Login:
${PROJECT.login}

GitHub:
${PROJECT.github}`;
}

function vivaAnswer(lang) {
  if (lang === 'telugu') {
    return `Viva lo ila cheppachu:

My project name is MediChain HMS. It is a full-stack Hospital Management System developed to manage complete hospital operations such as patient registration, appointments, in-patient management, emergency, laboratory, billing, pharmacy, HR, reports, and security.

The main speciality of my project is RFID and Blockchain integration. RFID is used for patient, staff, and medicine tracking. Blockchain is used to store important transaction hashes and improve data security, transparency, and auditability.

Frontend is developed using React.js. Backend is planned with Node.js and Express.js. MongoDB is used as database. Solidity and Hardhat are used for blockchain development. RC522 RFID and Arduino Mega are used for hardware integration.

This project is useful because it reduces manual work, improves hospital data management, increases security, and provides a modern digital hospital workflow.`;
  }

  return `For viva, you can explain it like this:

My project is MediChain HMS, a full-stack Hospital Management System designed to manage complete hospital operations such as patient registration, appointments, in-patient management, emergency, laboratory, billing, pharmacy, HR, reports, and security.

The main highlight of this project is RFID and Blockchain integration. RFID is used for patient, staff, and medicine tracking, while blockchain is used to generate transaction hashes and improve data security, transparency, and auditability.

The frontend is built using React.js. The backend is planned with Node.js and Express.js. MongoDB is used for database storage. Solidity and Hardhat are used for blockchain development. RC522 RFID and Arduino Mega are used for hardware integration.

This project is useful because it reduces manual work, improves hospital data handling, increases security, and provides a modern digital hospital workflow.`;
}

function securityAnswer(lang) {
  if (lang === 'telugu') {
    return `MediChain HMS lo security kosam multiple concepts use chestaru:

1. JWT Authentication
User login secure ga maintain cheyyadaniki JWT use chestaru.

2. RFID Verification
RFID strict mode tho hardware connected lekapothe modules block cheyyachu.

3. Blockchain Audit
Important actions ki transaction hash generate chesi tamper-resistant audit trail create cheyyachu.

4. Security & Audit Module
System activities, access logs, and important actions ni track cheyyadaniki use avuthundi.

Simple ga cheppali ante project lo login security + RFID access + blockchain audit combination undi.`;
  }

  return `MediChain HMS uses multiple security concepts:

1. JWT Authentication
Used to manage secure login sessions.

2. RFID Verification
Strict RFID mode can block modules if hardware is not connected.

3. Blockchain Audit
Important actions can generate transaction hashes for tamper-resistant tracking.

4. Security & Audit Module
Used to track system activities, access logs, and important actions.

In simple terms, the project combines login security, RFID access, and blockchain audit tracking.`;
}

function fallbackAnswer(question, lang) {
  if (lang === 'telugu') {
    return `Naku ardham ayindi, meeru "${question}" ani adigaru.

MediChain HMS context lo cheppali ante, ee project hospital management, RFID tracking, blockchain security, patient records, billing, reports, and admin modules ni cover chestundi.

Meeru specific ga adagachu:
• RFID ela pani chestundi?
• Blockchain enduku use chesaru?
• Project viva explanation cheppu
• All modules list cheppu
• Security features cheppu
• Tech stack enti?`;
  }

  if (lang === 'hindi') {
    return `Aapne poocha: "${question}"

MediChain HMS context me ye project hospital management, RFID tracking, blockchain security, patient records, billing, reports aur admin modules cover karta hai.

Aap specific question pooch sakte hain:
• RFID kaise kaam karta hai?
• Blockchain kyu use kiya?
• Viva explanation do
• All modules list
• Security features
• Tech stack`;
  }

  return `You asked: "${question}"

In the MediChain HMS context, this project covers hospital management, RFID tracking, blockchain security, patient records, billing, reports, and admin modules.

You can ask specific questions like:
• How does RFID work?
• Why is blockchain used?
• Explain this project for viva
• List all modules
• Explain security features
• What is the tech stack?`;
}

function generateReply(question) {
  const q = question.toLowerCase();
  const lang = detectLanguage(question);

  if (
    q.includes('what is') ||
    q.includes('about') ||
    q.includes('overview') ||
    q.includes('intro') ||
    q.includes('introduction') ||
    q.includes('medi') ||
    q.includes('project') ||
    q.includes('enti') ||
    q.includes('gurinchi')
  ) {
    return projectIntro(lang);
  }

  if (
    q.includes('module') ||
    q.includes('modules') ||
    q.includes('list') ||
    q.includes('features') ||
    q.includes('feature')
  ) {
    return modulesAnswer(lang);
  }

  if (
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('technology') ||
    q.includes('react') ||
    q.includes('node') ||
    q.includes('mongodb') ||
    q.includes('hardhat') ||
    q.includes('solidity')
  ) {
    return techAnswer(lang);
  }

  if (
    q.includes('rfid') ||
    q.includes('card') ||
    q.includes('uid') ||
    q.includes('hardware') ||
    q.includes('strict')
  ) {
    return rfidAnswer(lang);
  }

  if (
    q.includes('blockchain') ||
    q.includes('hash') ||
    q.includes('transaction') ||
    q.includes('immutable') ||
    q.includes('audit')
  ) {
    return blockchainAnswer(lang);
  }

  if (
    q.includes('demo') ||
    q.includes('link') ||
    q.includes('login') ||
    q.includes('password') ||
    q.includes('github')
  ) {
    return demoAnswer(lang);
  }

  if (
    q.includes('viva') ||
    q.includes('presentation') ||
    q.includes('explain') ||
    q.includes('interview')
  ) {
    return vivaAnswer(lang);
  }

  if (
    q.includes('security') ||
    q.includes('secure') ||
    q.includes('jwt') ||
    q.includes('safe')
  ) {
    return securityAnswer(lang);
  }

  return fallbackAnswer(question, lang);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text:
        'Namaste! 👋 Nenu MediChain HMS Assistant.\n\nRFID, Blockchain, modules, tech stack, demo, viva explanation, security features emaina adagachu.'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;

    setInput('');
    setLoading(true);

    setMsgs(prev => [...prev, { role: 'user', text: q }]);

    setTimeout(() => {
      const reply = generateReply(q);
      setMsgs(prev => [...prev, { role: 'bot', text: reply }]);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#1565C0',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 16px rgba(21,101,192,0.4)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.target.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            zIndex: 999,
            width: '360px',
            height: '520px',
            borderRadius: '16px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#0D2137',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1565C0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              🏥
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>
                MediChain Assistant
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                Project helper chatbot
              </div>
            </div>

            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4CAF50',
              }}
            ></div>
          </div>

          {/* Quick Buttons */}
          <div
            style={{
              padding: '8px 12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--card)',
            }}
          >
            {QUICK.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  fontSize: '10px',
                  padding: '4px 8px',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  background: 'var(--bg)',
                  color: 'var(--text2)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: 'var(--bg)',
            }}
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '6px',
                  alignItems: 'flex-end',
                }}
              >
                {m.role === 'bot' && (
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#1565C0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      flexShrink: 0,
                    }}
                  >
                    🏥
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '80%',
                    padding: '9px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    background: m.role === 'user' ? '#1565C0' : 'var(--card)',
                    color: m.role === 'user' ? '#fff' : 'var(--text)',
                    border: m.role === 'bot' ? '1px solid var(--border)' : 'none',
                    borderBottomLeftRadius: m.role === 'bot' ? '4px' : '12px',
                    borderBottomRightRadius: m.role === 'user' ? '4px' : '12px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#1565C0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  🏥
                </div>

                <div
                  style={{
                    padding: '10px 14px',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    borderBottomLeftRadius: '4px',
                    display: 'flex',
                    gap: '4px',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--text3)',
                        animation: `bounce 1.2s ${i * 0.2}s infinite`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '10px 12px',
              display: 'flex',
              gap: '8px',
              background: 'var(--card)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="MediChain HMS gurinchi adagandi..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '12px',
                background: 'var(--bg)',
                color: 'var(--text)',
                outline: 'none',
              }}
            />

            <button
              onClick={() => send()}
              disabled={loading}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#1565C0',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                color: '#fff',
                fontSize: '14px',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes bounce {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </>
  );
}