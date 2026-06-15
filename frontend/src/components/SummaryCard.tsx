import { getAssetUrl } from '../services/api';
import type { Summary } from '../types/summary';

type SummaryCardProps = {
  summary: Summary;
};

export function SummaryCard({ summary }: SummaryCardProps) {
  const createdAt = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(summary.createdAt));

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{summary.title}</h3>
          <p className="mt-1 text-sm text-slate-500">por @{summary.author.username} · {createdAt}</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{summary.visibility}</span>
      </div>
      <p className="mt-4 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-600">{summary.content}</p>

      {summary.attachments.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {summary.attachments.map((attachment) => (
            <a className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200" href={getAssetUrl(attachment.url)} key={attachment.id} rel="noreferrer" target="_blank">
              {attachment.type === 'PDF' ? 'PDF' : attachment.type} · {attachment.fileName ?? 'anexo'}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
