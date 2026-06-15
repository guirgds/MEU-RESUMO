# Meu Resumo

**Meu Resumo** será uma rede social de resumos digitais, permitindo que usuários publiquem, descubram e estudem conteúdos em múltiplos formatos: texto, Markdown, imagem, áudio e questões.

## Objetivo do produto

Criar uma plataforma em que estudantes possam:

- cadastrar uma conta e montar um perfil público;
- publicar resumos digitais em diferentes formatos;
- pesquisar usuários, matérias, assuntos e resumos;
- interagir com resumos de outras pessoas;
- responder questões de um banco compartilhado;
- acompanhar desempenho por matéria, assunto, período e histórico de tentativas.

## Stack inicial recomendada

A stack proposta é adequada para começar o projeto de verdade, principalmente por equilibrar velocidade de desenvolvimento, organização e facilidade de evolução.

### Backend

- **Node.js + Express + TypeScript**: boa combinação para criar uma API REST de forma simples, tipada e fácil de manter.
- **Prisma ORM**: ajuda a modelar usuários, resumos, mídias, questões, tentativas e estatísticas com segurança de tipos.
- **SQLite em desenvolvimento**: simples para rodar localmente no início.
- **PostgreSQL em produção**: recomendado para escalar busca, filtros, analytics e relacionamentos mais complexos.
- **JWT**: adequado para autenticação inicial em API própria.
- **Multer**: suficiente para uploads locais no MVP; futuramente pode ser trocado por armazenamento em nuvem.

### Frontend

- **React + Vite + TypeScript**: stack moderna, rápida e produtiva para construir a interface.
- **Tailwind CSS**: boa escolha para criar telas rapidamente com consistência visual.

## Ajustes recomendados antes de crescer

Apesar da stack ser adequada, algumas decisões devem ser preparadas desde o início:

1. **Banco de dados**
   - Começar com SQLite é prático, mas o schema deve ser pensado para migrar para PostgreSQL.
   - Recursos como busca textual, ranking, filtros avançados e analytics serão melhores em PostgreSQL.

2. **Uploads de mídia**
   - No MVP, arquivos podem ser salvos localmente.
   - Em produção, usar storage como S3, Cloudflare R2 ou Supabase Storage.

3. **Busca**
   - Começar com busca simples no banco.
   - Evoluir para PostgreSQL full-text search ou Meilisearch/Typesense se a busca social ficar mais avançada.

4. **Analytics**
   - Registrar cada tentativa de questão desde o início.
   - Salvar matéria, assunto, acerto/erro, tempo gasto e data da tentativa.

5. **Moderação e privacidade**
   - Prever visibilidade dos resumos: público, privado ou não listado.
   - Prever denúncia/moderação para conteúdo público.

## Módulos principais do MVP

1. **Autenticação e perfis**
   - cadastro;
   - login;
   - perfil público;
   - busca de usuários.

2. **Resumos digitais**
   - criação de resumo em texto/Markdown;
   - anexos de imagem e áudio;
   - matérias e assuntos;
   - feed e busca de resumos.

3. **Banco de questões**
   - cadastro de questões;
   - alternativas;
   - resposta correta;
   - explicação;
   - filtros por matéria, assunto, dificuldade e data.

4. **Tentativas e análise**
   - registro de respostas dos usuários;
   - taxa de acerto por matéria;
   - taxa de acerto por assunto;
   - evolução por período;
   - filtros por data.

5. **Interação social**
   - curtidas;
   - comentários;
   - seguir usuários;
   - salvar resumos favoritos.

## Próximos passos técnicos

1. Criar a estrutura `backend/` e `frontend/`.
2. Configurar TypeScript nos dois lados.
3. Criar o schema Prisma inicial.
4. Implementar autenticação.
5. Implementar CRUD inicial de resumos.
6. Implementar questões e tentativas.
7. Criar dashboard de analytics.

## Melhor plano para iniciar o projeto

O melhor caminho é começar por um **MVP pequeno, funcional e validável**, em vez de tentar construir toda a rede social de uma vez. O projeto é grande, então a ordem ideal é criar primeiro a base que sustenta todo o resto: usuários, matérias, assuntos, resumos e questões.

### Fase 0 — Preparação do repositório

Objetivo: deixar o projeto pronto para desenvolvimento.

Entregas:

- criar a estrutura de monorepo com `backend/` e `frontend/`;
- configurar TypeScript;
- configurar padrões de lint/format;
- criar variáveis de ambiente de exemplo;
- definir scripts de desenvolvimento;
- documentar como rodar o projeto localmente.

Por que começar aqui: sem essa base, cada nova feature fica mais difícil de testar, organizar e evoluir.

### Fase 1 — Backend base

Objetivo: criar a API e o banco de dados inicial.

Entregas:

- configurar Express com TypeScript;
- configurar Prisma;
- criar o schema inicial do banco;
- criar autenticação com cadastro, login e JWT;
- criar entidades principais: usuário, matéria, assunto e resumo;
- criar endpoints básicos de saúde e autenticação.

Prioridade de dados nesta fase:

1. `User`
2. `Subject`
3. `Topic`
4. `Summary`
5. `SummaryAttachment`

### Fase 2 — Frontend base

Objetivo: criar a primeira experiência navegável do usuário.

Entregas:

- configurar React, Vite, TypeScript e Tailwind;
- criar layout principal;
- criar telas de cadastro e login;
- criar tela inicial/feed simples;
- criar tela de perfil;
- conectar frontend com a API.

### Fase 3 — Resumos digitais

Objetivo: permitir que o usuário crie e veja resumos.

Entregas:

- criar resumo em texto e Markdown;
- listar resumos públicos;
- filtrar por matéria e assunto;
- visualizar resumo individual;
- preparar anexos de imagem e áudio;
- definir visibilidade: público, privado ou não listado.

Essa deve ser a primeira feature principal, porque valida a ideia central do produto: uma rede social de resumos.

### Fase 4 — Banco de questões

Objetivo: permitir estudo ativo, não apenas leitura.

Entregas:

- criar questões com alternativas;
- associar questão a matéria e assunto;
- marcar resposta correta;
- adicionar explicação da resposta;
- filtrar questões por matéria, assunto, dificuldade e data.

### Fase 5 — Tentativas e analytics

Objetivo: transformar respostas em dados úteis para o estudante.

Entregas:

- registrar cada tentativa de questão;
- salvar acerto/erro, data, matéria, assunto e tempo gasto;
- criar estatísticas por matéria;
- criar estatísticas por assunto;
- permitir filtro por período;
- mostrar evolução de desempenho.

Essa fase depende do banco de questões, por isso deve vir depois dele.

### Fase 6 — Camada social

Objetivo: transformar o produto em rede social.

Entregas:

- busca de usuários;
- seguir usuários;
- curtir resumos;
- comentar resumos;
- salvar favoritos;
- feed com resumos de pessoas seguidas.

Essa fase deve vir depois dos resumos, porque a interação social precisa de conteúdo para fazer sentido.

## Primeira versão recomendada

A primeira versão realmente útil deve conter apenas:

- cadastro e login;
- criação de perfil;
- criação de resumo em texto/Markdown;
- listagem de resumos públicos;
- busca por matéria/assunto;
- criação de questões simples;
- resposta de questões;
- estatística básica de acertos por matéria.

Com isso, o projeto já terá valor real e poderá evoluir sem retrabalho.

## O que não fazer no começo

Para evitar que o projeto fique grande demais antes de funcionar, é melhor deixar para depois:

- chat entre usuários;
- notificações em tempo real;
- ranking global;
- IA para gerar resumos automaticamente;
- aplicativo mobile;
- editor avançado estilo Notion;
- busca muito sofisticada;
- sistema completo de moderação.

Essas ideias são boas, mas não são necessárias para validar o MVP.

## Próxima ação recomendada

A próxima ação prática é criar a estrutura inicial do projeto:

```text
backend/
  prisma/
  src/
    modules/
    routes/
    server.ts
frontend/
  src/
    components/
    pages/
    services/
```

Depois disso, o primeiro código a implementar deve ser o backend de autenticação e o schema inicial do Prisma.
