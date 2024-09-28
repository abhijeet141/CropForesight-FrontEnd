import React from 'react';
import { useAuth } from '@clerk/clerk-react'
import { HomePage } from './pages/HomePage/HomePage';
import Home from './pages/Home/Home';

const HomeRoute = () => {

  const { isSignedIn } = useAuth()


  return isSignedIn ? <Home /> : <HomePage />;
};

export default HomeRoute;