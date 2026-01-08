import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiCalendar, FiClock, FiMapPin, FiUsers, FiZap } from 'react-icons/fi'
import { getEvents, deleteEvent, getUpcoming } from '../../../services/eventsService'
import EventModal from './EventModal'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns'

export default function ScheduleList() {
  const [events, setEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [error, setError] = useState(null)
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // 'month', 'week', 'day', 'list'

  useEffect(() => {
    loadEvents()
    loadUpcomingEvents()
  }, [searchTerm, typeFilter, currentDate, viewMode])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) {
        filters.search = searchTerm
      }
      
      if (typeFilter !== 'all') {
        filters.type = typeFilter
      }

      if (viewMode === 'month') {
        // Load events for the current month
        filters.date = currentDate
      }

      const result = await getEvents(filters)
      
      if (result.error) {
        setError(result.message || 'Failed to load events')
        setEvents([])
      } else {
        setEvents(result.data || [])
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const loadUpcomingEvents = async () => {
    const result = await getUpcoming(7)
    if (!result.error) {
      setUpcomingEvents(result.data || [])
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const result = await deleteEvent(id)
      if (!result.error) {
        loadEvents()
        loadUpcomingEvents()
      } else {
        alert(result.message || 'Failed to delete event')
      }
    }
  }

  const handleEdit = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    setSelectedDate(null)
    loadEvents()
    loadUpcomingEvents()
  }

  const getTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800 border-blue-300',
      call: 'bg-green-100 text-green-800 border-green-300',
      appointment: 'bg-purple-100 text-purple-800 border-purple-300',
      reminder: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_time)
      if (event.is_all_day) {
        return isSameDay(eventDate, date)
      }
      return isSameDay(eventDate, date)
    })
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const daysInMonth = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col pr-16 lg:pr-16">
          <TopNav />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col pr-16 lg:pr-16">
        <TopNav />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Schedule & Calendar</h1>
                <p className="text-gray-600 mt-1">ניהול יומן אירועים</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 ${viewMode === 'month' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
                  >
                    List
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Event</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FiFilter className="text-gray-400 w-5 h-5" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="appointment">Appointment</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {events.length > 0 && events[0]?.usingMockData && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">📝 Using Demo Data</p>
                <p className="text-sm mt-1">You're currently viewing mock data. Set up Supabase to use real data persistence.</p>
              </div>
            )}

            {/* Calendar View */}
            {viewMode === 'month' ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <button
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    ←
                  </button>
                  <h2 className="text-xl font-bold text-gray-900">
                    {format(currentDate, 'MMMM yyyy')}
                  </h2>
                  <button
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    →
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600 border-b">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {daysInMonth.map((day, idx) => {
                    const dayEvents = getEventsForDate(day)
                    const isCurrentMonth = isSameMonth(day, currentDate)
                    const isToday = isSameDay(day, new Date())
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => handleDateClick(day)}
                        className={`min-h-[100px] p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                          !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                        } ${isToday ? 'bg-primary-50 border-primary-300' : ''}`}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary-600' : ''}`}>
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(event)
                              }}
                              className={`text-xs p-1 rounded truncate border ${getTypeColor(event.type)}`}
                              title={event.title}
                            >
                              {format(new Date(event.start_time), 'HH:mm')} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* List View */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">All Events</h3>
                    </div>
                    {events.length === 0 ? (
                      <div className="text-center py-12">
                        <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No events found</p>
                        <p className="text-gray-400 text-sm mt-2">Click "Add Event" to create your first event</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded border ${getTypeColor(event.type)}`}>
                                    {event.type}
                                  </span>
                                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                                </div>
                                {event.description && (
                                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                )}
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <FiClock className="w-4 h-4" />
                                    <span>
                                      {event.is_all_day
                                        ? 'All Day'
                                        : `${format(new Date(event.start_time), 'MMM d, yyyy HH:mm')} - ${format(new Date(event.end_time), 'HH:mm')}`
                                      }
                                    </span>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center space-x-1">
                                      <FiMapPin className="w-4 h-4" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => handleEdit(event)}
                                  className="text-primary-600 hover:text-primary-900 p-2"
                                >
                                  <FiEdit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="text-red-600 hover:text-red-900 p-2"
                                >
                                  <FiTrash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                  {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-gray-500">No upcoming events</p>
                  ) : (
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEdit(event)}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="font-medium text-sm text-gray-900">{event.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {format(new Date(event.start_time), 'MMM d, yyyy HH:mm')}
                          </div>
                          {event.location && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                              <FiMapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Event Modal */}
            <EventModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              event={selectedEvent}
              defaultDate={selectedDate}
            />
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

