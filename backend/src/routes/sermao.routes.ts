import { Router, Request, Response, NextFunction } from 'express';
import * as sermaoController from '../controllers/sermao.controller';

const router = Router();

router.post('/', sermaoController.create);
router.get('/', sermaoController.list);
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.get(req, res)).catch(next);
});
router.put('/:id', sermaoController.update);
router.delete('/:id', sermaoController.remove);

export default router;