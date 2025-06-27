import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/api';
import './Member.scss';

function LoginMembro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/auth/login-membro`, { email, senha });
      setMensagem('Login realizado com sucesso!');
      // Salve token ou redirecione conforme sua lógica
      // localStorage.setItem('token', res.data.token);
      // window.location.href = '/area-membro';
    } catch (error: unknown) {
      type AxiosErrorResponse = {
        response?: {
          data?: {
            error?: string;
          };
        };
      };

      const err = error as AxiosErrorResponse;

      if (
        typeof error === 'object' &&
        error !== null &&
        err.response &&
        err.response.data &&
        typeof err.response.data.error === 'string'
      ) {
        setMensagem(err.response.data.error);
      } else {
        setMensagem('Erro ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="member-page">
      <Header />
      <main className="member-main">
        <h2>Login do Membro</h2>
        <form className="member-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="app-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        {mensagem && (
          <p style={{ marginTop: '1rem', color: mensagem.includes('sucesso') ? 'green' : 'red' }}>
            {mensagem}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default LoginMembro;