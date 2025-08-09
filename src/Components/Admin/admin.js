import React, { useState, useRef, useEffect } from "react";
import './admin.css';
import './AdminBanner.css'; 
import './AdminHeader.css';
import './AdminSections.css';

import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

// Importando TODOS os componentes de edição
import MainBannerEditor from "./MainBannerEditor";
import HeaderEditor from "./HeaderEditor";
import TestimonialsEditor from "./TestimonialsEditor";
import AboutEditor from "./AboutEditor";
import FooterEditor from "./FooterEditor";
import FaqEditor from "./FaqEditor";
import ProductCarouselEditor from "./ProductCarouselEditor";
import CollectionsEditor from "./CollectionsEditor";

const UploadSection = ({ label, type, inputRef, handleSingleImageUpload }) => (
    <div className="upload-section">
        <label>{label}:</label>
        <input type="file" ref={inputRef} accept="image/*" />
        <button onClick={() => {
            if (inputRef.current.files[0]) {
                handleSingleImageUpload(inputRef.current.files[0], type)
            } else {
                alert("Por favor, selecione um arquivo primeiro.");
            }
        }}>
            Enviar {label}
        </button>
    </div>
);

export default function Admin({
    onImageUpload, onNavTextUpdate, headerNavData,
    clientsTestimonials, onClientsTestimonialsUpdate,
    mainBannerData, mainBannerSpeed, mainBannerShowArrows, mainBannerWidth, mainBannerHeight, onMainBannerUpdate,
    aboutData, onAboutDataUpdate,
    footerData, onFooterDataUpdate,
    faqData, onFaqDataUpdate,
    productCarousel1, onProductCarouselUpdate,
    collectionsData, onCollectionsDataUpdate,
}) {
    // --- STATES E REFS ---
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');

    const logoInputRef = useRef(null);

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
    const [localCollectionsData, setLocalCollectionsData] = useState(collectionsData);

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
    useEffect(() => setLocalCollectionsData(collectionsData), [collectionsData]);
    
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
            (error) => { setIsUploading(false); alert(`Erro no upload: ${error.message}`); },
            () => getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setIsUploading(false);
                setMessage(`Arquivo carregado! Salve as alterações para aplicar.`);
                if (callback) callback(url, file.type);
            })
        );
    };

    const handleSingleImageUpload = (file, type) => handleFileUpload(file, 'images', (url) => onImageUpload(url, type));
    const handleDynamicMediaUpload = (file, itemType, itemIndex) => {
        handleFileUpload(file, 'media', (url, fileType) => {
            const mediaType = fileType && fileType.startsWith('video') ? 'video' : 'image';
            if (itemType === 'mainBanner') setLocalMainBannerData(prev => prev.map((slide, i) => i === itemIndex ? { ...slide, src: url, type: mediaType } : slide));
            else if (itemType === 'testimonial') setLocalClientsTestimonials(prev => prev.map((item, i) => i === itemIndex ? { ...item, imageSrc: url } : item));
        });
    };

    // --- HANDLERS DOS EDITORES ---
    const handleTitleChange = (e, index) => setLocalNavData(prev => prev.map((item, i) => i === index ? { ...item, title: e.target.value } : item));
    const handleIndividualDropdownItemChange = (e, itemIndex, dIndex) => setLocalNavData(prev => prev.map((item, i) => i === itemIndex ? { ...item, dropdown: item.dropdown.map((d, di) => di === dIndex ? { ...d, text: e.target.value } : d) } : item));
    const handleAddDropdownItem = (itemIndex) => setLocalNavData(prev => prev.map((item, i) => i === itemIndex ? { ...item, dropdown: [...item.dropdown, { id: `dd-${Date.now()}`, text: '' }] } : item));
    const handleRemoveDropdownItem = (itemIndex, dIndex) => setLocalNavData(prev => prev.map((item, i) => i === itemIndex ? { ...item, dropdown: item.dropdown.filter((_, di) => di !== dIndex) } : item));
    const handleAddNavItem = () => setLocalNavData(prev => [...prev, { id: `nav-${Date.now()}`, title: 'Novo Botão', dropdown: [] }]);
    const handleRemoveNavItem = (index) => setLocalNavData(prev => prev.filter((_, i) => i !== index));
    const handleSaveNavText = () => { onNavTextUpdate(localNavData); setMessage('Header salvo!'); };
    const handleAddSlide = () => setLocalMainBannerData(prev => [...prev, { id: `new-${Date.now()}`, src: '', type: 'image', link: '' }]);
    const handleRemoveSlide = (index) => setLocalMainBannerData(prev => prev.filter((_, i) => i !== index));
    const handleLinkChange = (e, index) => setLocalMainBannerData(prev => prev.map((slide, i) => i === index ? { ...slide, link: e.target.value } : slide));
    const handleSaveMainBanner = () => { onMainBannerUpdate(localMainBannerData.filter(s => s.src), localMainBannerSpeed, localMainBannerShowArrows, localMainBannerWidth, localMainBannerHeight); setMessage('Banner principal salvo!'); };
    const handleTestimonialChange = (e, index, field) => setLocalClientsTestimonials(prev => prev.map((item, i) => i === index ? { ...item, [field]: e.target.value } : item));
    const handleAddTestimonial = () => setLocalClientsTestimonials(prev => [...prev, { id: `test-${Date.now()}`, imageSrc: '', comment: '', author: '' }]);
    const handleRemoveTestimonial = (index) => setLocalClientsTestimonials(prev => prev.filter((_, i) => i !== index));
    const handleSaveTestimonials = () => { onClientsTestimonialsUpdate(localClientsTestimonials.filter(t => t.comment || t.author)); setMessage('Depoimentos salvos!'); };
    const handleSaveAboutData = () => { onAboutDataUpdate(localAboutData); setMessage('Seção "Sobre" salva!'); };
    const handleSaveFooterData = () => { onFooterDataUpdate(localFooterData); setMessage('Rodapé salvo!'); };
    const handleSaveFaqData = () => { onFaqDataUpdate(localFaqData); setMessage('FAQ salvo!'); };

    const handleProductCarouselDataChange = (fileOrData, index, action) => {
        if (action === 'image_upload') {
            handleFileUpload(fileOrData, 'products', (url) => {
                const newCards = localProductCarousel1.cards.map((card, i) => i === index ? { ...card, imageSrc: url } : card);
                setLocalProductCarousel1({ ...localProductCarousel1, cards: newCards });
            });
        } else {
            setLocalProductCarousel1(fileOrData);
        }
    };

    const handleCollectionsDataChange = (fileOrData, index, action) => {
        if (action === 'image_upload') {
            handleFileUpload(fileOrData, 'collections', (url) => {
                const newCards = localCollectionsData.cards.map((card, i) => i === index ? { ...card, imageSrc: url } : card);
                setLocalCollectionsData({ ...localCollectionsData, cards: newCards });
            });
        } else {
            setLocalCollectionsData(fileOrData);
        }
    };

    return (
        <div className="admin">
            <h2>Gerenciamento de Conteúdo</h2>
            {message && !isUploading && <p className="success-message">{message}</p>}

            <MainBannerEditor isUploading={isUploading} progress={progress} localData={localMainBannerData} localSpeed={localMainBannerSpeed} localShowArrows={localMainBannerShowArrows} localWidth={localMainBannerWidth} localHeight={localMainBannerHeight} setLocalSpeed={setLocalMainBannerSpeed} setLocalShowArrows={setLocalMainBannerShowArrows} setLocalWidth={setLocalMainBannerWidth} setLocalHeight={setLocalMainBannerHeight} onAddSlide={handleAddSlide} onRemoveSlide={handleRemoveSlide} onLinkChange={handleLinkChange} onDynamicMediaUpload={handleDynamicMediaUpload} onSaveChanges={handleSaveMainBanner} />
            <HeaderEditor localNavData={localNavData} handleTitleChange={handleTitleChange} handleIndividualDropdownItemChange={handleIndividualDropdownItemChange} handleRemoveDropdownItem={handleRemoveDropdownItem} handleAddDropdownItem={handleAddDropdownItem} handleAddNavItem={handleAddNavItem} handleRemoveNavItem={handleRemoveNavItem} handleSaveNavText={handleSaveNavText} />
            
            <section>
                <h3>Upload de Imagens Fixas</h3>
                <UploadSection label="Logo do Header" type="logo" inputRef={logoInputRef} handleSingleImageUpload={handleSingleImageUpload} />
            </section>
            
            <ProductCarouselEditor
                localData={localProductCarousel1}
                onDataChange={handleProductCarouselDataChange}
                onSaveChanges={() => onProductCarouselUpdate(localProductCarousel1)}
            />
            
            <CollectionsEditor
                localData={localCollectionsData}
                onDataChange={handleCollectionsDataChange}
                onSaveChanges={() => onCollectionsDataUpdate(localCollectionsData)}
            />

            <TestimonialsEditor localClientsTestimonials={localClientsTestimonials} handleDynamicImageUpload={handleDynamicMediaUpload} handleTestimonialChange={handleTestimonialChange} handleRemoveTestimonial={handleRemoveTestimonial} handleAddTestimonial={handleAddTestimonial} handleSaveTestimonials={handleSaveTestimonials} />
            <AboutEditor localAboutData={localAboutData} setLocalAboutData={setLocalAboutData} handleSaveAboutData={handleSaveAboutData} />
            <FooterEditor localFooterData={localFooterData} setLocalFooterData={setLocalFooterData} handleSaveFooterData={handleSaveFooterData} />
            <FaqEditor localFaqData={localFaqData} setLocalFaqData={setLocalFaqData} handleSaveFaqData={handleSaveFaqData} />
        </div>
    );
}