import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MensagemCelula.scss';

interface Mensagem {
  nome: string;
  caminho: string;
  data: string;
  titulo: string;
}

function MensagemCelula() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Mensagem[]>(`${API_URL}/mensagens-celula`)
      .then(res => {
        setMensagens(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (!mensagens.length) return <div>Nenhuma mensagem encontrada.</div>;

  const mensagemAtual = mensagens[0];

  return (
    <div className="mensagem-celula-page">
      <Header />
      <main className="mensagem-celula-main">
        <h2>Mensagem da Célula</h2>
        <section className="mensagem-atual">
          <h3>{mensagemAtual.titulo}</h3>
          <iframe
            src={`${API_URL}${mensagemAtual.caminho}`}
            title={mensagemAtual.titulo}
            width="100%"
            height="500px"
          />
          <a href={`${API_URL}${mensagemAtual.caminho}`} download className="app-btn">
            Baixar PDF
          </a>
        </section>
        <section className="mensagens-anteriores">
          <h4>Mensagens Anteriores</h4>
          <ul>
            {mensagens.slice(1).map((msg, idx) => (
              <li key={idx}>
                <span>{msg.titulo}</span>
                <a href={`${API_URL}${msg.caminho}`} download className="app-btn">Baixar</a>
                <a href={`${API_URL}${msg.caminho}`} target="_blank" rel="noopener noreferrer" className="app-btn">Ler</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default MensagemCelula;