import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import HomePage from '../../pages/homepage/HomePage';
import SwapImagePage from '../../pages/swapimagepage/SwapImagePage';
import { Stack } from '@mui/material';
import RemoveBackground from '../../pages/swapimagepage/RemoveBackground';

export default function AppLunch() {
  return (
    <Router>
      <Stack sx={{backgroundColor:"#0D0B25"}}> 
        <Navbar  /> 
        <Routes>
          <Route path="/" element={<SwapImagePage />} />
          <Route path="/face-swap" element={<SwapImagePage />} />
          <Route path="/remove-background" element={<RemoveBackground />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
        </Routes>
      </Stack>
    </Router>
  );
}
