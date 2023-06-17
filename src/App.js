import { useState } from 'react';
import './App.css';
import FormInfo from './components/FormInfo';
import axios from 'axios';
import Home from './components/Home';
import Contact from './components/contact';
import Weather from './components/Weather';
import FAQ from './components/faq/faq';
import Err from './components/404'
import About from './components/about';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import swal from 'sweetalert';

import GoToTop from './GoToTop/GoToTop';



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
  const [loading, setLoading] = useState()

  const inputs = [
    {
      id: 1,
      name: "nitrogen",
      type: "number",
      placeholder: "Nitrogen",
      label: "Nitrogen in parts per million (ppm)"
    },
    {
      id: 2,
      name: "phosphorus",
      type: "number",
      placeholder: "Phosphorus",
      label: "Phosphorus in parts per million (ppm) "
    },
    {
      id: 3,
      name: "potassium",
      type: "number",
      placeholder: "Potassium",
      label: "Potassium in parts per million (ppm) "
    },
    {
      id: 4,
      name: "temperature",
      type: "number",
      placeholder: "Temperature",
      label: "Temperature in Celsius (°C)"
    },
    {
      id: 5,
      name: "humidity",
      type: "number",
      placeholder: "Humidity",
      label: "Humidity in percentage (%)"
    },
    {
      id: 6,
      name: "ph",
      type: "number",
      placeholder: "Ph",
      label: "Ph (0-14)"
    },
    {
      id: 7,
      name: "rainfall",
      type: "number",
      placeholder: "Rainfall",
      label: "Rainfall in millimeters (mm)"
    }
  ]
  // Can be extracted sapareately
  const FormComponet = () => {
    return (
      <div className='body'>
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Crop Recomendation</h1>
          {inputs.map((input) => (
            <FormInfo key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
          <button>{loading ? 'Evaluating...' : 'Recommend Crop'}</button>
        </form>
      </div>)
  }
  const handleSubmit = async (event) => {

    event.preventDefault();
    setLoading(true)
    const { data } = await axios.post(`https://cropforesight-backend.onrender.com/predict`, { nitrogen: Number(values.nitrogen), phosphorus: Number(values.phosphorus), potassium: Number(values.potassium), temperature: Number(values.temperature), humidity: Number(values.humidity), ph: Number(values.ph), rainfall: Number(values.rainfall) })
    setLoading(false)
    swal("Success", `You should plant ${data.result} in your field`, "success");
  }
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
  <>
  <GoToTop/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={FormComponet()} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/faq' element={<FAQ />}/>
        <Route path='/Weather' element={<Weather />}/>
        <Route path='/*' element={<Err />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
