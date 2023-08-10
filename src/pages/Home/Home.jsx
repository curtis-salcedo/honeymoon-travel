import React, { useState } from 'react';

// Component imports
import SideBar from '../../components/SideBar/SideBar';

// Page imports
import Trip from '../Trip/Trip';

// Style imports
import './Home.css';

export default function Home({ user }) {


  return (
    <div className="HomeContainer">
      {/* <SideBar user={user} /> */}
      <Trip user={user} />
    </div>
  );
} 

