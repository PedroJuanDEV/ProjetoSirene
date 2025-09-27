import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AcessoPerfil from './Pages/RecuperarSenha/RecuperarSenha.tsx';
import Login from './Pages/Login/Login.tsx';
import './App.css';
import ConfirmarSenha from './Pages/ConfirmarSenha/ConfirmarSenha.tsx';
import GestaoUsuarios from './Pages/GestaoUsuario/GestaoUsuario.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<AcessoPerfil />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/ConfirmarSenha" element={<ConfirmarSenha />} />

        <Route path="/GestaoUsuario" element={<GestaoUsuarios />} />
        
        {/* Opcional: Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<div>404 - Página Não Encontrada</div>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;