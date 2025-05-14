import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashBoard = () => {
  const { dToken, dashData, getDashData, appointments, getAppointments,completeAppointment , cancelAppointment } = useContext(DoctorContext);
  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData();
      getAppointments();
    }
  }, [dToken]);

  // Calculate earnings
  let earning = 100;
  appointments?.forEach((item) => {
    if (item.cancelled) {
      earning -= item.amount;
    } else if (item.isCompleted || item.payment) {
      earning += item.amount;
    }
  });

  return dashData && (
    <div className=" space-y-10 min-h-screen">
      {/* Stats Cards - Horizontal Layout */}
      <div className="flex flex-wrap gap-6">
        {/* Earnings */}
        <div className="flex items-center gap-4 bg-white shadow-md p-6 min-w-[200px] rounded-2xl border hover:scale-105 transition-transform">
          <img className="w-14" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-2xl font-bold text-gray-800">${earning}</p>
            <p className="text-gray-500">Earnings</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 bg-white shadow-md p-6 min-w-[200px] rounded-2xl border hover:scale-105 transition-transform">
          <img className="w-10" src={assets.appointment_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 bg-white shadow-md p-6 min-w-[200px] rounded-2xl border hover:scale-105 transition-transform">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-500">Patients</p>
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
              <img className='rounded-full w-12 h-12 object-cover mr-4 border' src={item.userData.image} alt={item.userData.name} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-500 text-xs'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {
                              item.cancelled ?
                              <p className='text-red-800'>Cancelled</p>
                              :
                              item.isCompleted ?
                              <p className='text-green-900'>Completed</p>
                              :
                            // {/* Action Buttons */}
                              <div className="flex gap-3 items-center">
                              <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="Cancel" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                              <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="Approve" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                            </div>
                            }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorDashBoard;
