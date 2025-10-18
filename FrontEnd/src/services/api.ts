// Configuração da API base
const API_BASE_URL = 'http://localhost:3000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginRequest {
  matricula: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  militar: {
    id: string;
    nome: string;
    matricula: string;
    cpf: string;
    numeroMilitar: string;
    posto: string;
    perfilAcesso: 'ADMIN' | 'COMANDANTE' | 'MILITAR';
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para fazer requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adiciona token se estiver disponível
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Método para login
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Método para verificar se o usuário está autenticado
  async verifyAuth(): Promise<ApiResponse<LoginResponse['militar']>> {
    return this.request<LoginResponse['militar']>('/auth/me');
  }

  // Método para recuperação de senha
  async solicitarRecuperacaoSenha(matricula: string, cpf: string): Promise<ApiResponse> {
    return this.request('/auth/recuperar-senha', {
      method: 'POST',
      body: JSON.stringify({ matricula, cpf }),
    });
  }

  // Método para redefinir senha
  async redefinirSenha(
    id: string,
    novaSenha: string,
    confirmarSenha: string
  ): Promise<ApiResponse> {
    return this.request('/auth/redefinir-senha', {
      method: 'POST',
      body: JSON.stringify({ id, novaSenha, confirmarSenha }),
    });
  }

  // Método para fazer logout (limpa o token local)
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }
}

export const apiService = new ApiService();