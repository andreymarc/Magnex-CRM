import { useState } from 'react'
import { FiUser, FiBell, FiShield, FiLink, FiGlobe, FiSave, FiZap, FiMail, FiKey, FiDatabase, FiCreditCard } from 'react-icons/fi'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  
  // Profile settings
  const [profile, setProfile] = useState({
    firstName: 'David',
    lastName: 'Cohen',
    email: 'david.cohen@magnex.com',
    phone: '+972-50-123-4567',
    company: 'Magnex CRM',
    jobTitle: 'CEO',
    language: 'en',
    timezone: 'Asia/Jerusalem'
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    dealUpdates: true,
    paymentReminders: true,
    weeklyReports: false,
    marketingEmails: false
  })

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordLastChanged: '2024-01-15'
  })

  // Integration settings
  const [integrations, setIntegrations] = useState({
    email: { enabled: false, provider: 'gmail' },
    calendar: { enabled: false, provider: 'google' },
    payment: { enabled: false, provider: 'stripe' },
    storage: { enabled: false, provider: 'onedrive' }
  })

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }))
  }

  const handleIntegrationToggle = (integration, enabled) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: { ...prev[integration], enabled }
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Settings saved successfully!')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'integrations', label: 'Integrations', icon: FiLink },
    { id: 'billing', label: 'Billing', icon: FiCreditCard }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        {/* Free Trial Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 text-center text-sm font-semibold">
          🎉 First Month Free - No Credit Card Required • Start Your Free Trial Today! 🎉
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">הגדרות</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-4 space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow p-6">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                        <p className="text-gray-600">Manage your personal information and preferences</p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={profile.firstName}
                              onChange={(e) => handleProfileChange('firstName', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={profile.lastName}
                              onChange={(e) => handleProfileChange('lastName', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleProfileChange('email', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              value={profile.company}
                              onChange={(e) => handleProfileChange('company', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={profile.jobTitle}
                              onChange={(e) => handleProfileChange('jobTitle', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Language
                            </label>
                            <select
                              value={profile.language}
                              onChange={(e) => handleProfileChange('language', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="en">English</option>
                              <option value="he">עברית</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Timezone
                            </label>
                            <select
                              value={profile.timezone}
                              onChange={(e) => handleProfileChange('timezone', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="Asia/Jerusalem">Asia/Jerusalem (GMT+2)</option>
                              <option value="America/New_York">America/New_York (GMT-5)</option>
                              <option value="Europe/London">Europe/London (GMT+0)</option>
                              <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
                        <p className="text-gray-600">Configure how and when you receive notifications</p>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                                {key === 'taskReminders' && 'Get reminders for upcoming tasks'}
                                {key === 'dealUpdates' && 'Notifications when deals change status'}
                                {key === 'paymentReminders' && 'Reminders for upcoming invoice due dates'}
                                {key === 'weeklyReports' && 'Weekly summary reports via email'}
                                {key === 'marketingEmails' && 'Product updates and marketing communications'}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => handleNotificationChange(key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
                        <p className="text-gray-600">Manage your account security and privacy</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={security.twoFactorAuth}
                                onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Timeout (minutes)
                          </label>
                          <input
                            type="number"
                            value={security.sessionTimeout}
                            onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                            min="5"
                            max="120"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">Automatically log out after inactivity</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">Password</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Last changed: {new Date(security.passwordLastChanged).toLocaleDateString()}
                          </p>
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            Change Password
                          </button>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">API Keys</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Manage your API keys for integrations
                          </p>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <FiKey className="w-4 h-4 inline mr-2" />
                            Manage API Keys
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Integrations Tab */}
                  {activeTab === 'integrations' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Integrations</h2>
                        <p className="text-gray-600">Connect your favorite tools and services</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FiMail className="w-8 h-8 text-blue-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">Email Integration</h3>
                                <p className="text-sm text-gray-500">Connect Gmail, Outlook, or IMAP</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <select
                                value={integrations.email.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  email: { ...prev.email, provider: e.target.value }
                                }))}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                              >
                                <option value="gmail">Gmail</option>
                                <option value="outlook">Outlook</option>
                                <option value="imap">IMAP</option>
                              </select>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={integrations.email.enabled}
                                  onChange={(e) => handleIntegrationToggle('email', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FiCalendar className="w-8 h-8 text-green-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">Calendar Sync</h3>
                                <p className="text-sm text-gray-500">Sync with Google Calendar or Outlook</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <select
                                value={integrations.calendar.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  calendar: { ...prev.calendar, provider: e.target.value }
                                }))}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                              >
                                <option value="google">Google Calendar</option>
                                <option value="outlook">Outlook Calendar</option>
                              </select>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={integrations.calendar.enabled}
                                  onChange={(e) => handleIntegrationToggle('calendar', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FiCreditCard className="w-8 h-8 text-purple-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">Payment Gateway</h3>
                                <p className="text-sm text-gray-500">Connect Stripe, PayPal, or other payment processors</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <select
                                value={integrations.payment.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  payment: { ...prev.payment, provider: e.target.value }
                                }))}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                              >
                                <option value="stripe">Stripe</option>
                                <option value="paypal">PayPal</option>
                                <option value="square">Square</option>
                              </select>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={integrations.payment.enabled}
                                  onChange={(e) => handleIntegrationToggle('payment', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FiDatabase className="w-8 h-8 text-orange-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">Cloud Storage</h3>
                                <p className="text-sm text-gray-500">Connect OneDrive, Google Drive, or Dropbox</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <select
                                value={integrations.storage.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  storage: { ...prev.storage, provider: e.target.value }
                                }))}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                              >
                                <option value="onedrive">OneDrive</option>
                                <option value="googledrive">Google Drive</option>
                                <option value="dropbox">Dropbox</option>
                              </select>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={integrations.storage.enabled}
                                  onChange={(e) => handleIntegrationToggle('storage', e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Tab */}
                  {activeTab === 'billing' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing & Subscription</h2>
                        <p className="text-gray-600">Manage your subscription and payment methods</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-6 border-2 border-primary-200 rounded-lg bg-primary-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">Premium Plan</h3>
                              <p className="text-gray-600 mt-1">₪289 per user per month</p>
                              <p className="text-sm text-gray-500 mt-2">Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FiCreditCard className="w-6 h-6 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-500">Expires 12/25</p>
                              </div>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              Update
                            </button>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">Billing History</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">Premium Plan - January 2024</p>
                                <p className="text-sm text-gray-500">{new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">₪867</p>
                                <button className="text-sm text-primary-600 hover:text-primary-700">Download</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                          <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                          <p className="text-sm text-red-700 mb-3">Once you cancel your subscription, you'll lose access to all premium features.</p>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end pt-6 border-t mt-6">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FiSave className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Assistant Button */}
      <button
        onClick={() => setAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 z-40"
        title="Open AI Assistant"
      >
        <FiZap className="w-6 h-6" />
      </button>

      {/* AI Assistant */}
      <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAIAssistantOpen(false)} />
    </div>
  )
}

