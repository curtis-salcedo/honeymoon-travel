import { Link } from 'react-router-dom';
import * as userService from '../../utilities/services/users-service';
import React, { useState } from 'react';

// Style Imports
import './NavBar.css';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  Button,

} from '@mui/material';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav className="NavBarContainer">
      <div className="NavBarLogo">
        <h3>{user.name}</h3>
      </div>
      <div className="NavBarLinks">
        <Link to="/">Trips</Link>
      </div>
    </nav>
  );
}