import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddDoctor = () => {

  const [docImg , setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2 , setAddress2] = useState('')

  const {backendUrl , aToken} = useContext(AdminContext)


  const onSubmitHandler = async(e)=>{

    e.preventDefault()

    try {
      if(!docImg){
        return toast.error('Image not selected')
      }

      const formData = new FormData()
      formData.append('image' , docImg)
      formData.append('email' , email)

      formData.append('name' , name)
      formData.append('password' , password)
      formData.append('experience' , experience)
      formData.append('fees' , Number(fees))
      formData.append('about' , about)
      formData.append('speciality' , speciality)
      formData.append('degree' , degree)
      formData.append('address' , JSON.stringify({line1:address1 , line2:address2}))

      // console log the form Data
      formData.forEach((value , key)=>{
        console.log(`${key}: ${value}`)
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor' , formData, {headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')


      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-4 text-2xl font-semibold text-primary">Add Doctor</p>

      <div className="bg-white px-8 py-6 border rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-scroll shadow-xl">

        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-700">
          <label htmlFor="doc-img">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer border-2 border-dashed hover:border-primary transition"
              src={ docImg? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden  />
          <p className="text-sm">Click to upload <br />Doctor's picture</p>
        </div>

        {/* Form Grid */}
        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">

          {/* Left Column */}
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="block mb-1 font-medium">Doctor's Name</label>
              <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder="Name" required className="input-field" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Doctor's Email</label>
              <input  onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="input-field" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input  onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="input-field" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input  onChange={(e)=> setAddress1(e.target.value)} value={address1} type="text" placeholder="Address Line 1" required className="input-field mb-2" />
              <input  onChange={(e)=> setAddress2(e.target.value)} value={address2} type="text" placeholder="Address Line 2" className="input-field" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="block mb-1 font-medium">Speciality</label>
              <select  onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="input-field">
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatrician</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Education</label>
              <input  onChange={(e)=> setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="input-field" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Experience</label>
              <select  onChange={(e)=> setExperience(e.target.value)} value={experience} className="input-field">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i}>{i + 1} Year</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Doctor's Fee ($)</label>
              <input  onChange={(e)=> setFees(e.target.value)} value={fees} type="number" placeholder="Fee" required className="input-field" />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-6">
          <label className="block mb-1 font-medium">About Doctor</label>
          <textarea  onChange={(e)=> setAbout(e.target.value)} value={about}
            placeholder="Write about the doctor..."
            rows={7}
            className="input-field resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-primary-dark transition font-semibold"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
