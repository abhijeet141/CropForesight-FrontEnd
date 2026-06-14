import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navbar/Navbar.css";
import { useAuth, SignInButton, SignOutButton } from "@clerk/clerk-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/faq", label: "FAQs" },
  { to: "/Weather", label: "Weather" },
  { to: "/ExampleCrop", label: "Crops" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  const onHomePage = location.pathname === "/";

  if (!isLoaded) {
    return null;
  }

  // the signed-out landing page renders its own nav
  if (!isSignedIn && onHomePage) {
    return null;
  }

  const isActive = (to) => location.pathname.toLowerCase() === to.toLowerCase();

  const authButton = (
    <li>
      {isSignedIn ? (
        <SignOutButton>
          <button className="app-btn app-btn-primary">Sign out</button>
        </SignOutButton>
      ) : (
        <SignInButton mode="modal">
          <button className="app-btn app-btn-primary">Sign in</button>
        </SignInButton>
      )}
    </li>
  );

  return (
    <nav className="app-nav">
      <div className="app-nav-inner">
        <Link className="app-brand" to="/" onClick={() => setOpen(false)}>
          <span className="app-brand-mark">🌾</span>CropForesight
        </Link>

        <ul className="app-nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={isActive(to) ? "active" : ""}>
                {label}
              </Link>
            </li>
          ))}
          {authButton}
        </ul>

        <button
          className="app-nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="app-nav-mobile">
          {LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={isActive(to) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          {isSignedIn ? (
            <SignOutButton>
              <button className="app-btn app-btn-primary">Sign out</button>
            </SignOutButton>
          ) : (
            <SignInButton mode="modal">
              <button className="app-btn app-btn-primary">Sign in</button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
}
