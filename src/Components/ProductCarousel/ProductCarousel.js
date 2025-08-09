import React, { useState, useEffect } from 'react';
import './ProductCarousel.css';

const ProductCarousel = ({ title, cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(6);

    // Efeito para ajustar o número de cards visíveis com base no tamanho da tela
    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 768) setCardsPerView(2);
            else if (window.innerWidth < 1200) setCardsPerView(4);
            else setCardsPerView(6);
        };

        window.addEventListener('resize', updateVisibleCards);
        updateVisibleCards(); // Chama na montagem inicial

        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const maxIndex = Math.max(0, (cards?.length || 0) - cardsPerView);

    const goToNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    };

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    // Não renderiza nada se não houver título ou cards
    if (!title || !cards || cards.length === 0) {
        return null;
    }

    const Card = ({ card }) => {
        const cardContent = (
            <>
                <div className="product-card-image-wrapper">
                    {/* CORREÇÃO AQUI: Usando um link de placeholder que funciona */}
                    <img src={card.imageSrc || 'https://placehold.co/250x250/EDEFF2/122C4F?text=Gema'} alt={card.title} className="product-card-image" />
                </div>
                <div className="product-card-info">
                    <h4 className="product-card-title">{card.title}</h4>
                </div>
            </>
        );

        return card.link ? (
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="product-card">
                {cardContent}
            </a>
        ) : (
            <div className="product-card">
                {cardContent}
            </div>
        );
    };

    return (
        <div className="product-carousel-wrapper">
            <div className="product-carousel-container">
                <h2 className="product-carousel-main-title">{title}</h2>
                <div className="product-carousel-interactive-area">
                    <button className="carousel-arrow prev" onClick={goToPrevious} disabled={currentIndex === 0}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="product-carousel-slider">
                        <div 
                            className="product-carousel-track"
                            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                        >
                            {cards.map(card => (
                                <div className="product-slide" key={card.id} style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                                    <Card card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel-arrow next" onClick={goToNext} disabled={currentIndex >= maxIndex}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;