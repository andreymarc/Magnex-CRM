import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './components/LandingPage'
import PricingPage from './components/PricingPage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard/Dashboard'
import LeadsList from './components/Dashboard/Leads/LeadsList'
import ContactsList from './components/Dashboard/Contacts/ContactsList'
import TasksList from './components/Dashboard/Tasks/TasksList'
import DealsList from './components/Dashboard/Deals/DealsList'
import ScheduleList from './components/Dashboard/Schedule/ScheduleList'
import DocumentsList from './components/Dashboard/Documents/DocumentsList'
import AnalyticsDashboard from './components/Dashboard/Analytics/AnalyticsDashboard'
import PaymentsList from './components/Dashboard/Payments/PaymentsList'
import SettingsPage from './components/Dashboard/Settings/SettingsPage'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/leads" element={<ProtectedRoute><LeadsList /></ProtectedRoute>} />
          <Route path="/dashboard/contacts" element={<ProtectedRoute><ContactsList /></ProtectedRoute>} />
          <Route path="/dashboard/tasks" element={<ProtectedRoute><TasksList /></ProtectedRoute>} />
          <Route path="/dashboard/deals" element={<ProtectedRoute><DealsList /></ProtectedRoute>} />
          <Route path="/dashboard/schedule" element={<ProtectedRoute><ScheduleList /></ProtectedRoute>} />
          <Route path="/dashboard/documents" element={<ProtectedRoute><DocumentsList /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/payments" element={<ProtectedRoute><PaymentsList /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
