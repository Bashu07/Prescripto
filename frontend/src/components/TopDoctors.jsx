import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const TopDoctors = () => {
    const navigate = useNavigate();
    const{doctors} = useContext(AppContext)
    
    return (
        <div className='flex flex-col items-center gap-6 my-24 text-gray-900 md:mx-10 max-w-7xl mx-auto px-4'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent'>Top Doctors to Book</h1>
            <p className='sm:w-2/5 text-center text-gray-600 mb-4'>Here are the list of the top doctors you trusted</p>
            
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8'>
                {(doctors || []).slice(0, 5).map((item, index) => (
                    <div 
                        onClick={() =>{ navigate(`/appointment/${item._id}`) ; scrollTo(0,0)}} 
                        className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 flex flex-col h-full border border-gray-100'
                        key={index}
                    >
                        <div className='overflow-hidden h-48'>
                            <img 
                                className='w-full h-full object-cover transform transition-transform duration-500 hover:scale-110' 
                                src={item.image} 
                                alt={item.name} 
                            />
                        </div>
                        <div className='p-6 flex flex-col gap-2 flex-grow'>
                            <div className='flex items-center gap-2 mb-2'>
                                <span className='flex h-3 w-3 relative'>
                                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                                    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                                </span>
                                <p className='text-green-600 font-medium text-sm'>Available</p>
                            </div>
                            <h3 className='font-bold text-lg text-gray-800'>{item.name}</h3>
                            <p className='text-blue-600 font-medium text-sm'>{item.speciality}</p>
                            <div className='mt-auto pt-4'>
                                <button className='text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-full transition-colors duration-300 w-full mt-2'>
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <button onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className='mt-10 bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center'>
                <span>See More Doctors</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default TopDoctors