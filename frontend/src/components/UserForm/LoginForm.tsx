import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (user: { perfil: string; congregacao?: string }) => void;
}

const perfis = [
  { value: 'admin', label: 'Administrador' },
  { value: 'pastor', label: 'Pastor' },
  { value: 'tesoureiro', label: 'Tesoureiro' },
  { value: 'membro', label: 'Membro' },
];

function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('');
  const [congregacao, setCongregacao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ perfil, congregacao });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <select
        value={perfil}
        onChange={e => setPerfil(e.target.value)}
        required
      >
        <option value="">Selecione o perfil</option>
        {perfis.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
      {perfil === 'pastor' && (
        <input
          type="text"
          placeholder="Congregação"
          value={congregacao}
          onChange={e => setCongregacao(e.target.value)}
          required
        />
      )}
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;