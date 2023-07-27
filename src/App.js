import axios from "axios";
import { useState } from "react";
import "./App.css";
import FormInfo from "./components/FormInfo";
import { ExampleCrop } from "./components/ExampleOfCrop/ExampleCrop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import swal from "sweetalert";
import {lazy, Suspense} from 'react'
import "./components/nav.css";

import GoToTop from "./GoToTop/GoToTop";
import Loading from './components/Loading';

const Home=lazy(()=>import('./components/Home'))
const Weather=lazy(()=>import('./components/Weather'))
const About=lazy(()=>import('./components/about'))
const Contact=lazy(()=>import('./components/contact'))
const FAQ=lazy(()=>import('./components/faq/faq'))
const Err=lazy(()=>import('./components/404'))

function App() {
  const [values, setValues] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [loading, setLoading] = useState();

  const inputs = [
    {
      id: 1,
      name: "nitrogen",
      type: "number",
      placeholder: "Nitrogen",
      label: "Nitrogen in parts per million (ppm)",
    },
    {
      id: 2,
      name: "phosphorus",
      type: "number",
      placeholder: "Phosphorus",
      label: "Phosphorus in parts per million (ppm) ",
    },
    {
      id: 3,
      name: "potassium",
      type: "number",
      placeholder: "Potassium",
      label: "Potassium in parts per million (ppm) ",
    },
    {
      id: 4,
      name: "temperature",
      type: "number",
      placeholder: "Temperature",
      label: "Temperature in Celsius (°C)",
    },
    {
      id: 5,
      name: "humidity",
      type: "number",
      placeholder: "Humidity",
      label: "Humidity in percentage (%)",
    },
    {
      id: 6,
      name: "ph",
      type: "number",
      placeholder: "Ph",
      label: "Ph (0-14)",
    },
    {
      id: 7,
      name: "rainfall",
      type: "number",
      placeholder: "Rainfall",
      label: "Rainfall in millimeters (mm)",
    },
  ];

  // Can be extracted sapareately
  const FormComponet = () => {
    return (
      <div className="body">
        <form 
        style={{
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
        }} 
        onSubmit={handleSubmit}>
          <h1 style={{marginBottom:'60px'}} className='title'>Crop Recomendation</h1>
          {error && (<p style={{color:"red"}}>{error}</p>)}
          {inputs.map((input) => (
            <FormInfo key={input.id} {...input} value={values[input.name]} onChange={onChange}
            />
          ))}
          <button onClick={handleSubmit} className='btn'>{loading ? 'Evaluating...' : 'Recommend Crop'}</button>
        </form>
      </div>)
  }

  const [error, seterror] = useState("");
 
  const handleSubmit = async (event) => {
    event.preventDefault();

   // console.log("function called");
    setLoading(true)


    if (values.nitrogen === '') { seterror("*Nitrogen is Required!"); }
    if (values.nitrogen === '') {
      seterror("*Nitrogen is Required!");
    } else if (isNaN(values.nitrogen) || values.nitrogen < 0 || values.nitrogen > 1000) {
      seterror("*Invalid Nitrogen (should be between 0 and 1000 ppm)");
    } else if (values.phosphorus === '') {
      seterror("*Phosphorus is Required!");
    } else if (isNaN(values.phosphorus) || values.phosphorus < 0 || values.phosphorus > 1000) {
      seterror("*Invalid Phosphorus (should be between 0 and 1000 ppm)");
    } else if (values.potassium === '') {
      seterror("*Potassium is Required!");
    } else if (isNaN(values.potassium) || values.potassium < 0 || values.potassium > 1000) {
      seterror("*Invalid Potassium (should be between 0 and 1000 ppm)");
    } else if (values.temperature === '') {
      seterror("*Temperature is Required!");
    } else if (isNaN(values.temperature) || values.temperature < -50 || values.temperature > 50) {
      seterror("*Invalid Temperature (should be between -50 and 50 degrees)");
    } else if (values.humidity === '') {
      seterror("*Humidity is Required!");
    } else if (isNaN(values.humidity) || values.humidity < 0 || values.humidity > 100) {
      seterror("*Invalid Humidity (should be between 0 and 100%)");
    } else if (values.ph === '') {
      seterror("*pH is Required!");
    } else if (isNaN(values.ph) || values.ph < 0 || values.ph > 14) {
      seterror("*Invalid pH (should be between 0 and 14)");
    } else if (values.rainfall === '') {
      seterror("*Rainfall is Required!");
    } else if (isNaN(values.rainfall) || values.rainfall < 0 || values.rainfall > 1000) {
      seterror("*Invalid Rainfall (should be between 0 and 1000 mm)");
    }
    else {

      const { data } = await axios.post(`https://cropforesight-backend.onrender.com/predict`, { nitrogen: Number(values.nitrogen), phosphorus: Number(values.phosphorus), potassium: Number(values.potassium), temperature: Number(values.temperature), humidity: Number(values.humidity), ph: Number(values.ph), rainfall: Number(values.rainfall) })
      setLoading(false)
      seterror("");
      values.nitrogen='';values.phosphorus='';values.potassium='';values.temperature='';values.humidity='';values.ph='';values.rainfall='';
      swal("Success", `You should plant ${data.result} in your field`, "success");
    }     
  }
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [preLoading, setPreLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setPreLoading(false);
    }, 2000);
  }

  return (
      <>
        <GoToTop />
        <BrowserRouter>
          <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={FormComponet()} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/Weather" element={<Weather />} />
            <Route path="/*" element={<Err />} />
            <Route path="/ExampleCrop" element={<ExampleCrop />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </>
  );
}

export default App;
