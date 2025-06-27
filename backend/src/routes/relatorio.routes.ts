import { Router } from 'express';
import * as relatorioController from '../controllers/relatorio.controller';

const router = Router();

router.get('/mensal', relatorioController.relatorioMensal);
router.get('/mensal/pdf', relatorioController.relatorioMensalPDF);

export default router;