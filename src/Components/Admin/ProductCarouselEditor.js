import React from 'react';

// Componente interno para editar um único card
const ProductCardEditor = ({ card, carouselId, cardIndex, onCardChange, onRemoveCard, onImageUpload }) => {
    const handleInputChange = (e) => {
        onCardChange(carouselId, cardIndex, e.target.name, e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0], carouselId, cardIndex);
        }
    };

    return (
        <div className="carousel-card-editor">
            <div className="card-image-preview">
                {/* CORREÇÃO AQUI: Usando um link de placeholder que funciona */}
                <img src={card.imageSrc || 'https://placehold.co/150x150/EDEFF2/122C4F?text=Imagem'} alt={card.title} />
            </div>
            <label>Título do Card:</label>
            <input
                type="text"
                name="title"
                value={card.title || ''}
                onChange={handleInputChange}
                placeholder="Nome do Produto"
            />
            <label>Link (opcional):</label>
            <input
                type="text"
                name="link"
                value={card.link || ''}
                onChange={handleInputChange}
                placeholder="https://..."
            />
            <label>Imagem do Card:</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <button className="remove-card-button" onClick={() => onRemoveCard(carouselId, cardIndex)}>
                Remover Card
            </button>
        </div>
    );
};


// Componente principal para editar os dois carrosséis
const ProductCarouselEditor = ({
    localProductCarousel1,
    localProductCarousel2,
    onCarouselChange,
    onCardChange,
    onAddCard,
    onRemoveCard,
    onImageUpload,
    onSaveChanges
}) => {
    return (
        <section>
            <h3>Edição de Carrosséis de Produtos</h3>
            
            {/* Editor para o Carrossel 1 */}
            <div className="product-carousel-editor-container">
                <div className="form-group">
                    <label>Título do Primeiro Carrossel</label>
                    <input
                        type="text"
                        value={localProductCarousel1?.title || ''}
                        onChange={(e) => onCarouselChange('carousel1', 'title', e.target.value)}
                    />
                </div>
                <div className="carousel-editor-grid">
                    {localProductCarousel1?.cards?.map((card, index) => (
                        <ProductCardEditor
                            key={card.id || index}
                            card={card}
                            carouselId="carousel1"
                            cardIndex={index}
                            onCardChange={onCardChange}
                            onRemoveCard={onRemoveCard}
                            onImageUpload={onImageUpload}
                        />
                    ))}
                </div>
                <button className="add-carousel-card-button" onClick={() => onAddCard('carousel1')}>
                    Adicionar Card ao Primeiro Carrossel
                </button>
            </div>

            {/* Editor para o Carrossel 2 */}
            <div className="product-carousel-editor-container" style={{marginTop: '40px'}}>
                <div className="form-group">
                    <label>Título do Segundo Carrossel</label>
                    <input
                        type="text"
                        value={localProductCarousel2?.title || ''}
                        onChange={(e) => onCarouselChange('carousel2', 'title', e.target.value)}
                    />
                </div>
                <div className="carousel-editor-grid">
                    {localProductCarousel2?.cards?.map((card, index) => (
                        <ProductCardEditor
                            key={card.id || index}
                            card={card}
                            carouselId="carousel2"
                            cardIndex={index}
                            onCardChange={onCardChange}
                            onRemoveCard={onRemoveCard}
                            onImageUpload={onImageUpload}
                        />
                    ))}
                </div>
                <button className="add-carousel-card-button" onClick={() => onAddCard('carousel2')}>
                    Adicionar Card ao Segundo Carrossel
                </button>
            </div>

            <button className="save-button" onClick={onSaveChanges} style={{marginTop: '30px'}}>
                Salvar Carrosséis de Produtos
            </button>
        </section>
    );
};

export default ProductCarouselEditor;