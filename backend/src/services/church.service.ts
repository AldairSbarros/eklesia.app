import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import bcrypt from "bcrypt";
import { logAuditoria } from "../utils/logger";

const prisma = new PrismaClient();

// Função utilitária para criar banco e rodar migrations
function criarBanco(nomeBanco: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const usuario = process.env.PGUSER || "postgres";
    const senha = process.env.PGPASSWORD || "suaSenha";
    exec(`PGPASSWORD=${senha} createdb -U ${usuario} ${nomeBanco}`, (err) => {
      if (err) {
        if (err.message.includes("already exists")) {
          return reject(new Error("Banco de dados já existe."));
        }
        return reject(err);
      }
      exec(
        `npx prisma migrate deploy --schema=prisma/schema.prisma`,
        (err2) => {
          if (err2) return reject(err2);
          resolve();
        }
      );
    });
  });
}

// Função utilitária para validar campos obrigatórios
function validarCamposObrigatorios(data: { nome?: string; email?: string }) {
  const erros: string[] = [];
  if (!data.nome || data.nome.trim() === "") erros.push("Nome é obrigatório.");
  if (!data.email || data.email.trim() === "")
    erros.push("E-mail é obrigatório.");
  return erros;
}

// Criação de igreja com tratamento detalhado de erros e log
export const createChurch = async (data: any) => {
  const erros = validarCamposObrigatorios(data);
  if (erros.length > 0) {
    throw new Error(erros.join(" "));
  }
  if (data.password && data.password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
  const senhaParaSalvar = await bcrypt.hash(
    data.password || "defaultPassword",
    10
  );
  const nomeBanco = `igreja_${Date.now()}`;
  try {
    await criarBanco(nomeBanco);
  } catch (error: any) {
    if (error.message === "Banco de dados já existe.") {
      throw new Error("Já existe um banco de dados com esse nome.");
    }
    throw new Error("Erro ao criar banco: " + error.message);
  }

  try {
    const novaIgreja = await prisma.church.create({
      data: {
        nome: data.nome,
        email: data.email,
        password: senhaParaSalvar,
        schema: nomeBanco,
        status: data.status || "ativa",
      },
    });
    logAuditoria("Cadastro de igreja", { nome: data.nome, email: data.email });
    return novaIgreja;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("E-mail já cadastrado.");
    }
    throw new Error("Erro ao cadastrar igreja: " + error.message);
  }
};

export const listChurches = async () => {
  try {
    return await prisma.church.findMany();
  } catch (error: any) {
    throw new Error("Erro ao listar igrejas: " + error.message);
  }
};

export const getChurch = async (id: number) => {
  try {
    const igreja = await prisma.church.findUnique({ where: { id } });
    if (!igreja) {
      throw new Error("Igreja não encontrada.");
    }
    return igreja;
  } catch (error: any) {
    throw new Error("Erro ao buscar igreja: " + error.message);
  }
};

export const updateChurch = async (id: number, data: any) => {
  const erros = validarCamposObrigatorios(data);
  if (erros.length > 0) {
    throw new Error(erros.join(" "));
  }
  // Se for enviada uma nova senha, valida e faz hash
  let dadosParaAtualizar = { ...data };
  if (data.password) {
    if (data.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    dadosParaAtualizar.password = await bcrypt.hash(data.password, 10);
  }

  try {
    const igreja = await prisma.church.update({
      where: { id },
      data: dadosParaAtualizar,
    });
    logAuditoria("Atualização de igreja", {
      id,
      camposAtualizados: Object.keys(dadosParaAtualizar),
    });
    return igreja;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Igreja não encontrada para atualização.");
    }
    if (error.code === "P2002") {
      throw new Error("E-mail já cadastrado.");
    }
    throw new Error("Erro ao atualizar igreja: " + error.message);
  }
};

export const deleteChurch = async (id: number) => {
  try {
    await prisma.church.delete({
      where: { id },
    });
    logAuditoria("Remoção de igreja", { id });
    return;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Igreja não encontrada para remoção.");
    }
    throw new Error("Erro ao remover igreja: " + error.message);
  }
};