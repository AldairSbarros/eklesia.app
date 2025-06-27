import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/api';
import manualCodigos from '../../utils/manualCodigos.json';
import './Despesas.scss';

type DespesaManual = {
  codigo: string;
  descricao: string;
};

export default function Despesas() {
  const [form, setForm] = useState({
    congregacaoId: '',
    descricao: '',
    valor: '',
    data: '',
    categoria: '',
    codigoManual: '',
    notaFiscalFoto: undefined as File | undefined
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Busca automática de descrição pelo código
  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const codigo = e.target.value;
    const found = (manualCodigos.despesas as DespesaManual[]).find((d) => d.codigo === codigo);
    setForm({
      ...form,
      codigoManual: codigo,
      descricao: found ? found.descricao : ''
    });
  };

  // Busca automática de código pela descrição
  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descricao = e.target.value;
    const found = (manualCodigos.despesas as DespesaManual[]).find((d) => d.descricao.toLowerCase() === descricao.toLowerCase());
    setForm({
      ...form,
      descricao,
      codigoManual: found ? found.codigo : ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'codigoManual') {
      handleCodigoChange(e as React.ChangeEvent<HTMLInputElement>);
    } else if (name === 'descricao') {
      handleDescricaoChange(e as React.ChangeEvent<HTMLInputElement>);
    } else if (name === 'notaFiscalFoto' && files) {
      setForm({ ...form, notaFiscalFoto: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('congregacaoId', form.congregacaoId);
      formData.append('descricao', form.descricao);
      formData.append('valor', form.valor);
      formData.append('data', form.data);
      formData.append('categoria', form.categoria);
      formData.append('codigoManual', form.codigoManual);
      if (form.notaFiscalFoto) {
        formData.append('notaFiscalFoto', form.notaFiscalFoto);
      }

      await axios.post(`${API_URL}/despesas`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMensagem('Despesa cadastrada com sucesso!');
      setForm({
        congregacaoId: '',
        descricao: '',
        valor: '',
        data: '',
        categoria: '',
        codigoManual: '',
        notaFiscalFoto: undefined
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setMensagem(error.response.data.error);
      } else {
        setMensagem('Erro ao cadastrar despesa.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="despesas-page">
      <h2>Cadastrar Despesa</h2>
      <form className="despesas-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="congregacaoId"
          placeholder="ID da Congregação"
          value={form.congregacaoId}
          onChange={handleChange}
          required
        />
        <input
          name="codigoManual"
          placeholder="Código da Despesa"
          value={form.codigoManual}
          onChange={handleChange}
          required
        />
        <input
          name="descricao"
          placeholder="Descrição da Despesa"
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
        <label className="file-label">
          <span>Nota Fiscal (opcional):</span>
          <input
            name="notaFiscalFoto"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="app-btn" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
      {mensagem && <div className="despesas-msg">{mensagem}</div>}
    </div>
  );
    throw new Error('Function not implemented.');
}

