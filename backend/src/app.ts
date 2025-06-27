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
import ministerioRoutes from './routes/ministerio.routes';
import escolaLideresTurmaRoutes from './routes/escolaLideresTurma.routes';
import ministerioLocalRoutes from './routes/ministerioLocal.routes';
import escolaLideresModuloRoutes from './routes/escolaLideresModulo.routes';
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
import webhookRoutes from './routes/webhook.routes';
import tokenRecuperacaoSenhaRoutes from './routes/tokenRecuperacaoSenha.routes';
import arquivoRoutes from './routes/arquivo.routes';
import logRoutes from './routes/log.routes';
import faturaRoutes from './routes/fatura.routes';
import vendaRoutes from './routes/venda.routes';
import enderecoIgrejaRoutes from './routes/enderecoIgreja.routes';
import sermaoRoutes from './routes/sermao.routes';
import passwordRoutes from './routes/password.routes';
import financeiroRoutes from './routes/financeiro.routes';
const app = express();

app.use(cors());
app.use(express.json());

// Swagger
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
app.use('/api/igrejas', churchRoutes);
app.use('/api/congregacoes', congregacaoRoutes);
app.use('/api/membros', memberRoutes);
app.use('/api/offerings', offeringRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/despesas', despesaRoutes);
app.use('/api/receitas', receitaRoutes);
app.use('/api/investimentos', investimentosRoutes);
app.use('/api/mensagens-celula', mensagemCelulaRoutes);
app.use('/api/pastores', pastorRoutes);
app.use('/api/ministerios', ministerioRoutes);
app.use('/api/ministerios-locais', ministerioLocalRoutes);
app.use('/api/escola-lideres-turmas', escolaLideresTurmaRoutes);
app.use('/api/escola-lideres-modulos', escolaLideresModuloRoutes);
app.use('/api/escola-lideres-etapas', escolaLideresTurmaRoutes);
app.use('/api/escola-lideres-licoes', escolaLideresLicaoRoutes);
app.use('/api/encontros', encontroRoutes);
app.use('/api/enderecos-membro', enderecoMembroRoutes);
app.use('/api/celulas', celulaRoutes);
app.use('/api/reunioes-celula', reuniaoCelulaRoutes);
app.use('/api/presencas-celula', presencaCelulaRoutes);
app.use('/api/visitantes-celula', visitanteCelulaRoutes);
app.use('/api/permissoes', permissaoRoutes);
app.use('/api/usuario-permissoes', usuarioPermissaoRoutes);
app.use('/api/notificacoes', notificacaoRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/tokens-recuperacao-senha', tokenRecuperacaoSenhaRoutes);
app.use('/api/arquivos', arquivoRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/sermoes', sermaoRoutes);
app.use('/api/enderecos-igreja', enderecoIgrejaRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/faturas', faturaRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/uploads', express.static('uploads'));
// Rota para arquivos estáticos
app.use('/uploads', express.static('uploads'));
// Rota pública para uploads
app.use('/pdfs', express.static(path.resolve(__dirname, '../public/pdfs')));

// Rota base de status
app.get('/', (req: Request, res: Response) => {
  res.send('API a179 rodando');
});
//Rota de recuperação de senha
app.use("/api/password", passwordRoutes);

app.use('/api/offerings', offeringRoutes);

export default app;