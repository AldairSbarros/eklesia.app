import { Router, Request, Response } from 'express';
import * as memberController from '../controllers/member.controller';

const router = Router();

router.post('/', memberController.create);
router.get('/', memberController.list);
router.get('/:id', (req, res, next) => {
  memberController.get(req, res).catch(next);
});
router.put('/:id', memberController.update);
router.delete('/:id', memberController.remove);

export default router;