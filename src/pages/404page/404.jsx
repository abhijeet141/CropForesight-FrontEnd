import { Link } from "react-router-dom";
import "./404.css";

const Err = () => {
  return (
    <div className="notfound-page">
      <div className="wrap">
        <span className="eyebrow">Error 404</span>

        <div className="numerals">
          <span className="digit">4</span>
          <span className="emblem" aria-hidden="true">
            <svg viewBox="0 0 80 80" className="sprout">
              <path className="stem" d="M40 72 C40 56 40 48 40 32" />
              <path className="leaf" d="M40 50 C29 50 21 43 19 31 C31 31 40 38 40 50 Z" />
              <path className="leaf alt" d="M40 44 C51 44 59 37 61 25 C49 25 40 32 40 44 Z" />
            </svg>
          </span>
          <span className="digit">4</span>
        </div>

        <h1>This field hasn't been <em>planted</em> yet</h1>
        <p className="sub">
          The page you're looking for may have been moved, harvested, or never
          sown. Let's get you back to fertile ground.
        </p>

        <div className="actions">
          <Link className="btn primary" to="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Err;
