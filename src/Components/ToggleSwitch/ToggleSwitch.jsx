import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ isSignIn, onToggle }) => {
  return (
    <div className="toggle-container" onClick={onToggle}>
      <div className="toggle-switch">
        <div className={`toggle-option ${isSignIn ? 'active' : ''}`}>
          Sign In
        </div>
        <div className={`toggle-option ${!isSignIn ? 'active' : ''}`}>
          Sign Up
        </div>
        <div className={`toggle-slider ${isSignIn ? 'left' : 'right'}`}></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
