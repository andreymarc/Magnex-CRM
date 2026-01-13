import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiCheck, FiClock, FiAlertCircle, FiCalendar } from 'react-icons/fi'
import { getTasks, deleteTask, updateTask, getTaskStats } from '../../../services/tasksService'
import TaskModal from './TaskModal'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import { format, isPast, isToday, isTomorrow } from 'date-fns'

export default function TasksList() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dueDateFilter, setDueDateFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
    loadStats()
  }, [searchTerm, statusFilter, priorityFilter, typeFilter, dueDateFilter])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) {
        filters.search = searchTerm
      }
      
      if (statusFilter !== 'all') {
        filters.status = statusFilter
      }

      if (priorityFilter !== 'all') {
        filters.priority = priorityFilter
      }

      if (typeFilter !== 'all') {
        filters.type = typeFilter
      }

      if (dueDateFilter !== 'all') {
        filters.dueDate = dueDateFilter
      }

      const result = await getTasks(filters)
      
      if (result.error) {
        setError(result.message || 'Failed to load tasks')
        setTasks([])
      } else {
        setTasks(result.data || [])
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    const result = await getTaskStats()
    if (!result.error) {
      setStats(result.data)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(id)
      if (!result.error) {
        loadTasks()
        loadStats()
      } else {
        alert(result.message || 'Failed to delete task')
      }
    }
  }

  const handleComplete = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    const result = await updateTask(task.id, { status: newStatus })
    if (!result.error) {
      loadTasks()
      loadStats()
    }
  }

  const handleEdit = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
    loadTasks()
    loadStats()
  }

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert':
        return <FiAlertCircle className="w-4 h-4" />
      case 'reminder':
        return <FiClock className="w-4 h-4" />
      default:
        return <FiCheck className="w-4 h-4" />
    }
  }

  const getDueDateLabel = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    if (isPast(date) && !isToday(date)) {
      return { label: 'Overdue', color: 'text-red-600 font-semibold' }
    }
    if (isToday(date)) {
      return { label: 'Today', color: 'text-orange-600 font-semibold' }
    }
    if (isTomorrow(date)) {
      return { label: 'Tomorrow', color: 'text-yellow-600' }
    }
    return { label: format(date, 'MMM d'), color: 'text-gray-600' }
  }

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:pr-16">
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
                <h1 className="text-3xl font-bold text-gray-900">Tasks & Alerts</h1>
                <p className="text-gray-600 mt-1">ניהול משימות והתראות</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-yellow-600">{stats.in_progress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                  <div className="text-sm text-gray-600">Overdue</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600">{stats.due_today}</div>
                  <div className="text-sm text-gray-600">Due Today</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
                  <div className="text-sm text-gray-600">Urgent</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600">{stats.high}</div>
                  <div className="text-sm text-gray-600">High Priority</div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2 flex-wrap">
                  <FiFilter className="text-gray-400 w-5 h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="task">Task</option>
                    <option value="reminder">Reminder</option>
                    <option value="alert">Alert</option>
                  </select>
                  <select
                    value={dueDateFilter}
                    onChange={(e) => setDueDateFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Dates</option>
                    <option value="overdue">Overdue</option>
                    <option value="today">Due Today</option>
                    <option value="this_week">This Week</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {tasks.length > 0 && tasks[0]?.usingMockData && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">📝 Using Demo Data</p>
                <p className="text-sm mt-1">You're currently viewing mock data. Set up Supabase to use real data persistence.</p>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">Note: {error}</p>
                <p className="text-sm mt-1">Please configure Supabase in your .env file to use this feature.</p>
              </div>
            )}

            {/* Tasks List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <FiCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No tasks found</p>
                  <p className="text-gray-400 text-sm mt-2">Click "Add Task" to create your first task</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {tasks.map((task) => {
                    const dueDateInfo = getDueDateLabel(task.due_date)
                    return (
                      <div
                        key={task.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          task.status === 'completed' ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <button
                            onClick={() => handleComplete(task)}
                            className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              task.status === 'completed'
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-primary-500'
                            }`}
                          >
                            {task.status === 'completed' && <FiCheck className="w-4 h-4" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className={`text-lg font-medium text-gray-900 ${
                                  task.status === 'completed' ? 'line-through' : ''
                                }`}>
                                  {task.title}
                                </h3>
                                {task.description && (
                                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                )}
                                <div className="flex items-center space-x-4 mt-2 flex-wrap">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded border ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                  <span className="flex items-center space-x-1 text-xs text-gray-500">
                                    {getTypeIcon(task.type)}
                                    <span className="capitalize">{task.type}</span>
                                  </span>
                                  {dueDateInfo && (
                                    <span className={`flex items-center space-x-1 text-xs ${dueDateInfo.color}`}>
                                      <FiCalendar className="w-3 h-3" />
                                      <span>{dueDateInfo.label}</span>
                                    </span>
                                  )}
                                  {task.related_to_type && (
                                    <span className="text-xs text-gray-500">
                                      Related to: {task.related_to_type}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => handleEdit(task)}
                                  className="text-primary-600 hover:text-primary-900 p-2"
                                >
                                  <FiEdit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(task.id)}
                                  className="text-red-600 hover:text-red-900 p-2"
                                >
                                  <FiTrash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Task Modal */}
            <TaskModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              task={selectedTask}
            />
          </div>
        </main>
      </div>

    </div>
  )
}

