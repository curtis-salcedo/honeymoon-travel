import React from 'react';

// Page imports
import Trip from '../../pages/Trip/Trip';

// Component imports

// Style imports
import './SideBar.css';

export default function SideBar({ user }) {
  return (
    <div className="SideBarContainer">
      <h1>SideBar</h1>
      <Trip user={user} />
    </div>
  );
}