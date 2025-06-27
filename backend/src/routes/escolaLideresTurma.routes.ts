import { Router } from 'express';
import * as turmaController from '../controllers/escolaLideresTurma.controller';

const router = Router();

router.post('/', turmaController.create);
router.get('/', turmaController.list);
// router.get('/:id', turmaController.get);
router.put('/:id', turmaController.update);
router.delete('/:id', turmaController.remove);

export default router;