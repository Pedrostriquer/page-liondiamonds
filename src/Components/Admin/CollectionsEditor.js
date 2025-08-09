import React from 'react';

const CollectionCardEditor = ({ card, index, onCardChange, onRemoveCard, onImageUpload }) => (
    <div className="carousel-card-editor">
        <h4>Coleção {index + 1}</h4>
        <div className="card-image-preview">
            <img src={card.imageSrc || 'https://placehold.co/150x150/EDEFF2/122C4F?text=Imagem'} alt={card.title} />
        </div>
        <label>Título:</label>
        <input type="text" name="title" value={card.title || ''} onChange={(e) => onCardChange(index, e)} />
        <label>Descrição:</label>
        <textarea name="description" value={card.description || ''} onChange={(e) => onCardChange(index, e)} rows="4" />
        <label>Link (opcional):</label>
        <input type="text" name="link" value={card.link || ''} onChange={(e) => onCardChange(index, e)} />
        <label>Trocar Imagem:</label>
        <input type="file" accept="image/*" onChange={(e) => onImageUpload(e.target.files[0], index)} />
        <button className="remove-card-button" onClick={() => onRemoveCard(index)}>Remover Coleção</button>
    </div>
);

const CollectionsEditor = ({ localData, onDataChange, onSaveChanges }) => {
    const handleTitleChange = (e) => {
        onDataChange({ ...localData, title: e.target.value });
    };

    const handleCardChange = (index, e) => {
        const { name, value } = e.target;
        const newCards = localData.cards.map((card, i) => i === index ? { ...card, [name]: value } : card);
        onDataChange({ ...localData, cards: newCards });
    };

    const handleImageUpload = (file, index) => {
        // Esta função deve ser implementada no admin.js para fazer o upload e obter a URL
        // Por enquanto, passamos o tipo e o índice para o componente pai.
        onDataChange(file, index, 'image_upload');
    };

    const handleAddCard = () => {
        const newCard = { id: `coll-${Date.now()}`, title: 'Nova Coleção', description: '', imageSrc: '', link: '' };
        onDataChange({ ...localData, cards: [...localData.cards, newCard] });
    };

    const handleRemoveCard = (index) => {
        const newCards = localData.cards.filter((_, i) => i !== index);
        onDataChange({ ...localData, cards: newCards });
    };

    if (!localData) return <div>Carregando editor de coleções...</div>;

    return (
        <section>
            <h3>Editor da Seção de Coleções</h3>
            <div className="product-carousel-editor-container">
                <div className="form-group">
                    <label>Título da Seção</label>
                    <input type="text" value={localData.title || ''} onChange={handleTitleChange} />
                </div>
                <div className="carousel-editor-grid">
                    {localData.cards.map((card, index) => (
                        <CollectionCardEditor
                            key={card.id}
                            card={card}
                            index={index}
                            onCardChange={handleCardChange}
                            onRemoveCard={handleRemoveCard}
                            onImageUpload={handleImageUpload}
                        />
                    ))}
                </div>
                <button className="add-carousel-card-button" onClick={handleAddCard}>Adicionar Coleção</button>
                <button className="save-button" onClick={onSaveChanges} style={{ marginTop: '20px' }}>Salvar Coleções</button>
            </div>
        </section>
    );
};

export default CollectionsEditor;