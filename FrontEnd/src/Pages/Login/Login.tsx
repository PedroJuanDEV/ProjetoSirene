// Login.tsx
import React, { useState, type JSX } from "react";
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!matricula.trim() || !senha.trim()) {
      setMessage("Por favor, preencha todos os campos.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await login({
        matricula: matricula.trim(),
        senha: senha.trim(),
      });

      if (result.success) {
        navigate('/inicial');
      } else {
        setMessage(result.message);
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      setMessage("Erro de conexão. Verifique sua internet e tente novamente.");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    navigate("/RecuperarSenha"); 
  };


  return (
    <div className={styles.pageContainer}> 
      <form className={styles.box} onSubmit={handleLogin}>
        <div className={styles.containerLogin}>
          <div className={styles.textWrapper}>FAÇA LOGIN</div>

          {message && <p className={styles.errorMessage}>{message}</p>}

          <div className={styles.formField}>
            <div className={styles.labelTextWrapper}>
              <div className={styles.labelText}>Matricula</div>
            </div>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className={styles.inputFieldBox}
              disabled={isLoading} />
          </div>

          <div className={styles.formField}>
            <div className={styles.labelTextWrapper}>
              <div className={styles.labelText}>Senha</div>
            </div>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.inputFieldBox}
              disabled={isLoading} />
          </div>

          <a
            href="/RecuperarSenha" 
            className={styles.textWrapper4}
            onClick={handleForgotPassword}
          >
            Esqueceu a senha?
          </a>

          <div className={styles.keepLoggedIn}>
            <input type="checkbox" id="keepLoggedIn" name="keepLoggedIn" />
            <label htmlFor="keepLoggedIn" className={styles.checkboxLabel}>Manter logado</label>
          </div>

          <div className={styles.CONFIRMAR}>
            <button type="submit" className={styles.loginButton} disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </div>
        <footer>
          <div className={styles.copyright}>Copyright © 2025 Sirene</div>
        </footer>
      </form>
    </div>
  );
}

export default Login;