import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    // Se não houver usuário logado, redireciona para a página de login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Se houver usuário logado, renderiza o componente filho (a página de admin)
    return children;
};

export default ProtectedRoute;
