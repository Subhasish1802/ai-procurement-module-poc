import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CreateTender from './pages/CreateTender'
import Evaluation from './pages/Evaluation'
import BidSubmission from './pages/BidSubmission'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenders/new" element={<CreateTender />} />
        <Route path="/evaluate/:id" element={<Evaluation />} />
        <Route path="/bid/:id" element={<BidSubmission />} />
      </Route>
    </Routes>
  )
}
