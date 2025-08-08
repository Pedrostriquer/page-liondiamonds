import React, { useState, useRef, useEffect } from 'react';

const BannerSlideEditor = ({
    slide,
    index,
    bannerHeight,
    onMediaSelect,
    onLinkChange,
    onRemove,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [mediaDimensions, setMediaDimensions] = useState(null);
    const fileInputRef = useRef(null);

    // Efeito para limpar as dimensões se a mídia for removida (src fica vazio)
    useEffect(() => {
        if (!slide.src || slide.src.trim() === '') {
            setMediaDimensions(null);
        }
    }, [slide.src]);

    const handleFileSelect = (file) => {
        if (!file) return;
        setMediaDimensions(null); // Reseta as dimensões ao selecionar novo arquivo

        const url = URL.createObjectURL(file);
        if (file.type.startsWith('image')) {
            const img = new Image();
            img.onload = () => {
                setMediaDimensions({ width: img.width, height: img.height });
                URL.revokeObjectURL(url); // Libera a memória do objeto URL
            };
            img.src = url;
        } else if (file.type.startsWith('video')) {
            const video = document.createElement('video');
            video.onloadedmetadata = () => {
                 setMediaDimensions({ width: video.videoWidth, height: video.videoHeight });
                 URL.revokeObjectURL(url); // Libera a memória do objeto URL
            };
            video.src = url;
        }

        // Passa o arquivo para o componente pai (admin.js) fazer o upload
        onMediaSelect(file, index);
    };

    // --- Handlers para a funcionalidade de Arrastar e Soltar (Drag and Drop) ---
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    // Handler para o input de arquivo tradicional
    const handleInputChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    // Abre o seletor de arquivos ao clicar na área
    const openFileSelector = () => {
        fileInputRef.current.click();
    };

    const hasMedia = slide.src && slide.src.trim() !== '';

    return (
        <div className="banner-slide-editor">
            <h4>Slide {index + 1}</h4>
            <div
                className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileSelector}
            >
                <div className="banner-media-preview">
                    {hasMedia && (
                        slide.type === 'video' ? (
                            <video src={slide.src} muted loop playsInline key={slide.src} />
                        ) : (
                            <img src={slide.src} alt={`Preview Slide ${index + 1}`} />
                        )
                    )}
                </div>
                {/* O overlay de texto só aparece se NÃO houver mídia carregada */}
                {!hasMedia && (
                    <div className="drop-zone-overlay">
                        <span>Clique ou arraste a mídia</span>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/mp4"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="image-info">
                <p className="ideal-dimension">Tamanho do Banner: <strong>{`~1920x${bannerHeight}px`}</strong></p>
                {mediaDimensions && (
                    <p className="dimension-info">Mídia Carregada: <strong>{mediaDimensions.width}x{mediaDimensions.height}px</strong></p>
                )}
            </div>

            <label>Link (opcional):</label>
            <input
                type="text"
                placeholder="https://exemplo.com"
                value={slide.link || ''}
                onChange={(e) => onLinkChange(e, index)}
            />
            <button className="remove-item-button" onClick={() => onRemove(index)}>
                Remover Slide
            </button>
        </div>
    );
};

export default BannerSlideEditor;