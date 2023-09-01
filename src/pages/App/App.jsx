import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Utility Imports
import { getUser } from '../../utilities/services/users-service';

// Component Imports
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';

// Page Imports
import AuthPage from '../AuthPage/AuthPage';
import Home from '../Home/Home';
import Trip from '../Trip/Trip';
import Mobile from '../../mobile/Mobile'

// Style Imports
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
          <div className="navbar">
            <NavBar user={user} setUser={setUser} />
          </div>
            <div className="main-content">
              <Routes>
                {/* Route components in here */}
                {/* <Route path="/" element={<Home user={user} />} /> */}
                {/* <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} /> */}
                {/* <Route path="/trips" element={<Trip user={user} />} /> */}
                  {/* <SideBar user={user} /> */}
                <Route path="/*" element={<Home user={user} />} />
              </Routes>
            </div>
            <div className="Mobile">
              <Mobile user={user} setUser={setUser} />
            </div>
          </>
          :
          <AuthPage setUser={setUser} />
        }
    </main>
  );
}
