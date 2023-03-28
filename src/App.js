import { useState } from 'react';
import './App.css';
import FormInfo from './components/FormInfo';
import axios from 'axios';

function App() {
  const [values,setValues] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const inputs = [
    {
      id:1,
      name:"nitrogen",
      type:"number",
      placeholder:"Nitrogen",
      label:"Nitrogen"
    },
    {
      id:2,
      name:"phosphorus",
      type:"number",
      placeholder:"Phosphorus",
      label:"Phosphorus"
    },
    {
      id:3,
      name:"potassium",
      type:"number",
      placeholder:"Potassium",
      label:"Potassium"
    },
    {
      id:4,
      name:"temperature",
      type:"number",
      placeholder:"Temperature",
      label:"Temperature"
    },
    {
      id:5,
      name:"humidity",
      type:"number",
      placeholder:"Humidity",
      label:"Humidity"
    },
    {
      id:6,
      name:"ph",
      type:"number",
      placeholder:"Ph",
      label:"Ph"
    },
    {
      id:7,
      name:"rainfall",
      type:"number",
      placeholder:"Rainfall",
      label:"Rainfall"
    }
  ]
  const handleSubmit = async (event) => {

    event.preventDefault();

    const { data } =  await axios.post(`https://cropforesight-backend.onrender.com/predict`, { nitrogen: Number(values.nitrogen) , phosphorus: Number(values.phosphorus) , potassium: Number(values.potassium) , temperature: Number(values.temperature) , humidity: Number(values.humidity) , ph: Number(values.ph) , rainfall: Number(values.rainfall) })
    alert(data.result);
  }
  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  return (
    <div className='body'>
    <form onSubmit={handleSubmit}>
      <h1>Crop Recomendation</h1>
      {inputs.map((input) => (
            <FormInfo key = {input.id} {...input} value={values[input.name]} onChange={onChange} />
      ))}
      <button>Submit</button>
    </form>
</div>
  );
}

export default App;
