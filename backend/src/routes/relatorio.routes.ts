// import { Router, Request, Response, NextFunction } from 'express';
// import * as relatorioController from '../controllers/relatorio.controller';

// const router = Router();

// // Handler para funções async
// function asyncHandler(
//   fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
// ) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// }

// router.get('/mensal', asyncHandler(relatorioController.relatorioMensal));
// router.get('/mensal/pdf', asyncHandler(relatorioController.relatorioMensalPDF));

// export default  router;