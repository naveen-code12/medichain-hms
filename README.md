# 🏥 MediChain HMS — RFID + Blockchain Hospital Management System

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Blockchain](https://img.shields.io/badge/Blockchain-Hardhat-yellow?logo=ethereum)
![RFID](https://img.shields.io/badge/RFID-RC522-red)

A complete, production-ready **Hospital Management System** built with modern web technologies, featuring real-time **RFID integration** and **Blockchain** transaction logging.

---

## 🚀 Live Demo
👉 [https://naveen-code12.github.io/medichain-hms](https://naveen-code12.github.io/medichain-hms)

---

## ✨ Features

### 🏥 25+ Hospital Modules
| Module | Description |
|--------|-------------|
| 📊 MIS Dashboard | Real-time stats, charts, blockchain log |
| 🧑‍⚕️ Patient Registration | RFID-based patient onboarding |
| 🛏️ In-Patient Management | Bed allocation, ward tracking |
| 📅 Appointments | Doctor scheduling |
| 🚨 Emergency | Live alerts with real-time monitoring |
| 🏥 Operation Theatre | OT scheduling and status |
| 💉 Nurse Station | Task management per patient |
| 📋 Discharge Summary | Blockchain-verified discharge |
| 👨‍⚕️ Doctor Management | Staff directory |
| 🔬 Laboratory | Test ordering and results |
| 🩻 Radiology | Scan reports |
| 🩸 Blood Bank | Blood unit tracking |
| 💊 Phlebotomy | Sample collection |
| 💰 Billing & Collection | Invoice + print receipts |
| 🛡️ Insurance & E-Claim | Claim management |
| 💊 Medicine Inventory | Stock alerts |
| 🚑 Ambulance | Fleet management |
| 🧺 Linen & Laundry | Supply tracking |
| ⚗️ CSSD | Sterilization records |
| 🏛️ Mortuary | Mortuary management |
| 💬 Feedback | Patient satisfaction |
| 👥 HR Management | Staff records |
| 🗂️ MRD | Medical records |
| 📈 MIS Reports | Analytics & charts |
| 🔒 Security & Audit | Access logs |
| ⚙️ System Control | Configuration |

### 📡 RFID Integration
- RC522 RFID Reader + Arduino Mega
- **Strict Mode** — Modules blocked without hardware
- Auto-detect on hardware connect
- Patient, Staff, Medicine tracking via UID

### 🔗 Blockchain
- Hardhat local network
- Patient registration on-chain
- Lab results, billing, discharge — all logged
- Transaction hash displayed in UI

---

## 🛠️ Tech Stack
Frontend  → React.js 19, React Router, Recharts, React Hot Toast
Backend   → Node.js, Express.js, MongoDB, Mongoose
Blockchain→ Solidity, Hardhat, Ethers.js
RFID      → RC522 Module, Arduino Mega, SerialPort
Auth      → JWT Tokens

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the repo
```bash
git clone https://github.com/naveen-code12/medichain-hms.git
cd medichain-hms
```

### 2. Frontend Setup
```bash
cd medichain-frontend
npm install
npm start
```
Open: `http://localhost:3000`

### 3. Backend Setup
```bash
cd medichain-hms/backend
npm install
```

Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/medichain
JWT_SECRET=medichain_secret_key
PORT=5000
CONTRACT_ADDRESS=your_contract_address
RFID_PORT=COM3
```

```bash
node server.js
```

### 4. Blockchain Setup
```bash
cd medichain-hms/blockchain
npm install
npx hardhat node
# New terminal:
npx hardhat run scripts/deploy.js --network localhost
```

---

## 📡 RFID Hardware Setup
RC522 Pin  →  Arduino Mega
SDA        →  Pin 53
SCK        →  Pin 52
MOSI       →  Pin 51
MISO       →  Pin 50
GND        →  GND
3.3V       →  3.3V
RST        →  Pin 5

1. Connect RC522 → Arduino as above
2. Arduino → USB → PC
3. Set `RFID_PORT=COM3` in `.env`
4. Restart backend — auto connects!

**Without RFID hardware** — modules show lock screen until connected.

---

## 🔐 Default Login
Email    : admin@medichain.com
Password : admin123

---

## 📸 Screenshots

> Dashboard with real-time stats, blockchain log, and charts

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License — free to use, modify, distribute.

---

## ⭐ Support

If this project helped you, please give it a **star** ⭐ on GitHub!

**Share cheyyandi:**
- LinkedIn lo post cheyyandi
- Twitter lo tag cheyyandi
- Friends ki pampinchu

---

Made with ❤️ | MediChain HMS