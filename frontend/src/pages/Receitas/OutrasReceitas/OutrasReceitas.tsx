import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../services/api';

interface Receita {
  id: number;
  congregacaoId: number;
  descricao: string;
  valor: number;
  data: string;
  categoria?: string;
  codigoManual?: string;
}

export default function OutrasReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
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
    axios.get(`${API_URL}/receitas`)
      .then(res => setReceitas(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
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
      // Atualiza a lista
      axios.get(`${API_URL}/receitas`)
        .then(res => setReceitas(res.data));
    } catch (error: any) {
      setMensagem('Erro ao cadastrar receita.');
    }
  };

  return (
    <div className="dizimos-page">
      <h2>Outras Receitas</h2>
      <form className="dizimos-form" onSubmit={handleSubmit}>
        <input name="congregacaoId" placeholder="ID da Congregação" value={form.congregacaoId} onChange={handleChange} required />
        <input name="codigoManual" placeholder="Código da Receita" value={form.codigoManual} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
        <input name="valor" placeholder="Valor" type="number" min="0" step="0.01" value={form.valor} onChange={handleChange} required />
        <input name="data" type="date" value={form.data} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
        <button type="submit">Cadastrar Receita</button>
      </form>
      {mensagem && <div className="dizimos-msg">{mensagem}</div>}
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
            {receitas.map(r => (
              <tr key={r.id}>
                <td>{r.congregacaoId}</td>
                <td>{r.descricao}</td>
                <td>R$ {r.valor.toFixed(2)}</td>
                <td>{new Date(r.data).toLocaleDateString()}</td>
                <td>{r.categoria || '-'}</td>
                <td>{r.codigoManual || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}