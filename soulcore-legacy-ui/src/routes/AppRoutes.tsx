// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home/Home';

// This component will handle all the routing for the application
// As we add more pages, we'll add more routes here
const AppRoutes: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as we develop them */}
        {/* <Route path="/journal" element={<Journal />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
