import { useState } from "react";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import Header from "../../components/Header/Header";

function Home() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [logoHover, setLogoHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginChoice = (tipo: "usuario" | "membro") => {
    setShowModal(false);
    if (tipo === "usuario") navigate("/login");
    if (tipo === "membro") navigate("/login-membro");
  };

  return (
    <div className="landing-bg">
      <Header />
      <nav className="landing-nav">
        <div className="logo"></div>
        <ul>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Funcionalidades
            </a>
          </li>
          <li>
            <a href="#">Contato</a>
          </li>
          <li>
            <Link to="/usuarios" className="nav-link usuarios-destaque">
              Usuários
            </Link>
          </li>

          <li>
            <Link to="/painel" className="nav-link">
              Painel de Controle
            </Link>
          </li>
        </ul>
        <button className="signup-btn" onClick={() => setShowModal(true)}>
          Entrar
        </button>
      </nav>
      <main className="landing-main">
        <h1>Conecte. Gerencie. Cresça.</h1>
        <p>
          Conecte sua congregação à inovação. Acesse a Bíblia completa,
          mensagens de célula semanais e uma plataforma moderna para engajar
          membros e líderes da Área 179.
        </p>
        <div className="landing-cards">
          <div
            className={`landing-card${
              hovered === 0
                ? " hovered"
                : hovered !== null
                ? " not-hovered"
                : ""
            }`}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="card-title">Bíblia</span>
            <p>Acesse a Bíblia completa para leitura e estudo.</p>
            <button onClick={() => navigate("/biblia")} className="app-btn">
              Ler agora
            </button>
          </div>
          <div
            className={`landing-card central${
              hovered === 1
                ? " hovered"
                : hovered !== null
                ? " not-hovered"
                : ""
            }`}
            onMouseEnter={() => {
              setHovered(1);
              setLogoHover(true);
            }}
            onMouseLeave={() => {
              setHovered(null);
              setLogoHover(false);
            }}
          >
            <span className="card-title">Área 179</span>
            <div className="area-logo">
              <img
                src={logoHover ? logo1 : logo}
                alt="Logo Área 179"
                className="area-logo-img"
              />
            </div>
            <Link to="/cadastro-membro" className="app-btn">
              Cadastre-se
            </Link>
          </div>
          <div
            className={`landing-card${
              hovered === 2
                ? " hovered"
                : hovered !== null
                ? " not-hovered"
                : ""
            }`}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="card-title">Mensagem da Célula</span>
            <p>Veja a mensagem da célula da semana.</p>
            <button
              className="app-btn"
              onClick={() => navigate("/mensagem-celula")}
            >
              Abrir
            </button>
          </div>
        </div>
      </main>

      {/* Modal de escolha */}
      {showModal && (
        <div className="login-modal-bg" onClick={() => setShowModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Como deseja entrar?</h3>
            <button
              className="modal-btn"
              onClick={() => handleLoginChoice("usuario")}
            >
              Entrar como Usuário
            </button>
            <button
              className="modal-btn"
              onClick={() => handleLoginChoice("membro")}
            >
              Entrar como Membro
            </button>
            <button
              className="modal-btn"
              onClick={() => {
                setShowModal(false);
                navigate("/login-dev");
              }}
            >
              Entrar como Desenvolvedor
            </button>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
