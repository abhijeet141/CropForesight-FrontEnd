import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ExampleCrop } from './pages/ExampleOfCrop/ExampleCrop.jsx';
import HomeRoute from "./HomeRoute.jsx";
import GoToTop from "./components/GoToTop/GoToTop.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { FormComponent } from "./components/Form/FormComponent.jsx";
import Err from "./pages/404page/404.jsx";
import Contributor from "./pages/Contributors/Contributor.jsx";
import Weather from "./pages/Weather/Weather.jsx";
import FAQ from "./pages/faq/faq.jsx";
import { SignIn, SignUp } from '@clerk/clerk-react'
import { ImageUpload } from "./components/ImageUpload/ImageUpload.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {

  return (
    <>
      <GoToTop />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />    
          <Route path="/form" element={<ProtectedRoute element={<FormComponent />} />} />
          <Route path="/faq" element={<ProtectedRoute element={<FAQ />} />} />
          <Route path="/ImageUpload" element={<ProtectedRoute element={<ImageUpload />} />} />
          <Route path="/Weather" element={<ProtectedRoute element={<Weather />} />} />
          <Route path="/ExampleCrop" element={<ProtectedRoute element={<ExampleCrop />} />} />
          <Route path="/contributors" element={<ProtectedRoute element={<Contributor />} />} />
          <Route path="/*" element={<Err />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
