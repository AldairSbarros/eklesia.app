import { Router, Request, Response, NextFunction } from 'express';
import * as enderecoMembroController from '../controllers/enderecoMembro.controller';

const router = Router();

router.post('/', enderecoMembroController.create);
router.get('/', enderecoMembroController.list);
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  enderecoMembroController.get(req, res, next);
});
router.put('/:id', enderecoMembroController.update);
router.delete('/:id', enderecoMembroController.remove);

export default router;