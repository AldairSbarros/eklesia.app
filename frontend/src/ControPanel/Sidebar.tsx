import { useNavigate } from "react-router-dom";
import { FaUsers, FaChurch, FaUserFriends, FaMoneyBillWave, FaChartPie, FaPiggyBank, FaFileAlt, FaEnvelopeOpenText } from "react-icons/fa";
import "./Sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <nav className="sidebar">
      <h2>Painel</h2>
      <ul>
        <li onClick={() => navigate("/congregacoes")}>
          <FaChurch style={{ marginRight: 8 }} /> Congregações
        </li>
        <li onClick={() => navigate("/usuarios")}>
          <FaUsers style={{ marginRight: 8 }} /> Usuários
        </li>
        <li onClick={() => navigate("/membros")}>
          <FaUserFriends style={{ marginRight: 8 }} /> Membros
        </li>
        <li onClick={() => navigate("/receitas")}>
          <FaMoneyBillWave style={{ marginRight: 8 }} /> Receitas
        </li>
        <li onClick={() => navigate("/despesas")}>
          <FaChartPie style={{ marginRight: 8 }} /> Despesas
        </li>
        <li onClick={() => navigate("/investimentos")}>
          <FaPiggyBank style={{ marginRight: 8 }} /> Investimentos
        </li>
        <li onClick={() => navigate("/relatorios")}>
          <FaFileAlt style={{ marginRight: 8 }} /> Relatórios
        </li>
        <li onClick={() => navigate("/mensagem-celula")}>
          <FaEnvelopeOpenText style={{ marginRight: 8 }} /> Mensagens Célula
        </li>
      </ul>
      </nav>
    );
  }