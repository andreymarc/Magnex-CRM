import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import LanguageSetter from './components/LanguageSetter'
import './index.css'

// Public routes - loaded immediately
import LandingPage from './components/LandingPage'
import PricingPage from './components/PricingPage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'

// Protected dashboard routes - lazy loaded for better performance
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))
const LeadsList = lazy(() => import('./components/Dashboard/Leads/LeadsList'))
const ContactsList = lazy(() => import('./components/Dashboard/Contacts/ContactsList'))
const TasksList = lazy(() => import('./components/Dashboard/Tasks/TasksList'))
const DealsList = lazy(() => import('./components/Dashboard/Deals/DealsList'))
const ScheduleList = lazy(() => import('./components/Dashboard/Schedule/ScheduleList'))
const DocumentsList = lazy(() => import('./components/Dashboard/Documents/DocumentsList'))
const AnalyticsDashboard = lazy(() => import('./components/Dashboard/Analytics/AnalyticsDashboard'))
const PaymentsList = lazy(() => import('./components/Dashboard/Payments/PaymentsList'))
const SettingsPage = lazy(() => import('./components/Dashboard/Settings/SettingsPage'))

// Legal pages - lazy loaded
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))

// 404 page
const NotFound = lazy(() => import('./components/NotFound'))

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center" dir="rtl">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-gray-400">טוען...</p>
    </div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <LanguageSetter />
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

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

                {/* 404 - catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
