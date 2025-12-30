import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import PricingPage from './components/PricingPage'
import RegisterPage from './components/RegisterPage'
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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/leads" element={<LeadsList />} />
        <Route path="/dashboard/contacts" element={<ContactsList />} />
        <Route path="/dashboard/tasks" element={<TasksList />} />
        <Route path="/dashboard/deals" element={<DealsList />} />
        <Route path="/dashboard/schedule" element={<ScheduleList />} />
        <Route path="/dashboard/documents" element={<DocumentsList />} />
        <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />
        <Route path="/dashboard/payments" element={<PaymentsList />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  )
}

export default App
