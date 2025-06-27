import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/api'; // ajuste o caminho se necessário
import './Member.scss';

function Member() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    repetirSenha: '',
    congregacaoNome: '',
  });

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');

    if (form.senha !== form.repetirSenha) {
      setMensagem('As senhas não coincidem!');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/membros`, {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        senha: form.senha,
        congregacaoNome: form.congregacaoNome,
      });

      setMensagem('Membro cadastrado com sucesso!');
      setForm({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        repetirSenha: '',
        congregacaoNome: '',
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setMensagem(error.response.data.message);
      } else {
        setMensagem('Erro ao cadastrar membro.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="member-page">
      <Header />
      <main className="member-main">
        <h2>Cadastrar Membro</h2>
        <form className="member-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="repetirSenha"
            placeholder="Repetir senha"
            value={form.repetirSenha}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="congregacaoNome"
            placeholder="Congregação"
            value={form.congregacaoNome}
            onChange={handleChange}
            required
          />
          <button type="submit" className="app-btn" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        {mensagem && <p style={{ marginTop: '1rem', color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</p>}
      </main>
      <Footer />
    </div>
  );
}

export default Member;