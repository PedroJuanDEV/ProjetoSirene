import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiService, type LoginRequest, type LoginResponse } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginResponse['militar'] | null;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoginResponse['militar'] | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se existe token salvo ao inicializar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        try {
          // Verifica se o token ainda é válido
          const response = await apiService.verifyAuth();
          if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpa dados
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        } catch (error) {
          // Token inválido, limpa dados
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        const { token, militar } = response.data;
        
        // Salva token e dados do usuário
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(militar));
        
        setUser(militar);
        setIsAuthenticated(true);
        
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message || 'Erro no login' };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro de conexão com o servidor' 
      };
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};