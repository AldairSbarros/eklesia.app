import { Router } from 'express';
import { cadastrarIgreja } from '../controllers/cadastrarIgreja';
;

const router = Router();
router.post('/igrejas', cadastrarIgreja);
export default router;