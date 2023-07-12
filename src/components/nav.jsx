import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import menu from "../assets/menu-icon.webp";
import "./nav.css";
import { BsMoonFill, BsSun } from "react-icons/bs";


const NAV = ({mode,setmode}) => {
  const [showMenu, setShowMenu] = useState(false);
  function changlemode(){
     setmode(mode === 'light' ? 'dark' : 'light');
  }
  return (
    <>
      <nav className={`${mode === 'light' ? "font-black	" : "font-bold" }`}>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" style={{width: "200px", height: "45px", marginTop: "7px"}} />
          </Link>
        </div>
        <div className="visibility-desktop">
          <ul style={{listStyle:"none"}}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about" className="">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/Weather">Weather</Link>
            </li>
            <li>
              <Link to="/ExampleCrop">Example</Link>
            </li>
            <li>
              <button className="bg-inherit	" onClick={() =>changlemode()}>
                {mode === 'dark' ? <BsMoonFill className="h-6 w-6"/> : <BsSun className="h-6 w-6"/>}
              </button>
            </li>
          </ul>
        </div>
        <div
          className="visibility-mobile"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <img src={menu} alt="" />
        </div>
      </nav>
      {showMenu && (
        <>
          <div className="mobile-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/Weather">Weather</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default NAV;
