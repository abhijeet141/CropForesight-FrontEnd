import React, { useState } from 'react';
import './App.css';
import FormInfo from './components/FormInfo';
import axios from 'axios';
import Home from './components/Home';
import Contact from './components/contact';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import swal from 'sweetalert';

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

  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "nitrogen",
      type: "number",
      placeholder: "Nitrogen",
      label: "Nitrogen"
    },
    {
      id: 2,
      name: "phosphorus",
      type: "number",
      placeholder: "Phosphorus",
      label: "Phosphorus"
    },
    {
      id: 3,
      name: "potassium",
      type: "number",
      placeholder: "Potassium",
      label: "Potassium"
    },
    {
      id: 4,
      name: "temperature",
      type: "number",
      placeholder: "Temperature",
      label: "Temperature"
    },
    {
      id: 5,
      name: "humidity",
      type: "number",
      placeholder: "Humidity",
      label: "Humidity"
    },
    {
      id: 6,
      name: "ph",
      type: "number",
      placeholder: "Ph",
      label: "Ph"
    },
    {
      id: 7,
      name: "rainfall",
      type: "number",
      placeholder: "Rainfall",
      label: "Rainfall"
    }
  ];

  const FormComponent = () => {
    return (
      <div className={`body ${darkMode ? 'dark-mode' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h1>Crop Recommendation</h1>
          {inputs.map((input) => (
            <FormInfo
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>{loading ? 'Evaluating...' : 'Recommend Crop'}</button>
        </form>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      `https://cropforesight-backend.onrender.com/predict`,
      {
        nitrogen: Number(values.nitrogen),
        phosphorus: Number(values.phosphorus),
        potassium: Number(values.potassium),
        temperature: Number(values.temperature),
        humidity: Number(values.humidity),
        ph: Number(values.ph),
        rainfall: Number(values.rainfall)
      }
    );
    setLoading(false);
    swal("Success", `You should plant ${data.result} in your field`, "success");
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<FormComponent />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
        </div>
</BrowserRouter>
);
}

export default App;
