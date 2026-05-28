import { createContext, useContext, useState, useEffect } from 'react';

const RFIDContext = createContext();

export function RFIDProvider({ children }) {
  const [rfidConnected, setRfidConnected] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanLog, setScanLog] = useState([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRFID = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rfid/status', {
          signal: AbortSignal.timeout(2000)
        });
        const data = await res.json();
        setRfidConnected(data.connected || false);
      } catch {
        // Backend not running = RFID not connected — no error
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

  return (
    <RFIDContext.Provider value={{
      rfidConnected,
      lastScan,
      scanLog,
      addScan,
      checking
    }}>
      {children}
    </RFIDContext.Provider>
  );
}

export const useRFID = () => useContext(RFIDContext);