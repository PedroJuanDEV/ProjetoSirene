import fetch from 'node-fetch';

(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula: '2025001', senha: '123456' }),
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (res.ok && data.success && data.data && data.data.token) {
      console.log('Teste de login: SUCESSO. Token recebido.');
      process.exit(0);
    } else {
      console.error('Teste de login: FALHOU.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Erro:', err);
    process.exit(2);
  }
})();
