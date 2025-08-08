import React, { useState, useEffect } from "react";
import './Clients.css';

const Clients = ({ clientsTestimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Efeito para passar o carrossel automaticamente
    useEffect(() => {
        if (clientsTestimonials && clientsTestimonials.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % clientsTestimonials.length);
            }, 6000); // Aumentei um pouco o tempo para dar tempo de ler (6s)

            return () => clearInterval(interval); // Limpa o intervalo ao desmontar
        }
    }, [clientsTestimonials]);

    // Função para navegar para um slide específico ao clicar nos pontos
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    // Não renderiza nada se não houver depoimentos
    if (!clientsTestimonials || clientsTestimonials.length === 0) {
        return null;
    }

    const currentTestimonial = clientsTestimonials[currentIndex];

    return (
        <div className="clients-wrapper">
            <div className="clients-container">
                <h2 className="clients-title">O Que Nossos Clientes Dizem</h2>
                
                <div className="testimonial-card">
                    <div className="testimonial-quote-icon">“</div>
                    <div className="testimonial-content" key={currentIndex}>
                        <p className="testimonial-comment">{currentTestimonial.comment}</p>
                        <div className="testimonial-author-info">
                            <img 
                                src={currentTestimonial.imageSrc || 'https://via.placeholder.com/80'} 
                                alt={currentTestimonial.author} 
                                className="testimonial-author-image" 
                            />
                            <span className="testimonial-author-name">{currentTestimonial.author}</span>
                        </div>
                    </div>
                </div>

                {/* Navegação por Pontos */}
                <div className="testimonial-nav">
                    {clientsTestimonials.map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`nav-dot ${currentIndex === slideIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(slideIndex)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;