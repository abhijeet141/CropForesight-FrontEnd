import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu-icon.webp";
import close from '../../assets/close.png'
import "../Navbar/Navbar.css";
import {useAuth, SignInButton, SignOutButton  } from '@clerk/clerk-react'
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [closed, setClosed] = useState(false)
  const {isLoaded, isSignedIn } = useAuth()


  function closeMenu() {
    setShowMenu(false);
  }

  const onHomePage = location.pathname === "/";

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  if(!isLoaded){
    return null;
  }
  
  return (
    <>
      <nav>
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "200px", height: "45px", marginTop: "7px" }}
            />
          </Link>
        </div>
        <div className="visibility-desktop">
          <ul>
            {!isSignedIn && onHomePage ? (
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/" ? "#117660" : "inherit",
                  width: "7rem",
                  height: "3rem",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SignInButton>
                <Link>
                  Sign In
                </Link>
                </SignInButton>
              </li>
            ) : (
              <>
                <li
                  style={{
                    backgroundColor:
                      location.pathname === "/" ? "#117660" : "inherit",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  style={{
                    backgroundColor:
                      location.pathname === "/faq" ? "#117660" : "inherit",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/faq">FAQs</Link>
                </li>
                <li
                  style={{
                    backgroundColor:
                      location.pathname === "/Weather" ? "#117660" : "inherit",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/Weather">Weather</Link>
                </li>
                <li
                  style={{
                    backgroundColor:
                      location.pathname === "/contributors"
                        ? "#117660"
                        : "inherit",
                    width: "9rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/contributors">Contributors</Link>
                </li>
                <li
                  style={{
                    backgroundColor:
                      location.pathname === "/ExampleCrop" ? "#117660" : "inherit",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/ExampleCrop">Example</Link>
                </li>
                <li
                  style={{
                    backgroundColor:"#117660",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                      <SignOutButton>
                  <Link>Log Out</Link>
                  </SignOutButton>
                </li>
              </>
            )}
          </ul>
        </div>
        <div
          className="visibility-mobile"
          onClick={() => {
            setShowMenu((prev) => !prev);
            setClosed(!closed)
          }}
        >
          {closed ?  <img src={close} alt="" srcset="" /> :<img src={menu} style={{cursor:"pointer"}} alt="" /> }
        </div>
      </nav>


      {showMenu && (
        <div className="mobile-nav">
          <ul>
            {!isSignedIn && onHomePage ? (
              <li onClick={closeMenu} style={{fontSize:"30px"}}>
                <SignInButton>
                <Link>
                  Sign In
                </Link>
                </SignInButton>
              </li>
            ) : (
              <>
                <li onClick={closeMenu}>
                  <Link to="/">Home</Link>
                </li>
                <li onClick={closeMenu}>
                  <Link to="/faq">FAQs</Link>
                </li>
                <li onClick={closeMenu}>
                  <Link to="/weather">Weather</Link>
                </li>
                <li onClick={closeMenu}>
                  <Link to="/contributors">Contributors</Link>
                </li>
                <li onClick={closeMenu}>
                <Link to="/ExampleCrop">Example</Link>
                </li>
                <li onClick={closeMenu}>
                  <SignOutButton>
                  <Link>Log Out</Link>
                  </SignOutButton>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
