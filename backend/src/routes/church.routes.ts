import { Router } from "express";
import churchController from "../controllers/church.controller";
import { autorizarRoles } from "../middleware/autorizarRoles";
import { autenticarJWT } from "../middleware/autenticarJWT";
import { validarCadastroIgreja } from "../middleware/validarCadastroIgreja";
import { handleValidation } from "../middleware/handleValidation";

const router = Router();

// Rotas protegidas por autenticação e autorização
router.post(
  "/",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  autenticarJWT,
  validarCadastroIgreja,
  handleValidation,
  churchController.create
);
router.put(
  "/:id",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  churchController.update
);
router.delete(
  "/:id",
  autenticarJWT,
  autorizarRoles(["ADMIN"]),
  churchController.remove
);

// Rotas protegidas apenas por autenticação
router.get("/", autenticarJWT, churchController.list);
router.get("/:id", autenticarJWT, churchController.get);

export default router;
