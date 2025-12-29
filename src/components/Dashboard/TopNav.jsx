import { FiMenu, FiBell, FiSearch } from 'react-icons/fi'

export default function TopNav() {
  return (
    <nav className="bg-purple-dark/95 backdrop-blur-md border-b border-purple-darker px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="text-white/70 hover:text-white transition-colors">
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">Magnex CRM</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="text-white/70 hover:text-white transition-colors relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            Book a Demo
          </button>
        </div>
      </div>
    </nav>
  )
}

