import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Member from './pages/Member/Member';
import Login from './pages/User/Login';
import BibleLanding from './pages/BibleLanding/BibleLanding';
import MensagemCelula from './pages/MensagemCelula/MensagemCelula';
import LoginMembro from './pages/Member/LoginMembro';
import User from './pages/User/User';
import ControlPanel from './ControPanel/ControlPanel'; // Import do painel de controle
import Congregacao from './pages/Congregacao/Congregacao';
import Receitas from './pages/Receitas/Receitas';
import Dizimos from './pages/Receitas/Dizimos/Dizimos';
import Ofertas from './pages/Receitas/Ofertas/Ofertas';
import OutrasReceitas from './pages/Receitas/OutrasReceitas/OutrasReceitas';
import Despesas from './pages/Despesas/Despesas';
import Investimentos from './pages/Investimentos/Investimentos';
import QuickActions from './pages/QuickActions/QuickActions';
import Dashboard from './pages/Dasboard/Dashboard';
import Relatorios from './pages/Relatorios/Relatorios';
import Sobre from "./pages/Sobre/Sobre";
// ...

function App() {
  // Defina o valor de usuario conforme necessário, por exemplo:
  const usuario = { perfil: 'admin'} // ou um objeto de usuário real

  return (
    <Router>
      <Routes>
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-membro" element={<LoginMembro />} />
        <Route path="/cadastro-membro" element={<Member />} />
        <Route path="/biblia" element={<BibleLanding />} />
        <Route path="/mensagem-celula" element={<MensagemCelula />} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/painel" element={<ControlPanel />} /> {/* Painel de Controle */}
        <Route path="/congregacoes" element={<Congregacao />} />
        <Route path="/membros" element={<Member />} />
        <Route path="/dizimos" element={<Dizimos />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/outras-receitas" element={<OutrasReceitas />} />
        <Route path="/despesas" element={<Despesas />} />
         <Route path="/investimentos" element={<Investimentos />} />
         <Route path="/acoes-rapidas" element={<QuickActions usuario={usuario} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relatorios" element={<Relatorios />} />
        {/* Outras rotas futuras */}
      </Routes>
    </Router>
  );
}

export default App;