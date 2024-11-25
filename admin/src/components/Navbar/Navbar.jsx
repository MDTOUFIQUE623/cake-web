import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);

  const handleProfileClick = () => {
    setIsProfileActive(!isProfileActive);
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      
      <span className='admin-text'>Admin Dashboard</span>
      
      <div className='nav-right'>
        <img 
          className='profile' 
          src={assets.profile_image} 
          alt="Profile" 
          onClick={handleProfileClick}
          style={{ border: isProfileActive ? '2px solid #f07a8e' : '2px solid transparent' }}
        />
      </div>
    </div>
  )
}

export default Navbar
