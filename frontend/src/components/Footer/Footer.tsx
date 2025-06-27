import './Footer.scss';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} IEADAM Área 179. Prs. Aldair Barros e Nicéia Barros. aldairbarros@outlook.com. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

export default Footer;