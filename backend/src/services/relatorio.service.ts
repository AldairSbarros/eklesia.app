import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DizimoGroup = {
  memberId: number;
  _sum: { value: number | null };
};

type Member = {
  id: number;
  name: string;
};

type Oferta = {
  id: number;
  memberId: number;
  congregacaoId: number;
  type: string;
  value: number;
  date: Date;
  service: string | null;
  receiptPhoto?: string | null;
};

type RelatorioMensalData = {
  listaDizimistas: { memberId: number; nome: string; valor: number }[];
  ofertas: Oferta[];
  ofertasPorCulto: Record<string, Oferta[]>;
  somaPorCulto: Record<string, number>;
  totalDizimos: number;
  totalOfertas: number;
  totalArrecadado: number;
  comissao: number;
  paraCentral: number;
};

export async function getRelatorioMensalData(
  congregacaoId: string | number,
  mes: string | number,
  ano: string | number
): Promise<RelatorioMensalData> {
  const inicio = new Date(Number(ano), Number(mes) - 1, 1);
  const fim = new Date(Number(ano), Number(mes), 0, 23, 59, 59);

  // Dízimos por membro
  const dizimos = await prisma.offering.groupBy({
    by: ['memberId'],
    where: {
      congregacaoId: Number(congregacaoId),
      type: 'dizimo',
      date: { gte: inicio, lte: fim }
    },
    _sum: { value: true }
  });

  // Buscar nomes dos membros
  const memberIds = dizimos.map(d => d.memberId).filter(Boolean);
  const rawMembers = await prisma.member.findMany({
    where: { id: { in: memberIds } }
  });
  const members: Member[] = rawMembers.map(m => ({
    id: m.id,
    name: m.nome
  }));

  // Ofertas detalhadas
  const ofertas: Oferta[] = await prisma.offering.findMany({
    where: {
      congregacaoId: Number(congregacaoId),
      type: 'oferta',
      date: { gte: inicio, lte: fim }
    }
  });

  // Agrupar ofertas por culto
  const ofertasPorCulto: Record<string, Oferta[]> = {};
  ofertas.forEach(oferta => {
    const cultoKey = oferta.service ?? 'Sem Culto';
    if (!ofertasPorCulto[cultoKey]) {
      ofertasPorCulto[cultoKey] = [];
    }
    ofertasPorCulto[cultoKey].push(oferta);
  });

  // Soma das ofertas por culto
  const somaPorCulto: Record<string, number> = {};
  Object.keys(ofertasPorCulto).forEach(culto => {
    somaPorCulto[culto] = ofertasPorCulto[culto].reduce((acc, o) => acc + o.value, 0);
  });

  // Totais
  const totalDizimos = dizimos.reduce((acc, d) => acc + (d._sum.value || 0), 0);
  const totalOfertas = ofertas.reduce((acc, o) => acc + o.value, 0);
  const totalArrecadado = totalDizimos + totalOfertas;
  const comissao = totalArrecadado * 0.33;
  const paraCentral = totalArrecadado * 0.67;

  // Montar lista de dizimistas
  const listaDizimistas = dizimos.map(d => {
    const membro = members.find(m => m.id === d.memberId);
    return {
      memberId: d.memberId,
      nome: membro ? membro.name : 'Desconhecido',
      valor: d._sum.value || 0
    };
  });

  return {
    listaDizimistas,
    ofertas,
    ofertasPorCulto,
    somaPorCulto,
    totalDizimos,
    totalOfertas,
    totalArrecadado,
    comissao,
    paraCentral
  };
}