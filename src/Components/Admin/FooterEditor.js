import React from 'react';

const FooterEditor = ({ localFooterData, setLocalFooterData, handleSaveFooterData }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFooterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section>
            <h3>Editor do Rodapé</h3>
            <div className="footer-editor-container">
                <h4>Informações de Contato</h4>
                <div className="form-group">
                    <label>Telefone (Exibido)</label>
                    <input type="text" name="phone" value={localFooterData?.phone || ''} onChange={handleChange} placeholder="Ex: 0800 123 4567" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={localFooterData?.email || ''} onChange={handleChange} placeholder="Ex: contato@empresa.com" />
                </div>

                <h4>WhatsApp</h4>
                <div className="form-group">
                    <label>Número do WhatsApp (com código do país)</label>
                    <input type="text" name="whatsappNumber" value={localFooterData?.whatsappNumber || ''} onChange={handleChange} placeholder="Ex: 5511999998888" />
                </div>

                <h4>Links das Redes Sociais</h4>
                <div className="form-group">
                    <label>Instagram URL</label>
                    <input type="url" name="instagram" value={localFooterData?.instagram || ''} onChange={handleChange} placeholder="https://instagram.com/seu-usuario" />
                </div>
                <div className="form-group">
                    <label>Facebook URL</label>
                    <input type="url" name="facebook" value={localFooterData?.facebook || ''} onChange={handleChange} placeholder="https://facebook.com/sua-pagina" />
                </div>
                <div className="form-group">
                    <label>Youtube URL</label>
                    <input type="url" name="youtube" value={localFooterData?.youtube || ''} onChange={handleChange} placeholder="https://youtube.com/seu-canal" />
                </div>
                <div className="form-group">
                    <label>TikTok URL</label>
                    <input type="url" name="tiktok" value={localFooterData?.tiktok || ''} onChange={handleChange} placeholder="https://tiktok.com/@seu-usuario" />
                </div>

                <button className="save-button" onClick={handleSaveFooterData}>
                    Salvar Rodapé
                </button>
            </div>
        </section>
    );
};

export default FooterEditor;