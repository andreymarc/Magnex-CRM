import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { createLead, updateLead } from '../../../services/leadsService'

const translations = {
  title: {
    add: 'הוסף מתעניין חדש',
    edit: 'ערוך מתעניין'
  },
  fields: {
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    email: 'אימייל',
    phone: 'טלפון',
    company: 'חברה',
    jobTitle: 'תפקיד',
    source: 'מקור',
    status: 'סטטוס',
    leadScore: 'ציון מתעניין',
    notes: 'הערות'
  },
  source: {
    select: 'בחר מקור',
    website: 'אתר',
    referral: 'המלצה',
    campaign: 'קמפיין',
    social: 'רשתות חברתיות',
    other: 'אחר'
  },
  status: {
    new: 'חדש',
    contacted: 'נוצר קשר',
    qualified: 'מוכשר',
    converted: 'הומר',
    lost: 'אבד'
  },
  buttons: {
    cancel: 'ביטול',
    create: 'צור',
    update: 'עדכן',
    saving: 'שומר...'
  },
  errors: {
    saveFailed: 'שמירת המתעניין נכשלה',
    unexpected: 'אירעה שגיאה בלתי צפויה'
  }
}

export default function LeadModal({ isOpen, onClose, lead }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    source: '',
    status: 'new',
    score: 0,
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (lead) {
      setFormData({
        first_name: lead.first_name || '',
        last_name: lead.last_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        job_title: lead.job_title || '',
        source: lead.source || '',
        status: lead.status || 'new',
        score: lead.score || 0,
        notes: lead.notes || ''
      })
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        job_title: '',
        source: '',
        status: 'new',
        score: 0,
        notes: ''
      })
    }
    setError(null)
  }, [lead, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let result
      if (lead) {
        result = await updateLead(lead.id, formData)
      } else {
        result = await createLead(formData)
      }

      if (result.error) {
        setError(result.message || translations.errors.saveFailed)
      } else {
        onClose()
      }
    } catch (err) {
      setError(translations.errors.unexpected)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900" dir="rtl">
            {lead ? translations.title.edit : translations.title.add}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.firstName} *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.lastName} *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.company}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.jobTitle}
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.source}
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dir="rtl"
              >
                <option value="">{translations.source.select}</option>
                <option value="website">{translations.source.website}</option>
                <option value="referral">{translations.source.referral}</option>
                <option value="campaign">{translations.source.campaign}</option>
                <option value="social">{translations.source.social}</option>
                <option value="other">{translations.source.other}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.status}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dir="rtl"
              >
                <option value="new">{translations.status.new}</option>
                <option value="contacted">{translations.status.contacted}</option>
                <option value="qualified">{translations.status.qualified}</option>
                <option value="converted">{translations.status.converted}</option>
                <option value="lost">{translations.status.lost}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              {translations.fields.leadScore}
            </label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              {translations.fields.notes}
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              dir="rtl"
            >
              {translations.buttons.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              dir="rtl"
            >
              {loading ? translations.buttons.saving : (lead ? translations.buttons.update : translations.buttons.create)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

