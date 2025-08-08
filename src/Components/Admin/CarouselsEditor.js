import React from 'react';

const CarouselCardEditor = ({ card, cardIndex, carouselType, onRemoveCard, handleCarouselCardTitleChange, handleDynamicImageUpload }) => (
    <div className="carousel-card-editor">
        <h4>Card {cardIndex + 1}</h4>
        <div className="card-image-preview">
            <img src={card.imageSrc} alt={`Card ${cardIndex + 1}`} />
        </div>
        <label>
            Título:
            <input
                type="text"
                value={card.title}
                onChange={(e) => handleCarouselCardTitleChange(e, carouselType, cardIndex)}
            />
        </label>
        <label>
            Trocar Imagem:
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleDynamicImageUpload(e.target.files[0], carouselType, cardIndex)}
            />
        </label>
        <button onClick={() => onRemoveCard(cardIndex)} className="remove-card-button">Remover Card</button>
    </div>
);

const CarouselsEditor = ({
    localCarousel1Data,
    localCarousel2Data,
    handleCarouselCardTitleChange,
    handleDynamicImageUpload,
    onCarousel1DataUpdate,
    onCarousel2DataUpdate,
    handleAddCarousel1Card,
    handleAddCarousel2Card,
    handleSaveCarousel1Data,
    handleSaveCarousel2Data
}) => {
    return (
        <section>
            <h3>Edição de Carrosséis</h3>
            <h4>Carrossel 1 (Pequeno)</h4>
            <div className="carousel-editor-grid">
                {localCarousel1Data.map((card, index) => (
                    <CarouselCardEditor
                        key={card.id}
                        card={card}
                        cardIndex={index}
                        carouselType="carousel1"
                        onRemoveCard={() => onCarousel1DataUpdate(localCarousel1Data.filter((_, i) => i !== index))}
                        handleCarouselCardTitleChange={handleCarouselCardTitleChange}
                        handleDynamicImageUpload={handleDynamicImageUpload}
                    />
                ))}
            </div>
            <button onClick={handleAddCarousel1Card} className="add-carousel-card-button">Adicionar Card</button>
            <button onClick={handleSaveCarousel1Data} className="save-carousel-button">Salvar Carrossel 1</button>

            <h4 style={{ marginTop: '40px' }}>Carrossel 2 (Pequeno)</h4>
            <div className="carousel-editor-grid">
                {localCarousel2Data.map((card, index) => (
                    <CarouselCardEditor
                        key={card.id}
                        card={card}
                        cardIndex={index}
                        carouselType="carousel2"
                        onRemoveCard={() => onCarousel2DataUpdate(localCarousel2Data.filter((_, i) => i !== index))}
                        handleCarouselCardTitleChange={handleCarouselCardTitleChange}
                        handleDynamicImageUpload={handleDynamicImageUpload}
                    />
                ))}
            </div>
            <button onClick={handleAddCarousel2Card} className="add-carousel-card-button">Adicionar Card</button>
            <button onClick={handleSaveCarousel2Data} className="save-carousel-button">Salvar Carrossel 2</button>
        </section>
    );
};

export default CarouselsEditor;