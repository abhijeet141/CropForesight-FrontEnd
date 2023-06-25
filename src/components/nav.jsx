import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/earth.png'
import menu from '../assets/menu-icon.png'
import './nav.css'

const NAV = () => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <nav>
                <div>
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <div className='visibility-desktop'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact" >Contact</Link></li>
                        <li><Link to="/faq" >FAQs</Link></li>
                        <li><Link to="/Weather">Weather</Link></li>
                    </ul>
                </div>
                <div className='visibility-mobile' onClick={() => setShowMenu((prev) => !prev)}>
                    <img src={menu} alt="" />
                </div>
            </nav>
            {showMenu && (
                <>
                    <div className='mobile-nav'>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact" >Contact</Link></li>
                            <li><Link to="/faq" >FAQs</Link></li>
                            <li><Link to="/Weather">Weather</Link></li>
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}

export default NAV

