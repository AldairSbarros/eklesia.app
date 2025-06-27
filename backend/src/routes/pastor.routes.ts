import { Router } from 'express';
import * as pastorController from '../controllers/pastor.controller';

const router = Router();

router.post('/', pastorController.create);
router.get('/', pastorController.list);
router.get('/:id', (req, res, next) => {
  Promise.resolve(pastorController.get(req, res)).catch(next);
});
router.put('/:id', pastorController.update);
router.delete('/:id', pastorController.remove);

export default router;