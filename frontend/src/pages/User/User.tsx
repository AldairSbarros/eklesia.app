import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./User.scss";
import { fetchApi } from "../../services/api";
interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  congregacaoId: number;
  ativo: boolean;
}

export default function User() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "",
    congregacaoId: "",
    token: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  // Listar usuários
  useEffect(() => {
    fetchApi("/usuarios")
      .then(setUsuarios)
      .catch(() => setUsuarios([]));
  }, []);

  // Manipulação de formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Criar usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");
    try {
      const data = await fetchApi("/usuarios", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          congregacaoId: Number(form.congregacaoId),
        }),
      });
      setMensagem("Usuário criado com sucesso!");
      setUsuarios([...usuarios, data]);
      setForm({
        nome: "",
        email: "",
        senha: "",
        perfil: "",
        congregacaoId: "",
        token: "",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMensagem(error.message);
      } else {
        setMensagem("Erro ao criar usuário.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="user-page">
      <Header />
      <main className="user-main">
        <h2>Usuários</h2>

        <form className="user-form" onSubmit={handleSubmit}>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <select
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o perfil</option>
            <option value="admin">Admin</option>
            <option value="pastorDirigente">Pastor Dirigente</option>
            <option value="tesoureiro">Tesoureiro</option>
            <option value="membro">Membro</option>
          </select>
          <input
            name="congregacaoId"
            placeholder="Congregação ID"
            value={form.congregacaoId}
            onChange={handleChange}
            required
          />
          {(form.perfil === "admin" ||
            form.perfil === "tesoureiro" ||
            form.perfil === "pastorDirigente") && (
            <input
              name="token"
              placeholder="Token de autorização"
              value={form.token}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="app-btn" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {mensagem && <div className="user-msg">{mensagem}</div>}
        <section className="user-list">
          <h3>Lista de Usuários</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Congregação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.nome}</td>
                  <td>{u.email}</td>
                  <td>{u.perfil}</td>
                  <td>{u.congregacaoId}</td>
                  <td>{u.ativo ? "Ativo" : "Inativo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
}
