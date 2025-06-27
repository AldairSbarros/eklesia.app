import { Router } from 'express';
import * as encontroController from '../controllers/encontro.controller';

const router = Router();

router.post('/', encontroController.create);
router.get('/', encontroController.list);
router.get('/:id', (req, res, next) => {
  encontroController.get(req, res).catch(next);
});
router.put('/:id', encontroController.update);
router.delete('/:id', encontroController.remove); 

export default router;