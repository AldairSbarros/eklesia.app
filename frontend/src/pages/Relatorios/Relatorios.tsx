import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Relatorios.scss";

interface Dizimista {
  memberId: number;
  nome: string;
  valor: number;
}

interface Oferta {
  id: number;
  memberId: number;
  congregacaoId: number;
  type: string;
  value: number;
  date: string;
  service: string | null;
}

interface Relatorio {
  dizimistas: Dizimista[];
  ofertasDetalhadas: Oferta[];
  totalDizimos: number;
  totalOfertas: number;
  totalArrecadado: number;
  comissao33: number;
  paraCentral67: number;
}

export default function Relatorios() {
  const [mes, setMes] = useState<string>("");
  const [ano, setAno] = useState<string>("");
  const [congregacaoId, setCongregacaoId] = useState<string>("");
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscarRelatorio = async () => {
    setLoading(true);
    setErro(null);
    setRelatorio(null);
    try {
      const res = await axios.get(
        `/api/relatorios/mensal?congregacaoId=${congregacaoId}&mes=${mes}&ano=${ano}`
      );
      setRelatorio(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErro(err.response?.data?.error || "Erro ao buscar relatório");
      } else {
        setErro("Erro ao buscar relatório");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relatorios-page">
      <Header />
      <main>
        <h2>Relatório Mensal</h2>
        <div className="relatorio-form">
          <input
            type="text"
            placeholder="Congregação ID"
            value={congregacaoId}
            onChange={e => setCongregacaoId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Mês (1-12)"
            value={mes}
            onChange={e => setMes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Ano"
            value={ano}
            onChange={e => setAno(e.target.value)}
          />
          <button onClick={buscarRelatorio} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {erro && <div className="erro">{erro}</div>}

        {relatorio && (
          <div className="relatorio-resultado">
            <h3>Dizimistas</h3>
            <ul>
              {relatorio.dizimistas.map((d: Dizimista) => (
                <li key={d.memberId}>
                  {d.nome}: <strong>R$ {d.valor.toFixed(2)}</strong>
                </li>
              ))}
            </ul>

            <h3>Ofertas Detalhadas</h3>
            <ul>
              {relatorio.ofertasDetalhadas.map((o: Oferta) => (
                <li key={o.id}>
                  {o.service || "Sem Culto"} - R$ {o.value.toFixed(2)} em{" "}
                  {new Date(o.date).toLocaleDateString()}
                </li>
              ))}
            </ul>

            <h3>Totais</h3>
            <p>Total de Dízimos: <strong>R$ {relatorio.totalDizimos.toFixed(2)}</strong></p>
            <p>Total de Ofertas: <strong>R$ {relatorio.totalOfertas.toFixed(2)}</strong></p>
            <p>Total Arrecadado: <strong>R$ {relatorio.totalArrecadado.toFixed(2)}</strong></p>
            <p>Comissão 33%: <strong>R$ {relatorio.comissao33.toFixed(2)}</strong></p>
            <p>Para Central 67%: <strong>R$ {relatorio.paraCentral67.toFixed(2)}</strong></p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}