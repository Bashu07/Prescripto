import React, { useEffect, useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Appointments</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all your patient appointments</p>
          </div>
          
          {/* Filters & Stats */}
          <div className="flex gap-4">
            <div className="bg-white rounded-lg shadow-sm border px-4 py-2 text-center">
              <p className="text-xs text-gray-500">Today</p>
              <p className="text-lg font-bold text-blue-600">
                {appointments.filter(appointments => !appointments.cancelled && !appointments.isCompleted).length || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border px-4 py-2 text-center">
              <p className="text-xs text-gray-500">Upcoming</p>
              <p className="text-lg font-bold text-green-600">
                {appointments.filter(appointments => !appointments.cancelled && !appointments.isCompleted).length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
            All Appointments
          </button>
         
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1fr] px-6 py-4 bg-gray-50 border-b">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">#</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Age</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Action</div>
          </div>

          {/* Appointment List */}
          <div className="divide-y divide-gray-200 max-h-[65vh] overflow-y-auto">
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-lg">No appointments found</p>
              </div>
            ) : (
              appointments.reverse().map((item, index) => (
                <div 
                  key={index} 
                  className="group hover:bg-blue-50 transition-colors duration-150"
                >
                  {/* Mobile Header */}
                  <div className="block sm:hidden bg-gray-50 p-3 font-medium">
                    <div className="flex justify-between items-center">
                      <span>Appointment #{index + 1}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.cancelled 
                          ? "bg-red-100 text-red-800" 
                          : item.isCompleted 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Scheduled"}
                      </span>
                    </div>
                  </div>

                  {/* Grid Content */}
                  <div className="grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1fr] grid-cols-1 gap-x-4 gap-y-2 px-6 py-4">
                    {/* Index */}
                    <div className="hidden sm:flex items-center text-gray-500">
                      {index + 1}
                    </div>
                    
                    {/* Patient */}
                    <div className="flex items-center">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="relative">
                          <img 
                            src={item.userData.image} 
                            alt={item.userData.name} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            item.cancelled 
                              ? "bg-red-500" 
                              : item.isCompleted 
                                ? "bg-green-500" 
                                : "bg-blue-500"
                          }`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.userData.name}</p>
                          <p className="text-xs text-gray-500 sm:hidden">Age: 24</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment */}
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.payment 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.payment ? "Online" : "Cash"}
                      </span>
                    </div>
                    
                    {/* Age */}
                    <div className="hidden sm:flex items-center text-gray-600">
                      24 years
                    </div>
                    
                    {/* Date & Time */}
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-sm font-medium text-gray-700">{slotDateFormat(item.slotDate)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-sm text-gray-600">{item.slotTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Fees */}
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">{currency}{item.amount}</span>
                    </div>
                    
                    {/* Action */}
                    <div className="flex items-center justify-center">
                      {item.cancelled ? (
                        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <div className="flex gap-3 items-center">
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100 transition-colors"
                            title="Cancel Appointment"
                          >
                            <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => completeAppointment(item._id)}
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-100 transition-colors"
                            title="Complete Appointment"
                          >
                            <img src={assets.tick_icon} alt="Complete" className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment