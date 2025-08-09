import React, { useState, useRef, useEffect } from "react";
import './admin.css';
import './AdminBanner.css'; 
import './AdminHeader.css';
import './AdminSections.css';

import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import BannerSlideEditor from "./BannerSlideEditor";
import FooterEditor from "./FooterEditor";
import FaqEditor from "./FaqEditor";
import ProductCarouselEditor from "./ProductCarouselEditor"; // Importação já estava correta

// --- COMPONENTES AUXILIARES INTERNOS ---

const UploadSection = ({ label, type, inputRef, handleSingleImageUpload }) => (
    <div className="upload-section">
        <label>{label}:</label>
        <input type="file" ref={inputRef} accept="image/*" />
        <button onClick={() => handleSingleImageUpload(inputRef.current.files[0], type)}>
            Enviar {label}
        </button>
    </div>
);

const NavTextSection = ({ item, index, handleTitleChange, handleIndividualDropdownItemChange, handleRemoveDropdownItem, handleAddDropdownItem, handleRemoveNavItem }) => (
    <div className="nav-text-section">
        <label>Título:</label>
        <input type="text" value={item.title} onChange={(e) => handleTitleChange(e, index)} />
        {item.dropdown && (
            <>
                <p className="dropdown-label">Itens do Dropdown:</p>
                <div className="dropdown-items-list">
                    {item.dropdown.map((dropdownItem, dIndex) => (
                        <div key={dropdownItem.id} className="dropdown-item-row">
                            <input type="text" value={dropdownItem.text} onChange={(e) => handleIndividualDropdownItemChange(e, index, dIndex)} />
                            <button onClick={() => handleRemoveDropdownItem(index, dIndex)} className="remove-item-button">Remover</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleAddDropdownItem(index)} className="add-item-button">Adicionar Item</button>
            </>
        )}
        <button onClick={() => handleRemoveNavItem(index)} className="remove-nav-item-button">Remover Botão do Menu</button>
    </div>
);

const TestimonialEditor = ({ testimonial, index, handleDynamicMediaUpload, handleTestimonialChange, handleRemoveTestimonial }) => (
    <div className="testimonial-editor">
        <h4>Depoimento {index + 1}</h4>
        <div className="testimonial-image-preview">
            <img src={testimonial.imageSrc || 'https://via.placeholder.com/80'} alt={`Depoimento ${index + 1}`} />
        </div>
        <label>
            Trocar Foto:
        </label>
        <input
            type="file"
            accept="image/*"
            onChange={(e) => handleDynamicMediaUpload(e.target.files[0], 'testimonial', index)}
        />
        <label>
            Comentário:
        </label>
        <textarea
            value={testimonial.comment}
            onChange={(e) => handleTestimonialChange(e, index, 'comment')}
            rows="4"
        ></textarea>
        <label>
            Autor:
        </label>
        <input
            type="text"
            value={testimonial.author}
            onChange={(e) => handleTestimonialChange(e, index, 'author')}
        />
        <button onClick={() => handleRemoveTestimonial(index)} className="remove-item-button">Remover Depoimento</button>
    </div>
);

const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// --- COMPONENTE PRINCIPAL DO ADMIN ---
export default function Admin({
    onImageUpload, onNavTextUpdate, headerNavData,
    clientsTestimonials, onClientsTestimonialsUpdate,
    mainBannerData, mainBannerSpeed, mainBannerShowArrows, mainBannerWidth, mainBannerHeight, onMainBannerUpdate,
    aboutData, onAboutDataUpdate,
    footerData, onFooterDataUpdate,
    faqData, onFaqDataUpdate,
    productCarousel1, productCarousel2, onProductCarouselUpdate
}) {
    // --- STATES E REFS ---
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');

    const logoInputRef = useRef(null);
    const bunner2Img2InputRef = useRef(null);
    const bunner3Img1InputRef = useRef(null);

    const [localNavData, setLocalNavData] = useState(headerNavData);
    const [localClientsTestimonials, setLocalClientsTestimonials] = useState(clientsTestimonials);
    const [localAboutData, setLocalAboutData] = useState(aboutData);
    const [localFooterData, setLocalFooterData] = useState(footerData);
    const [localFaqData, setLocalFaqData] = useState(faqData);
    
    const [localMainBannerData, setLocalMainBannerData] = useState(mainBannerData);
    const [localMainBannerSpeed, setLocalMainBannerSpeed] = useState(mainBannerSpeed);
    const [localMainBannerShowArrows, setLocalMainBannerShowArrows] = useState(mainBannerShowArrows);
    const [localMainBannerWidth, setLocalMainBannerWidth] = useState(mainBannerWidth);
    const [localMainBannerHeight, setLocalMainBannerHeight] = useState(mainBannerHeight);

    const [localProductCarousel1, setLocalProductCarousel1] = useState(productCarousel1);
    const [localProductCarousel2, setLocalProductCarousel2] = useState(productCarousel2);

    // --- USEEFFECTS PARA SINCRONIZAÇÃO ---
    useEffect(() => setLocalNavData(headerNavData), [headerNavData]);
    useEffect(() => setLocalClientsTestimonials(clientsTestimonials), [clientsTestimonials]);
    useEffect(() => setLocalAboutData(aboutData), [aboutData]);
    useEffect(() => setLocalFooterData(footerData), [footerData]);
    useEffect(() => setLocalFaqData(faqData), [faqData]);
    useEffect(() => setLocalMainBannerData(mainBannerData), [mainBannerData]);
    useEffect(() => setLocalMainBannerSpeed(mainBannerSpeed), [mainBannerSpeed]);
    useEffect(() => setLocalMainBannerShowArrows(mainBannerShowArrows), [mainBannerShowArrows]);
    useEffect(() => setLocalMainBannerWidth(mainBannerWidth), [mainBannerWidth]);
    useEffect(() => setLocalMainBannerHeight(mainBannerHeight), [mainBannerHeight]);
    useEffect(() => setLocalProductCarousel1(productCarousel1), [productCarousel1]);
    useEffect(() => setLocalProductCarousel2(productCarousel2), [productCarousel2]);
    
    // --- LÓGICA DE UPLOAD ---
    const handleFileUpload = (file, path, callback) => {
        if (!file) return;
        setIsUploading(true);
        setProgress(0);
        setMessage('');
        const storageRef = ref(storage, `${path}/${file.name}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (error) => { setIsUploading(false); alert(`Erro: ${error.message}`); },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setIsUploading(false);
                    setMessage(`Arquivo carregado! Salve as alterações para aplicar.`);
                    callback(url, file.type);
                });
            }
        );
    };

    const handleSingleImageUpload = (file, type) => handleFileUpload(file, 'images', (url) => onImageUpload(url, type));
    const handleDynamicMediaUpload = (file, itemType, itemIndex) => {
        handleFileUpload(file, 'media', (url, fileType) => {
            const mediaType = fileType.startsWith('video') ? 'video' : 'image';
            if (itemType === 'mainBanner') {
                setLocalMainBannerData(prev => prev.map((slide, i) => i === itemIndex ? { ...slide, src: url, type: mediaType } : slide));
            } else if (itemType === 'testimonial') {
                setLocalClientsTestimonials(prev => prev.map((item, i) => i === itemIndex ? { ...item, imageSrc: url } : item));
            }
        });
    };
    
    // --- HANDLERS DO HEADER ---
    const handleTitleChange = (e, index) => setLocalNavData(prev => prev.map((item, i) => i === index ? { ...item, title: e.target.value } : item));
    const handleIndividualDropdownItemChange = (e, itemIndex, dIndex) => setLocalNavData(prev => prev.map((item, i) => i === itemIndex ? { ...item, dropdown: item.dropdown.map((d, di) => di === dIndex ? { ...d, text: e.target.value } : d) } : item));
    const handleAddDropdownItem = (itemIndex) => setLocalNavData(prev => prev.map((item, i) => i === itemIndex ? { ...item, dropdown: [...item.dropdown, { id: generateUniqueId(), text: '' }] } : item));
    const handleRemoveDropdownItem = (itemIndex, dIndex) => setLocalNavData(prev => prev.map((item, i) => i === itemIndex ? { ...item, dropdown: item.dropdown.filter((_, di) => di !== dIndex) } : item));
    const handleAddNavItem = () => setLocalNavData(prev => [...prev, { id: generateUniqueId(), title: 'Novo Botão', dropdown: [] }]);
    const handleRemoveNavItem = (index) => setLocalNavData(prev => prev.filter((_, i) => i !== index));
    const handleSaveNavText = () => { onNavTextUpdate(localNavData); setMessage('Header salvo!'); };

    // --- HANDLERS DO BANNER PRINCIPAL ---
    const handleAddSlide = () => setLocalMainBannerData(prev => [...prev, { id: `new-${Date.now()}`, src: '', type: 'image', link: '' }]);
    const handleRemoveSlide = (index) => setLocalMainBannerData(prev => prev.filter((_, i) => i !== index));
    const handleLinkChange = (e, index) => setLocalMainBannerData(prev => prev.map((slide, i) => i === index ? { ...slide, link: e.target.value } : slide));
    const handleSaveMainBanner = () => {
        const validData = localMainBannerData.filter(slide => slide.src && slide.src.trim() !== '');
        onMainBannerUpdate(validData, localMainBannerSpeed, localMainBannerShowArrows, localMainBannerWidth, localMainBannerHeight);
        setMessage('Banner principal salvo!');
    };

    // --- HANDLERS DOS CARROSSÉIS DE PRODUTOS ---
    const handleProductCarouselChange = (carouselId, field, value) => {
        const setter = carouselId === 'carousel1' ? setLocalProductCarousel1 : setLocalProductCarousel2;
        setter(prev => ({ ...prev, [field]: value }));
    };
    const handleProductCardChange = (carouselId, cardIndex, field, value) => {
        const setter = carouselId === 'carousel1' ? setLocalProductCarousel1 : setLocalProductCarousel2;
        setter(prev => {
            const newCards = [...(prev.cards || [])];
            newCards[cardIndex] = { ...newCards[cardIndex], [field]: value };
            return { ...prev, cards: newCards };
        });
    };
    const handleAddProductCard = (carouselId) => {
        const setter = carouselId === 'carousel1' ? setLocalProductCarousel1 : setLocalProductCarousel2;
        const newCard = { id: generateUniqueId(), title: 'Novo Card', imageSrc: '', link: '' };
        setter(prev => ({ ...prev, cards: [...(prev.cards || []), newCard] }));
    };
    const handleRemoveProductCard = (carouselId, cardIndex) => {
        const setter = carouselId === 'carousel1' ? setLocalProductCarousel1 : setLocalProductCarousel2;
        setter(prev => ({ ...prev, cards: prev.cards.filter((_, i) => i !== cardIndex) }));
    };
    const handleProductCarouselImageUpload = (file, carouselId, cardIndex) => {
        handleFileUpload(file, 'media', (url) => {
            const setter = carouselId === 'carousel1' ? setLocalProductCarousel1 : setLocalProductCarousel2;
            setter(prev => {
                const newCards = [...prev.cards];
                newCards[cardIndex] = { ...newCards[cardIndex], imageSrc: url };
                return { ...prev, cards: newCards };
            });
        });
    };
    const handleSaveProductCarousels = () => {
        onProductCarouselUpdate('carousel1', localProductCarousel1);
        onProductCarouselUpdate('carousel2', localProductCarousel2);
        setMessage('Carrosséis de produtos salvos!');
    };

    // --- HANDLERS DOS DEPOIMENTOS ---
    const handleTestimonialChange = (e, index, field) => setLocalClientsTestimonials(prev => prev.map((item, i) => i === index ? { ...item, [field]: e.target.value } : item));
    const handleAddTestimonial = () => setLocalClientsTestimonials(prev => [...prev, { id: generateUniqueId(), imageSrc: '', comment: '', author: '' }]);
    const handleRemoveTestimonial = (index) => setLocalClientsTestimonials(prev => prev.filter((_, i) => i !== index));
    const handleSaveTestimonials = () => { onClientsTestimonialsUpdate(localClientsTestimonials.filter(t => t.comment.trim() || t.author.trim())); setMessage('Depoimentos salvos!'); };
    
    // --- HANDLER DA SEÇÃO "SOBRE" ---
    const handleAboutChange = (e) => setLocalAboutData(prev => ({...prev, [e.target.name]: e.target.value}));
    const handleSaveAboutData = () => { onAboutDataUpdate(localAboutData); setMessage('Seção "Sobre" salva!'); };

    // --- HANDLER DO RODAPÉ ---
    const handleFooterChange = (e) => setLocalFooterData(prev => ({...prev, [e.target.name]: e.target.value}));
    const handleSaveFooterData = () => { onFooterDataUpdate(localFooterData); setMessage('Rodapé salvo!'); };

    // --- HANDLER DO FAQ ---
    const handleSaveFaqData = () => { onFaqDataUpdate(localFaqData); setMessage('FAQ salvo!'); };

    return (
        <div className="admin">
            <h2>Gerenciamento de Conteúdo</h2>
            
            <section>
                <h3>Gerenciamento do Banner Principal</h3>
                <div className="main-banner-editor">
                    <div className="banner-dimension-controls">
                        <h4>Layout e Tamanho do Banner</h4>
                        <div className="dimension-grid">
                            <div className="dimension-row">
                                <label htmlFor="widthInput">Largura (px):</label>
                                <input id="widthInput" type="number" value={localMainBannerWidth} onChange={(e) => setLocalMainBannerWidth(Number(e.target.value))} step="10" placeholder="Padrão: 1920" />
                            </div>
                            <div className="dimension-row">
                                <label htmlFor="heightInput">Altura (px):</label>
                                <input id="heightInput" type="number" value={localMainBannerHeight} onChange={(e) => setLocalMainBannerHeight(Number(e.target.value))} step="10" placeholder="Padrão: 600" />
                            </div>
                        </div>
                    </div>
                    <div className="banner-settings-grid">
                        <div className="banner-speed-control">
                            <label>Velocidade de Transição (ms):</label>
                            <input type="number" value={localMainBannerSpeed} onChange={(e) => setLocalMainBannerSpeed(Number(e.target.value))} step="500" min="0" />
                            <p className="description">(Use 0 para desativar)</p>
                        </div>
                        <div className="banner-arrow-control">
                            <label><input type="checkbox" checked={localMainBannerShowArrows} onChange={(e) => setLocalMainBannerShowArrows(e.target.checked)} /> Exibir setas</label>
                        </div>
                    </div>
                    {isUploading && <div className="progress-bar-container"><div className="progress-bar" style={{ width: `${progress}%` }}>{Math.round(progress)}%</div></div>}
                    <div className="banner-slides-grid">
                        {localMainBannerData.map((slide, index) => (
                            <BannerSlideEditor key={slide.id || index} slide={slide} index={index} bannerHeight={localMainBannerHeight} onMediaSelect={handleDynamicMediaUpload} onLinkChange={handleLinkChange} onRemove={handleRemoveSlide} />
                        ))}
                    </div>
                    <div className="banner-controls">
                        <button className="add-slide-button" onClick={handleAddSlide}>Adicionar Slide</button>
                        <button className="save-button" onClick={handleSaveMainBanner}>Salvar Banner</button>
                    </div>
                </div>
            </section>
            
            {message && !isUploading && <p className="success-message">{message}</p>}

            <section>
                <h3>Textos do Header</h3>
                <div className="header-editor-controls">
                    <button onClick={handleAddNavItem} className="add-nav-item-button">Adicionar Novo Botão ao Menu</button>
                </div>
                <div className="header-text-editor">
                    {localNavData.map((item, index) => (
                        <NavTextSection key={item.id || index} item={item} index={index} handleTitleChange={handleTitleChange} handleIndividualDropdownItemChange={handleIndividualDropdownItemChange} handleRemoveDropdownItem={handleRemoveDropdownItem} handleAddDropdownItem={handleAddDropdownItem} handleRemoveNavItem={handleRemoveNavItem} />
                    ))}
                </div>
                <button onClick={handleSaveNavText} className="save-nav-button">Salvar Textos de Navegação</button>
            </section>

            <section>
                <h3>Upload de Imagens Fixas</h3>
                <UploadSection label="Logo do Header" type="logo" inputRef={logoInputRef} handleSingleImageUpload={handleSingleImageUpload} />
                <UploadSection label="Banner 2 (Img 2)" type="bunner2Img2" inputRef={bunner2Img2InputRef} handleSingleImageUpload={handleSingleImageUpload} />
                <UploadSection label="Banner 3 (Img 1)" type="bunner3Img1" inputRef={bunner3Img1InputRef} handleSingleImageUpload={handleSingleImageUpload} />
            </section>

            {/* ESTA É A SEÇÃO QUE FOI RE-ADICIONADA */}
            <ProductCarouselEditor
                localProductCarousel1={localProductCarousel1}
                localProductCarousel2={localProductCarousel2}
                onCarouselChange={handleProductCarouselChange}
                onCardChange={handleProductCardChange}
                onAddCard={handleAddProductCard}
                onRemoveCard={handleRemoveProductCard}
                onImageUpload={handleProductCarouselImageUpload}
                onSaveChanges={handleSaveProductCarousels}
            />
            
            <section>
                <h3>Depoimentos de Clientes</h3>
                <div className="testimonial-editor-grid">
                    {localClientsTestimonials.map((testimonial, index) => (
                        <TestimonialEditor key={testimonial.id || index} testimonial={testimonial} index={index} handleDynamicMediaUpload={handleDynamicMediaUpload} handleTestimonialChange={handleTestimonialChange} handleRemoveTestimonial={handleRemoveTestimonial} />
                    ))}
                </div>
                <button onClick={handleAddTestimonial} className="add-testimonial-button">Adicionar Depoimento</button>
                <button onClick={handleSaveTestimonials} className="save-testimonials-button">Salvar Depoimentos</button>
            </section>

            <section>
                <h3>Seção "Sobre Nós"</h3>
                <div className="about-editor-container">
                    <div className="form-group">
                        <label>Título Principal</label>
                        <input type="text" name="title" value={localAboutData?.title || ''} onChange={handleAboutChange}/>
                    </div>
                    <div className="form-group">
                        <label>Texto Principal</label>
                        <textarea name="mainText" value={localAboutData?.mainText || ''} onChange={handleAboutChange} rows="6"/>
                    </div>
                    <div className="form-group">
                        <label>Título da Missão</label>
                        <input type="text" name="missionTitle" value={localAboutData?.missionTitle || ''} onChange={handleAboutChange}/>
                    </div>
                    <div className="form-group">
                        <label>Texto da Missão</label>
                        <textarea name="missionText" value={localAboutData?.missionText || ''} onChange={handleAboutChange} rows="4"/>
                    </div>
                    <div className="form-group">
                        <label>Título da Visão</label>
                        <input type="text" name="visionTitle" value={localAboutData?.visionTitle || ''} onChange={handleAboutChange}/>
                    </div>
                    <div className="form-group">
                        <label>Texto da Visão</label>
                        <textarea name="visionText" value={localAboutData?.visionText || ''} onChange={handleAboutChange} rows="4"/>
                    </div>
                    <button className="save-button" onClick={handleSaveAboutData}>Salvar Seção "Sobre Nós"</button>
                </div>
            </section>

            <FooterEditor
                localFooterData={localFooterData}
                setLocalFooterData={setLocalFooterData}
                handleSaveFooterData={handleSaveFooterData}
            />
            
            <FaqEditor
                localFaqData={localFaqData}
                setLocalFaqData={setLocalFaqData}
                handleSaveFaqData={handleSaveFaqData}
            />
        </div>
    );
}