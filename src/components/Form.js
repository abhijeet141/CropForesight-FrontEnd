import "./Form.css";
import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Form({mode}) {
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
    <>
      <div className={`d-flex flex-column  border border-5 border-dark mt-6 w-55 p-1 mb-5 justify-content-center align-items-center container-sm `}>
        <p className="display-6 fs-8"> Login </p>{" "}
        <form className={mode === "light" ? "formColor":"formColordark"} name="Login" onSubmit={handleSubmit}>
          <div className="row">
            <span className="fs-4 col-lg-4 col-sm-6 col-6"> Email </span>{" "}
            <input
              type="text"
              name="username"
              className="col-lg-8 col-sm-6 col-6"
              onChange={handleChange}
            />{" "}
          </div>{" "}
          <div className="row">
            <span className="fs-4 col-lg-4 col-sm-6 col-6"> Password </span>{" "}
            <input
              type="password"
              name="password"
              className="col-lg-8 col-sm-6 col-6"
              onChange={handleChange}
            />{" "}
          </div>{" "}
          <input type="submit" className="btn btn-dark mt-4 ms-5" value="Submit" />
        </form>{" "}
      </div>{" "}
    </>
  );
}
export default Form;
