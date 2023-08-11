import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import swal from "sweetalert";
import "./App.css";
import { crop } from "./assets";
import { ExampleCrop } from "./components/ExampleOfCrop/ExampleCrop";
import FormInfo from "./components/FormInfo";
import "./components/nav.css";

import GoToTop from "./GoToTop/GoToTop";
import Loading from "./components/Loading";

import Err from "./components/404page/404";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import Contributor from "./components/Contributors/Contributor";
import Home from "./components/Home/Home";
import Weather from "./components/Weather";
import FAQ from "./components/faq/faq";
import Navbar from "./components/nav.jsx";
// const Login = lazy(() => import("./components/Login"));
// const Login = lazy(() => import("./components/Login"));
//  import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword/FotgotPassword";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Footer from "./components/Footer";
// import Success from "./components/Success";

function App() {
  const [mode, setmode] = useState('dark');
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

  // Can be extracted sapareately
  const FormComponent = () => {
    return (
      <>
        <div className="body">
          <div className="formCont">
            <div className="form-left">
              <div className="form-left-one">
                <Link to="/" style={{ textDecoration: "none" }}>
                  {" "}
                  {<h1> Crop Foresight </h1>}{" "}
                </Link>{" "}
                <h2> Crop Recomendation </h2>{" "}
                <p className="form-left-one-para">
                  Get crops recommendation based on your soil and weather
                  conditions.Fill in the given form andget recommendations now.{" "}
                </p>{" "}
              </div>{" "}
              <div className="form-left-two">
                <img src={crop} alt="crop" />
              </div>{" "}
            </div>{" "}
            <form onSubmit={handleSubmit}>
              <Link to="/">
                <button class="button2">
                  <span class="X2"> </span> <span class="Y2"> </span>{" "}
                  <div class="close2"> </div>{" "}
                </button>{" "}
              </Link>{" "}
              {error && <p style={{ color: "red" }}> {error} </p>}{" "}
              {inputs.map((input) => (
                <FormInfo
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}{" "}
              <button onClick={handleSubmit} disabled={loading} className="btn">
                {" "}
                {loading ? "Evaluating..." : "Recommend Crop"}{" "}
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </>
    );
  };

  const [error, seterror] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("function called");

    if (values.nitrogen === "") {
      seterror("*Nitrogen is Required!");
    }
    if (values.nitrogen === "") {
      seterror("*Nitrogen is Required!");
    } else if (
      isNaN(values.nitrogen) ||
      values.nitrogen < 0 ||
      values.nitrogen > 1000
    ) {
      seterror("*Invalid Nitrogen (should be between 0 and 1000 ppm)");
    } else if (values.phosphorus === "") {
      seterror("*Phosphorus is Required!");
    } else if (
      isNaN(values.phosphorus) ||
      values.phosphorus < 0 ||
      values.phosphorus > 1000
    ) {
      seterror("*Invalid Phosphorus (should be between 0 and 1000 ppm)");
    } else if (values.potassium === "") {
      seterror("*Potassium is Required!");
    } else if (
      isNaN(values.potassium) ||
      values.potassium < 0 ||
      values.potassium > 1000
    ) {
      seterror("*Invalid Potassium (should be between 0 and 1000 ppm)");
    } else if (values.temperature === "") {
      seterror("*Temperature is Required!");
    } else if (
      isNaN(values.temperature) ||
      values.temperature < -50 ||
      values.temperature > 50
    ) {
      seterror("*Invalid Temperature (should be between -50 and 50 degrees)");
    } else if (values.humidity === "") {
      seterror("*Humidity is Required!");
    } else if (
      isNaN(values.humidity) ||
      values.humidity < 0 ||
      values.humidity > 100
    ) {
      seterror("*Invalid Humidity (should be between 0 and 100%)");
    } else if (values.ph === "") {
      seterror("*pH is Required!");
    } else if (isNaN(values.ph) || values.ph < 0 || values.ph > 14) {
      seterror("*Invalid pH (should be between 0 and 14)");
    } else if (values.rainfall === "") {
      seterror("*Rainfall is Required!");
    } else if (
      isNaN(values.rainfall) ||
      values.rainfall < 0 ||
      values.rainfall > 1000
    ) {
      seterror("*Invalid Rainfall (should be between 0 and 1000 mm)");
    } else {
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
          rainfall: Number(values.rainfall),
        }
      );
      if (data.result) {
        setLoading(false);
        seterror("");
        values.nitrogen = "";
        values.phosphorus = "";
        values.potassium = "";
        values.temperature = "";
        values.humidity = "";
        values.ph = "";
        values.rainfall = "";
        swal(
          "Success",
          `You should plant ${data.result} in your field`,
          "success"
        );
      } else {
        setLoading(false);
        values.nitrogen = "";
        values.phosphorus = "";
        values.potassium = "";
        values.temperature = "";
        values.humidity = "";
        values.ph = "";
        values.rainfall = "";
        swal("Error", "Error in evaluation Please try again later", "error");
      }
    }
  };
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

  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('AccessToken'));
  }, [token]);

  return (
    <>
      <GoToTop />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Navbar mode={mode} setmode={setmode} />
          <Routes>
            <Route path="/" element={<Home mode={mode} setmode={setmode} />} />{" "}
            <Route path="/form" element={FormComponent(mode)} />{" "}
            <Route path="/about" element={<About mode={mode} setmode={setmode} />} />{" "}
            <Route path="/contact" element={<Contact mode={mode} setmode={setmode} />} />{" "}
            <Route path="/faq" element={<FAQ mode={mode} setmode={setmode} />} />{" "}
            <Route path="/Weather" element={<Weather mode={mode} setmode={setmode} />} />{" "}
            <Route path="/*" element={<Err mode={mode} setmode={setmode} />} />{" "}
            <Route path="/ExampleCrop" element={<ExampleCrop mode={mode} setmode={setmode} />} />{" "}
            <Route path="/contributors" element={<Contributor mode={mode} setmode={setmode} />} />{" "}
            {token === null && <Route path="/Login" element={<Login mode={mode} setmode={setmode} />} />}
            {token === null && <Route path="/Register" element={<Register mode={mode} setmode={setmode} />} />}
            {token === null && <Route path="/forgotpassword" element={<ForgotPassword mode={mode} setmode={setmode} />} />}
            {token !== null && <Route path="/profile" element={<Profile mode={mode} setmode={setmode} />} />}
            {/* <Route path="/Success" element={<Success />} />{" "} */}{" "}
          </Routes>{" "}
          <Footer mode={mode} setmode={setmode} />
        </Suspense>{" "}
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
