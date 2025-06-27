import { Router, Request, Response, NextFunction } from 'express';
import * as usuarioController from '../controllers/usuario.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

function asyncHandler(fn: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Rotas protegidas por perfil
router.get("/admin-only", autenticarJWT, autorizarRoles(["admin"]), asyncHandler(usuarioController.adminOnly));
router.get("/pastor-ou-dirigente", autenticarJWT, autorizarRoles(["tesoureiro", "dirigente"]), asyncHandler(usuarioController.dirigenteOuTesoureiro));

// Listar todos os usuários (apenas admin)
router.get('/', autenticarJWT, autorizarRoles(["admin"]), asyncHandler(usuarioController.list));

// Criar usuário (apenas admin)
router.post('/', autenticarJWT, autorizarRoles(["admin"]), asyncHandler(usuarioController.create));

// Atualizar usuário (apenas admin)
router.put('/:id', autenticarJWT, autorizarRoles(["admin"]), asyncHandler(usuarioController.update));

// Remover usuário (apenas admin)
router.delete('/:id', autenticarJWT, autorizarRoles(["admin"]), asyncHandler(usuarioController.deleteUsuario));

// Login (público)
router.post('/login', asyncHandler(usuarioController.login));

// Redefinir senha (admin)
router.post('/reset-password/:id', autenticarJWT, autorizarRoles(["admin"]), asyncHandler(usuarioController.resetPassword));

// Trocar a própria senha (autenticado)
router.post('/change-password', autenticarJWT, asyncHandler(usuarioController.changePassword));

// Listar dízimos do usuário logado
router.get('/me/dizimos', autenticarJWT, asyncHandler(usuarioController.getDizimos));

// Upload de comprovante de dízimo
router.post('/upload-comprovante', autenticarJWT, asyncHandler(usuarioController.uploadComprovante));

export default router;