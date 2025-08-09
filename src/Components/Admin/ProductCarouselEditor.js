import React from 'react';

// Componente interno para editar um único card
const ProductCardEditor = ({ card, cardIndex, onCardChange, onRemoveCard, onImageUpload }) => {
    const handleInputChange = (e) => {
        onCardChange(cardIndex, e.target.name, e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0], cardIndex);
        }
    };

    return (
        <div className="carousel-card-editor">
            <h4>Card de Produto {cardIndex + 1}</h4>
            <div className="card-image-preview">
                <img src={card.imageSrc || 'https://placehold.co/150x150/EDEFF2/122C4F?text=Imagem'} alt={card.title} />
            </div>
            
            <label>Tag Principal (Ex: LANÇAMENTO):</label>
            <input type="text" name="tag" value={card.tag || ''} onChange={handleInputChange} />
            
            <label>Título do Produto:</label>
            <input type="text" name="title" value={card.title || ''} onChange={handleInputChange} />

            <label>Preço (Ex: R$ 2.990,00):</label>
            <input type="text" name="price" value={card.price || ''} onChange={handleInputChange} />

            <label>Parcelas (Ex: 10x de R$ 299,00):</label>
            <input type="text" name="installments" value={card.installments || ''} onChange={handleInputChange} />

            <label>Tag Secundária (Ex: DIAMANTE DE LABORATÓRIO):</label>
            <input type="text" name="secondaryTag" value={card.secondaryTag || ''} onChange={handleInputChange} />

            <label>Link (opcional):</label>
            <input type="text" name="link" value={card.link || ''} onChange={handleInputChange} placeholder="https://..." />
            
            <label>Imagem do Card:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            <button className="remove-card-button" onClick={() => onRemoveCard(cardIndex)}>Remover Card</button>
        </div>
    );
};


// Componente principal para editar o carrossel de produtos
const ProductCarouselEditor = ({ localData, onDataChange, onSaveChanges }) => {
    
    const handleTitleChange = (e) => {
        onDataChange({ ...localData, title: e.target.value });
    };

    const handleSeeAllLinkChange = (e) => {
        onDataChange({ ...localData, seeAllLink: e.target.value });
    };

    const handleCardChange = (cardIndex, fieldName, value) => {
        const newCards = localData.cards.map((card, i) => i === cardIndex ? { ...card, [fieldName]: value } : card);
        onDataChange({ ...localData, cards: newCards });
    };
    
    const handleAddCard = () => {
        const newCard = { id: `prod-${Date.now()}`, title: 'Nova Joia', imageSrc: '', link: '', tag: '', price: '', installments: '', secondaryTag: '' };
        onDataChange({ ...localData, cards: [...localData.cards, newCard] });
    };

    const handleRemoveCard = (cardIndex) => {
        const newCards = localData.cards.filter((_, i) => i !== cardIndex);
        onDataChange({ ...localData, cards: newCards });
    };

    const handleImageUpload = (file, cardIndex) => {
        // Sinaliza para o admin.js fazer o upload
        onDataChange(file, cardIndex, 'image_upload');
    };

    if (!localData) return <div>Carregando editor de produtos...</div>;

    return (
        <section>
            <h3>Editor do Carrossel de Joias</h3>
            <div className="product-carousel-editor-container">
                <div className="form-group">
                    <label>Título da Seção (Ex: Joias)</label>
                    <input type="text" value={localData.title || ''} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label>Link do Botão "Ver Tudo" (Ex: /joias)</label>
                    <input type="text" value={localData.seeAllLink || ''} onChange={handleSeeAllLinkChange} />
                </div>

                <div className="carousel-editor-grid">
                    {(localData.cards || []).map((card, index) => (
                        <ProductCardEditor
                            key={card.id || index}
                            card={card}
                            cardIndex={index}
                            onCardChange={handleCardChange}
                            onRemoveCard={handleRemoveCard}
                            onImageUpload={handleImageUpload}
                        />
                    ))}
                </div>
                <button className="add-carousel-card-button" onClick={handleAddCard}>
                    Adicionar Joia ao Carrossel
                </button>
            </div>

            <button className="save-button" onClick={onSaveChanges} style={{marginTop: '30px'}}>
                Salvar Carrossel de Joias
            </button>
        </section>
    );
};

export default ProductCarouselEditor;