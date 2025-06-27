import { Router } from 'express';
import * as licaoController from '../controllers/escolaLideresLicao.controller';

const router = Router();

router.post('/', licaoController.create);
router.get('/', licaoController.list);
import { RequestHandler } from 'express';

router.get('/:id', licaoController.get as RequestHandler);
router.put('/:id', licaoController.update);
router.delete('/:id', licaoController.remove);

export default router;