import { useState, useEffect } from 'react'
import { FiUser, FiBell, FiShield, FiLink, FiSave, FiZap, FiMail, FiKey, FiDatabase, FiCreditCard, FiCamera, FiCalendar } from 'react-icons/fi'
import { useAuth } from '../../../context/AuthContext'
import { useLanguage } from '../../../context/LanguageContext'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'

export default function SettingsPage() {
  const { user, profile: authProfile, updateProfile, uploadProfilePhoto } = useAuth()
  const { language, changeLanguage, isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Profile settings form
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    language: 'he',
    timezone: 'Asia/Jerusalem'
  })

  // Load profile data from auth context
  useEffect(() => {
    if (authProfile && user) {
      const nameParts = (authProfile.full_name || '').split(' ')
      setProfileForm({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: authProfile.phone || '',
        company: authProfile.company_name || '',
        jobTitle: authProfile.job_title || '',
        language: authProfile.language || language || 'he',
        timezone: authProfile.timezone || 'Asia/Jerusalem'
      })
    }
  }, [authProfile, user, language])

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
    setProfileForm(prev => ({ ...prev, [field]: value }))
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

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      await uploadProfilePhoto(file)
    } catch (error) {
      console.error('Upload error:', error)
      alert('העלאת התמונה נכשלה')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await updateProfile({
        full_name: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
        phone: profileForm.phone,
        company_name: profileForm.company,
        job_title: profileForm.jobTitle,
        language: profileForm.language,
        timezone: profileForm.timezone
      })
      // Update language context when language is changed
      if (profileForm.language !== language) {
        changeLanguage(profileForm.language)
      }
      alert('ההגדרות נשמרו בהצלחה!')
    } catch (error) {
      console.error('Save error:', error)
      alert('שמירת ההגדרות נכשלה')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'פרופיל', icon: FiUser },
    { id: 'notifications', label: 'התראות', icon: FiBell },
    { id: 'security', label: 'אבטחה', icon: FiShield },
    { id: 'integrations', label: 'אינטגרציות', icon: FiLink },
    { id: 'billing', label: 'חיובים', icon: FiCreditCard }
  ]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:pr-16">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">הגדרות</h1>
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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">הגדרות פרופיל</h2>
                        <p className="text-gray-600">נהל את המידע האישי שלך וההעדפות</p>
                      </div>

                      {/* Profile Photo Section */}
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative">
                          <img
                            src={authProfile?.avatar_url || `https://ui-avatars.com/api/?name=${profileForm.firstName}+${profileForm.lastName}&background=6366f1&color=fff&size=80`}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                          />
                          <label className={`absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-700 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoUpload}
                              disabled={uploading}
                            />
                            <FiCamera className="w-4 h-4" />
                          </label>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">תמונת פרופיל</h3>
                          <p className="text-sm text-gray-500">
                            {uploading ? 'מעלה...' : 'לחץ על סמל המצלמה כדי להעלות תמונה חדשה'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              שם פרטי *
                            </label>
                            <input
                              type="text"
                              value={profileForm.firstName}
                              onChange={(e) => handleProfileChange('firstName', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              שם משפחה *
                            </label>
                            <input
                              type="text"
                              value={profileForm.lastName}
                              onChange={(e) => handleProfileChange('lastName', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            אימייל *
                          </label>
                          <input
                            type="email"
                            value={profileForm.email}
                            disabled
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                          />
                          <p className="text-xs text-gray-500 mt-1">לא ניתן לשנות את האימייל</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            טלפון
                          </label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              חברה
                            </label>
                            <input
                              type="text"
                              value={profileForm.company}
                              onChange={(e) => handleProfileChange('company', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              תפקיד
                            </label>
                            <input
                              type="text"
                              value={profileForm.jobTitle}
                              onChange={(e) => handleProfileChange('jobTitle', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              שפה
                            </label>
                            <select
                              value={profileForm.language}
                              onChange={(e) => handleProfileChange('language', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="en">English</option>
                              <option value="he">עברית</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              אזור זמן
                            </label>
                            <select
                              value={profileForm.timezone}
                              onChange={(e) => handleProfileChange('timezone', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">הגדרות התראות</h2>
                        <p className="text-gray-600">הגדר איך ומתי תקבל התראות</p>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {key === 'emailNotifications' && 'קבל התראות אימייל לעדכונים חשובים'}
                                {key === 'taskReminders' && 'קבל תזכורות למשימות קרובות'}
                                {key === 'dealUpdates' && 'התראות כאשר עסקאות משנות סטטוס'}
                                {key === 'paymentReminders' && 'תזכורות לתאריכי תשלום קרובים'}
                                {key === 'weeklyReports' && 'דוחות סיכום שבועיים בדוא"ל'}
                                {key === 'marketingEmails' && 'עדכוני מוצר ותקשורת שיווקית'}
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">הגדרות אבטחה</h2>
                        <p className="text-gray-600">נהל את אבטחת החשבון והפרטיות שלך</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900">אימות דו-שלבי</h3>
                              <p className="text-sm text-gray-500">הוסף שכבת אבטחה נוספת לחשבון שלך</p>
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
                            זמן פגימת הפעלה (דקות)
                          </label>
                          <input
                            type="number"
                            value={security.sessionTimeout}
                            onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                            min="5"
                            max="120"
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">התנתק אוטומטית לאחר חוסר פעילות</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">סיסמה</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            שונה לאחרונה: {new Date(security.passwordLastChanged).toLocaleDateString('he-IL')}
                          </p>
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            שנה סיסמה
                          </button>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">מפתחות API</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            נהל את מפתחות ה-API שלך לאינטגרציות
                          </p>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <FiKey className="w-4 h-4 inline ml-2" />
                            נהל מפתחות API
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Integrations Tab */}
                  {activeTab === 'integrations' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">אינטגרציות</h2>
                        <p className="text-gray-600">חבר את הכלים והשירותים המועדפים עליך</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FiMail className="w-8 h-8 text-blue-600 flex-shrink-0" />
                              <div>
                                <h3 className="font-medium text-gray-900">אינטגרציית אימייל</h3>
                                <p className="text-sm text-gray-500">חבר Gmail, Outlook או IMAP</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <select
                                value={integrations.email.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  email: { ...prev.email, provider: e.target.value }
                                }))}
                                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
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
                            <div className="flex items-center gap-3">
                              <FiCalendar className="w-8 h-8 text-green-600 flex-shrink-0" />
                              <div>
                                <h3 className="font-medium text-gray-900">סנכרון יומן</h3>
                                <p className="text-sm text-gray-500">סנכרן עם Google Calendar או Outlook</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <select
                                value={integrations.calendar.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  calendar: { ...prev.calendar, provider: e.target.value }
                                }))}
                                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
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
                            <div className="flex items-center gap-3">
                              <FiCreditCard className="w-8 h-8 text-purple-600 flex-shrink-0" />
                              <div>
                                <h3 className="font-medium text-gray-900">שער תשלום</h3>
                                <p className="text-sm text-gray-500">חבר Stripe, PayPal או מעבדי תשלום אחרים</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <select
                                value={integrations.payment.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  payment: { ...prev.payment, provider: e.target.value }
                                }))}
                                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
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
                            <div className="flex items-center gap-3">
                              <FiDatabase className="w-8 h-8 text-orange-600 flex-shrink-0" />
                              <div>
                                <h3 className="font-medium text-gray-900">אחסון ענן</h3>
                                <p className="text-sm text-gray-500">חבר OneDrive, Google Drive או Dropbox</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <select
                                value={integrations.storage.provider}
                                onChange={(e) => setIntegrations(prev => ({
                                  ...prev,
                                  storage: { ...prev.storage, provider: e.target.value }
                                }))}
                                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">חיובים ומנוי</h2>
                        <p className="text-gray-600">נהל את המנוי ואמצעי התשלום שלך</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-6 border-2 border-primary-200 rounded-lg bg-primary-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">תוכנית פרימיום</h3>
                              <p className="text-gray-600 mt-1">₪289 למשתמש לחודש</p>
                              <p className="text-sm text-gray-500 mt-2">תאריך חיוב הבא: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL')}</p>
                            </div>
                            <div className="text-right">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                פעיל
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">אמצעי תשלום</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FiCreditCard className="w-6 h-6 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-500">פג תוקף 12/25</p>
                              </div>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              עדכן
                            </button>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">היסטוריית חיובים</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">תוכנית פרימיום - ינואר 2024</p>
                                <p className="text-sm text-gray-500">{new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL')}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">₪867</p>
                                <button className="text-sm text-primary-600 hover:text-primary-700">הורד</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                          <h3 className="font-medium text-red-900 mb-2">אזור מסוכן</h3>
                          <p className="text-sm text-red-700 mb-3">ביטול המנוי יגרום לאובדן גישה לכל התכונות הפרימיום.</p>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            בטל מנוי
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end pt-6 border-t mt-6">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className={`flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                    >
                      <FiSave className="w-5 h-5" />
                      <span>{saving ? 'שומר...' : 'שמור שינויים'}</span>
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
        title="פתח עוזר AI"
      >
        <FiZap className="w-6 h-6" />
      </button>

      {/* AI Assistant */}
      <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAIAssistantOpen(false)} />
    </div>
  )
}

