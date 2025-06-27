import { Router } from 'express';
import * as logController from '../controllers/log.controller';

const router = Router();

router.post('/', logController.create);
router.get('/', logController.list);
// router.get('/:id', logController.get);
router.put('/:id', logController.update);
router.delete('/:id', logController.remove);

export default router;