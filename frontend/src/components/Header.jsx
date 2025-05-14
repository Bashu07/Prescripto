import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden my-6 mx-4 sm:mx-6 lg:mx-8">
            {/* ------ Left Side ----- */}
            <div className="md:w-1/2 flex flex-col items-center justify-center gap-6 py-16 px-8 md:px-12 lg:px-16 md:py-24 text-center md:text-left">
                <div className="space-y-3">
                    <div className="inline-block px-4 py-1 bg-blue-400 bg-opacity-30 rounded-full mb-3">
                        <p className="text-blue-100 text-sm font-medium">Trusted Healthcare</p>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight tracking-tight">
                        Book Appointment <br />
                        <span className="relative">
                            With Trusted 
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 rounded-full transform translate-y-1"></span>
                        </span> Doctors
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-5 text-white mt-2">
                    <div className="relative">
                        <img
                            className="w-32 transform transition-transform duration-700 hover:scale-110"
                            src={assets.group_profiles}
                            alt="Doctor Profiles"
                        />
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            500+
                        </div>
                    </div>
                    <div>
                        <p className="text-blue-100 font-medium text-sm md:text-base">
                            Join thousands of satisfied patients who trust our
                            <br className="hidden sm:block" />
                            highly qualified doctors for their health needs.
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="text-blue-100 text-xs font-medium ml-1">4.9 (2.5k reviews)</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4 items-center justify-center">
                    <a
                        className="flex items-center gap-2 px-8 py-3 bg-white rounded-full text-blue-700 font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                        href="#speciality"
                    >
                        Book appointment
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a
                        className="flex items-center gap-2 px-8 py-3 border border-white/30 bg-white/10 backdrop-blur rounded-full text-white font-medium transform transition-all duration-300 hover:bg-white/20 hover:scale-105"
                        href="#how-it-works"
                    >
                        How it works
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>

            {/*  Right side*/}
            <div className="md:w-1/2 relative">
                <div className="absolute top-6 right-6 lg:right-10 bg-white/10 backdrop-blur-md rounded-lg p-3 transform rotate-3 animate-pulse hidden md:block">
                    {/* <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                        <span className='text-white text-xs font-medium'>Doctors Available 24/7</span>
                    </div> */}
                </div>
                <div className="overflow-hidden h-full">
                    <img
                        className="w-full md:absolute bottom-0 h-auto object-cover transform transition-all duration-700 hover:scale-105"
                        src={assets.header_img}
                        alt="Doctor"
                    />
                </div>
                <div className="absolute bottom-10 left-10 bg-pink-100 rounded-r-lg shadow-lg p-3 mr-10 transform -translate-x-full hover:translate-x-0 transition-transform duration-500 ease-in-out group hidden md:block">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">Quick Appointments</p>
                            <p className="text-xs text-gray-500">Usually within 24 hours</p>
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 bg-blue-600 text-white p-2 rounded-r transition-all duration-500 group-hover:opacity-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
