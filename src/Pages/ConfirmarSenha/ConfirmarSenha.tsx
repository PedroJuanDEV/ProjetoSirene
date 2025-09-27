import React, { useState, type JSX } from "react";
import styles from "./ConfirmarSenha.module.css";


function RecuperarSenha(): JSX.Element {
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");

  const handleAvancar = () => {
    
    console.log("Avançar clicado");
    console.log("Matrícula:", matricula);
    console.log("CPF:", cpf);
  };

  const handleCancelar = () => {
    console.log("Cancelar clicado. Redirecionando para /login");
    window.location.href = "/login"; 
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardRecuperacao}>
        <h1 className={styles.titulo}>RECUPERAR SENHA</h1>

       
        <div className={styles.formField}>
          <label htmlFor="matricula" className={styles.labelText}>Nova senha</label>
          <input
            id="matricula"
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className={styles.inputField}
          />
        </div>

       
        <div className={styles.formField}>
          <label htmlFor="cpf" className={styles.labelText}>Confirmar nova senha</label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className={styles.inputField}
          />
        </div>

        
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleCancelar} 
            className={`${styles.button} ${styles.buttonCancelar}`}
          >
            Cancelar
          </button>
          <button 
            onClick={handleAvancar} 
            className={`${styles.button} ${styles.buttonAvancar}`}
          >
            Avançar
          </button>
        </div>
      </div>
      
      <footer className={styles.footer}>
        Copyright © 2025 Sirene
      </footer>
    </div>
  );
}

export default RecuperarSenha;
