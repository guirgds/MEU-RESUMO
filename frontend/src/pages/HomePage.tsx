import { useEffect, useState } from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { SummaryCard } from '../components/SummaryCard';
import { SummaryForm } from '../components/SummaryForm';
import { listPublicSummaries } from '../services/api';
import type { User } from '../types/auth';
import type { Summary } from '../types/summary';

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
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isLoadingSummaries, setIsLoadingSummaries] = useState(true);
  const [summariesError, setSummariesError] = useState<string | null>(null);

  useEffect(() => {
    listPublicSummaries()
      .then(setSummaries)
      .catch((error) => setSummariesError(error instanceof Error ? error.message : 'Não foi possível carregar os resumos.'))
      .finally(() => setIsLoadingSummaries(false));
  }, []);

  function handleSummaryCreated(summary: Summary) {
    if (summary.visibility === 'PUBLIC') {
      setSummaries((currentSummaries) => [summary, ...currentSummaries]);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
      <nav className="flex items-center justify-between">
        <strong className="text-xl text-brand-700">Meu Resumo</strong>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">Olá, {user.name}</span>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white" onClick={onLogout} type="button">Sair</button>
        </div>
      </nav>

      <section className="grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">Rede social de estudos</p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-950">Organize, compartilhe e pratique com resumos inteligentes.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            O Meu Resumo será uma plataforma para criar resumos digitais, descobrir conteúdos de outros estudantes e treinar com questões analisadas por matéria e assunto.
          </p>
        </div>

        <SummaryForm onCreated={handleSummaryCreated} />
      </section>

      <section className="grid gap-4 pb-12 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
        ))}
      </section>

      <section className="pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Feed público</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Resumos recentes</h2>
          </div>
          <span className="text-sm text-slate-500">{summaries.length} resumo(s)</span>
        </div>

        {isLoadingSummaries && <p className="rounded-2xl bg-white p-6 text-sm text-slate-600">Carregando resumos...</p>}
        {summariesError && <p className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">{summariesError}</p>}
        {!isLoadingSummaries && !summariesError && summaries.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-sm text-slate-600">Ainda não há resumos públicos. Seja a primeira pessoa a publicar.</p>
        )}
        <div className="grid gap-4">
          {summaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      </section>
    </main>
  );
}
