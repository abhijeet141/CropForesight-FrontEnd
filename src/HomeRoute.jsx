import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { HomePage } from './pages/HomePage/HomePage';
import Home from './pages/Home/Home';

const HomeRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Home /> : <HomePage />;
};

export default HomeRoute;
