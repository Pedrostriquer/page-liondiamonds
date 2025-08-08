import React from 'react';

const AboutEditor = ({ localAboutData, setLocalAboutData, handleSaveAboutData }) => {
    
    // Handler genérico para atualizar os campos de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalAboutData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section>
            <h3>Seção "Sobre Nós"</h3>
            <div className="about-editor-container">
                <div className="form-group">
                    <label>Título Principal</label>
                    <input
                        type="text"
                        name="title"
                        value={localAboutData?.title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Texto Principal</label>
                    <textarea
                        name="mainText"
                        value={localAboutData?.mainText || ''}
                        onChange={handleChange}
                        rows="6"
                    />
                </div>
                <div className="form-group">
                    <label>Título da Missão</label>
                    <input
                        type="text"
                        name="missionTitle"
                        value={localAboutData?.missionTitle || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Texto da Missão</label>
                    <textarea
                        name="missionText"
                        value={localAboutData?.missionText || ''}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Título da Visão</label>
                    <input
                        type="text"
                        name="visionTitle"
                        value={localAboutData?.visionTitle || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Texto da Visão</label>
                    <textarea
                        name="visionText"
                        value={localAboutData?.visionText || ''}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <button className="save-button" onClick={handleSaveAboutData}>
                    Salvar Seção "Sobre Nós"
                </button>
            </div>
        </section>
    );
};

export default AboutEditor;