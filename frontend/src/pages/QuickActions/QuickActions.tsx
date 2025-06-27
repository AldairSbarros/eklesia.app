import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Usuario {
  perfil: string;
  // adicione outras propriedades conforme necessário
}

interface QuickActionsProps {
  usuario: Usuario;
}

function QuickActions({ usuario }: QuickActionsProps) {
  const [showTesoureiroModal, setShowTesoureiroModal] = useState(false);
  const [showReceitaModal, setShowReceitaModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && (usuario.perfil === 'tesoureiro' || usuario.perfil === 'admin')) {
      setShowTesoureiroModal(true);
    }
  }, [usuario]);

  return (
    <div>
      {/* Modal para escolher Receita ou Despesa */}
      {showTesoureiroModal && (
        <div className="modal-bg">
          <div className="modal">
            <h3>O que deseja lançar?</h3>
            <button onClick={() => { setShowTesoureiroModal(false); setShowReceitaModal(true); }}>Receita</button>
            <button onClick={() => { setShowTesoureiroModal(false); navigate('/despesas'); }}>Despesa</button>
          </div>
        </div>
      )}

      {/* Modal para escolher tipo de Receita */}
      {showReceitaModal && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Qual tipo de receita?</h3>
            <button onClick={() => { setShowReceitaModal(false); navigate('/dizimos'); }}>Dízimo</button>
            <button onClick={() => { setShowReceitaModal(false); navigate('/ofertas'); }}>Oferta</button>
            <button onClick={() => { setShowReceitaModal(false); navigate('/receitas'); }}>Outras Receitas</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;