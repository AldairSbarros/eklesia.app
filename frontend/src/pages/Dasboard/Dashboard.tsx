import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import "./Dashboard.scss";

const COLORS = ["#48dbfb", "#ff7675", "#00b894", "#fdcb6e", "#636e72"];

interface AnualData {
  mes: string;
  totalDizimos: number;
  totalOfertas: number;
  totalDespesas?: number;
}

interface UsuarioData {
  mes: string;
  novos: number;
}

interface MembroData {
  mes: string;
  novos: number;
}

interface DespesaCategoriaData {
  categoria: string;
  valor: number;
}

interface DashboardData {
  anual: AnualData[];
  usuarios: UsuarioData[];
  membros: MembroData[];
  despesasCat: DespesaCategoriaData[];
}

export default function Dashboard() {
  const [dados, setDados] = useState<DashboardData>({
    anual: [],
    usuarios: [],
    membros: [],
    despesasCat: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Exemplo: adapte os endpoints conforme seu backend
    Promise.all([
      axios.get(`${API_URL}/relatorios/anual?congregacaoId=1&ano=2025`),
      axios.get(`${API_URL}/relatorios/usuarios-por-mes?ano=2025`),
      axios.get(`${API_URL}/relatorios/membros-por-mes?ano=2025`),
      axios.get(`${API_URL}/relatorios/despesas-por-categoria?congregacaoId=1&ano=2025`)
    ]).then(([anual, usuarios, membros, despesasCat]) => {
      setDados({
        anual: anual.data.dadosMensais,
        usuarios: usuarios.data,
        membros: membros.data,
        despesasCat: despesasCat.data
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="dashboard-page">
      <h2>Dashboard Geral</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span>Total Receitas</span>
          <strong>
            R$ {dados.anual.reduce((acc: number, m: AnualData) => acc + m.totalDizimos + m.totalOfertas, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </strong>
        </div>
        <div className="dashboard-card">
          <span>Total Despesas</span>
          <strong>
            R$ {dados.anual.reduce((acc: number, m: AnualData) => acc + (m.totalDespesas || 0), 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </strong>
        </div>
        <div className="dashboard-card">
          <span>Novos Membros</span>
          <strong>{dados.membros.reduce((acc: number, m: MembroData) => acc + m.novos, 0)}</strong>
        </div>
        <div className="dashboard-card">
          <span>Novos Usuários</span>
          <strong>{dados.usuarios.reduce((acc: number, u: UsuarioData) => acc + u.novos, 0)}</strong>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="dashboard-chart">
          <h4>Receitas x Despesas (Mensal)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dados.anual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalDizimos" stroke="#48dbfb" name="Dízimos" />
              <Line type="monotone" dataKey="totalOfertas" stroke="#00b894" name="Ofertas" />
              <Line type="monotone" dataKey="totalDespesas" stroke="#ff7675" name="Despesas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-chart">
          <h4>Novos Membros por Mês</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dados.membros}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="novos" fill="#48dbfb" name="Novos Membros" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-chart">
          <h4>Novos Usuários por Mês</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dados.usuarios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="novos" fill="#fdcb6e" name="Novos Usuários" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-chart">
          <h4>Despesas por Categoria</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dados.despesasCat}
                dataKey="valor"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dados.despesasCat.map((_: DespesaCategoriaData, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}