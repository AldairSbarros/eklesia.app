import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import { API_URL } from '../../../services/api';
import './Dizimos.scss';

interface Dizimo {
  id: number;
  memberId: number;
  congregacaoId: number;
  value: number;
  date: string;
  service: string;
  receiptPhoto?: string;
  numeroRecibo?: string;
  Member?: { nome: string };
}

export default function Dizimos() {
  const [dizimos, setDizimos] = useState<Dizimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    congregacaoNome: '',
    memberNome: '',
    value: '',
    date: '',
    service: '',
    numeroRecibo: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    axios.get(`${API_URL}/offerings?type=dizimo`)
      .then(res => setDizimos(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    let receiptPhoto = '';
    try {
      // 1. Upload do arquivo, se houver
      if (file) {
        const formData = new FormData();
        formData.append('receiptPhoto', file);
        formData.append('congregacaoId', form.congregacaoNome);
        // Você pode adicionar ano/mes se quiser organizar por pasta
        const uploadRes = await axios.post(`${API_URL}/offerings/upload-receipt`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        receiptPhoto = uploadRes.data.filePath;
      }

      // 2. Cadastrar o dízimo
      await axios.post(`${API_URL}/offerings`, {
        ...form,
        value: Number(form.value),
        type: 'dizimo',
        receiptPhoto
      });
      setMensagem('Dízimo cadastrado com sucesso!');
      setForm({
        congregacaoNome: '',
        memberNome: '',
        value: '',
        date: '',
        service: '',
        numeroRecibo: ''
      });
      setFile(null);
      // Atualiza a lista
      axios.get(`${API_URL}/offerings?type=dizimo`)
        .then(res => setDizimos(res.data));
    } catch {
      setMensagem('Erro ao cadastrar dízimo.');
    }
  };

  return (
    <div className="dizimos-page">
      <h2>Dízimos</h2>
      <form className="dizimos-form" onSubmit={handleSubmit}>
        <input name="congregacaoNome" placeholder="Congregação" value={form.congregacaoNome} onChange={handleChange} required />
        <input name="memberNome" placeholder="Nome do Membro" value={form.memberNome} onChange={handleChange} required />
        <input name="value" placeholder="Valor" type="number" min="0" step="0.01" value={form.value} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="service" placeholder="Culto" value={form.service} onChange={handleChange} />
        <input name="numeroRecibo" placeholder="Nº Recibo" value={form.numeroRecibo} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Cadastrar Dízimo</button>
      </form>
      {mensagem && <div className="dizimos-msg">{mensagem}</div>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Membro</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Culto</th>
              <th>Nº Recibo</th>
              <th>Comprovante</th>
            </tr>
          </thead>
          <tbody>
            {dizimos.map(d => (
              <tr key={d.id}>
                <td>{d.Member?.nome || d.memberId}</td>
                <td>R$ {d.value.toFixed(2)}</td>
                <td>{new Date(d.date).toLocaleDateString()}</td>
                <td>{d.service}</td>
                <td>{d.numeroRecibo || '-'}</td>
                <td>
                  {d.receiptPhoto ? (
                    <a href={d.receiptPhoto} target="_blank" rel="noopener noreferrer">Ver</a>
                  ) : '-'}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    );
}
