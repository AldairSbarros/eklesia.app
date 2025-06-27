import { Router, Request, Response } from 'express';
import notificacaoController from '../controllers/notificacao.controller';
const router = Router();

router.post('/', notificacaoController.create);
router.get('/', notificacaoController.list);
router.get('/:id', notificacaoController.get);
router.put('/:id', notificacaoController.update);
router.delete('/:id', notificacaoController.remove);

export default router;