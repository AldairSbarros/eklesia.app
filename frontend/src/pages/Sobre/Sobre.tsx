import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Sobre.scss";

export default function Sobre() {
  return (
    <div className="sobre-page">
      <Header />
      <main>
        <h1>Sobre o Área 179</h1>
        <p>
          O Área 179 é uma plataforma inovadora para gestão de congregações, membros e comunicação cristã.
          Nosso objetivo é conectar pessoas, facilitar o acesso à Bíblia, mensagens e recursos para líderes e membros.
        </p>
        <p>
          Desenvolvido por [Seu Nome ou Equipe], o sistema oferece segurança, praticidade e tecnologia para igrejas modernas.
        </p>
        <p>
          Para dúvidas ou sugestões, entre em contato: <a href="mailto:seuemail@dominio.com">seuemail@dominio.com</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}