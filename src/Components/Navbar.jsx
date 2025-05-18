import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink onClick={closeMenu} to='/' className="logo-link">
          <img src={logo} alt="mediguide" className='logo-image' />
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink onClick={closeMenu} to='/Hiw' className="nav-link">How it Works?</NavLink>
        <NavLink onClick={closeMenu} to='/Predict' className="nav-link">Predictor</NavLink>
      </div>
      <div className="mobile-menu-button">
        <button onClick={toggleMenu}>
          {isOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </button>
      </div>
      {isOpen && (
        <div className="mobile-menu">
          <NavLink onClick={closeMenu} to='/Hiw' className="mobile-link">How it Works?</NavLink>
          <NavLink onClick={closeMenu} to='/Predict' className="mobile-link">Predictor</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
