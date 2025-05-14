import React, { useState, useEffect, useRef, useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinkClass = 'py-2 px-4 relative transition-all duration-300 hover:text-primary';

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <header className="w-full border-b border-gray-200 shadow-sm bg-white relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-36 cursor-pointer"
          src={assets.logo}
          alt="Logo"
          loading="lazy"
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <NavLink to="/" className={({ isActive }) => `${navLinkClass} ${isActive ? 'text-primary font-semibold' : ''}`}>Home</NavLink>
          <NavLink to="/doctors" className={({ isActive }) => `${navLinkClass} ${isActive ? 'text-primary font-semibold' : ''}`}>All Doctors</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${navLinkClass} ${isActive ? 'text-primary font-semibold' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLinkClass} ${isActive ? 'text-primary font-semibold' : ''}`}>Contact</NavLink>
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          {token ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img className="w-9 h-9 rounded-full border border-gray-300" src={userData.image} alt="Profile" loading="lazy" />
              <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" loading="lazy" />
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition-all"
            >
              Create Account
            </button>
          )}

          {/* Dropdown */}
          {dropdownOpen && token && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-lg rounded-md w-48 p-4 text-sm font-medium text-gray-700 space-y-3 z-50">
              <p onClick={() => { navigate('/myprofile'); setDropdownOpen(false); }} className="hover:text-primary cursor-pointer">My Profile</p>
              <p onClick={() => { navigate('/myappointment'); setDropdownOpen(false); }} className="hover:text-primary cursor-pointer">My Appointment</p>
              <p onClick={() => { logout(); setDropdownOpen(false); }} className="hover:text-red-500 cursor-pointer">Logout</p>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="w-7 h-7 md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          loading="lazy"
        />
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-gray-200 px-6 py-4 space-y-4 text-sm font-medium text-gray-700 z-40">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block">Home</NavLink>
          <NavLink to="/doctors" onClick={() => setMobileMenuOpen(false)} className="block">All Doctors</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="block">About</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="block">Contact</NavLink>
          <hr />
          {token ? (
            <>
              <p onClick={() => { navigate('/myprofile'); }} className="cursor-pointer">My Profile</p>
              <p onClick={() => { navigate('/myappointment'); }} className="cursor-pointer">My Appointment</p>
              <p onClick={logout} className="cursor-pointer text-red-500">Logout</p>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
