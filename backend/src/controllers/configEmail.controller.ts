import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// Rota para cadastrar ou atualizar as configurações SMTP do cliente
router.post('/config-email', async (req: Request, res: Response): Promise<void> => {
  const { clienteId, smtpHost, smtpPort, smtpUser, smtpPass, email } = req.body;

  if (!clienteId || !smtpHost || !smtpPort || !smtpUser || !smtpPass || !email) {
    res.status(400).json({ error: 'Dados obrigatórios faltando.' });
    return;
  }

  try {
    // Upsert: cria ou atualiza a configuração do cliente
    const config = await prisma.configEmail.upsert({
      where: { id: clienteId },
      update: { smtpHost, smtpPort, smtpUser, smtpPass, email },
      create: { clienteId, smtpHost, smtpPort, smtpUser, smtpPass, email }
    });
    res.json({ ok: true, config });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar configuração de e-mail.' });
  }
});

export default router;