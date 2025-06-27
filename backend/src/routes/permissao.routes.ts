import { Router } from 'express';
import * as permissaoController from '../controllers/permissao.controller';

const router = Router();

router.post('/', permissaoController.create);
router.get('/', permissaoController.list);
router.get('/:id', (req, res, next) => {
	permissaoController.get(req, res).catch(next);
});
router.put('/:id', permissaoController.update);
router.delete('/:id', permissaoController.remove);

export default router;