import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { createEvent, updateEvent } from '../../../services/eventsService'
import { format } from 'date-fns'

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
        setError(result.message || 'Failed to save event')
      } else {
        onClose()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {event ? 'Edit Event' : 'Add New Event'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter event description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="meeting">Meeting</option>
                <option value="call">Call</option>
                <option value="appointment">Appointment</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
            <label className="text-sm font-medium text-gray-700">
              All Day Event
            </label>
          </div>

          {!formData.is_all_day ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter location or meeting link"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Related To Type
              </label>
              <select
                name="related_to_type"
                value={formData.related_to_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">None</option>
                <option value="lead">Lead</option>
                <option value="contact">Contact</option>
                <option value="deal">Deal</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Related To ID
              </label>
              <input
                type="text"
                name="related_to_id"
                value={formData.related_to_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter related record ID"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (event ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

