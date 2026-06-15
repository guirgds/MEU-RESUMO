# Próximos passos do Meu Resumo

Este documento define o que faremos depois da estrutura inicial do projeto.

## Prioridade imediata

A próxima etapa deve ser transformar o scaffold em um MVP funcional. Para isso, vamos seguir esta ordem:

1. **Estabilizar o ambiente local**
   - instalar dependências;
   - gerar Prisma Client;
   - criar a primeira migration;
   - validar se backend e frontend sobem juntos.

2. **Finalizar autenticação no backend**
   - criar middleware de autenticação JWT;
   - criar rota `/api/auth/me`;
   - padronizar tratamento de erros;
   - impedir usernames e e-mails duplicados com respostas amigáveis.

3. **Criar fluxo de autenticação no frontend**
   - tela de cadastro;
   - tela de login;
   - armazenamento do token;
   - serviço de API com token;
   - estado básico do usuário logado.

4. **Implementar resumos digitais**
   - criar resumo;
   - listar resumos públicos;
   - visualizar resumo individual;
   - filtrar por matéria e assunto;
   - permitir Markdown no conteúdo.

5. **Implementar banco de questões inicial**
   - criar questão;
   - cadastrar alternativas;
   - responder questão;
   - registrar tentativa;
   - mostrar acerto/erro.

6. **Criar analytics básico**
   - taxa de acerto geral;
   - taxa de acerto por matéria;
   - taxa de acerto por assunto;
   - filtro por período.

## O que vamos fazer primeiro na prática

A primeira tarefa de código deve ser a autenticação completa, porque quase todas as próximas funcionalidades dependem de saber quem é o usuário.

### Entregas da próxima implementação

- middleware `authenticate` no backend;
- rota `GET /api/auth/me`;
- utilitário para criar tokens JWT;
- tratamento centralizado de erros no Express;
- telas de login e cadastro no frontend;
- serviço frontend para chamar `/api/auth/register`, `/api/auth/login` e `/api/auth/me`;
- guardar token no `localStorage`;
- mostrar estado de usuário logado na interface.

## Depois da autenticação

Quando login e cadastro estiverem funcionando, a próxima feature deve ser criação de resumos. Essa será a primeira funcionalidade principal do produto.

### Ordem recomendada dos resumos

1. Criar formulário de novo resumo.
2. Salvar título, conteúdo, matéria, assunto e visibilidade.
3. Listar resumos públicos no feed.
4. Criar página de detalhe do resumo.
5. Adicionar suporte visual para Markdown.
6. Só depois adicionar upload de imagem e áudio.

## Critério para considerar o MVP inicial pronto

O MVP inicial estará pronto quando um usuário conseguir:

1. criar conta;
2. fazer login;
3. criar um resumo;
4. ver resumos públicos;
5. criar uma questão simples;
6. responder uma questão;
7. ver uma estatística básica de acertos.

## Decisões que ainda precisam ser tomadas

Antes de avançarmos muito, será útil decidir:

- se os perfis serão públicos por padrão;
- se qualquer usuário poderá criar questões públicas;
- se resumos privados aparecem em busca;
- se questões terão revisão/moderação;
- quais matérias iniciais serão cadastradas como seed;
- se o MVP terá apenas texto/Markdown ou upload de arquivos já na primeira versão.
