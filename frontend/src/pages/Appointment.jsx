import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'


const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlot = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate <= endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}` 
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate] &&  docInfo.slots_booked[slotDate].includes(slotTime) ?false: true

        if(isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }

    // Check if a time slot is selected
    if (!slotTime) {
      toast.warn('Please select a time slot')
      return
    }

    try {
      // Get the selected date from the currently selected slot index
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
        toast.error('No available slots for selected day')
        return
      }

      // Find the specific time slot object that matches the selected time
      const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime)
      
      if (!selectedSlot) {
        toast.error('Selected time slot not found')
        return
      }

      const date = selectedSlot.datetime
      
      // Format the date properly
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      // Ensure day and month have leading zeros if needed
      day = day < 10 ? `0${day}` : day
      month = month < 10 ? `0${month}` : month

      const slotDate = `${day}_${month}_${year}`
      
      console.log('Booking appointment with:', { docId, slotDate, slotTime })

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`, 
        { docId, slotDate, slotTime }, 
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/myappointment')
      } else {
        toast.error(data.message || 'Failed to book appointment')
      }

    } catch (error) {
      console.log('Appointment booking error:', error)
      toast.error(error.response?.data?.message || error.message || 'Error booking appointment')
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot()
    }
  }, [docInfo])

  return docInfo && (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      {/* ------Doctors Details --------- */}
      <div className='flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto'>
        <div>
          <img 
            className='bg-primary w-full sm:max-w-72 rounded-lg object-cover h-80 sm:h-auto' 
            src={docInfo.image} 
            alt={docInfo.name} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/300x400?text=Doctor+Image';
            }}
          />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience} years exp.</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-800 mt-3'>
              About <img className='w-4' src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fees: 
            <span className='text-gray-600 ml-1'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      
      {/* Booking Slots */}
      <div className='max-w-6xl mx-auto sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700'>
        <p className='text-lg mb-2'>Available Booking Slots</p>
        
        {/* Days selection */}
        <div className='flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2'> 
          {docSlots.length > 0 ? (
            docSlots.map((item, index) => (
              <div 
                onClick={() => {
                  setSlotIndex(index)
                  setSlotTime('') // Reset time selection when changing day
                }} 
                className={`text-center py-2 px-4 min-w-16 rounded-full cursor-pointer transition-all ${
                  slotIndex === index ? 'bg-primary text-white shadow-md' : 'border border-gray-200 hover:border-primary'
                }`} 
                key={index}
              >
                <p className="font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Loading available days...</p>
          )}
        </div>

        {/* Time slots */}
        <p className="text-sm text-gray-500 mt-4 mb-2">Select a time slot:</p>
        <div className='flex flex-wrap items-center gap-3 w-full overflow-x-auto mt-2 pb-2'>
          {(docSlots.length > 0 && docSlots[slotIndex]) ? (
            docSlots[slotIndex].map((item, index) => (
              <p 
                onClick={() => setSlotTime(item.time)} 
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${
                  item.time === slotTime ? 'text-white bg-primary shadow-sm' : 'text-gray-400 border border-gray-300 hover:border-primary'
                }`} 
                key={index}
              >
                {item.time}
              </p>
            ))
          ) : (
            <p className="text-gray-500 italic">No time slots available</p>
          )}
        </div>

        {/* Booking button */}
        <div className="mt-8">
          <button 
            onClick={bookAppointment} 
            disabled={!slotTime}
            className={`${
              slotTime ? 'bg-primary hover:bg-blue-900' : 'bg-gray-300 cursor-not-allowed'
            } text-white text-sm font-medium px-14 py-3 rounded-full my-6 transition-all`}
          >
            Book an Appointment
          </button>
          {!slotTime && <p className="text-sm text-gray-500">Please select a time slot</p>}
        </div>
      </div>

      {/* Listing Related Doctors */}
      <div className="mt-12">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment