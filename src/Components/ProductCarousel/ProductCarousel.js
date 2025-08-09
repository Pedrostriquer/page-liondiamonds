import React, { useState, useEffect } from 'react';
import './ProductCarousel.css';

const ProductCarousel = ({ title, cards, seeAllLink }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(4);

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 768) setCardsPerView(2);
            else if (window.innerWidth < 1200) setCardsPerView(3);
            else setCardsPerView(4);
        };

        window.addEventListener('resize', updateVisibleCards);
        updateVisibleCards();

        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const pageCount = Math.ceil((cards?.length || 0) / cardsPerView);
    const currentPage = Math.floor(currentIndex / cardsPerView);

    const goToNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + cardsPerView, cards.length - cardsPerView));
    };

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - cardsPerView, 0));
    };
    
    const goToPage = (pageIndex) => {
        setCurrentIndex(pageIndex * cardsPerView);
    };

    if (!title || !cards || cards.length === 0) {
        return null;
    }

    const Card = ({ card }) => (
        <div className="product-card-v2">
            <a href={card.link || '#'} className="product-image-container">
                <span className="product-tag">{card.tag}</span>
                <img src={card.imageSrc || 'https://placehold.co/400x400/EDEFF2/122C4F?text=Joia'} alt={card.title} className="product-image-v2" />
            </a>
            <div className="product-info-v2">
                <h3 className="product-title-v2">{card.title}</h3>
                <p className="product-price-v2">{card.price}</p>
                <p className="product-installments-v2">{card.installments}</p>
                <div className="product-secondary-tag-wrapper">
                    <span className="secondary-tag">{card.secondaryTag}</span>
                </div>
            </div>
        </div>
    );
    
    const PrevArrow = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );
    const NextArrow = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );

    return (
        <div className="product-carousel-wrapper-v2">
            <div className="product-carousel-container-v2">
                <h2 className="product-carousel-main-title-v2">{title}</h2>
                <div className="product-carousel-interactive-area-v2">
                    <button className="carousel-arrow-v2 prev" onClick={goToPrevious} disabled={currentIndex === 0}>
                        <PrevArrow />
                    </button>
                    <div className="product-carousel-slider-v2">
                        <div 
                            className="product-carousel-track-v2"
                            style={{ transform: `translateX(-${currentIndex * (100 / cards.length)}%)` }}
                        >
                            {cards.map(card => (
                                <div className="product-slide-v2" key={card.id} style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                                    <Card card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel-arrow-v2 next" onClick={goToNext} disabled={currentIndex >= cards.length - cardsPerView}>
                        <NextArrow />
                    </button>
                </div>
                <div className="carousel-footer">
                    <div className="carousel-dots">
                        {Array.from({ length: pageCount }).map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                className={`dot ${currentPage === pageIndex ? 'active' : ''}`}
                                onClick={() => goToPage(pageIndex)}
                            />
                        ))}
                    </div>
                    {seeAllLink && (
                        <a href={seeAllLink} className="see-all-button">VER TUDO</a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;