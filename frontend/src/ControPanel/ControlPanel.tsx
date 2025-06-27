import { useNavigate } from "react-router-dom";
import { FaUsers, FaChurch, FaUserFriends, FaMoneyBillWave, FaChartPie, FaPiggyBank, FaFileAlt, FaEnvelopeOpenText, FaChartLine } from "react-icons/fa";
import "./ControlPanel.scss";
import Sidebar from "./Sidebar";
import Header from "../components/Header/Header"; // ajuste o caminho se necessário
import Footer from "../components/Footer/Footer"; // ajuste o caminho se necessário

const menus = [
  { label: "Dashboard", icon: <FaChartLine size={40} />, path: "/dashboard" },
  { label: "Congregações", icon: <FaChurch size={40} />, path: "/congregacoes" },
  { label: "Usuários", icon: <FaUsers size={40} />, path: "/usuarios" },
  { label: "Membros", icon: <FaUserFriends size={40} />, path: "/membros" },
  { label: "Receitas", icon: <FaMoneyBillWave size={40} />, path: "/receitas" },
  { label: "Despesas", icon: <FaChartPie size={40} />, path: "/despesas" },
  { label: "Investimentos", icon: <FaPiggyBank size={40} />, path: "/investimentos" },
  { label: "Relatórios", icon: <FaFileAlt size={40} />, path: "/relatorios" },
  { label: "Mensagens Célula", icon: <FaEnvelopeOpenText size={40} />, path: "/mensagem-celula" },
];

export default function ControlPanel() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="control-panel-layout">
        <Sidebar />
        <main className="control-panel-content">
          <h2>Painel de Controle</h2>
          <div className="panel-grid">
            {menus.map((menu) => (
              <div
                key={menu.label}
                className="panel-card"
                onClick={() => navigate(menu.path)}
                tabIndex={0}
                role="button"
                onKeyPress={e => (e.key === "Enter" || e.key === " ") && navigate(menu.path)}
              >
                <div className="panel-icon">{menu.icon}</div>
                <span className="panel-label">{menu.label}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
        <Footer />
    </>
  );
}