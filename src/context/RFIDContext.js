import { createContext, useContext, useState, useEffect } from 'react';

const RFIDContext = createContext();

export function RFIDProvider({ children }) {
  const [rfidConnected, setRfidConnected] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanLog, setScanLog] = useState([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if RFID hardware is connected via backend
    const checkRFID = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rfid/status');
        const data = await res.json();
        setRfidConnected(data.connected || false);
      } catch {
        setRfidConnected(false);
      }
      setChecking(false);
    };
    checkRFID();
    const interval = setInterval(checkRFID, 5000);
    return () => clearInterval(interval);
  }, []);

  const addScan = (scan) => {
    setLastScan(scan);
    setScanLog(prev => [scan, ...prev.slice(0, 49)]);
  };

  // Simulate scan (only for demo — blocked in strict mode)
  const simulateScan = () => {
    if (!rfidConnected) return false;
    const uid = Math.random().toString(16).substr(2, 8).toUpperCase();
    addScan({ uid, time: new Date().toLocaleTimeString(), type: 'Simulated' });
    return uid;
  };

  return (
    <RFIDContext.Provider value={{ rfidConnected, lastScan, scanLog, addScan, simulateScan, checking }}>
      {children}
    </RFIDContext.Provider>
  );
}

export const useRFID = () => useContext(RFIDContext);