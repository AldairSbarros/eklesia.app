/// <reference path="./@types/express/index.d.ts" />
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

// Importação dos módulos de rotas
import churchRoutes from './routes/church.routes'; // Igrejas
import congregacaoRoutes from './routes/congregacao.routes'; // Congregações
import memberRoutes from './routes/member.routes'; // Membros
import offeringRoutes from './routes/offering.routes'; // Ofertas
import usuarioRoutes from './routes/usuario.routes'; // Usuários do sistema
import dashboardRoutes from './routes/dashboard.routes'; // Dashboard
import despesaRoutes from './routes/despesa.routes'; // Despesas
import authRoutes from './routes/auth.routes'; // Autenticação
import receitaRoutes from './routes/receita.routes'; // Receitas
import investimentosRoutes from './routes/investimentos.routes'; // Investimentos
import mensagemCelulaRoutes from './routes/mensagemCelula.routes'; // Mensagens de célula
import pastorRoutes from './routes/pastor.routes'; // Pastores
import ministerioRoutes from './routes/ministerio.routes'; // Ministérios
import ministerioLocalRoutes from './routes/ministerioLocal.routes'; // Ministérios locais
import escolaLideresTurmaRoutes from './routes/escolaLideresTurma.routes'; // Turmas da escola de líderes
import escolaLideresModuloRoutes from './routes/escolaLideresModulo.routes'; // Módulos da escola de líderes
import escolaLideresLicaoRoutes from './routes/escolaLideresLicao.routes'; // Lições da escola de líderes
import encontroRoutes from './routes/encontro.routes'; // Encontros/Retiro
import enderecoMembroRoutes from './routes/enderecoMembro.routes'; // Endereços dos membros
import celulaRoutes from './routes/celula.routes'; // Células
import reuniaoCelulaRoutes from './routes/reuniaoCelula.routes'; // Reuniões de célula
import presencaCelulaRoutes from './routes/presencaCelula.routes'; // Presenças em célula
import visitanteCelulaRoutes from './routes/visitante.routes'; // Visitantes em célula
import permissaoRoutes from './routes/permissao.routes'; // Permissões
import usuarioPermissaoRoutes from './routes/usuarioPermissao.routes'; // Permissões de usuário
import notificacaoRoutes from './routes/notificacao.routes'; // Notificações
import webhookRoutes from './routes/webhook.routes'; // Webhooks
import tokenRecuperacaoSenhaRoutes from './routes/tokenRecuperacaoSenha.routes'; // Recuperação de senha
import arquivoRoutes from './routes/arquivo.routes'; // Uploads/Arquivos
import logRoutes from './routes/log.routes'; // Logs
import faturaRoutes from './routes/fatura.routes'; // Faturas
import vendaRoutes from './routes/venda.routes'; // Vendas
import enderecoIgrejaRoutes from './routes/enderecoIgreja.routes'; // Endereço das igrejas
import sermaoRoutes from './routes/sermao.routes'; // Sermões
import passwordRoutes from './routes/password.routes'; // Rotas de senha
import financeiroRoutes from './routes/financeiro.routes'; // Painel financeiro
import configEmailRouter from './controllers/configEmail.controller';

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Swagger
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas de entidades principais
app.use('/api/igrejas', churchRoutes); // CRUD de igrejas
app.use('/api/congregacoes', congregacaoRoutes); // CRUD de congregações
app.use('/api/membros', memberRoutes); // CRUD de membros
app.use('/api/usuarios', usuarioRoutes); // CRUD de usuários
app.use('/api/pastores', pastorRoutes); // CRUD de pastores

// Rotas de células e reuniões
app.use('/api/celulas', celulaRoutes); // CRUD de células e membros da célula
app.use('/api/reunioes-celula', reuniaoCelulaRoutes); // CRUD de reuniões de célula
app.use('/api/presencas-celula', presencaCelulaRoutes); // Presenças em reuniões de célula
app.use('/api/visitantes-celula', visitanteCelulaRoutes); // Visitantes em reuniões de célula
app.use('/api/mensagens-celula', mensagemCelulaRoutes); // Mensagens de célula

// Rotas de ministérios e escola de líderes
app.use('/api/ministerios', ministerioRoutes); // Ministérios
app.use('/api/ministerios-locais', ministerioLocalRoutes); // Ministérios locais
app.use('/api/escola-lideres-turmas', escolaLideresTurmaRoutes); // Turmas da escola de líderes
app.use('/api/escola-lideres-modulos', escolaLideresModuloRoutes); // Módulos da escola de líderes
app.use('/api/escola-lideres-licoes', escolaLideresLicaoRoutes); // Lições da escola de líderes

// Rotas de finanças
app.use('/api/offerings', offeringRoutes); // Ofertas
app.use('/api/despesas', despesaRoutes); // Despesas
app.use('/api/receitas', receitaRoutes); // Receitas
app.use('/api/investimentos', investimentosRoutes); // Investimentos
app.use('/api/financeiro', financeiroRoutes); // Painel financeiro
app.use('/api/faturas', faturaRoutes); // Faturas
app.use('/api/vendas', vendaRoutes); // Vendas

// Outras rotas
app.use('/api/dashboard', dashboardRoutes); // Dashboard
app.use('/api/auth', authRoutes); // Autenticação
app.use('/api/notificacoes', notificacaoRoutes); // Notificações
app.use('/api/permissoes', permissaoRoutes); // Permissões
app.use('/api/usuario-permissoes', usuarioPermissaoRoutes); // Permissões de usuário
app.use('/api/webhooks', webhookRoutes); // Webhooks
app.use('/api/tokens-recuperacao-senha', tokenRecuperacaoSenhaRoutes); // Recuperação de senha
app.use('/api/arquivos', arquivoRoutes); // Uploads/Arquivos
app.use('/api/logs', logRoutes); // Logs de ações
app.use('/api/sermoes', sermaoRoutes); // Sermões
app.use('/api/enderecos-membro', enderecoMembroRoutes); // Endereços dos membros
app.use('/api/enderecos-igreja', enderecoIgrejaRoutes); // Endereços das igrejas
app.use('/api/encontros', encontroRoutes); // Encontros/Retiros

// Rotas de senha
app.use('/api/password', passwordRoutes);

// Rotas para arquivos estáticos
app.use('/uploads', express.static('uploads')); // Uploads de arquivos
app.use('/pdfs', express.static(path.resolve(__dirname, '../public/pdfs'))); // PDFs públicos

// Rota base de status
app.get('/', (req: Request, res: Response) => {
  res.send('API a179 rodando');
});

app.use('/api', configEmailRouter);

export default app;