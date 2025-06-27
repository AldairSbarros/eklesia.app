import { Router } from 'express';
import { cadastrarIgreja } from '../controllers/cadastrarIgrejaControler';

const router = Router();

router.post('/', cadastrarIgreja);

export default router;