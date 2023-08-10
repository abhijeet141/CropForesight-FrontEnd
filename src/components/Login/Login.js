import NAV from "../nav";
import "./Login.css";
import Form from "../Form";

function Login({mode,setmode}) {
  return (
    <>
      <NAV mode={mode} setmode={setmode}/>
      <Form mode={mode} />{" "}
    </>
  );
}

export default Login;
