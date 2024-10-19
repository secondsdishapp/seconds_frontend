import './MobileNav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <Link to="/map">
        <div className="mobile-nav-item">
          <div className="nav-icon"></div>
          <span className="nav-text">Map</span>
        </div>
      </Link>
      <Link to="/">
        <div className="mobile-nav-item">
          <div className="nav-icon"></div>
          <span className="nav-text">Home</span>
        </div>
      </Link>
      <Link to="/dishes">
        <div className="mobile-nav-item">
          <div className="nav-icon"></div>
          <span className="nav-text">Dishes</span>
        </div>
      </Link>
      <Link to="/rate">
        <div className="mobile-nav-item">
          <div className="nav-icon"></div>
          <span className="nav-text">Rate</span>
        </div>
      </Link>
    </div>
  )
}
