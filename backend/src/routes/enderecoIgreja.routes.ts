import { Router } from 'express';
import * as enderecoIgrejaController from '../controllers/enderecoIgreja.controller';

const router = Router();

router.post('/', enderecoIgrejaController.create);
router.get('/', enderecoIgrejaController.list);
// router.get('/:id', enderecoIgrejaController.get);
router.put('/:id', enderecoIgrejaController.update);
router.delete('/:id', enderecoIgrejaController.remove);

export default router;