import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
import logo from '../assets/earth.png'

const NavBar = () => {
  return (
    <header>
        <nav>
        <Link to="/"><img src = {logo}/></Link>
            <div class="right">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact" >Contact</Link></li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default NavBar