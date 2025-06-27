import { Router } from 'express';
import * as usuarioPermissaoController from '../controllers/usuarioPermissao.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';

const router = Router();

router.post('/', autenticarJWT, usuarioPermissaoController.create);
router.get('/', autenticarJWT, usuarioPermissaoController.list);
router.put('/:id', autenticarJWT, usuarioPermissaoController.update);
router.delete('/:id', autenticarJWT, usuarioPermissaoController.remove);

export default router;