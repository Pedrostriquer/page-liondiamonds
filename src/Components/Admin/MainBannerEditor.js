import React from 'react';
import BannerSlideEditor from "./BannerSlideEditor";

const MainBannerEditor = ({
    isUploading,
    progress,
    localData, // Recebe o state local diretamente
    localSpeed,
    localShowArrows,
    localWidth,
    localHeight,
    // Funções para manipular o state, recebidas do admin.js
    setLocalSpeed,
    setLocalShowArrows,
    setLocalWidth,
    setLocalHeight,
    onAddSlide,
    onRemoveSlide,
    onLinkChange,
    onDynamicMediaUpload,
    onSaveChanges,
}) => {

    return (
        <section>
            <h3>Gerenciamento do Banner Principal</h3>
            <div className="main-banner-editor">
                <div className="banner-dimension-controls">
                    <h4>Layout e Tamanho do Banner</h4>
                    <div className="dimension-grid">
                        <div className="dimension-row">
                            <label htmlFor="widthInput">Largura (px):</label>
                            <input id="widthInput" type="number" value={localWidth} onChange={(e) => setLocalWidth(Number(e.target.value))} step="10" placeholder="Padrão: 1920" />
                        </div>
                        <div className="dimension-row">
                            <label htmlFor="heightInput">Altura (px):</label>
                            <input id="heightInput" type="number" value={localHeight} onChange={(e) => setLocalHeight(Number(e.target.value))} step="10" placeholder="Padrão: 600" />
                        </div>
                    </div>
                </div>

                <div className="banner-settings-grid">
                    <div className="banner-speed-control">
                        <label>Velocidade de Transição (ms):</label>
                        <input type="number" value={localSpeed} onChange={(e) => setLocalSpeed(Number(e.target.value))} step="500" min="0" />
                        <p className="description">(Use 0 para desativar)</p>
                    </div>
                    <div className="banner-arrow-control">
                        <label><input type="checkbox" checked={localShowArrows} onChange={(e) => setLocalShowArrows(e.target.checked)} /> Exibir setas</label>
                    </div>
                </div>

                {isUploading && (
                    <div className="progress-bar-container"><div className="progress-bar" style={{ width: `${progress}%` }}>{Math.round(progress)}%</div></div>
                )}

                <div className="banner-slides-grid">
                    {localData.map((slide, index) => (
                        <BannerSlideEditor
                            key={slide.id || index}
                            slide={slide}
                            index={index}
                            bannerHeight={localHeight}
                            onMediaSelect={(file) => onDynamicMediaUpload(file, 'mainBanner', index)}
                            onLinkChange={onLinkChange}
                            onRemove={onRemoveSlide} // Usa a função recebida do pai
                        />
                    ))}
                </div>
                
                <div className="banner-controls">
                    {/* Botão agora chama a função recebida do pai */}
                    <button className="add-slide-button" onClick={onAddSlide}>Adicionar Slide</button>
                    <button className="save-button" onClick={onSaveChanges}>Salvar Banner</button>
                </div>
            </div>
        </section>
    );
};

export default MainBannerEditor;