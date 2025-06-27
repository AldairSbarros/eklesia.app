import { Router } from 'express';
import * as vendaController from '../controllers/venda.controller';

const router = Router();

router.post('/', vendaController.create);
router.get('/', vendaController.list);
router.get('/:id', vendaController.get as any);
router.put('/:id', vendaController.update);
router.delete('/:id', vendaController.remove);

export default router;





export type Fatura = {
  id: number;
  valor: number;
  descricao: string;
};

let faturas: Fatura[] = [];
let nextId = 1;

export async function createFatura(data: { valor: number; descricao: string }): Promise<Fatura> {
  const fatura = { id: nextId++, valor: data.valor, descricao: data.descricao };
  faturas.push(fatura);
  return fatura;
}

export async function listFaturas(): Promise<Fatura[]> {
  return faturas;
}

export function __resetFaturas() {
  faturas = [];
  nextId = 1;
}

export function getFatura(arg0: number) {
  throw new Error('Function not implemented.');
}
export function updateFatura(arg0: number, body: any) {
  throw new Error('Function not implemented.');
}

export function deleteFatura(arg0: number) {
  throw new Error('Function not implemented.');
}

