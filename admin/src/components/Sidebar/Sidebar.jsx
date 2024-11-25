import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarItems = [
    {
      path: '/add',
      icon: assets.add_icon,
      label: 'Add Items',
    },
    {
      path: '/list',
      icon: assets.order_icon,
      label: 'List Items',
    },
    {
      path: '/orders',
      icon: assets.order_icon,
      label: 'Orders',
    },
  ]

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        {sidebarItems.map((item) => (
          <div 
            key={item.path}
            className={`sidebar-option ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            <img src={item.icon} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
