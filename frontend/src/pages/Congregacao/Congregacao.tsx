import { useEffect, useState } from "react";
import { fetchApi } from "../../services/api";

interface Congregacao {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
}

export default function Congregacao() {
  const [congregacao, setCongregacao] = useState<Congregacao[]>([]);
  const [form, setForm] = useState({ nome: "", endereco: "", telefone: "" });
  const [editId, setEditId] = useState<number | null>(null);

  // ...existing code...
useEffect(() => {
  fetchApi("/congregacoes").then(setCongregacao);
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (editId) {
    await fetchApi(`/congregacoes/${editId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  } else {
    await fetchApi("/congregacoes", {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  fetchApi("/congregacoes").then(setCongregacao);
};

const handleEdit = (c: Congregacao) => {
  setForm({ nome: c.nome, endereco: c.endereco, telefone: c.telefone });
  setEditId(c.id);
};

const handleDelete = async (id: number) => {
  await fetchApi(`/congregacoes/${id}`, { method: "DELETE" });
  fetchApi("/congregacoes").then(setCongregacao);
};
// ...existing code...

  return (
    <div>
      <h2>Congregações</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
        <button type="submit">{editId ? "Salvar" : "Cadastrar"}</button>
        {editId && <button onClick={() => { setEditId(null); setForm({ nome: "", endereco: "", telefone: "" }); }}>Cancelar</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {congregacao.map((c: Congregacao) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.endereco}</td>
              <td>{c.telefone}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}