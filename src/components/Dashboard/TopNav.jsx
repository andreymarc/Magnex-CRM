import { FiMenu, FiBell, FiSearch } from 'react-icons/fi'
import Logo from '../Logo'

export default function TopNav({ onMenuClick }) {
  return (
    <nav className="bg-purple-dark/95 backdrop-blur-md border-b border-purple-darker px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2 -ml-2"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <Logo size="default" />
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
          <button className="text-white/70 hover:text-white transition-colors relative p-2">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap">
            <span className="hidden sm:inline">Book a Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

