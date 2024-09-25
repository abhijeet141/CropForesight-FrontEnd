import swal from "sweetalert";
import axios from "axios";
import { crop } from "../../assets/index.js";
import FormInfo from "./FormInfo.js";
import Navbar from "../Navbar/Navbar.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export function FormComponent() {
  const [values, setValues] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [loading, setLoading] = useState(false); // Initializing loading state
  const [error, setError] = useState(""); // Correct placement of error state

  const inputs = [
    {
      id: 1,
      name: "nitrogen",
      type: "number",
      placeholder: "Nitrogen in parts per million (ppm)",
    },
    {
      id: 2,
      name: "phosphorus",
      type: "number",
      placeholder: "Phosphorus in parts per million (ppm) ",
    },
    {
      id: 3,
      name: "potassium",
      type: "number",
      placeholder: "Potassium in parts per million (ppm) ",
    },
    {
      id: 4,
      name: "temperature",
      type: "number",
      placeholder: "Temperature in Celsius (°C)",
    },
    {
      id: 5,
      name: "humidity",
      type: "number",
      placeholder: "Humidity in percentage (%)",
    },
    {
      id: 6,
      name: "ph",
      type: "number",
      placeholder: "Ph (0-14)",
    },
    {
      id: 7,
      name: "rainfall",
      type: "number",
      placeholder: "Rainfall in millimeters (mm)",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.nitrogen === "") {
      setError("*Nitrogen is Required!");
    } else if (
      isNaN(values.nitrogen) ||
      values.nitrogen < 0 ||
      values.nitrogen > 1000
    ) {
      setError("*Invalid Nitrogen (should be between 0 and 1000 ppm)");
    } else if (values.phosphorus === "") {
      setError("*Phosphorus is Required!");
    } else if (
      isNaN(values.phosphorus) ||
      values.phosphorus < 0 ||
      values.phosphorus > 1000
    ) {
      setError("*Invalid Phosphorus (should be between 0 and 1000 ppm)");
    } else if (values.potassium === "") {
      setError("*Potassium is Required!");
    } else if (
      isNaN(values.potassium) ||
      values.potassium < 0 ||
      values.potassium > 1000
    ) {
      setError("*Invalid Potassium (should be between 0 and 1000 ppm)");
    } else if (values.temperature === "") {
      setError("*Temperature is Required!");
    } else if (
      isNaN(values.temperature) ||
      values.temperature < -50 ||
      values.temperature > 50
    ) {
      setError("*Invalid Temperature (should be between -50 and 50 degrees)");
    } else if (values.humidity === "") {
      setError("*Humidity is Required!");
    } else if (
      isNaN(values.humidity) ||
      values.humidity < 0 ||
      values.humidity > 100
    ) {
      setError("*Invalid Humidity (should be between 0 and 100%)");
    } else if (values.ph === "") {
      setError("*pH is Required!");
    } else if (isNaN(values.ph) || values.ph < 0 || values.ph > 14) {
      setError("*Invalid pH (should be between 0 and 14)");
    } else if (values.rainfall === "") {
      setError("*Rainfall is Required!");
    } else if (
      isNaN(values.rainfall) ||
      values.rainfall < 0 ||
      values.rainfall > 1000
    ) {
      setError("*Invalid Rainfall (should be between 0 and 1000 mm)");
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `https://cropforesight-backend.onrender.com/predict`,
          {
            nitrogen: Number(values.nitrogen),
            phosphorus: Number(values.phosphorus),
            potassium: Number(values.potassium),
            temperature: Number(values.temperature),
            humidity: Number(values.humidity),
            ph: Number(values.ph),
            rainfall: Number(values.rainfall),
          }
        );
        if (data.result) {
          setLoading(false);
          setError("");
          setValues({
            nitrogen: "",
            phosphorus: "",
            potassium: "",
            temperature: "",
            humidity: "",
            ph: "",
            rainfall: "",
          });
          swal(
            "Success",
            `You should plant ${data.result} in your field`,
            "success"
          );
        } else {
          setLoading(false);
          setValues({
            nitrogen: "",
            phosphorus: "",
            potassium: "",
            temperature: "",
            humidity: "",
            ph: "",
            rainfall: "",
          });
          swal("Error", "Error in evaluation. Please try again later", "error");
        }
      } catch (error) {
        setLoading(false);
        swal("Error", "Error in evaluation. Please try again later", "error");
      }
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="body">
        <div className="formCont">
          <div className="form-left">
            <div className="form-left-one">
              <Link to="/" style={{ textDecoration: "none" }}>
                <h1>Crop Foresight</h1>
              </Link>
              <h2>Crop Recommendation</h2>
              <p className="form-left-one-para">
                Get crops recommendation based on your soil and weather
                conditions. Fill in the given form and get recommendations now.
              </p>
            </div>
            <div className="form-left-two">
              <img src={crop} alt="crop" />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Link to="/">
              <button className="button2">
                <span className="X2"></span>
                <span className="Y2"></span>
                <div className="close2"></div>
              </button>
            </Link>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {inputs.map((input) => (
              <FormInfo
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button onClick={handleSubmit} disabled={loading} className="btn">
              {loading ? "Evaluating..." : "Recommend Crop"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
