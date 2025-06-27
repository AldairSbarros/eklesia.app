import { Router, Request, Response } from 'express';
import * as celulaController from '../controllers/celula.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => celulaController.create(req, res));
router.get('/', (req: Request, res: Response) => celulaController.list(req, res));
router.get('/:id', async (req: Request, res: Response) => {
	try {
		await celulaController.get(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.put('/:id', (req: Request, res: Response) => celulaController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => celulaController.remove(req, res));

router.post('/:id/membros', async (req, res) => {
  // Adiciona membro à célula
});
router.delete('/:id/membros/:membroId', async (req, res) => {
  // Remove membro da célula
});
// Adicionar membro à célula
router.post('/:id/membros', celulaController.addMembro);

// Remover membro da célula
router.delete('/:id/membros/:membroId', celulaController.removeMembro);

// Listar membros da célula
router.get('/:id/membros', celulaController.listarMembros);

export default router;