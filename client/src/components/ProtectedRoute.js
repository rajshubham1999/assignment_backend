import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  
  const token = localStorage.getItem('token'); 
  return !!token; // Return true if token exists, false otherwise
};

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  
  if (isAuthenticated()) {
    return element;
  } else {
    // If not authenticated, redirect to the register page
    return <Navigate to="/register" replace />;
  }
};

export default ProtectedRoute;