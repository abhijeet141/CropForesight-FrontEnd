import React, { useState, useEffect } from "react";
import "./contact.css";
import swal from "sweetalert";
import Navbar from '../Navbar/Navbar'
import validate from "../../common/validation";

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

const Contact = ({mode,setmode}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({});

  const sentences = [
    "Have A Question ❓",
    "Want To contact me ?",
    "Any Suggestions 💡",
    "Report a bug 🪲",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
    const errMessage = validate[name](value);
    setError((prev) => {
      return { ...prev, ...errMessage };
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    // Do some authentication here...
    console.log("function called");
    let submitable = true;
    Object.values(error).forEach((err) => {
      if (err !== false) {
        submitable = false;
      }
    });

    if (submitable) {
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
          `Thanks for contacting us ${form.name}. We have received your details successfully. We will get back to you soon.`,
          "success"
        );
      } catch (error) {
        // Handle error or show an error message
        console.log(error);
        swal("Error", "Something went wrong... Please try again", "error");
      }
    } else {
      swal("Error", "Plesae fill all fields with valid data.");
    }
  }

  return (
    <div>
      {/* nav bar */}
      <Navbar isHomepage={false} mode={mode} setmode={setmode} />
      {/* contact us form */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <main className="sectionIO">
        <div className="containerIO">
          <div className="contactInfo">
            <div>
              <h2>Contact Info</h2>
              <ul className="info">
                <li>
                  <span>
                    <i class="fa fa-location"></i>
                  </span>
                  <span>
                    184 Ippokratous Street
                    <br />
                    Athens, Gr
                    <br />
                    11472
                  </span>
                </li>
                <li>
                  <span>
                    <i class="fa fa-envelope"></i>
                  </span>
                  {/* <span>nassosanagn@gmail.com</span> */}
                  <span>
                    <a href="mailto:">
                      okfine@gmamail.com
                    </a>
                  </span>
                </li>
                <li>
                  <span>
                    <i class="fa fa-phone"></i>
                  </span>
                  <span>1234567856</span>
                </li>
              </ul>
            </div>
            <ul className="sci">
              <li>
                <i class="fa-brands fa-twitter"></i>
              </li>
              <li>
                <i class="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i class="fa-brands fa-instagram"></i>
              </li>
              <li>
              <i class="fa-brands fa-google"></i>
              </li>
            </ul>
          </div>
          <div className={`contactForm ${mode === 'dark' ? "contactFormDark " : ""}`}>
            <h2>Send a Message</h2>
            <div className="formBox">
              <div className="inputBox w50">
                <input type="text" name="" required="" />
                <span className={mode === 'dark' ? "text-dark": ""}>First Name</span>
              </div>
              <div className="inputBox w50">
                <input type="text" required="" />
                <span className={mode === 'dark' ? "text-dark": ""}>Last Name</span>
              </div>
              <div className="inputBox w50">
                <input type="email" required="" />
                <span className={mode === 'dark' ? "text-dark": ""}>Email Address</span>
              </div>
              <div className="inputBox w50">
                <input type="text" required="" />
                <span className={mode === 'dark' ? "text-dark": ""}>Mobile Number</span>
              </div>
              <div className="inputBox w100">
                <textarea required="" defaultValue={""} />
                <span className={mode === 'dark' ? "text-dark": ""}>Write your message here...</span>
              </div>
              <div className="inputBox w100">
                <input type="submit" defaultValue="Send" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
