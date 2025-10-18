import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './Pages/Login/Login.tsx';
import ConfirmarSenha from './Pages/ConfirmarSenha/ConfirmarSenha.tsx';
import GestaoUsuarios from './Pages/GestaoUsuario/GestaoUsuario.tsx';
import RecuperarSenha from './Pages/RecuperarSenha/RecuperarSenha.tsx';
import Ocorrencias from './Pages/Ocorrencias/Ocorrencias.tsx';
import Visualizacao from './Pages/Visualizacao/visualizacao.tsx';
import Inicial from './Pages/Inicial/Inicial.tsx';
import Dashboard from './Pages/Dashboard/Dashboard.tsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login />} />
          
          <Route path="/RecuperarSenha" element={<RecuperarSenha />} />

          <Route path="/ConfirmarSenha" element={<ConfirmarSenha />} />

          <Route path="/GestaoUsuario" element={
            <ProtectedRoute requiredRole="ADMIN">
              <GestaoUsuarios />
            </ProtectedRoute>
          } />
          
          <Route path="/Ocorrencias" element={
            <ProtectedRoute>
              <Ocorrencias />
            </ProtectedRoute>
          } />

          <Route path="/Inicial" element={
            <ProtectedRoute>
              <Inicial />
            </ProtectedRoute>
          } />
          
          <Route path='/Visualizacao/:id' element={
            <ProtectedRoute>
              <Visualizacao />
            </ProtectedRoute>
          } />

          <Route path='/Dashboard' element={
            <ProtectedRoute requiredRole="COMANDANTE">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<div>404 - Página Não Encontrada</div>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;