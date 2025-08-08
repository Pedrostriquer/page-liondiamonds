import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin'); // Redireciona para o admin após o login
        } catch (err) {
            setError('E-mail ou senha inválidos. Tente novamente.');
            console.error("Erro de autenticação:", err);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1 className="login-title">Admin Login</h1>
                <p className="login-subtitle">Acesso ao painel de gerenciamento</p>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seuemail@exemplo.com"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;