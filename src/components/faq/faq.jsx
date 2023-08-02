import React, { useState } from 'react'
import './faq.css';
import "../nav.css";
import faq from "../../assets/faq.webp";
import faqs from './faqData';
import NAV from '../nav';

const AccordionItem = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`accordion-item ${expanded ? 'expanded' : ''}`}>
            <button
            style={{display: "flex", justifyContent: "space-between", alignItems: "center", }}
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
            <NAV />
            {/* main section */}
            <div className="faq-section">
                {/* add Heading */}
                <div className="faq-heading">Frequently Asked Questions</div>
                <div className="faq-main">
                    {/* left-Side */}
                    <div className="leftside">
                        {/* <img className='faqImage' src={faq} /> */}
                        <img alt='Man with Doubt' className='faqImage' src={faq} />
                    </div>

                    {/* Right-Side */}
                    <div className="rightSide">
                        {/* Title */}
                        <div className="accordion">
                        {faqs.map((questions)=>{
                           return  <AccordionItem title={questions.title} content={questions.content}/>
                        })}
                           
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default FAQ;
