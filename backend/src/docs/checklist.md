# Checklist de Desenvolvimento - Backend EklesiaApp

## 1. Church Controller (Igrejas)
- [x] Criar igreja e banco de dados dedicado
- [x] Listar todas as igrejas
- [x] Buscar igreja por ID
- [x] Atualizar dados da igreja
- [x] Remover igreja
- [x] Validar campos obrigatórios no cadastro e atualização
- [x] Tratar erros de forma detalhada (ex: banco já existe, e-mail duplicado)
- [x] Permitir definir senha no cadastro
- [x] Adicionar logs para auditoria e debug
- [x] Remover funções exportadas não implementadas
- [x] Adicionar autenticação e autorização nas rotas
- [x] Sanitizar e validar entradas do usuário
- [x] Garantir que o campo `schema` está correto
- [x] Adicionar campo para status da igreja (ativa/inativa)
- [x] Adicionar campo para data de criação
- [x] Criar testes unitários para cada método
- [x] Testar criação de banco e migrations em ambiente de desenvolvimento

## 2. Módulo de Usuários/Admin
- [x] Cadastro, autenticação e login de usuários
- [X] Recuperação e alteração de senha
- [x] Permissões e papéis (admin, gestor, membro, etc)
- [x] Listagem, atualização e remoção de usuários
- [x] Logs de acesso e ações administrativas
- [ ] Testes unitários e de integração

## 3. Módulo de Células
- [ ] Cadastro e gerenciamento de células
- [ ] Associação de membros a células
- [ ] Registro de reuniões e frequência
- [ ] Relatórios de células
- [ ] Testes unitários

## 4. Módulo de Discipulado
- [ ] Cadastro de discipuladores e discipulandos
- [ ] Registro de encontros e acompanhamento
- [ ] Relatórios de discipulado

## 5. Módulo de Tesouraria/Financeiro
- [x] Cadastro de entradas e saídas financeiras
- [x] Upload de comprovantes
- [ ] Integração com Pix/Mercado Pago
- [x] Relatórios financeiros
- [ ] Testes unitários

## 6. Módulo de Relatórios
- [ ] Relatórios automáticos por e-mail
- [ ] Relatórios customizáveis por módulo
- [ ] Exportação em PDF/Excel

## 7. Módulo de Mensagens/Notificações
- [ ] Envio de mensagens internas
- [ ] Integração com WhatsApp e e-mail
- [ ] Notificações push (se aplicável)

## 8. Integrações Externas
- [ ] Integração com Zoho Mail (criação de e-mails institucionais)
- [ ] Integração com Mercado Pago/Pix
- [ ] Integração com WhatsApp API

## 9. Segurança e Boas Práticas
- [ ] Autenticação JWT ou OAuth2
- [ ] Autorização por perfil/papel
- [ ] Validação e sanitização de dados
- [ ] Logs de auditoria
- [ ] Rate limiting e proteção contra ataques comuns

## 10. Infraestrutura e Deploy
- [ ] Configuração de variáveis de ambiente
- [ ] Scripts de build e deploy automatizado
- [ ] Backup automático dos bancos de dados
- [ ] Monitoramento e alertas

## 11. Documentação
- [ ] Documentação das rotas (Swagger/OpenAPI)
- [ ] Documentação de instalação e deploy
- [ ] Manual do desenvolvedor

## 12. Testes e Qualidade
- [ ] Testes unitários para todos os módulos
- [ ] Testes de integração
- [ ] Testes automatizados de API
- [ ] Cobertura de testes acima de 80%

## 13. Futuro (pós-MVP)
- [ ] Automatizar criação de e-mail institucional para cada igreja
- [ ] Adicionar logs de auditoria para ações administrativas
- [ ] Dashboard de métricas e uso do sistema
- [ ] Multi-idioma

---

**Dica:**  
Priorize os módulos essenciais para o MVP (igrejas, usuários, células, financeiro).  
Depois, avance para integrações, segurança, testes e automações.

Se quiser detalhar algum módulo ou receber exemplos de código, só pedir.