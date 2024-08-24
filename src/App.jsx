import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { ExampleCrop } from "./components/ExampleOfCrop/ExampleCrop.jsx";
import HomeRoute from "./HomeRoute.jsx"
import GoToTop from "./GoToTop/GoToTop.jsx";
import Loading from "./components/Loading.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { FormComponent } from "./components/Form/FormComponent.jsx";
import Err from "./components/404page/404.jsx";
// import About from "./components/About/about.jsx";
import Contact from "./components/Contact/contact.js";
import Contributor from "./components/Contributors/Contributor.jsx";
// import Home from "./components/Home/Home.js";
import Weather from "./components/Weather.js";
import FAQ from "./components/faq/faq.jsx";
import { ImageUpload } from "./components/ImageUpload/ImageUpload.jsx";
// import { HomePage } from "./components/HomePage/HomePage.jsx";
// const Login = lazy(() => import("./components/Login"));
// const Login = lazy(() => import("./components/Login"));
//  import Login from "./components/Login";
// import Success from "./components/Success";

function App() { 
 
  const [preLoading, setPreLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setPreLoading(false);
    }, 2000);
  }
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('AccessToken'));
  }, [token]);
  
  return (
    <>
      <GoToTop />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />{" "}
            <Route path="/form" element={<ProtectedRoute element={<FormComponent />} />} />
            {/* <Route path="/about" element={<ProtectedRoute element={<About />} />} /> */}
            <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
            <Route path="/faq" element={<ProtectedRoute element={<FAQ />} />} />
            <Route path="/ImageUpload" element={<ProtectedRoute element={<ImageUpload />} />} />
            <Route path="/Weather" element={<ProtectedRoute element={<Weather />} />} />
            <Route path="/ExampleCrop" element={<ProtectedRoute element={<ExampleCrop />} />} />
            <Route path="/contributors" element={<ProtectedRoute element={<Contributor />} />} />
            <Route path="/*" element={<Err />} />
          </Routes>{" "}
        </Suspense>{" "}
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
