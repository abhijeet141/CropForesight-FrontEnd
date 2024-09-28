import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { ExampleCrop } from './pages/ExampleOfCrop/ExampleCrop.jsx';
import HomeRoute from "./HomeRoute.jsx";
import GoToTop from "./components/GoToTop/GoToTop.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { FormComponent } from "./components/Form/FormComponent.jsx";
import Err from "./pages/404page/404.jsx";
import Contributor from "./pages/Contributors/Contributor.jsx";
import Weather from "./pages/Weather/Weather.jsx";
import FAQ from "./pages/faq/faq.jsx";
import { useAuth } from '@clerk/clerk-react'
import { ImageUpload } from "./components/ImageUpload/ImageUpload.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const {isLoaded} = useAuth()
  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  
    height: "100vh", 
    borderColor: "white",
    margin: "0 auto"
  };
  let [loading,] = useState(true);
  let [color,] = useState("#ffffff");

  return (
    <>
    {!isLoaded ? <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      :
      <>
      <GoToTop />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />    
          <Route path="/form" element={<ProtectedRoute element={<FormComponent />} />} />
          <Route path="/faq" element={<ProtectedRoute element={<FAQ />} />} />
          <Route path="/ImageUpload" element={<ProtectedRoute element={<ImageUpload />} />} />
          <Route path="/Weather" element={<ProtectedRoute element={<Weather override={override}/>} />} />
          <Route path="/ExampleCrop" element={<ProtectedRoute element={<ExampleCrop />} />} />
          <Route path="/contributors" element={<ProtectedRoute element={<Contributor override={override} />} />} />
          <Route path="/*" element={<ProtectedRoute element={<Err />}></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      </>
  }
      </>
  );
}

export default App;
