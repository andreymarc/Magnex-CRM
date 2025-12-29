import { FiMenu, FiBell, FiSearch } from 'react-icons/fi'
import Logo from '../Logo'

export default function TopNav() {
  return (
    <nav className="bg-purple-dark/95 backdrop-blur-md border-b border-purple-darker px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="text-white/70 hover:text-white transition-colors">
            <FiMenu className="w-5 h-5" />
          </button>
          <Logo size="default" />
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

