import React, { useRef } from 'react'
import { assets, specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='py-24 px-4 bg-gradient-to-b from-blue-50 to-white' id='speciality'>
      <div className='max-w-6xl mx-auto flex flex-col items-center gap-6'>
        <div className='text-center mb-4'>
          <span className='bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium'>Our Specialities</span>
          <h2 className='text-3xl md:text-4xl font-bold mt-4 text-gray-800'>Find Doctors by Speciality</h2>
          <p className='mt-4 text-gray-600 max-w-xl mx-auto'>
            Connect with specialized healthcare professionals across various medical disciplines to address your specific health needs.
          </p>
        </div>
        
        <div className='relative w-full'>
          {/* Arrow navigation for desktop */}
          <div className='hidden md:block'>
            <button 
              onClick={handleScrollLeft}
              className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-blue-50 transition-colors duration-300'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={handleScrollRight}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-blue-50 transition-colors duration-300'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Speciality cards */}
          <div 
            ref={scrollContainerRef}
            className='flex gap-6 pt-8 w-full overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialityData.map((item, index) => (
              <Link 
                key={index}
                onClick={() => window.scrollTo(0, 0)} 
                className='flex flex-col items-center justify-center min-w-32 sm:min-w-40 flex-shrink-0 group snap-start'
                to={`/doctors/${item.speciality}`}
              >
                <div className='bg-white rounded-xl shadow-md p-6 sm:p-8 w-full flex flex-col items-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl'>
                  <div className='relative'>
                    <div className='absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300'></div>
                    <img 
                      className='w-16 sm:w-24 h-16 sm:h-24 object-contain relative z-10 transform transition-transform duration-300 group-hover:scale-110' 
                      src={item.image} 
                      alt={item.speciality} 
                    />
                  </div>
                  <p className='mt-4 font-medium text-center text-gray-800'>{item.speciality}</p>
                  <div className='h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all duration-300'>
                    <div className='flex items-center justify-center text-blue-600 gap-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className='text-xs'>View Doctors</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Indicator dots for mobile */}
        <div className='flex justify-center gap-2 md:hidden'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          ))}
        </div>

        {/* Learn more link */}
        <Link 
          to="/doctors" 
          className='mt-6 inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105'
        >
          View All Specialities
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default SpecialityMenu