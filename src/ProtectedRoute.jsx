import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
