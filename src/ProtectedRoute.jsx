import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ element }) => {
  const {user, isAuthenticated, isLoading } = useAuth0();
  if(isLoading){
    return null;
  }
    if (user && !user.email_verified) {
    return <Navigate to="/verify" />;
  }
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
