import React, { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'ADMIN' | 'COMANDANTE' | 'MILITAR';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px' 
      }}>
        Carregando...
      </div>
    );
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Se tem papel específico requerido, verifica autorização
  if (requiredRole) {
    const hasPermission = checkPermission(user.perfilAcesso, requiredRole);
    if (!hasPermission) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: 'red' 
        }}>
          Acesso negado. Você não tem permissão para acessar esta página.
        </div>
      );
    }
  }

  return <>{children}</>;
};

// Função para verificar permissões
const checkPermission = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    'ADMIN': 3,
    'COMANDANTE': 2,
    'MILITAR': 1
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
};

export default ProtectedRoute;