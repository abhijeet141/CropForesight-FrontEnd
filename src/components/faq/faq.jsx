import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './faq.css';
import "../nav.css";
import logo from "../../assets/earth.png";
import faq from "../../assets/faq.png";

const AccordionItem = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`accordion-item ${expanded ? 'expanded' : ''}`}>
            <button
                onClick={toggleAccordion}
                aria-expanded={expanded ? 'true' : 'false'}
            >
                <span className="accordion-title">{title}</span>
                <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

const FAQ = () => {

    return (
        <>
            {/* nav bar */}
            <div className='nav'>
                <header>
                    <nav>
                        <div className="left" style={{ color: "red" }}>
                            <Link to="/"><img src={logo} /></Link>
                        </div>
                        <div className="right">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact" >Contact</Link></li>
                                <li><Link to="/faq" >FAQs</Link></li>
                                <li><Link to="/Weather">Weather</Link></li>

                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
            {/* main section */}
            <div className="faq-section">
                {/* add Heading */}
                <div className="faq-heading">Frequently Asked Questions</div>
                <div className="faq-main">
                    {/* left-Side */}
                    <div className="leftside">
                        {/* <img className='faqImage' src={faq} /> */}
                        <img className='faqImage' src={faq} />
                    </div>

                    {/* Right-Side */}
                    <div className="rightSide">
                        {/* Title */}
                        <div className="accordion">
                            <AccordionItem
                                title="Q: How does CropForesight determine the best crop recommendation for a specific piece of land?"
                                content="A : CropForesight utilizes machine learning algorithms that analyze various environmental parameters such as soil composition, rainfall, pH, potassium, humidity, and temperature. Based on these inputs, it predicts the optimal crop choice that maximizes productivity and yield."
                            />
                            <AccordionItem
                                title="Q: What factors does CropForesight consider when suggesting a crop for cultivation?"
                                content="A: CropForesight takes into account several factors, including soil composition, rainfall, pH, potassium, humidity, and temperature. These parameters are crucial in determining the suitability of different crops for cultivation."
                            />
                            <AccordionItem
                                title="Q: Can CropForesight provide crop recommendations for different types of soil conditions?"
                                content="A: Yes, CropForesight is designed to consider various soil conditions when making crop recommendations. By analyzing the soil composition, it suggests crops that are well-suited to different types of soil, such as sandy, loamy, or clayey soil."
                            />
                            <AccordionItem
                                title="Q: How accurate are the crop recommendations provided by CropForesight?"
                                content="A: CropForesight strives to provide accurate crop recommendations by leveraging advanced machine learning algorithms and considering multiple environmental factors. However, the accuracy may depend on the quality and reliability of the input data."
                            />
                              <AccordionItem
                                title="Q: Is CropForesight applicable to all regions and climates?"
                                content="A: CropForesight is designed to be applicable to a wide range of regions and climates. However, it's important to note that certain crops may have specific requirements and thrive in particular climatic conditions. CropForesight considers these factors to suggest crops that are suitable for specific regions and climates."
                            />
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default FAQ;
