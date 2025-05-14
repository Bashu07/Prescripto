import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-700">
      
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">About <span className="text-primary">Us</span></h2>
        <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">Learn more about our mission, values, and why we’re the right choice for your healthcare needs.</p>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <img
          className="w-full max-w-md rounded-xl shadow-md"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="md:w-3/5 space-y-6">
          <p>
            We are on a mission to simplify healthcare by making it more accessible, transparent, and convenient for everyone. We understand how stressful it can be to find the right doctor, schedule appointments, and manage health records.
          </p>
          <p>
            Our team is committed to creating a seamless experience for both patients and healthcare providers. Whether you're looking for a general physician, a specialist, or a clinic near you, our smart search and intuitive interface help you connect effortlessly.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Our Vision</h3>
            <p>
              With a growing network of trusted doctors and healthcare partners, <span className="text-primary font-semibold">[Your App Name]</span> aims to become your go-to health companion. We're here to support your wellness journey by making quality care accessible, efficient, and personalized.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold">Why <span className="text-primary">Choose Us</span></h3>
        <p className="text-gray-500 mt-2">Here’s what makes us stand out in digital healthcare</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
        <div className="border rounded-xl p-8 text-center hover:bg-primary hover:text-white transition-all duration-300 shadow-md cursor-pointer">
          <h4 className="text-lg font-semibold mb-3">Efficiency</h4>
          <p>Experience faster appointment booking, streamlined scheduling, and reduced wait times.</p>
        </div>
        <div className="border rounded-xl p-8 text-center hover:bg-primary hover:text-white transition-all duration-300 shadow-md cursor-pointer">
          <h4 className="text-lg font-semibold mb-3">Convenience</h4>
          <p>Book your appointments, check availability, and access medical information anytime, anywhere.</p>
        </div>
        <div className="border rounded-xl p-8 text-center hover:bg-primary hover:text-white transition-all duration-300 shadow-md cursor-pointer">
          <h4 className="text-lg font-semibold mb-3">Personalization</h4>
          <p>Get matched with doctors based on your specific needs and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
