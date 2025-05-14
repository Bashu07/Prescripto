import React, { useContext } from 'react'
import Login from './pages/Login'

import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes  , Route} from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashBoard from './pages/Doctor/DoctorDashBoard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';


const App = () => {

  const {aToken} = useContext(AdminContext)

  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#f8f9fd]'>

      <ToastContainer/>
      <Navbar/>
      <div className='flex items-center'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          //Admin Route
          <Route path='/admin-dashboard' element={<DashBoard/>} />
          <Route path='/all-appointment' element={<AllAppointment/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

          //Doctor Route
          <Route path='/doctor-dashboard' element={<DoctorDashBoard/>} />
          <Route path='/doctor-appointment' element={<DoctorAppointment/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />





        </Routes>
      </div>
    
    </div>
  ):(

    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App