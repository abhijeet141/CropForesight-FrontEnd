import { useState } from 'react';
import './App.css';
import FormInfo from './components/FormInfo';
import axios from 'axios';
import Home from './components/Home';
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
  const [loading, setLoading] = useState()

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
  ]
  // Can be extracted sapareately
  const FormComponet = () => {
    return (
      <div className='body'>
        <form onSubmit={handleSubmit}>
          <h1>Crop Recomendation</h1>
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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={FormComponet()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
