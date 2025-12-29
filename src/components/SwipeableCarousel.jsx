import { useState, useRef, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function SwipeableCarousel({ items, renderItem, itemsPerView = { mobile: 1, tablet: 2, desktop: 4 } }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrev()
    }
  }

  const onMouseDown = (e) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setDragOffset(0)
  }

  const onMouseMove = (e) => {
    if (!isDragging) return
    const offset = e.clientX - dragStart
    setDragOffset(offset)
  }

  const onMouseUp = () => {
    if (!isDragging) return
    
    if (Math.abs(dragOffset) > minSwipeDistance) {
      if (dragOffset > 0) {
        goToPrev()
      } else {
        goToNext()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
  }

  const goToNext = () => {
    const maxIndex = Math.max(0, items.length - getItemsPerView())
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const goToPrev = () => {
    const maxIndex = Math.max(0, items.length - getItemsPerView())
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.desktop
    if (window.innerWidth >= 1024) return itemsPerView.desktop
    if (window.innerWidth >= 768) return itemsPerView.tablet
    return itemsPerView.mobile
  }

  const getTransform = () => {
    const itemWidth = 100 / getItemsPerView()
    const baseTransform = -currentIndex * itemWidth
    const dragTransform = isDragging ? (dragOffset / carouselRef.current?.offsetWidth) * 100 : 0
    return baseTransform + dragTransform
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('keydown', handleKeyPress)
      carousel.setAttribute('tabIndex', '0')
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('keydown', handleKeyPress)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="overflow-hidden focus:outline-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        tabIndex={0}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${getTransform()}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / getItemsPerView()}%` }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-purple-dark rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10 hidden md:flex items-center justify-center"
        aria-label="Previous"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-purple-dark rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10 hidden md:flex items-center justify-center"
        aria-label="Next"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(items.length / getItemsPerView()) }).map((_, index) => {
          const startIndex = index * getItemsPerView()
          const endIndex = startIndex + getItemsPerView()
          const isActive = currentIndex >= startIndex && currentIndex < endIndex
          
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(startIndex)}
              className={`transition-all duration-200 rounded-full ${
                isActive
                  ? 'bg-white w-8 h-2'
                  : 'bg-white/40 w-2 h-2 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}

