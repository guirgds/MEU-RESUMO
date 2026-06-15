import { FeatureCard } from '../components/FeatureCard';
import type { User } from '../types/auth';

const features = [
  {
    title: 'Resumos digitais',
    description: 'Publique resumos em texto, Markdown, imagem e áudio organizados por matéria e assunto.'
  },
  {
    title: 'Banco de questões',
    description: 'Crie e responda questões com alternativas, dificuldade, explicação e filtros.'
  },
  {
    title: 'Análise de desempenho',
    description: 'Acompanhe acertos por matéria, assunto e período para estudar melhor.'
  }
];

type HomePageProps = {
  user: User;
  onLogout: () => void;
};

export function HomePage({ user, onLogout }: HomePageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
      <nav className="flex items-center justify-between">
        <strong className="text-xl text-brand-700">Meu Resumo</strong>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">Olá, {user.name}</span>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white" onClick={onLogout} type="button">Sair</button>
        </div>
      </nav>

      <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">Rede social de estudos</p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-950">Organize, compartilhe e pratique com resumos inteligentes.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            O Meu Resumo será uma plataforma para criar resumos digitais, descobrir conteúdos de outros estudantes e treinar com questões analisadas por matéria e assunto.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl">
          <p className="text-sm text-slate-300">Primeira versão</p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-100">
            <li>Cadastro, login e perfis públicos</li>
            <li>Resumos em texto e Markdown</li>
            <li>Busca por matéria e assunto</li>
            <li>Questões simples e estatísticas básicas</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 pb-12 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
        ))}
      </section>
    </main>
  );
}
