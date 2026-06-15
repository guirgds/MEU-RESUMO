import { FormEvent, useState } from 'react';
import { createSummary, getStoredToken, uploadSummaryAttachment } from '../services/api';
import type { Summary, SummaryVisibility } from '../types/summary';

type SummaryFormProps = {
  onCreated: (summary: Summary) => void;
};

export function SummaryForm({ onCreated }: SummaryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<SummaryVisibility>('PUBLIC');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const token = getStoredToken();

      if (!token) {
        throw new Error('Sessão expirada. Entre novamente.');
      }

      const summary = await createSummary(token, { title, content, visibility });
      const uploadedAttachment = attachment ? await uploadSummaryAttachment(token, summary.id, attachment) : null;
      onCreated(uploadedAttachment ? { ...summary, attachments: [uploadedAttachment, ...summary.attachments] } : summary);
      setTitle('');
      setContent('');
      setVisibility('PUBLIC');
      setAttachment(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível criar o resumo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-slate-950">Criar resumo</h2>
      <p className="mt-1 text-sm text-slate-600">Comece com texto ou Markdown e anexe PDF, imagem ou áudio.</p>

      <label className="mt-5 block text-sm font-medium text-slate-700">
        Título
        <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={title} onChange={(event) => setTitle(event.target.value)} required minLength={3} />
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Conteúdo
        <textarea className="mt-1 min-h-36 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={content} onChange={(event) => setContent(event.target.value)} required minLength={10} />
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Visibilidade
        <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={visibility} onChange={(event) => setVisibility(event.target.value as SummaryVisibility)}>
          <option value="PUBLIC">Público</option>
          <option value="UNLISTED">Não listado</option>
          <option value="PRIVATE">Privado</option>
        </select>
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Anexo opcional
        <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500" type="file" accept="image/*,audio/*,application/pdf" onChange={(event) => setAttachment(event.target.files?.[0] ?? null)} />
      </label>

      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button className="mt-5 w-full rounded-xl bg-brand-700 px-4 py-3 font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Salvando...' : 'Publicar resumo'}
      </button>
    </form>
  );
}
