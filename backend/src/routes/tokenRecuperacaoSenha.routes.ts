import { Router } from 'express';
import * as tokenController from '../controllers/tokenRecuperacaoSenha.controller';

const router = Router();

router.post('/', tokenController.create);
router.get('/', tokenController.list);
// router.get('/:id', tokenController.get);
router.put('/:id', tokenController.update);
router.delete('/:id', tokenController.remove);

export default router;