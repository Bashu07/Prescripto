import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../../../frontend/src/assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DashBoard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5 space-y-10 min-h-screen'>

      {/* Stats Cards */}
      <div className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-4 bg-white shadow-md p-6 min-w-[200px] rounded-2xl border hover:scale-105 transition-transform'>
          <img className='w-14' src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.doctors}</p>
            <p className='text-gray-500'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white shadow-md p-6 min-w-[200px] rounded-2xl border hover:scale-105 transition-transform'>
          <img className='w-10' src={assets.appointment_icon} alt="Appointments" />
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white shadow-md p-6 min-w-[200px] rounded-2xl border hover:scale-105 transition-transform'>
          <img className='w-14' src={assets.patients_icon} alt="Patients" />
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-gray-500'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white shadow-lg rounded-2xl border'>
        <div className='flex items-center gap-3 px-6 py-5 border-b'>
          <img className='w-6' src={assets.list_icon} alt="Bookings" />
          <h2 className='text-lg font-semibold text-gray-800'>Latest Bookings</h2>
        </div>
        <div className='divide-y'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-4 hover:bg-gray-50 transition' key={index}>
              <img className='rounded-full w-12 h-12 object-cover mr-4 border' src={item.docData.image} alt={item.docData.name} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-500 text-xs'>{slotDateFormat(item.slotDate)}</p>
              </div>
               {
                              item.cancelled 
                              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                              :
                              item.isCompleted ?
                              <p className='text-green-500 text-xs'>Completed</p>
                              :
              
                              <img className='hover:cursor-pointer' onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                            }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
