# 🏥 MediChain HMS — RFID + Blockchain Hospital Management System

A complete Hospital Management System built with React.js, Node.js, MongoDB, and Blockchain (Hardhat).

## 🚀 Features
- 25+ Hospital Modules (Patients, IPD, OT, Lab, Pharmacy, Billing, HR...)
- RFID Integration (RC522 + Arduino) — Strict mode
- Blockchain transaction logging (Hardhat local network)
- Emergency alerts, Bed management, Blood bank
- Dark mode, Print/PDF bills, MIS Reports

## 🛠️ Tech Stack
- **Frontend:** React.js, React Router, Recharts
- **Backend:** Node.js, Express.js, MongoDB
- **Blockchain:** Solidity, Hardhat, Ethers.js
- **RFID:** RC522 Module + Arduino Mega

## 📦 Installation

### Frontend
```bash
cd medichain-frontend
npm install
npm start
```

### Backend
```bash
cd medichain-hms/backend
npm install
node server.js
```

### Blockchain
```bash
cd medichain-hms/blockchain
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

## 📡 RFID Setup
1. RC522 → Arduino Mega (SDA:53, SCK:52, MOSI:51, MISO:50, RST:5)
2. Arduino → USB → PC
3. Backend .env: `RFID_PORT=COM3`
4. Restart server — auto connects!

## 👨‍💻 Developer
Built with ❤️ using React + Node + Blockchain

## ⭐ Star this repo if useful!
