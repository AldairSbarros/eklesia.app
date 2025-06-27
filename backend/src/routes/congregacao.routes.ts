import { Router } from 'express';
import * as congregacaoController from '../controllers/congregacao.controller';

const router = Router();

router.post('/', congregacaoController.create);
router.get('/', congregacaoController.list);
router.put('/:id', congregacaoController.update);
router.delete('/:id', congregacaoController.remove);

export default router;