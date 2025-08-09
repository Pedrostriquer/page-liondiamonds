import React from 'react';
import './CollectionsSection.css';

const CollectionsSection = ({ collectionsData }) => {
    if (!collectionsData || !collectionsData.cards || collectionsData.cards.length === 0) {
        return null;
    }

    const { title, cards } = collectionsData;

    return (
        // O container principal agora tem a classe 'collections-wrapper' e posicionamento relativo
        <div className="collections-wrapper">
            {/* Este é o elemento que cria a faixa de fundo cinza */}
            <div className="collections-background"></div>

            {/* O conteúdo fica em um container separado para ficar sobre a faixa de fundo */}
            <div className="collections-container">
                <h2 className="collections-main-title">{title}</h2>
                <div className="collections-flex-container">
                    {cards.map((collection) => (
                        <div key={collection.id} className="collection-card-wrapper">
                             <a href={collection.link || '#'} className="collection-card">
                                <img 
                                    src={collection.imageSrc || 'https://placehold.co/240x160/ffffff/cccccc?text=Coleção'} 
                                    alt={collection.title} 
                                    className="collection-image" 
                                />
                                <div className="collection-info">
                                    <h3 className="collection-title">{collection.title}</h3>
                                    <p className="collection-description">{collection.description}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionsSection;