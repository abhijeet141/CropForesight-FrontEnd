import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import menu from "../assets/menu-icon.webp";
import "./nav.css";
import { useLocation } from "react-router-dom";

const NAV = ({ mode, setmode }) => {
  // console.log(mode,setmode);
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false);
  function changlemode() {
    setmode(mode === 'light' ? 'dark' : 'light');
  }
  function closeMenu() {
    setShowMenu(false)
  }

  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('AccessToken'));
  }, [token]);

  return (
    <>
      <nav>
        <div >
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
            <li style={{ backgroundColor: location.pathname === '/' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/about' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/about">About</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/contact' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/contact">Contact</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/faq' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/faq">FAQs</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/Weather' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/Weather">Weather</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/contributors' ? 'green' : 'inherit', width: '8rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/contributors">Contributors</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/ExampleCrop' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link to="/ExampleCrop">Example</Link>
            </li>
            <li style={{ backgroundColor: location.pathname === '/Login' ? 'green' : 'inherit', width: '5rem', height: '3rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {token !== null ? <Link to="/profile">Profile</Link> : <Link to="/Login">Login</Link>}
            </li>
            <li>
              <button className="modebtn" onClick={changlemode}>
                {mode === 'dark' ? <BsMoonFill className="h-6 w-6" /> : <BsSun className="h-6 w-6" />}
              </button>
            </li>
          </ul>
        </div>
        <div
          className="visibility-mobile"
          onClick={() => { setShowMenu(prev => !prev) }}
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
                {token !== null ? <Link to="/profile">Profile</Link> : <Link to="/Login">Login</Link>}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default NAV;
