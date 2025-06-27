import { Router } from 'express';
import * as moduloController from '../controllers/escolaLideresModulo.controller';
import asyncHandler from 'express-async-handler';
const router = Router();

router.post('/', asyncHandler(moduloController.create));
router.get('/', asyncHandler(moduloController.list));
router.get('/:id', asyncHandler(async (req, res, next) => {
  await moduloController.get(req, res);
}));
router.put('/:id', asyncHandler(moduloController.update));
router.delete('/:id', asyncHandler(moduloController.remove));

export default router;