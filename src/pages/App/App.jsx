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
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

// Style Imports
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
              <Routes>
                {/* Route components in here */}
                <Route path="/" element={<Home user={user} />} />
                {/* <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} /> */}
                <Route path="/trips" element={<Trip user={user} />} />
                <Route path="/*" element={<Home user={user} />} />
              </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
