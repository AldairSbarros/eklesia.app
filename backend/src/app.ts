/// <reference path="./@types/express/index.d.ts" />
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

// Importação dos módulos de rotas
import churchRoutes from './routes/church.routes';
import congregacaoRoutes from './routes/congregacao.routes';
import memberRoutes from './routes/member.routes';
import offeringRoutes from './routes/offering.routes';
import usuarioRoutes from './routes/usuario.routes';
import dashboardRoutes from './routes/dashboard.routes';
import despesaRoutes from './routes/despesa.routes';
import authRoutes from './routes/auth.routes';
import receitaRoutes from './routes/receita.routes';
import investimentosRoutes from './routes/investimentos.routes';
import mensagemCelulaRoutes from './routes/mensagemCelula.routes';
import pastorRoutes from './routes/pastor.routes';

import ministerioLocalRoutes from './routes/ministerioLocal.routes';
import escolaLideresTurmaRoutes from './routes/escolaLideresTurma.routes';
import escolaLideresLicaoRoutes from './routes/escolaLideresLicao.routes';
import encontroRoutes from './routes/encontro.routes';
import enderecoMembroRoutes from './routes/enderecoMembro.routes';
import celulaRoutes from './routes/celula.routes';
import reuniaoCelulaRoutes from './routes/reuniaoCelula.routes';
import presencaCelulaRoutes from './routes/presencaCelula.routes';
import visitanteCelulaRoutes from './routes/visitante.routes';
import permissaoRoutes from './routes/permissao.routes';
import usuarioPermissaoRoutes from './routes/usuarioPermissao.routes';
import notificacaoRoutes from './routes/notificacao.routes';
import tokenRecuperacaoSenhaRoutes from './routes/tokenRecuperacaoSenha.routes';
import arquivoRoutes from './routes/arquivo.routes';
import logRoutes from './routes/log.routes';
import faturaRoutes from './routes/fatura.routes';


import sermaoRoutes from './routes/sermao.routes';
import passwordRoutes from './routes/password.routes';
import financeiroRoutes from './routes/financeiro.routes';
// Remova o import do controller de configEmail

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Swagger
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas de entidades principais
app.use('/api/igrejas', churchRoutes);
app.use('/api/congregacoes', congregacaoRoutes);
app.use('/api/membros', memberRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pastores', pastorRoutes);

// Rotas de células e reuniões
app.use('/api/celulas', celulaRoutes);
app.use('/api/reunioes-celula', reuniaoCelulaRoutes);
app.use('/api/presencas-celula', presencaCelulaRoutes);
app.use('/api/visitantes-celula', visitanteCelulaRoutes);
app.use('/api/mensagens-celula', mensagemCelulaRoutes);

// Rotas de ministérios e escola de líderes

app.use('/api/ministerios-locais', ministerioLocalRoutes);
app.use('/api/escola-lideres-turmas', escolaLideresTurmaRoutes);

app.use('/api/escola-lideres-licoes', escolaLideresLicaoRoutes);

// Rotas de finanças
app.use('/api/offerings', offeringRoutes);
app.use('/api/despesas', despesaRoutes);
app.use('/api/receitas', receitaRoutes);
app.use('/api/investimentos', investimentosRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/faturas', faturaRoutes);


// Outras rotas
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notificacoes', notificacaoRoutes);
app.use('/api/permissoes', permissaoRoutes);
app.use('/api/usuario-permissoes', usuarioPermissaoRoutes);

app.use('/api/tokens-recuperacao-senha', tokenRecuperacaoSenhaRoutes);
app.use('/api/arquivos', arquivoRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/sermoes', sermaoRoutes);
app.use('/api/enderecos-membro', enderecoMembroRoutes);

app.use('/api/encontros', encontroRoutes);

// Rotas de senha
app.use('/api/password', passwordRoutes);

// Rotas para arquivos estáticos
app.use('/uploads', express.static('uploads'));
app.use('/pdfs', express.static(path.resolve(__dirname, '../public/pdfs')));

// Rota base de status
app.get('/', (req: Request, res: Response) => {
  res.send('API a179 rodando');
});

// Corrija para usar a rota de configuração de e-mail, se existir
// Rota de configuração de e-mail removida porque o módulo não existe
export default app;