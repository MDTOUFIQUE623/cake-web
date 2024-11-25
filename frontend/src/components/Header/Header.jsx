import React from 'react';
import './Header.css';

const Header = () => {
  const handleClick = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favorite cake here</h2>
        <p>Choose from a diverse menu featuring a delectable array of cakes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your experience, one delicious cake at a time.</p>
        <button onClick={handleClick}>
          View
        </button>
      </div>
    </div>
  );
};

export default Header;
