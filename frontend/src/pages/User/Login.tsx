import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { fetchApi } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");
    try {
      await fetchApi("/usuarios/login", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      });
      setMensagem("Login realizado com sucesso!");
      // Salve o token se sua API retornar
      // localStorage.setItem('token', data.token);
      setTimeout(() => navigate("/"), 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMensagem(error.message);
      } else {
        setMensagem("Erro ao fazer login.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Entrar</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="app-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {mensagem && <div className="login-msg">{mensagem}</div>}
      </div>
    </div>
  );
}
