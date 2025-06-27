import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import logo1 from '../../assets/logo1.png';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Esconde o botão de voltar na home
  const isHome = location.pathname === "/";

   return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-nav-btns">
          {!isHome && (
            <>
              <button className="header-btn" onClick={() => navigate(-1)} title="Voltar">
                <FaArrowLeft />
              </button>
              <button className="header-btn" onClick={() => navigate("/")} title="Home">
                <FaHome />
              </button>
            </>
          )}
        </div>
        <img src={logo1} alt="Logo Tesouraria" className="header-logo-img" />
        <span className="header-logo-text">Área 179</span>
      </div>
    </header>
  );
}

export default Header;