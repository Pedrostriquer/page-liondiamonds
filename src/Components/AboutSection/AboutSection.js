import React from 'react';
import './AboutSection.css';

const AboutSection = ({ aboutData }) => {
    // Se os dados ainda não foram carregados ou estão vazios, não renderiza a seção.
    if (!aboutData || !aboutData.title) {
        return null;
    }

    return (
        <div className="about-us-wrapper">
            <div className="about-us-container">
                {/* Seção Principal "Sobre" */}
                <div className="about-main-section">
                    <h2 className="section-title">{aboutData.title}</h2>
                    <p className="about-text">{aboutData.mainText}</p>
                </div>

                {/* Seção "Missão e Visão" */}
                <div className="mission-vision-section">
                    <div className="mission-box">
                        <h3 className="sub-section-title">{aboutData.missionTitle}</h3>
                        <p className="sub-text">{aboutData.missionText}</p>
                    </div>
                    <div className="vision-box">
                        <h3 className="sub-section-title">{aboutData.visionTitle}</h3>
                        <p className="sub-text">{aboutData.visionText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;