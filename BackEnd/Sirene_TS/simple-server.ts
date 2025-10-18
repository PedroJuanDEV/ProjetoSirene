import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sistema Corpo de Bombeiros - API Online',
    timestamp: new Date().toISOString(),
  });
});

// Rota de login simplificada para teste
app.post('/api/auth/login', (req, res) => {
  const { matricula, senha } = req.body;
  
  // Simulação de login para teste
  if (matricula === '2025001' && senha === '123456') {
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        token: 'fake-jwt-token-for-testing',
        militar: {
          id: '1',
          nome: 'João Silva',
          matricula: '2025001',
          cpf: '123.456.789-00',
          numeroMilitar: '001',
          posto: 'Soldado',
          perfilAcesso: 'MILITAR'
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciais inválidas'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}`);
  console.log(`🔥 Endpoint de login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`📋 Use matricula: 2025001 e senha: 123456 para teste`);
});