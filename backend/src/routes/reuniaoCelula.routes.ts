import { Router, Request, Response } from 'express';
import * as reuniaoController from '../controllers/reuniaoCelula.controller';

const router = Router();

router.post('/', reuniaoController.create);
router.get('/', reuniaoController.list);
router.get('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.get(req, res)).catch(next);
});
router.put('/:id', reuniaoController.update);
router.delete('/:id', reuniaoController.remove);

export default router;