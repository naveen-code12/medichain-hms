import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RFIDProvider } from './context/RFIDContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Patients from './pages/Patients/Patients';
import InPatients from './pages/Patients/InPatients';
import Appointments from './pages/Patients/Appointments';
import Emergency from './pages/Emergency/Emergency';
import OT from './pages/OT/OT';
import NurseStation from './pages/Nurse/NurseStation';
import Discharge from './pages/Discharge/Discharge';
import Doctors from './pages/Doctors/Doctors';
import Laboratory from './pages/Diagnostics/Laboratory';
import Radiology from './pages/Diagnostics/Radiology';
import BloodBank from './pages/Diagnostics/BloodBank';
import Phlebotomy from './pages/Diagnostics/Phlebotomy';
import Billing from './pages/Finance/Billing';
import Insurance from './pages/Finance/Insurance';
import MedicineInventory from './pages/Support/MedicineInventory';
import Ambulance from './pages/Support/Ambulance';
import Linen from './pages/Support/Linen';
import CSSD from './pages/Support/CSSD';
import Mortuary from './pages/Support/Mortuary';
import Feedback from './pages/Support/Feedback';
import HRManagement from './pages/Admin/HRManagement';
import MRD from './pages/Admin/MRD';
import MISReports from './pages/Admin/MISReports';
import Security from './pages/Admin/Security';
import SystemControl from './pages/Admin/SystemControl';
import RFIDModule from './pages/RFID/RFIDModule';
import ChatbotPage from './pages/Chatbot/ChatbotPage';

const PrivateRoute = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/login" />;

export default function App() {
  return (
    <RFIDProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="inpatients" element={<InPatients />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="ot" element={<OT />} />
            <Route path="nurse" element={<NurseStation />} />
            <Route path="discharge" element={<Discharge />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="laboratory" element={<Laboratory />} />
            <Route path="radiology" element={<Radiology />} />
            <Route path="bloodbank" element={<BloodBank />} />
            <Route path="phlebotomy" element={<Phlebotomy />} />
            <Route path="billing" element={<Billing />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="medicine" element={<MedicineInventory />} />
            <Route path="ambulance" element={<Ambulance />} />
            <Route path="linen" element={<Linen />} />
            <Route path="cssd" element={<CSSD />} />
            <Route path="mortuary" element={<Mortuary />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="hr" element={<HRManagement />} />
            <Route path="mrd" element={<MRD />} />
            <Route path="reports" element={<MISReports />} />
            <Route path="security" element={<Security />} />
            <Route path="system" element={<SystemControl />} />
            <Route path="rfid" element={<RFIDModule />} />
	    <Route path="chatbot" element={<ChatbotPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RFIDProvider>
  );
}