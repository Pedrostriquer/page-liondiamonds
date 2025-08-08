import React from 'react';

const FaqEditor = ({ localFaqData, setLocalFaqData, handleSaveFaqData }) => {

    const handleFaqChange = (e, index) => {
        const { name, value } = e.target;
        setLocalFaqData(prev => prev.map((item, i) => 
            i === index ? { ...item, [name]: value } : item
        ));
    };

    const handleAddFaq = () => {
        const newId = `faq-${Date.now()}`;
        setLocalFaqData(prev => [...prev, { id: newId, question: '', answer: '' }]);
    };

    const handleRemoveFaq = (indexToRemove) => {
        setLocalFaqData(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <section>
            <h3>Editor de Perguntas Frequentes (FAQ)</h3>
            <div className="faq-editor-container">
                {localFaqData.map((faq, index) => (
                    <div className="faq-editor-item" key={faq.id}>
                        <div className="form-group">
                            <label>Pergunta {index + 1}</label>
                            <input
                                type="text"
                                name="question"
                                value={faq.question}
                                onChange={(e) => handleFaqChange(e, index)}
                                placeholder="Digite a pergunta"
                            />
                        </div>
                        <div className="form-group">
                            <label>Resposta {index + 1}</label>
                            <textarea
                                name="answer"
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(e, index)}
                                rows="5"
                                placeholder="Digite a resposta"
                            />
                        </div>
                        <button className="remove-item-button" onClick={() => handleRemoveFaq(index)}>
                            Remover Pergunta
                        </button>
                    </div>
                ))}
                <div className="faq-controls">
                    <button className="add-item-button" onClick={handleAddFaq}>Adicionar Pergunta</button>
                    <button className="save-button" onClick={handleSaveFaqData}>Salvar FAQ</button>
                </div>
            </div>
        </section>
    );
};

export default FaqEditor;