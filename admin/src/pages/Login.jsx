import React, { useState } from 'react';
import { useContext } from 'react';
import { assets } from '../assets/assets_admin/assets'; // (assuming you use some assets later)
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')


  const {setAToken ,backendUrl} = useContext(AdminContext)
  const {setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendUrl + '/api/admin/login',{email , password})
        if(data.success){
          localStorage.setItem('aToken' , data.token)
          setAToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl+ '/api/doctor/login' , {email , password})
        if(data.success){
          localStorage.setItem('dToken' , data.token)
          setDToken(data.token)
          console.log(data.token)
        }
        else{
          toast.error(data.message)
        }

      }
    } catch (error) {
      
    }
  }



  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] px-4">
      <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-primary">{state} Login</h2>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-600 font-medium">Email Address</label>
          <input onChange={(e)=>setEmail(e.target.value)}
            id="email"
            type="email"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-600 font-medium">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)}
            id="password"
            type="password"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition w-full shadow-md"
        >
          Login
        </button>

        {/* Switch User Type */}
        <p className="text-center text-sm text-gray-500">
          Not an {state}?{' '}
          <span
            onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
            className="text-primary font-semibold cursor-pointer hover:underline"
          >
            Login as {state === 'Admin' ? 'Doctor' : 'Admin'}
          </span>
        </p>

      </div>
    </form>
  );
};

export default Login;
