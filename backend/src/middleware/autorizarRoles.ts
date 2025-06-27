import { Request, Response, NextFunction } from "express";

export function autorizarRoles(rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !rolesPermitidos.includes(user.perfil)) {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    next();
  };
}