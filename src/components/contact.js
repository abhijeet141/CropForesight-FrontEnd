import React, { useState, useEffect } from "react";
import styles from "./contact.css";
import "./nav.css";
import { useNavigate, Link, useHref } from "react-router-dom";
import swal from "sweetalert";
import NAVBAR from "./nav";
import logo from '../assets/earth.webp';

const Typewriter = ({ sentences, delay }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentSentence = sentences[currentIndex % sentences.length];
    const currentSentenceLength = currentSentence.length;

    if (displayText.length === currentSentenceLength) {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setDisplayText("");
      }, delay);
    } else {
      const timer = setTimeout(() => {
        setDisplayText(
          (prevText) => prevText + currentSentence[displayText.length]
        );
      }, 100); // Adjust the typing speed as per your preference

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, displayText, sentences, delay]);

  return <span>{displayText}</span>;
};
const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, seterror] = useState("");

  const sentences = [
    "Have A Question ❓",
    "Want To contact me ?",
    "Any Suggestions 💡",
    "Report a bug 🪲",
  ];

  function validEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) return true;
    else return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Do some authentication here...
    console.log("function called");

    if (name === "") {
      seterror("**Name is Required!");
    } else if (email === "") {
      seterror("**E-mail is Required!");
    } else if (!validEmail(email)) {
      seterror("**Enter a valid E-mail!");
    } else if (message === "") {
      seterror("**Enter a message!");
    } else {
      seterror("");
      setName("");
      setEmail("");
      setMessage("");

      try {
        // const response = await fetch("https://cropforesight-backend.onrender.com/subform", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });

        // if (response.ok) {
        //   // Form submission successful
        //   // Handle success or show a success message
        //   console.log('submitted');
        // } else {
        //   // Form submission failed
        //   // Handle error or show an error message
        //   console.log('failed');
        // }
        //console.log(formData);
        swal(
          "Success",
          `Thanks for contacting us ${name}. We have received your details successfully. We will get back to you soon.`,
          "success"
        );
      } catch (error) {
        // Handle error or show an error message
        console.log(error);
        swal("Error", "Something went wrong... Please try again", "error");
      }
    }
  }

  return (
    <div>
      {/* nav bar */}
      <NAVBAR />
      <h1 className="contact">Contact US</h1>

      <h3 className="tag">
        <Typewriter sentences={sentences} delay={2000} />
      </h3>

      <form className="form glass">
        <div className="form-group">
          <input
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control ${
              error === "**Name is Required!" && "inputField"
            }`}
          />
          {error === "**Name is Required!" && (
            <small className="errorMsg">**Name is Required!</small>
          )}
        </div>
        <div className="form-group">
          <input
            className={`form-control ${
              error === "**E-mail is Required!" && "inputField"
            }`}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error === "**E-mail is Required!" && (
            <small className="errorMsg">**E-mail is Required!</small>
          )}

          {error === "**Enter a valid E-mail!" && (
            <small className="errorMsg">**Enter a valid E-mail!</small>
          )}
        </div>
        <div className="form-grojup">
          <textarea
            className={`form-control ${
              error === "**Enter a message!" && "inputField"
            }`}
            id="message"
            name="message"
            placeholder="Message"
            rows="5"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {error === "**Enter a message!" && (
            <small className="errorMsg">**Enter a message!</small>
          )}
        </div>
        <button className="btn ac_btn" type="submit">
          Send
        </button>
        <div class="wrapper">
          <div class="icon twitter">
            <div class="tooltip">Twitter</div>
            {/* Add your twitter ID */}
            <span>
              <i
                class="fab fa-twitter"
                onClick={() => openInNewTab("https://www.twitter.com/")}
              ></i>
            </span>
          </div>
          {/* Add your Instagram */}
          <div class="icon instagram">
            <div class="tooltip">Instagram</div>
            <span>
              <i
                class="fab fa-instagram"
                onClick={() => openInNewTab("https://www.instagram.com/")}
              ></i>
            </span>
          </div>
          <div class="icon email">
            <div class="tooltip">Email</div>
            {/* add your email in place of --- */}
            <span>
              <Link to="mailto:---">
                <i class="fa fa-envelope"></i>
              </Link>
            </span>
          </div>
          <div class="icon github">
            <div class="tooltip">Github</div>
            {/* add you github ID */}
            <span>
              <i
                class="fab fa-github"
                onClick={() => openInNewTab("https://www.github.com/")}
              ></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
