import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [activeCategory, setActiveCategory] = useState(speciality || 'All')
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState('recommended')
  const navigate = useNavigate()

  const categories = [
    'All',
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const applyFilter = () => {
    setIsLoading(true)
    setTimeout(() => {
      let filteredDoctors = []
      
      // Filter by specialty
      if (speciality) {
        filteredDoctors = doctors.filter(doc => doc.speciality === speciality)
        setActiveCategory(speciality)
      } else if (activeCategory === 'All') {
        filteredDoctors = [...doctors]
      } else {
        filteredDoctors = doctors.filter(doc => doc.speciality === activeCategory)
      }
      
      // Ensure each doctor has rating and experience values
      filteredDoctors = filteredDoctors.map(doc => ({
        ...doc,
        rating: doc.rating || 4.5, // Default rating
        experience: doc.experience || 5, // Default experience
        hourlyRate: doc.hourlyRate || 120 // Default hourly rate
      }))
      
      // Sort the filtered doctors
      sortDoctors(filteredDoctors)
      
      setIsLoading(false)
    }, 300)
  }
  
  const sortDoctors = (doctorsToSort) => {
    let sortedDoctors = [...doctorsToSort]
    
    switch (sortOption) {
      case 'rating':
        sortedDoctors.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'experience':
        sortedDoctors.sort((a, b) => (b.experience || 0) - (a.experience || 0))
        break
      case 'recommended':
      default:
        // For recommended, we can use a weighted score of rating and experience
        sortedDoctors.sort((a, b) => {
          const scoreA = ((a.rating || 0) * 0.7) + ((a.experience || 0) * 0.3 / 10)
          const scoreB = ((b.rating || 0) * 0.7) + ((b.experience || 0) * 0.3 / 10)
          return scoreB - scoreA
        })
        break
    }
    
    setFilterDoc(sortedDoctors)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, activeCategory, sortOption])

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Doctor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our extensive list of professional healthcare providers specializing in various fields
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">Specialities</h2>
              <div className="flex flex-col space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`py-3 px-4 rounded-lg text-left transition-all duration-200 ${
                      activeCategory === category
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      {activeCategory === category && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Advanced filters - can be expanded later */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Advanced Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-500 ml-2">& above</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <div className="flex items-center">
                      <input id="availability" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="availability" className="ml-2 text-sm text-gray-700">Available today</label>
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Doctor List */}
          <div className="lg:w-3/4">
            {/* Category Info */}
            <div className="mb-6 bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{activeCategory === 'All' ? 'All Doctors' : activeCategory}</h2>
                <p className="text-gray-600 text-sm mt-1">Showing {filterDoc.length} doctors</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select 
                    className="appearance-none bg-gray-100 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="recommended">Sort by: Recommended</option>
                    <option value="rating">Sort by: Rating</option>
                    <option value="experience">Sort by: Experience</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctors Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden h-80 animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filterDoc.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterDoc.map((item, index) => (
                  <div
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                    key={index}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <p className="text-green-600 font-medium text-sm">Available today</p>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{item.speciality}</p>
                      
                      <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{item.experience} years experience</span>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">${item.hourlyRate}/hour</span>
                        <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-full transition-colors duration-300 text-sm font-medium group-hover:bg-blue-600 group-hover:text-white">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No doctors found</h3>
                <p className="text-gray-600">We couldn't find any doctors matching your criteria.</p>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  View all doctors
                </button>
              </div>
            )}

            {/* Pagination */}
            {filterDoc.length > 0 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">1</button>
                  <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">2</button>
                  <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">3</button>
                  <span className="px-2 text-gray-600">...</span>
                  <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">8</button>
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors