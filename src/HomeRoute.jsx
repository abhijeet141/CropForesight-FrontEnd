import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { HomePage } from './components/HomePage/HomePage';
import Home from './components/Home/Home';

const HomeRoute = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Home /> : <HomePage />;
};

export default HomeRoute;
