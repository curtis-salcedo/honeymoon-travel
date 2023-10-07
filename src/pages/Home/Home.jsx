import React, { useState } from 'react';

// Component imports
import Map from '../../components/Map/Map'

// Page imports
import Trip from '../Trip/Trip';

// Style imports
import './Home.css';

export default function Home({ user }) {

  return (
    <div className="HomeContainer">
      <div className="Trip">
        <Trip user={user} />
      </div>
      <div className="Map">
        <Map />
      </div>
    </div>
  );
}