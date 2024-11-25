import React, { memo, useCallback } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const MenuItem = memo(({ item, category, onCategoryChange }) => (
  <div 
    onClick={() => onCategoryChange(item.menu_name)} 
    className='explore-menu-list-item'
  >
    <img 
      className={category === item.menu_name ? "active" : ""} 
      src={item.menu_image} 
      alt={item.menu_name}
      loading="lazy"
    />    
    <p>{item.menu_name}</p>   
  </div>
));

const ExploreMenu = ({ category, setCategory }) => {
  const handleCategoryChange = useCallback((menuName) => {
    setCategory(prev => prev === menuName ? "All" : menuName);
  }, [setCategory]);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from the diverse menu featuring a delectable array of cakes and pastries. 
        Our mission is to satisfy your experience, one delicious snack at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <MenuItem
            key={item.menu_name || index}
            item={item}
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        ))}
      </div> 
      <hr />
    </div>
  )
}

export default memo(ExploreMenu)
