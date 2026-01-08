import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { createEvent, updateEvent } from '../../../services/eventsService'
import { format } from 'date-fns'

const translations = {
  title: {
    add: 'הוסף אירוע חדש',
    edit: 'ערוך אירוע'
  },
  fields: {
    eventTitle: 'כותרת אירוע',
    description: 'תיאור',
    type: 'סוג',
    status: 'סטטוס',
    allDayEvent: 'אירוע לכל היום',
    startTime: 'שעת התחלה',
    endTime: 'שעת סיום',
    date: 'תאריך',
    location: 'מיקום',
    relatedToType: 'קשור לסוג',
    relatedToId: 'קשור למזהה'
  },
  type: {
    meeting: 'פגישה',
    call: 'שיחה',
    appointment: 'תור',
    reminder: 'תזכורת'
  },
  status: {
    scheduled: 'מתוזמן',
    completed: 'הושלם',
    cancelled: 'בוטל'
  },
  relatedTo: {
    none: 'ללא',
    lead: 'מתעניין',
    contact: 'איש קשר',
    deal: 'עסקה',
    project: 'פרויקט'
  },
  placeholders: {
    eventTitle: 'הזן כותרת אירוע',
    description: 'הזן תיאור אירוע',
    location: 'הזן מיקום או קישור לפגישה',
    relatedId: 'הזן מזהה רשומה קשורה'
  },
  buttons: {
    cancel: 'ביטול',
    create: 'צור',
    update: 'עדכן',
    saving: 'שומר...'
  },
  errors: {
    saveFailed: 'שמירת האירוע נכשלה',
    unexpected: 'אירעה שגיאה בלתי צפויה'
  }
}

export default function EventModal({ isOpen, onClose, event, defaultDate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'meeting',
    start_time: '',
    end_time: '',
    location: '',
    is_all_day: false,
    status: 'scheduled',
    related_to_type: '',
    related_to_id: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        type: event.type || 'meeting',
        start_time: event.start_time
          ? new Date(event.start_time).toISOString().slice(0, 16)
          : '',
        end_time: event.end_time
          ? new Date(event.end_time).toISOString().slice(0, 16)
          : '',
        location: event.location || '',
        is_all_day: event.is_all_day || false,
        status: event.status || 'scheduled',
        related_to_type: event.related_to_type || '',
        related_to_id: event.related_to_id || ''
      })
    } else if (defaultDate) {
      const startDate = new Date(defaultDate)
      startDate.setHours(9, 0, 0, 0)
      const endDate = new Date(startDate)
      endDate.setHours(10, 0, 0, 0)
      
      setFormData({
        title: '',
        description: '',
        type: 'meeting',
        start_time: startDate.toISOString().slice(0, 16),
        end_time: endDate.toISOString().slice(0, 16),
        location: '',
        is_all_day: false,
        status: 'scheduled',
        related_to_type: '',
        related_to_id: ''
      })
    } else {
      const now = new Date()
      const oneHourLater = new Date(now)
      oneHourLater.setHours(oneHourLater.getHours() + 1)
      
      setFormData({
        title: '',
        description: '',
        type: 'meeting',
        start_time: now.toISOString().slice(0, 16),
        end_time: oneHourLater.toISOString().slice(0, 16),
        location: '',
        is_all_day: false,
        status: 'scheduled',
        related_to_type: '',
        related_to_id: ''
      })
    }
    setError(null)
  }, [event, defaultDate, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const eventData = {
        ...formData,
        start_time: formData.is_all_day
          ? new Date(formData.start_time).toISOString()
          : new Date(formData.start_time).toISOString(),
        end_time: formData.is_all_day
          ? new Date(formData.start_time).toISOString()
          : new Date(formData.end_time).toISOString(),
        related_to_type: formData.related_to_type || null,
        related_to_id: formData.related_to_id || null
      }

      let result
      if (event) {
        result = await updateEvent(event.id, eventData)
      } else {
        result = await createEvent(eventData)
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
            {event ? translations.title.edit : translations.title.add}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              {translations.fields.eventTitle} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={translations.placeholders.eventTitle}
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              {translations.fields.description}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={translations.placeholders.description}
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.type}
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dir="rtl"
              >
                <option value="meeting">{translations.type.meeting}</option>
                <option value="call">{translations.type.call}</option>
                <option value="appointment">{translations.type.appointment}</option>
                <option value="reminder">{translations.type.reminder}</option>
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
                <option value="scheduled">{translations.status.scheduled}</option>
                <option value="completed">{translations.status.completed}</option>
                <option value="cancelled">{translations.status.cancelled}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_all_day"
              checked={formData.is_all_day}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label className="text-sm font-medium text-gray-700" dir="rtl">
              {translations.fields.allDayEvent}
            </label>
          </div>

          {!formData.is_all_day ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                  {translations.fields.startTime} *
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                  {translations.fields.endTime} *
                </label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.date} *
              </label>
              <input
                type="date"
                name="start_time"
                value={formData.start_time ? formData.start_time.split('T')[0] : ''}
                onChange={(e) => {
                  const dateValue = e.target.value
                  setFormData(prev => ({
                    ...prev,
                    start_time: dateValue ? `${dateValue}T00:00` : '',
                    end_time: dateValue ? `${dateValue}T00:00` : ''
                  }))
                }}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              {translations.fields.location}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={translations.placeholders.location}
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.relatedToType}
              </label>
              <select
                name="related_to_type"
                value={formData.related_to_type}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dir="rtl"
              >
                <option value="">{translations.relatedTo.none}</option>
                <option value="lead">{translations.relatedTo.lead}</option>
                <option value="contact">{translations.relatedTo.contact}</option>
                <option value="deal">{translations.relatedTo.deal}</option>
                <option value="project">{translations.relatedTo.project}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
                {translations.fields.relatedToId}
              </label>
              <input
                type="text"
                name="related_to_id"
                value={formData.related_to_id}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={translations.placeholders.relatedId}
                dir="rtl"
              />
            </div>
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
              {loading ? translations.buttons.saving : (event ? translations.buttons.update : translations.buttons.create)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

