import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RFPAgent from './pages/RFPAgent';
import Evaluation from './pages/Evaluation';
import BidPortal from './pages/BidPortal';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rfp" element={<RFPAgent />} />
        <Route path="/evaluate" element={<Evaluation />} />
        <Route path="/bids" element={<BidPortal />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}
