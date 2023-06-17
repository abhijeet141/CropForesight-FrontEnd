import { Link } from "react-router-dom";
import logo from '../assets/earth.png';
import "./404.css";

const Err = () => {
    return (
        <>
            <div className='nav'>
                <header>

                    <nav>
                        <div class="left" style={{ color: "red" }}>
                            <Link to="/"><img src={logo} /></Link>
                        </div>
                        <div class="right">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/faq" >FAQs</Link></li>
                                <li><Link to="/contact" >Contact</Link></li>

                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
            <div className="pg_not_found">
                <h1 className="error">4<span><i class="fas fa-ghost purple"></i></span>4</h1>
                <h2>Error: 404 page not found</h2>
                <p>Sorry, the page you're looking for cannot be accessed</p>
            </div>
        </>
    )
}

export default Err;