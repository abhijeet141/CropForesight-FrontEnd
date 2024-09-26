import React from 'react';
import { useAuth } from '@clerk/clerk-react'
import { HomePage } from './pages/HomePage/HomePage';
import Home from './pages/Home/Home';

const HomeRoute = () => {

  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? <Home /> : <HomePage />;
};

export default HomeRoute;