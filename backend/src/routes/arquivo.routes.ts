import { Router } from 'express';
import * as arquivoController from '../controllers/arquivo.controller';

const router = Router();

router.post('/', arquivoController.create);
router.get('/', arquivoController.list);
router.get('/:id', (req, res, next) => {
	arquivoController.get(req, res).catch(next);
});
router.put('/:id', arquivoController.update);
router.delete('/:id', arquivoController.remove);    

export default router;