import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-react'
import Landing from './pages/Landing/Landing.jsx';
import Home from './pages/Home/Home';
import CropLoader from './components/CropLoader/CropLoader.jsx';

// time for the sprout to grow once (keep in sync with CropLoader.css), plus a
// brief hold on the finished plant before handing off to the page
const INTRO_MS = 1900;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// true once the intro has played in this page load. A full reload re-evaluates the
// module and resets it, so the intro replays on reload — but not when react-router
// remounts HomeRoute on an in-app navigation back to Home.
let introHasPlayed = false;

const HomeRoute = () => {

  const { isLoaded, isSignedIn } = useAuth()
  const [introDone, setIntroDone] = useState(
    () => introHasPlayed || prefersReducedMotion()
  );

  // last known (post-load) auth state, so a real sign-in (false -> true) replays the
  // intro — Clerk's modal sign-in flips state without reloading the page.
  const prevSignedIn = useRef(undefined);

  useEffect(() => {
    if (!isLoaded) return;
    const wasSignedIn = prevSignedIn.current;
    prevSignedIn.current = isSignedIn;
    if (wasSignedIn === false && isSignedIn === true && !prefersReducedMotion()) {
      setIntroDone(false);
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (introDone) {
      introHasPlayed = true;
      return;
    }
    const timer = setTimeout(() => setIntroDone(true), INTRO_MS);
    return () => clearTimeout(timer);
  }, [introDone]);

  if (!isLoaded || !introDone) {
    return <CropLoader fullPage />;
  }

  return isSignedIn ? <Home /> : <Landing />;
};

export default HomeRoute;
