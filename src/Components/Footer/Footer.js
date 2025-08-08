import React from 'react';
import './Footer.css';

const Footer = ({ footerData }) => {
    // Se os dados ainda não foram carregados, não renderiza nada para evitar erros.
    if (!footerData) {
        return null;
    }

    // Formata o número de telefone para o link do WhatsApp (remove caracteres não numéricos)
    const whatsappNumber = footerData.whatsappNumber ? footerData.whatsappNumber.replace(/\D/g, '') : '';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                {/* Coluna 1: Contato */}
                <div className="footer-column">
                    <h3 className="footer-title">Entre em Contato</h3>
                    <p className="footer-text">Telefone: {footerData.phone}</p>
                    <p className="footer-text">Email: {footerData.email}</p>
                </div>

                {/* Coluna 2: Mensagem WhatsApp */}
                <div className="footer-column">
                    <h3 className="footer-title">Envie sua mensagem</h3>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                        <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
                        <span>Conversar no WhatsApp</span>
                    </a>
                </div>

                {/* Coluna 3: Redes Sociais */}
                <div className="footer-column">
                    <h3 className="footer-title">Redes Sociais</h3>
                    <div className="social-links">
                        {footerData.instagram && <a href={footerData.instagram} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>}
                        {footerData.facebook && <a href={footerData.facebook} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>}
                        {footerData.youtube && <a href={footerData.youtube} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>}
                        {footerData.tiktok && <a href={footerData.tiktok} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-tiktok"></i></a>}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Gemas Brilhantes. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;