import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function Verify() {
  const { user,isLoading, logout } = useAuth0();

  if (isLoading) {
    return null;
  }  

  if (user && !user.email_verified) {
    return (
        <>
      <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100vh", color: "white", fontSize:"2rem" }}>
        <p>You need to verify your email before accessing the site.<br/> Please check your inbox and verify your email address.</p>
        <p>After verifying, please{" "} <a href="#" style={{textDecoration:"underline",cursor:"pointer",textTransform:"capitalize",color:"white"}} onClick={()=>{
          logout({
            logoutParams: { returnTo: window.location.origin },
          })
        }}>click here to login again</a></p>      
      </div>
      </>
    );
  }

  return <Navigate to="/" />;
}
