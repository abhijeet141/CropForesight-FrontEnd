import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
