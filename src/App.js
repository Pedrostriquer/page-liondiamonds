import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Container from './Components/Container/Container';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import AboutSection from './Components/AboutSection/AboutSection';
import FaqSection from './Components/FaqSection/FaqSection';
import ProductCarousel from './Components/ProductCarousel/ProductCarousel';
import Clients from './Components/Clients/Clients';
import Admin from './Components/Admin/admin';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebaseConfig';
import CollectionsSection from './Components/CollectionsSection/CollectionsSection';

const appConfigDocRef = doc(db, "appData", "config");

function App() {
  const [user, setUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);

  // States de conteúdo (sem os banners)
  const [currentLogoUrl, setCurrentLogoUrl] = useState('');
  const [clientsTestimonials, setClientsTestimonials] = useState([]);
  const [headerNavData, setHeaderNavData] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [mainBannerData, setMainBannerData] = useState([]);
  const [mainBannerSpeed, setMainBannerSpeed] = useState(5000);
  const [mainBannerShowArrows, setMainBannerShowArrows] = useState(true);
  const [mainBannerWidth, setMainBannerWidth] = useState(1920);
  const [mainBannerHeight, setMainBannerHeight] = useState(600);
  const [productCarousel1, setProductCarousel1] = useState(null);
  const [collectionsData, setCollectionsData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      setAuthIsReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const docSnap = await getDoc(appConfigDocRef);
        const defaultConfig = {
            logoUrl: './img/default-logo.png',
            clientsTestimonials: [],
            headerNavData: [],
            mainBannerData: [],
            mainBannerSpeed: 5000,
            mainBannerShowArrows: true,
            mainBannerWidth: 1920,
            mainBannerHeight: 600,
            aboutData: { title: "SOBRE", mainText: "...", missionTitle: "MISSÃO", missionText: "...", visionTitle: "VISÃO", visionText: "..." },
            footerData: { phone: "0800 (Whatsapp)", email: "atendimento@gemas.com.br", whatsappNumber: "5511999999999", instagram: "https://instagram.com", facebook: "https://facebook.com", youtube: "https://youtube.com", tiktok: "https://tiktok.com" },
            faqData: [],
            productCarousel1: { title: "Joias", seeAllLink: "/joias", cards: [] },
            collectionsData: { title: "Coleções", cards: [] },
        };

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentLogoUrl(data.logoUrl || defaultConfig.logoUrl);
          setClientsTestimonials(data.clientsTestimonials || defaultConfig.clientsTestimonials);
          setHeaderNavData(data.headerNavData || defaultConfig.headerNavData);
          setMainBannerData(data.mainBannerData || defaultConfig.mainBannerData);
          setMainBannerSpeed(data.mainBannerSpeed !== undefined ? data.mainBannerSpeed : defaultConfig.mainBannerSpeed);
          setMainBannerShowArrows(data.mainBannerShowArrows !== undefined ? data.mainBannerShowArrows : defaultConfig.mainBannerShowArrows);
          setMainBannerWidth(data.mainBannerWidth || defaultConfig.mainBannerWidth);
          setMainBannerHeight(data.mainBannerHeight || defaultConfig.mainBannerHeight);
          setAboutData(data.aboutData || defaultConfig.aboutData);
          setFooterData(data.footerData || defaultConfig.footerData);
          setFaqData(data.faqData || defaultConfig.faqData);
          setProductCarousel1(data.productCarousel1 || defaultConfig.productCarousel1);
          setCollectionsData(data.collectionsData || defaultConfig.collectionsData);
        } else {
          await setDoc(appConfigDocRef, defaultConfig);
        }
      } catch (e) {
        console.error("Erro ao carregar configuração: ", e);
      }
    };
    if (authIsReady) {
        loadConfig();
    }
  }, [authIsReady]);

  const saveAllConfigToFirestore = useCallback(async (newConfig) => {
    try {
      await setDoc(appConfigDocRef, newConfig, { merge: true });
    } catch (e) {
      console.error("Erro ao salvar configuração: ", e);
    }
  }, []);
  
  const getCurrentConfig = useCallback(() => ({
    logoUrl: currentLogoUrl,
    clientsTestimonials, headerNavData, mainBannerData, mainBannerSpeed, mainBannerShowArrows,
    mainBannerWidth, mainBannerHeight, aboutData, footerData, faqData, productCarousel1, collectionsData,
  }), [
    currentLogoUrl, clientsTestimonials, headerNavData,
    mainBannerData, mainBannerSpeed, mainBannerShowArrows, mainBannerWidth, mainBannerHeight,
    aboutData, footerData, faqData, productCarousel1, collectionsData
  ]);

  const handleImageUpload = (url, type) => {
    const newConfig = getCurrentConfig();
    if (type === 'logo') {
        setCurrentLogoUrl(url);
        newConfig.logoUrl = url;
    }
    saveAllConfigToFirestore(newConfig);
  };
  
  const handleNavTextUpdate = (data) => { setHeaderNavData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), headerNavData: data }); };
  const handleClientsTestimonialsUpdate = (data) => { setClientsTestimonials(data); saveAllConfigToFirestore({ ...getCurrentConfig(), clientsTestimonials: data }); };
  const handleMainBannerUpdate = (data, speed, showArrows, width, height) => {
      setMainBannerData(data); setMainBannerSpeed(speed); setMainBannerShowArrows(showArrows); setMainBannerWidth(width); setMainBannerHeight(height);
      saveAllConfigToFirestore({ ...getCurrentConfig(), mainBannerData: data, mainBannerSpeed: speed, mainBannerShowArrows: showArrows, mainBannerWidth: width, mainBannerHeight: height });
  };
  const handleAboutDataUpdate = (data) => { setAboutData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), aboutData: data }); };
  const handleFooterDataUpdate = (data) => { setFooterData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), footerData: data }); };
  const handleFaqDataUpdate = (data) => { setFaqData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), faqData: data }); };
  
  const handleProductCarouselUpdate = (data) => {
    setProductCarousel1(data);
    saveAllConfigToFirestore({ ...getCurrentConfig(), productCarousel1: data });
  };
  const handleCollectionsDataUpdate = (data) => {
    setCollectionsData(data);
    saveAllConfigToFirestore({ ...getCurrentConfig(), collectionsData: data });
  };

  if (!authIsReady) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>Carregando...</div>;
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={
          <>
            <Header logoSrc={currentLogoUrl} navData={headerNavData} />
            <Body mainBannerData={mainBannerData} mainBannerSpeed={mainBannerSpeed} mainBannerShowArrows={mainBannerShowArrows} mainBannerWidth={mainBannerWidth} mainBannerHeight={mainBannerHeight} />
            <AboutSection aboutData={aboutData} />
            {productCarousel1 && (
                <ProductCarousel 
                    title={productCarousel1.title} 
                    cards={productCarousel1.cards} 
                    seeAllLink={productCarousel1.seeAllLink}
                />
            )}
            <CollectionsSection collectionsData={collectionsData} />
            <Clients clientsTestimonials={clientsTestimonials} />
            <FaqSection faqData={faqData} />
            <Footer footerData={footerData} />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute user={user}>
              <Admin
                onImageUpload={handleImageUpload}
                headerNavData={headerNavData} onNavTextUpdate={handleNavTextUpdate}
                clientsTestimonials={clientsTestimonials} onClientsTestimonialsUpdate={handleClientsTestimonialsUpdate}
                mainBannerData={mainBannerData} mainBannerSpeed={mainBannerSpeed} mainBannerShowArrows={mainBannerShowArrows} mainBannerWidth={mainBannerWidth} mainBannerHeight={mainBannerHeight} onMainBannerUpdate={handleMainBannerUpdate}
                aboutData={aboutData} onAboutDataUpdate={handleAboutDataUpdate}
                footerData={footerData} onFooterDataUpdate={handleFooterDataUpdate}
                faqData={faqData} onFaqDataUpdate={handleFaqDataUpdate}
                productCarousel1={productCarousel1}
                onProductCarouselUpdate={handleProductCarouselUpdate}
                collectionsData={collectionsData}
                onCollectionsDataUpdate={handleCollectionsDataUpdate}
              />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Container>
  );
}

export default App;