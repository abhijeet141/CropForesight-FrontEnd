import { Link } from "react-router-dom";
import logo from '../assets/earth.webp';
import "./404.css";
import NAVBAR from './nav';

const Err = () => {
    return (
        <>
            <NAVBAR />
            <div className="pg_not_found">
                <h1 className="error">4<span><i class="fas fa-ghost purple"></i></span>4</h1>
                <h2>Error: 404 page not found</h2>
                <p>Sorry, the page you're looking for cannot be accessed</p>
            </div>
        </>
    )
}

export default Err;