import { Router } from 'express';
import * as visitanteController from '../controllers/visitanteCelula.controller';

const router = Router();

router.post('/', visitanteController.create);
router.get('/', visitanteController.list);
router.get('/:id', async (req, res, next) => {
  try {
	await visitanteController.get(req, res);
  } catch (err) {
	next(err);
  }
});
router.put('/:id', visitanteController.update);
router.delete('/:id', visitanteController.remove);

export default router;