import React, { useState } from "react";
import './Carrossel2.css';

export default function Carrossel2({ carousel2Data }){
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerView = 4;
    const cardWidth = 190; // Largura do card-2 definida no CSS
    const cardGap = 55;    // Espaçamento (gap) entre os cards-2 definido no CSS

    // Calcula o índice máximo que o carrossel pode alcançar
    const maxIndex = Math.max(0, carousel2Data.length - cardsPerView);

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
    const visibleCards = Math.min(carousel2Data.length, cardsPerView);
    const wrapperWidth = (visibleCards * cardWidth) + ((visibleCards - 1) * cardGap);

    // O deslocamento do carrossel é baseado no índice atual
    const offset = currentIndex * (cardWidth + cardGap);

    return (
        <div className="carrossel-2">
            <div className="carrossel-container-2">
                {/* Seta da Esquerda */}
                <div
                    className={`container-arrow-2 ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={prevSlide}
                >
                    <img src="./img/right-arrow-svgrepo-com (1).svg" alt="Seta para a esquerda" className="arrow-icon-carrossel-2" />
                </div>

                {/* Esta é a "janela" que limita a visão aos cards */}
                <div className="carrossel-wrapper-2" style={{ width: `${wrapperWidth}px` }}>
                    <div
                        className="carrossel-area-2"
                        style={{ transform: `translateX(-${offset}px)` }}
                    >
                        {carousel2Data.map((item) => (
                            <div className="carrossel-card-2" key={item.id}>
                                <div className="carrossel-card-text-2">
                                    <p>{item.title}</p>
                                </div>
                                <div className="carrossel-card-img-2">
                                    <img src={item.imageSrc} alt={item.title} className="carrossel-img-2"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seta da Direita */}
                <div
                    className={`container-arrow-2 ${currentIndex >= maxIndex ? 'disabled' : ''}`}
                    onClick={nextSlide}
                >
                    <img src="./img/right-arrow-svgrepo-com.svg" alt="Seta para a direita" className="arrow-icon-carrossel-2" />
                </div>
            </div>

            <div className="carrossel-search-button-2">
                <button>SEARCH FOR JEWELRY</button>
            </div>
        </div>
    );
}