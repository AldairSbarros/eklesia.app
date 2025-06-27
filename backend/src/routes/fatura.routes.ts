import { Router, Request, Response } from 'express';
import * as faturaController from '../controllers/fatura.controller';

const router = Router();

router.post('/', faturaController.create);
router.get('/', faturaController.list);
// router.get('/:id', faturaController.get);
router.put('/:id', faturaController.update);
router.delete('/:id', faturaController.remove);

export default router;