import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRFID } from '../../context/RFIDContext';
import './Layout.css';

const nav = [
  { to: '/', icon: '📊', label: 'MIS Dashboard', end: true },
  { to: '/rfid', icon: '📡', label: 'RFID Manager' },
  { section: 'Clinical' },
  { to: '/patients', icon: '🧑‍⚕️', label: 'Patient Registration' },
  { to: '/inpatients', icon: '🛏️', label: 'In-Patient Mgmt' },
  { to: '/appointments', icon: '📅', label: 'Appointments' },
  { to: '/emergency', icon: '🚨', label: 'Emergency', badge: 'live' },
  { to: '/ot', icon: '🏥', label: 'Operation Theatre' },
  { to: '/nurse', icon: '💉', label: 'Nurse Station' },
  { to: '/discharge', icon: '📋', label: 'Discharge Summary' },
  { to: '/doctors', icon: '👨‍⚕️', label: 'Doctor Management' },
  { section: 'Diagnostics' },
  { to: '/laboratory', icon: '🔬', label: 'Laboratory' },
  { to: '/radiology', icon: '🩻', label: 'Radiology' },
  { to: '/bloodbank', icon: '🩸', label: 'Blood Bank' },
  { to: '/phlebotomy', icon: '💊', label: 'Phlebotomy' },
  { section: 'Finance' },
  { to: '/billing', icon: '💰', label: 'Billing & Collection' },
  { to: '/insurance', icon: '🛡️', label: 'Insurance & E-Claim' },
  { section: 'Support' },
  { to: '/medicine', icon: '💊', label: 'Medicine Inventory' },
  { to: '/ambulance', icon: '🚑', label: 'Ambulance' },
  { to: '/linen', icon: '🧺', label: 'Linen & Laundry' },
  { to: '/cssd', icon: '⚗️', label: 'CSSD' },
  { to: '/mortuary', icon: '🏛️', label: 'Mortuary Mgmt' },
  { to: '/feedback', icon: '💬', label: 'Feedback' },
  { section: 'Admin' },
  { to: '/hr', icon: '👥', label: 'HR Management' },
  { to: '/mrd', icon: '🗂️', label: 'MRD' },
  { to: '/reports', icon: '📈', label: 'MIS Reports' },
  { to: '/security', icon: '🔒', label: 'Security & Audit' },
  { to: '/system', icon: '⚙️', label: 'System Control' },
  { to:'/chatbot', icon:'🤖', label:'AI Assistant' },
];

export default function Layout() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const { rfidConnected } = useRFID();

  const handleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">
          <span style={{ fontSize: '26px' }}>🏥</span>
          <div>
            <div className="logo-title">MediChain HMS</div>
            <div className="logo-sub">RFID + Blockchain</div>
          </div>
        </div>

        <div
          style={{
            padding: '8px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '4px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: rfidConnected ? '#4CAF50' : '#f44336',
                flexShrink: 0,
              }}
            ></div>

            <span
              style={{
                color: rfidConnected ? '#4CAF50' : '#f44336',
                fontWeight: '600',
              }}
            >
              RFID {rfidConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <nav className="nav">
          {nav.map((item, i) =>
            item.section ? (
              <div key={i} className="nav-section">
                {item.section}
              </div>
            ) : (
              <NavLink
                key={i}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-item${isActive ? ' active' : ''}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>

                {item.badge === 'live' && (
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#f44336',
                      animation: 'blink 1s infinite',
                    }}
                  ></span>
                )}
              </NavLink>
            )
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div>
              <div className="user-name">Admin</div>
              <div className="user-email">admin@medichain.com</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-right">
            <div
              style={{
                fontSize: '12px',
                padding: '5px 12px',
                background: rfidConnected
                  ? 'var(--green-light)'
                  : 'var(--red-light)',
                color: rfidConnected ? 'var(--green)' : 'var(--red)',
                borderRadius: '20px',
                fontWeight: '600',
              }}
            >
              📡 RFID {rfidConnected ? 'Online' : 'Offline'}
            </div>

            <button className="icon-btn" onClick={handleDarkMode}>
              {dark ? '☀️' : '🌙'}
            </button>

            <button className="icon-btn logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}