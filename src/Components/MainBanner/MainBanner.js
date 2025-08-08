import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './MainBanner.css';

const MainBanner = ({ slides, speed, showArrows, width, height }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filtra os slides para mostrar apenas os que têm mídia válida (não vazia ou placeholder)
    const validSlides = useMemo(() => 
        slides.filter(slide => slide && slide.src && slide.src.trim() !== '' && !slide.src.includes('placeholder.com')), 
    [slides]);

    const goToNext = useCallback(() => {
        if (validSlides.length <= 1) return;
        const isLastSlide = currentIndex === validSlides.length - 1;
        setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
    }, [currentIndex, validSlides]);

    const goToPrevious = () => {
        if (validSlides.length <= 1) return;
        const isFirstSlide = currentIndex === 0;
        setCurrentIndex(isFirstSlide ? validSlides.length - 1 : currentIndex - 1);
    };

    useEffect(() => {
        if (speed > 0 && validSlides.length > 1) {
            const timer = setTimeout(goToNext, speed);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, goToNext, speed, validSlides.length]);

    // Se não houver slides válidos, não renderiza o banner
    if (!validSlides || validSlides.length === 0) {
        return null;
    }

    const currentSlide = validSlides[currentIndex];

    const renderSlideMedia = (slide) => {
        if (slide.type === 'video') {
            return <video className="slide-media" src={slide.src} autoPlay muted loop playsInline />;
        }
        return <img src={slide.src} alt={`Slide ${currentIndex + 1}`} className="slide-media" />;
    };

    return (
        <div className="main-banner-container" style={{ maxWidth: `${width}px`, height: `${height}px` }}>
            {/* Renderiza as setas apenas se a opção estiver habilitada e houver mais de um slide */}
            {showArrows && validSlides.length > 1 && (
                <>
                    <div className="banner-arrow left-arrow" onClick={goToPrevious}>&#10094;</div>
                    <div className="banner-arrow right-arrow" onClick={goToNext}>&#10095;</div>
                </>
            )}

            <div className="slides-container">
                {validSlides.map((slide, index) => (
                    <div className={`slide ${index === currentIndex ? 'active' : ''}`} key={slide.id}>
                        {index === currentIndex && (
                            slide.link ? (
                                <a href={slide.link} target="_blank" rel="noopener noreferrer">
                                    {renderSlideMedia(slide)}
                                </a>
                            ) : (
                                renderSlideMedia(slide)
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainBanner;