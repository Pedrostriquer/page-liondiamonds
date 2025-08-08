import React, { useState } from 'react';
import './FaqSection.css';

const FaqItem = ({ faq, index, activeIndex, setActiveIndex }) => {
    const isActive = index === activeIndex;

    const toggleAccordion = () => {
        setActiveIndex(isActive ? null : index);
    };

    return (
        <div className="faq-item">
            <button className={`faq-question ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
                <span>{faq.question}</span>
                <span className="faq-icon">{isActive ? '-' : '+'}</span>
            </button>
            <div className={`faq-answer ${isActive ? 'open' : ''}`}>
                <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FaqSection = ({ faqData }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    if (!faqData || faqData.length === 0) {
        return null;
    }

    return (
        <div className="faq-wrapper">
            <div className="faq-container">
                <h2 className="faq-title">Perguntas Frequentes</h2>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={faq.id}
                            faq={faq}
                            index={index}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqSection;