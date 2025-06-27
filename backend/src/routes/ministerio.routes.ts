import { Router, Request, Response } from 'express';
import * as ministerioController from '../controllers/ministerio.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => ministerioController.create(req, res));
router.get('/', (req: Request, res: Response) => ministerioController.list(req, res));
router.get('/:id', async (req: Request, res: Response) => {
	try {
		await ministerioController.get(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.put('/:id', (req: Request, res: Response) => ministerioController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => ministerioController.remove(req, res));

export default router;