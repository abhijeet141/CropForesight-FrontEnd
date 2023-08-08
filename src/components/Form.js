import { useState } from "react";
import "./Form.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Form({ mode }) {
  const regex_email = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  // const regex_password = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$";
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  // const toastSuccess = () =>
  // toast.success("This is Toast Notification for Success");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.username.match(regex_email)) {
      window.alert("Email Id is invalid");
    }
    // i

    if (data.username === "") {
      window.alert("The Username Field is Empty");
    }

    if (data.password === "") window.alert("The Password Field is Empty");
    if (data.username === "admin@gmail.com" && data.password === "Admin123@") {
      // showToastMessage();
      // toastSuccess();

      window.alert("Login Successful");
      window.location.href = "/";

      console.log("Login Successful");
    } else {
      console.log("Login Failed");
      window.alert("Login Failed");
    }
  };
  //event handler to handle change in state of textbox
  const handleChange = (e) => {
    setData((previousState) => {
      //callback function fo setData setter function name(params) {
      console.log(e.target.name, e.target.value);
      return { ...previousState, [e.target.name]: e.target.value }; //an object returned by call back as argument to setData
    }); //data state object is being updated
  };
  // const [useremail, userpassword] = data;

  return (
    <div class="Container">
      <div className="formContainer">
        <p style={{ fontSize: 20, fontWeight: 600, marginBottom: "2rem" }}> LOGIN </p>{" "}
        <form class={mode === "light" ? "formColor validate" : "formColordark validate"} name="Login" onSubmit={handleSubmit}>
          <div class="row">
            <span class="fs-4" style={{ color: "black", fontWeight: 600 }}> Email </span>{" "}
            <input
              type="email" required
              name="username"
              style={{ width: "100%" }}
              onChange={handleChange}
            />{" "}
          </div>{" "}
          <div class="row">
            <span class="fs-4" style={{ color: "black", fontWeight: 600 }}> Password </span>{" "}
            <input
              type="password" required
              name="password"
              style={{ width: "100%" }}
              onChange={handleChange}
            />{" "}
          </div>{" "}
          <button type="submit" class="mt-4 ms-5" style={{ color: "white" }}>Submit</button>
        </form>{" "}
      </div>
    </div>
  );
}
export default Form;
