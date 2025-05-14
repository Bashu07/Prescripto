import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center sm:items-start">
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-gray-300 text-sm">
            Your trusted partner in health. Book appointments, get advice, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Doctors</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Appointments</li>
            <li className="hover:text-white cursor-pointer">Consultation</li>
            <li className="hover:text-white cursor-pointer">Prescriptions</li>
            <li className="hover:text-white cursor-pointer">Health Advice</li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl mb-4">
            <FaFacebook className="cursor-pointer hover:text-blue-500 transition" />
            <FaTwitter className="cursor-pointer hover:text-sky-400 transition" />
            <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
          </div>
          <p className="text-gray-300 text-sm">
            Email: support@prescripto.com <br />
            Phone: +977-9876543210
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-gray-300 text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; 2025 Prescripto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
