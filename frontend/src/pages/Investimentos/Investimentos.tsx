import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/api';
import './Investimentos.scss';

interface Investimento {
  id: number;
  congregacaoId: number;
  descricao: string;
  valor: number;
  data: string;
  categoria?: string;
  codigoManual?: string;
}

export default function Investimentos() {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    congregacaoId: '',
    descricao: '',
    valor: '',
    data: '',
    categoria: '',
    codigoManual: ''
  });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/investimentos`)
      .then(res => setInvestimentos(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    try {
      await axios.post(`${API_URL}/investimentos`, {
        ...form,
        valor: Number(form.valor),
        congregacaoId: Number(form.congregacaoId)
      });
      setMensagem('Investimento cadastrado com sucesso!');
      setForm({
        congregacaoId: '',
        descricao: '',
        valor: '',
        data: '',
        categoria: '',
        codigoManual: ''
      });
      // Atualiza a lista
      axios.get(`${API_URL}/investimentos`)
        .then(res => setInvestimentos(res.data));
    } catch {
      setMensagem('Erro ao cadastrar investimento.');
    }
  };

  return (
    <div className="investimentos-page">
      <h2>Investimentos</h2>
      <form className="investimentos-form" onSubmit={handleSubmit}>
        <input name="congregacaoId" placeholder="ID da Congregação" value={form.congregacaoId} onChange={handleChange} required />
        <input name="codigoManual" placeholder="Código do Investimento" value={form.codigoManual} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
        <input name="valor" placeholder="Valor" type="number" min="0" step="0.01" value={form.valor} onChange={handleChange} required />
        <input name="data" type="date" value={form.data} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
        <button type="submit">Cadastrar Investimento</button>
      </form>
      {mensagem && <div className="investimentos-msg">{mensagem}</div>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {investimentos.map(inv => (
              <tr key={inv.id}>
                <td>{inv.congregacaoId}</td>
                <td>{inv.descricao}</td>
                <td>R$ {inv.valor.toFixed(2)}</td>
                <td>{new Date(inv.data).toLocaleDateString()}</td>
                <td>{inv.categoria || '-'}</td>
                <td>{inv.codigoManual || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}