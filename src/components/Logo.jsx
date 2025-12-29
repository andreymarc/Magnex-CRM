export default function Logo({ size = 'default', className = '', variant = 'light' }) {
  const sizes = {
    small: {
      container: 'w-6 h-6',
      icon: 'w-4 h-4',
      text: 'text-base'
    },
    default: {
      container: 'w-8 h-8',
      icon: 'w-5 h-5',
      text: 'text-xl'
    },
    large: {
      container: 'w-10 h-10',
      icon: 'w-6 h-6',
      text: 'text-2xl'
    }
  }

  const currentSize = sizes[size] || sizes.default
  const textColor = variant === 'dark' ? 'text-gray-900' : 'text-white'

  return (
    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${className}`}>
      {/* Logo Icon - Squircle shape with very rounded corners */}
      <div 
        className={`${currentSize.container} bg-white flex items-center justify-center shadow-lg flex-shrink-0`} 
        style={{
          borderRadius: size === 'small' ? '8px' : size === 'large' ? '16px' : '12px'
        }}
      >
        <svg 
          className={`${currentSize.icon} text-purple-dark`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3.5} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      
      {/* Logo Text */}
      <span className={`${textColor} font-bold ${currentSize.text} tracking-tight whitespace-nowrap`}>
        <span className="font-extrabold">Magnex</span>
        <span className="font-semibold ml-1.5">CRM</span>
      </span>
    </div>
  )
}

