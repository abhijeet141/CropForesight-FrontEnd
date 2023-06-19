import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/earth.png'
import './nav.css'


const NAV = () => {
    return (
        <div className='nav'>
            <header>
                <nav>
                    <Link to="/"><img src={logo} /></Link>
                    <div class="right">

                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact" >Contact</Link></li>
                            <li><Link to="/faq" >FAQs</Link></li>
                            <li><Link to="/Weather">Weather</Link></li>
                        </ul>

                    </div>
                </nav>
            </header>
        </div>

    )
}

export default NAV

