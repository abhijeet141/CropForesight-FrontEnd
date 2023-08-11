import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import menu from "../assets/menu-icon.webp";
import "./nav.css";
import { BsMoonFill, BsSun } from "react-icons/bs";

import Login from "./Login/Login";
const NAV = ({ mode, setmode }) => {
  // console.log(mode,setmode);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  function changlemode() {
    setmode(mode === "light" ? "dark" : "light");
  }
  function closeMenu() {
    setShowMenu(false);
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
            <li>
              {/* making use of location.pathname to get the active path and setting the font weight and color using the "active-links " class */}
              <Link
                to="/"
                className={location.pathname === "/" ? "active-links" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active-links" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact" ? "active-links" : ""
                }
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className={location.pathname === "/faq" ? "active-links" : ""}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/Weather"
                className={
                  location.pathname === "/Weather" ? "active-links" : ""
                }
              >
                Weather
              </Link>
            </li>
            <li>
              <Link
                to="/contributors"
                className={
                  location.pathname === "/contributors" ? "active-links" : ""
                }
              >
                Contributors
              </Link>
            </li>
            <li>
              <Link
                to="/ExampleCrop"
                className={
                  location.pathname === "/ExampleCrop" ? "active-links" : ""
                }
              >
                Example
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                className={location.pathname === "/Login" ? "active-links" : ""}
              >
                Login
              </Link>
            </li>
            <li>
              <button className="modebtn" onClick={changlemode}>
                {mode === "dark" ? (
                  <BsMoonFill className="h-6 w-6" />
                ) : (
                  <BsSun className="h-6 w-6" />
                )}
              </button>
            </li>
          </ul>
        </div>
        <div
          className="visibility-mobile"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <img src={menu} alt="" />
        </div>
      </nav>

      {showMenu && (
        <>
          <div className="mobile-nav">
            <ul>
              <li onClick={closeMenu}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/contact">Contact</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/faq">FAQs</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/Weather">Weather</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/contributors">Contributors</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/Login">Login</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default NAV;
