import { Router } from 'express';
import * as mensagemCelulaController from '../controllers/mensagemCelula.controller';

const router = Router();

router.post('/', mensagemCelulaController.criarMensagem);
router.get('/', mensagemCelulaController.listarMensagens);
router.get('/pdfs', mensagemCelulaController.listarMensagensPDF);
import { Request, Response, NextFunction } from 'express';

router.get('/:id', mensagemCelulaController.obterMensagem as (req: Request, res: Response, next: NextFunction) => any);
router.put('/:id', mensagemCelulaController.atualizarMensagem);
router.delete('/:id', mensagemCelulaController.removerMensagem);

export default router;