import { useState, useEffect } from 'react';
import './App.css';
import Container from './Components/Container/Container';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import AboutSection from './Components/AboutSection/AboutSection';
import FaqSection from './Components/FaqSection/FaqSection';
import Carrossel from './Components/Carrossel/Carrossel';
import Bunner2 from './Components/Banner2/Bunner2';
import Carrossel2 from './Components/Carrossel2/Carrossel2';
import Bunner3 from './Components/Banner3/Bunner3';
import Clients from './Components/Clients/Clients';
import Admin from './Components/Admin/admin';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebaseConfig';

function App() {
  // --- State de Autenticação ---
  const [user, setUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);

  // --- States para Conteúdo ---
  const [currentLogoUrl, setCurrentLogoUrl] = useState('');
  const [currentBunner2Img2Url, setCurrentBunner2Img2Url] = useState('');
  const [currentBunner3Img1Url, setCurrentBunner3Img1Url] = useState('');
  const [clientsTestimonials, setClientsTestimonials] = useState([]);
  const [carousel1Data, setCarousel1Data] = useState([]);
  const [carousel2Data, setCarousel2Data] = useState([]);
  const [headerNavData, setHeaderNavData] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [faqData, setFaqData] = useState([]);

  // --- States para o Banner Principal ---
  const [mainBannerData, setMainBannerData] = useState([]);
  const [mainBannerSpeed, setMainBannerSpeed] = useState(5000);
  const [mainBannerShowArrows, setMainBannerShowArrows] = useState(true);
  const [mainBannerWidth, setMainBannerWidth] = useState(1920);
  const [mainBannerHeight, setMainBannerHeight] = useState(600);

  const appConfigDocRef = doc(db, "appData", "config");

  // Efeito para verificar o status de login do usuário na inicialização
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      setAuthIsReady(true); // Marca que a verificação inicial foi concluída
    });
    // Limpa a inscrição quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // Função auxiliar para obter a configuração atual completa
  const getCurrentConfig = () => ({
    logoUrl: currentLogoUrl,
    bunner2Img2Url: currentBunner2Img2Url,
    bunner3Img1Url: currentBunner3Img1Url,
    clientsTestimonials,
    carousel1Data,
    carousel2Data,
    headerNavData,
    mainBannerData,
    mainBannerSpeed,
    mainBannerShowArrows,
    mainBannerWidth,
    mainBannerHeight,
    aboutData,
    footerData,
    faqData,
  });

  // Efeito para carregar dados do Firestore na inicialização
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const docSnap = await getDoc(appConfigDocRef);
        const defaultConfig = {
            logoUrl: './img/default-logo.png',
            bunner2Img2Url: '',
            bunner3Img1Url: '',
            clientsTestimonials: [],
            carousel1Data: [],
            carousel2Data: [],
            headerNavData: [],
            mainBannerData: [],
            mainBannerSpeed: 5000,
            mainBannerShowArrows: true,
            mainBannerWidth: 1920,
            mainBannerHeight: 600,
            aboutData: { title: "SOBRE A GEMAS BRILHANTES", mainText: "...", missionTitle: "MISSÃO", missionText: "...", visionTitle: "VISÃO", visionText: "..." },
            footerData: { phone: "0800 (Whatsapp)", email: "atendimento@gemasbrilhantes.com.br", whatsappNumber: "5511999999999", instagram: "https://instagram.com", facebook: "https://facebook.com", youtube: "https://youtube.com", tiktok: "https://tiktok.com" },
            faqData: [
              {id: 'faq1', question: 'Qual é a procedência das gemas?', answer: 'Todas as nossas gemas são cuidadosamente selecionadas...'},
              {id: 'faq2', question: 'Vocês oferecem certificado de autenticidade?', answer: 'Sim, cada gema preciosa adquirida vem com um certificado...'},
            ]
        };

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentLogoUrl(data.logoUrl || defaultConfig.logoUrl);
          setCurrentBunner2Img2Url(data.bunner2Img2Url || defaultConfig.bunner2Img2Url);
          setCurrentBunner3Img1Url(data.bunner3Img1Url || defaultConfig.bunner3Img1Url);
          setClientsTestimonials(data.clientsTestimonials || defaultConfig.clientsTestimonials);
          setCarousel1Data(data.carousel1Data || defaultConfig.carousel1Data);
          setCarousel2Data(data.carousel2Data || defaultConfig.carousel2Data);
          setHeaderNavData(data.headerNavData || defaultConfig.headerNavData);
          setMainBannerData(data.mainBannerData || defaultConfig.mainBannerData);
          setMainBannerSpeed(data.mainBannerSpeed !== undefined ? data.mainBannerSpeed : defaultConfig.mainBannerSpeed);
          setMainBannerShowArrows(data.mainBannerShowArrows !== undefined ? data.mainBannerShowArrows : defaultConfig.mainBannerShowArrows);
          setMainBannerWidth(data.mainBannerWidth || defaultConfig.mainBannerWidth);
          setMainBannerHeight(data.mainBannerHeight || defaultConfig.mainBannerHeight);
          setAboutData(data.aboutData || defaultConfig.aboutData);
          setFooterData(data.footerData || defaultConfig.footerData);
          setFaqData(data.faqData || defaultConfig.faqData);
        } else {
          await setDoc(appConfigDocRef, defaultConfig);
        }
      } catch (e) {
        console.error("Erro ao carregar configuração: ", e);
      }
    };
    loadConfig();
  }, []);

  // Função genérica para salvar no Firestore
  const saveAllConfigToFirestore = async (newConfig) => {
    try {
      await setDoc(appConfigDocRef, newConfig, { merge: true });
    } catch (e) {
      console.error("Erro ao salvar configuração: ", e);
    }
  };

  // --- Handlers para Atualização de Dados ---
  const handleImageUpload = (url, type) => {
    const newConfig = getCurrentConfig();
    if (type === 'logo') { setCurrentLogoUrl(url); newConfig.logoUrl = url; }
    else if (type === 'bunner2Img2') { setCurrentBunner2Img2Url(url); newConfig.bunner2Img2Url = url; }
    else if (type === 'bunner3Img1') { setCurrentBunner3Img1Url(url); newConfig.bunner3Img1Url = url; }
    saveAllConfigToFirestore(newConfig);
  };
  
  const handleNavTextUpdate = (data) => { setHeaderNavData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), headerNavData: data }); };
  const handleCarousel1DataUpdate = (data) => { setCarousel1Data(data); saveAllConfigToFirestore({ ...getCurrentConfig(), carousel1Data: data }); };
  const handleCarousel2DataUpdate = (data) => { setCarousel2Data(data); saveAllConfigToFirestore({ ...getCurrentConfig(), carousel2Data: data }); };
  const handleClientsTestimonialsUpdate = (data) => { setClientsTestimonials(data); saveAllConfigToFirestore({ ...getCurrentConfig(), clientsTestimonials: data }); };
  const handleMainBannerUpdate = (data, speed, showArrows, width, height) => {
      setMainBannerData(data); setMainBannerSpeed(speed); setMainBannerShowArrows(showArrows); setMainBannerWidth(width); setMainBannerHeight(height);
      saveAllConfigToFirestore({ ...getCurrentConfig(), mainBannerData: data, mainBannerSpeed: speed, mainBannerShowArrows: showArrows, mainBannerWidth: width, mainBannerHeight: height });
  };
  const handleAboutDataUpdate = (data) => { setAboutData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), aboutData: data }); };
  const handleFooterDataUpdate = (data) => { setFooterData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), footerData: data }); };
  const handleFaqDataUpdate = (data) => { setFaqData(data); saveAllConfigToFirestore({ ...getCurrentConfig(), faqData: data }); };

  // Renderiza um loader simples enquanto o Firebase verifica a autenticação
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
            <Carrossel carousel1Data={carousel1Data} />
            <Bunner2 bunner2Img2Src={currentBunner2Img2Url} />
            <Carrossel2 carousel2Data={carousel2Data} />
            <Bunner3 bunner3Img1Src={currentBunner3Img1Url} />
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
                carousel1Data={carousel1Data} onCarousel1DataUpdate={handleCarousel1DataUpdate}
                carousel2Data={carousel2Data} onCarousel2DataUpdate={handleCarousel2DataUpdate}
                clientsTestimonials={clientsTestimonials} onClientsTestimonialsUpdate={handleClientsTestimonialsUpdate}
                mainBannerData={mainBannerData} mainBannerSpeed={mainBannerSpeed} mainBannerShowArrows={mainBannerShowArrows} mainBannerWidth={mainBannerWidth} mainBannerHeight={mainBannerHeight} onMainBannerUpdate={handleMainBannerUpdate}
                aboutData={aboutData} onAboutDataUpdate={handleAboutDataUpdate}
                footerData={footerData} onFooterDataUpdate={handleFooterDataUpdate}
                faqData={faqData} onFaqDataUpdate={handleFaqDataUpdate}
              />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Container>
  );
}

export default App;
