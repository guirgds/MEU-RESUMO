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
