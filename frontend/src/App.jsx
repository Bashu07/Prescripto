import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const location = useLocation()

  // Define routes where you want to hide the footer
  const hideFooterRoutes = ['/myappointment']

  return (
    <div className='mx-4 sm:max-[10%]'>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/myappointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App
