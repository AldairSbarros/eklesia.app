import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/api';
import manualCodigos from '../../utils/manualCodigos.json';
import './Receitas.scss';

type ReceitaManual = {
  codigo: string;
  descricao: string;
};

export default function Receitas() {
  const [form, setForm] = useState({
    congregacaoId: '',
    descricao: '',
    valor: '',
    data: '',
    categoria: '',
    codigoManual: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  // Controle do modal de escolha
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  // Busca automática de descrição pelo código
  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const codigo = e.target.value;
    const found = (manualCodigos.receitas as ReceitaManual[]).find((r) => r.codigo === codigo);
    setForm({
      ...form,
      codigoManual: codigo,
      descricao: found ? found.descricao : ''
    });
  };

  // Busca automática de código pela descrição
  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descricao = e.target.value;
    const found = (manualCodigos.receitas as ReceitaManual[]).find((r) => r.descricao.toLowerCase() === descricao.toLowerCase());
    setForm({
      ...form,
      descricao,
      codigoManual: found ? found.codigo : ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'codigoManual') {
      handleCodigoChange(e as React.ChangeEvent<HTMLInputElement>);
    } else if (name === 'descricao') {
      handleDescricaoChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/receitas`, {
        ...form,
        valor: Number(form.valor),
        congregacaoId: Number(form.congregacaoId)
      });
      setMensagem('Receita cadastrada com sucesso!');
      setForm({
        congregacaoId: '',
        descricao: '',
        valor: '',
        data: '',
        categoria: '',
        codigoManual: ''
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMensagem(error.response?.data?.error || 'Erro ao cadastrar receita.');
      } else {
        setMensagem('Erro ao cadastrar receita.');
      }
    }
    setLoading(false);
  };

  // Função para escolha do tipo de receita
  const handleEscolha = (tipo: 'dizimos' | 'ofertas' | 'outras') => {
    setShowModal(false);
    if (tipo === 'dizimos') navigate('/dizimos');
    if (tipo === 'ofertas') navigate('/ofertas');
    if (tipo === 'outras') navigate('/outras-receitas');
  };

  return (
    <div className="receitas-page">
      {/* Modal de escolha */}
      {showModal && (
        <div className="receitas-modal-bg" onClick={() => setShowModal(false)}>
          <div className="receitas-modal" onClick={e => e.stopPropagation()}>
            <h3>Escolha o tipo de receita</h3>
            <button className="modal-btn" onClick={() => handleEscolha('dizimos')}>Dízimos</button>
            <button className="modal-btn" onClick={() => handleEscolha('ofertas')}>Ofertas</button>
            <button className="modal-btn" onClick={() => handleEscolha('outras')}>Outras Receitas</button>
            <button className="modal-close" onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Formulário só aparece se o modal estiver fechado */}
      {!showModal && (
        <>
          <h2>Cadastrar Receita</h2>
          <form className="receitas-form" onSubmit={handleSubmit}>
            <input
              name="congregacaoId"
              placeholder="ID da Congregação"
              value={form.congregacaoId}
              onChange={handleChange}
              required
            />
            <input
              name="codigoManual"
              placeholder="Código da Receita"
              value={form.codigoManual}
              onChange={handleChange}
              required
            />
            <input
              name="descricao"
              placeholder="Descrição da Receita"
              value={form.descricao}
              onChange={handleChange}
              required
            />
            <input
              name="valor"
              placeholder="Valor"
              type="number"
              min="0"
              step="0.01"
              value={form.valor}
              onChange={handleChange}
              required
            />
            <input
              name="data"
              type="date"
              value={form.data}
              onChange={handleChange}
              required
            />
            <input
              name="categoria"
              placeholder="Categoria"
              value={form.categoria}
              onChange={handleChange}
            />
            <button type="submit" className="app-btn" disabled={loading}>
              {loading ? 'Salvando...' : 'Cadastrar'}
            </button>
          </form>
          {mensagem && <div className="receitas-msg">{mensagem}</div>}
        </>
      )}
    </div>
    );
  }