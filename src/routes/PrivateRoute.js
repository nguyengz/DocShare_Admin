import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (currentUser?.token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
