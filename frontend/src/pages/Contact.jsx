import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="px-6 md:px-12">
      {/* Heading */}
      <div className="text-center text-3xl pt-10 text-gray-600 font-semibold tracking-wide">
        CONTACT <span className="text-primary">US</span>
      </div>

      {/* Content */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center md:items-start mb-24">
        {/* Image */}
        <img
          className="w-full max-w-md rounded-xl shadow-md"
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Text Content */}
        <div className="flex flex-col gap-6 text-sm md:text-base text-gray-600">
          {/* Office Info */}
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2">Our Office</p>
            <p>Kathmandu, Nepal</p>
            <p>Suite Station, Chabahil</p>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2">Contact Info</p>
            <p>Tel: <span className="text-primary">5435645743</span></p>
            <p>Email: <a href="mailto:pescripto@gmail.com" className="text-primary hover:underline">pescripto@gmail.com</a></p>
          </div>

          {/* Careers */}
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2">Careers at PRESCRIPTO</p>
            <p className="mb-3">Learn more about our teams and job openings.</p>
            <button className="border border-primary text-primary px-6 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300">
              Explore Careers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
