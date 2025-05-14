import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData  , backendUrl} = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFormData({ ...profileData });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Save to context
    setProfileData(formData);
    
    // Save to localStorage
    localStorage.setItem('doctorProfileData', JSON.stringify(formData));
    
    // Exit edit mode
    setIsEdit(false);
  };

  const handleCancel = () => {
    // Reset form data to original profile data
    setFormData({ ...profileData });
    setIsEdit(true);
  };

  if (!profileData || !formData) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Doctor Profile</h1>
          <p className="text-blue-100">Manage your professional information</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col items-center justify-center">
              <div className="relative group">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
                />
                {isEdit && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-sm">Change Photo</span>
                  </div>
                )}
              </div>
              {isEdit ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-4 text-xl font-bold text-center text-gray-800 bg-blue-50 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                />
              ) : (
                <h2 className="mt-4 text-xl font-bold text-center text-gray-800">{formData.name}</h2>
              )}
              <div className="mt-2 text-center">
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full px-3 py-1 text-sm bg-blue-50 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      className="w-full px-3 py-1 text-sm bg-blue-50 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Speciality"
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">{formData.degree} - {formData.speciality}</p>
                )}
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {isEdit ? (
                  <div className="flex items-center">
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-16 px-2 py-1 bg-blue-50 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="ml-1">years experience</span>
                  </div>
                ) : (
                  <span>Experience: <span className="font-medium">{formData.experience} years</span></span>
                )}
              </div>
            </div>

            <div className="md:w-2/3 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  About
                </h3>
                {isEdit ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{formData.about}</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                  </svg>
                  Appointment Fees
                </h3>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">{currency}</span>
                  {isEdit ? (
                    <input
                      type="number"
                      name="fees"
                      value={formData.fees}
                      onChange={handleChange}
                      className="w-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-blue-600 font-semibold">{formData.fees}</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Address
                </h3>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.address.line1}
                      onChange={(e) => handleAddressChange('line1', e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      value={formData.address.line2}
                      onChange={(e) => handleAddressChange('line2', e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Address Line 2"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600">{formData.address.line1}</p>
                    <p className="text-gray-600">{formData.address.line2}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Availability & Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <label className="inline-flex items-center gap-2 text-gray-700 mb-4 md:mb-0">
              <input
                checked={isEdit ? formData.available : profileData.available}
                type="checkbox"
                name="available"
                onChange={handleChange}
                disabled={!isEdit}
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
              />
              <span className="font-medium">Available for Appointments</span>
            </label>
            
            {isEdit ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;