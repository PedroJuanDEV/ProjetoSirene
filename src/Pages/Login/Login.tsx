// No seu arquivo Login.tsx
import React, { useState, type JSX } from "react";
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
  // ... seu código de estado e funções
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (cpf === "seu_cpf" && senha === "sua_senha") {

      navigate('/GestaoUsuario');
    } else {
      setMessage("Credenciais inválidas. Tente novamente.");
    }

    setTimeout(() => setMessage(""), 5000);
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    navigate("/");
  };


  return (
    <div className={styles.pageContainer}> {/* Adicione esta div aqui */}
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
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className={styles.inputFieldBox} />
          </div>

          <div className={styles.formField}>
            <div className={styles.labelTextWrapper}>
              <div className={styles.labelText}>Senha</div>
            </div>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.inputFieldBox} />
          </div>

          <a
            href="/"
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
            <button type="submit" className={styles.loginButton}>
              Entrar
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