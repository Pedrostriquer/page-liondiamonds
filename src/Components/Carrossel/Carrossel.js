import React, { useState } from "react";
import './Carrossel.css';

export default function Carrossel({ carousel1Data }){
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerView = 6;
    const cardWidth = 160; // Largura do card definida no CSS
    const cardGap = 20;    // Espaçamento (gap) entre os cards definido no CSS

    // Calcula o índice máximo que o carrossel pode alcançar
    const maxIndex = Math.max(0, carousel1Data.length - cardsPerView);

    const nextSlide = () => {
        // Avança o índice, mas não ultrapassa o máximo
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    };

    const prevSlide = () => {
        // Retrocede o índice, mas não fica abaixo de zero
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    // Calcula a largura da "janela" visível do carrossel
    // Se tivermos menos cards que o total visível, a largura se ajusta a eles
    const visibleCards = Math.min(carousel1Data.length, cardsPerView);
    const wrapperWidth = (visibleCards * cardWidth) + ((visibleCards - 1) * cardGap);

    // O deslocamento do carrossel é baseado no índice atual
    const offset = currentIndex * (cardWidth + cardGap);

    return (
        <div className="carrossel">
            <div className="carrossel-container">
                {/* Seta da Esquerda */}
                <div
                    className={`container-arrow arrow-left ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={prevSlide}
                >
                    <img src="./img/right-arrow-svgrepo-com (1).svg" alt="Seta para a esquerda" className="arrow-icon-carrossel" />
                </div>

                {/* Esta é a "janela" que limita a visão aos cards */}
                <div className="carrossel-wrapper" style={{ width: `${wrapperWidth}px` }}>
                    <div
                        className="carrossel-area"
                        style={{ transform: `translateX(-${offset}px)` }}
                    >
                        {carousel1Data.map((item) => (
                            <div className="carrossel-card" key={item.id}>
                                <div className="carrossel-card-img">
                                    <img src={item.imageSrc} alt={item.title} className="carrossel-img"/>
                                </div>
                                <div className="carrossel-card-text">
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seta da Direita */}
                <div
                    className={`container-arrow arrow-right ${currentIndex >= maxIndex ? 'disabled' : ''}`}
                    onClick={nextSlide}
                >
                    <img src="./img/right-arrow-svgrepo-com.svg" alt="Seta para a direita" className="arrow-icon-carrossel" />
                </div>
            </div>

            <div className="carrossel-search-button">
                <button>SEARCH FOR DIAMONDS</button>
            </div>
        </div>
    );
}