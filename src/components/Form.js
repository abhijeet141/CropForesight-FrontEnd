import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from '../firebase-config';
import './Form.css';

const LoginForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      localStorage.setItem("AccessToken", user.user.accessToken);
      localStorage.setItem("Email", user.user.email);
      localStorage.setItem("displayName", user.user.displayName);
      window.location.reload();
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  }

  // Login user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("AccessToken", userLogin.user.accessToken);
      localStorage.setItem("Email", userLogin.user.email);
      window.alert("Login successful");
      navigate('/');
    } catch (err) {
      console.log(err.message);;
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <title>Glassmorphism login Form Tutorial in html css</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
        rel="stylesheet"
      />
      {/*Stylesheet*/}
      <style
        media="screen"
        dangerouslySetInnerHTML={{
          __html:
            "\n      *,\n*:before,\n*:after{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nbody{\n    overflow-y : hidden;\n}\n.background{\n    width: 430px;\n    height: 520px;\n    position: absolute;\n    transform: translate(-50%,-50%);\n    left: 50%;\n    top: 50%;\n}\n.background .shape{\n    height: 200px;\n    width: 200px;\n    position: absolute;\n    border-radius: 50%;\n}\n.shape:first-child{\n    background: linear-gradient(\n        #1845ad,\n        #23a2f6\n    );\n    left: -80px;\n    top: -80px;\n}\n.shape:last-child{\n    background: linear-gradient(\n        to right,\n        #ff512f,\n        #f09819\n    );\n    right: -30px;\n    bottom: -80px;\n}\nform{\n    height: fit-content;\n    width: 400px;\n    background-color: rgba(255,255,255,0.13);\n    position: absolute;\n    transform: translate(-50%,-50%);\n    top: 50%;\n    left: 50%;\n    border-radius: 10px;\n    backdrop-filter: blur(10px);\n    border: 2px solid rgba(255,255,255,0.1);\n    box-shadow: 0 0 40px rgba(8,7,16,0.6);\n    padding: 50px 35px;\n}\nform *{\n    font-family: 'Poppins',sans-serif;\n    color: #ffffff;\n    letter-spacing: 0.5px;\n    outline: none;\n    border: none;\n}\nform h3{\n    font-size: 32px;\n    font-weight: 500;\n    line-height: 42px;\n    text-align: center;\n}\n\nlabel{\n    display: block;\n    margin-top: 30px;\n    font-size: 16px;\n    font-weight: 500;\n}\ninput{\n    display: block;\n    height: 50px;\n    width: 100%;\n    background-color: rgba(255,255,255,0.07);\n    border-radius: 3px;\n    padding: 0 10px;\n    margin-top: 8px;\n    font-size: 14px;\n    font-weight: 300;\n}\n::placeholder{\n    color: #e5e5e5;\n}\nbutton{\n    margin-top: 50px;\n    width: 100%;\n    background-color: #ffffff;\n    color: #080710;\n    padding: 15px 0;\n    font-size: 18px;\n    font-weight: 600;\n    border-radius: 5px;\n    cursor: pointer;\n}\nbutton:hover{\nbackground-color: rgb(46, 82, 225);\n color: white;\n transition: .3s;\n}.eye-icon{\ncursor:pointer;\n}\n.social{\n  margin-top: 30px;\n  display: flex;\n}\n.social div{\n  background: red;\n  width: 150px;\n  border-radius: 3px;\n  padding: 5px 10px 10px 5px;\n  background-color: rgba(255,255,255,0.27);\n  color: #eaf0fb;\n  text-align: center;\n}\n.social div:hover{\n  background-color: rgba(255,255,255,0.47);\n}\n.social .go{\n cursor:pointer;\n }.fb{\n  margin-left: 25px;\n cursor:pointer;}\n.social i{\n  margin-right: 4px;\n}\n\n    ",
        }}
      />
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <h3>Login Here</h3>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email or Phone" id="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <div className="password-input" style={{ display: 'flex', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
            />
            <span
              className={`eye-icon ${showPassword ? 'show' : ''}`}
              onClick={toggleShowPassword} style={{ marginTop: "1.4rem", position: 'absolute', right: 10 }}
            >
              {showPassword ? (
                <i className="far fa-eye-slash" />
              ) : (
                <i className="far fa-eye" />
              )}
            </span>
          </div>
          <button type='submit'>Log In</button>
          <div className="social">
            <div className="go" onClick={handleGoogleLogin}>
              <i className="fab fa-google" />Google
            </div>
            <div className="fb">
              <i className="fab fa-github" />GitHub
            </div>
          </div>
          <p style={{ fontSize: "1rem", textAlign: "center", marginTop: "0.4rem" }}>Don't have an account <Link to="/Register" style={{ color: "blue" }}>Register</Link></p>
          <p style={{ fontSize: "1rem", textAlign: "center", marginTop: "0.2rem" }}> <Link to="/forgotpassword" style={{ color: "blue" }}>Forgot Password</Link></p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
