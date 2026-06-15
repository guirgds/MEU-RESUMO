import { FormEvent, useState } from 'react';
import { loginUser, registerUser, storeToken } from '../services/api';
import type { User } from '../types/auth';

type AuthPageProps = {
  onAuthenticated: (user: User) => void;
};

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result =
        mode === 'register'
          ? await registerUser({ name, username, email, password })
          : await loginUser({ email, password });

      storeToken(result.token);
      onAuthenticated(result.user);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível autenticar.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Meu Resumo</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">{mode === 'login' ? 'Entrar na conta' : 'Criar conta'}</h1>
        <p className="mt-2 text-sm text-slate-600">Entre para criar resumos, responder questões e acompanhar seu desempenho.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Nome
                <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={name} onChange={(event) => setName(event.target.value)} required />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Usuário
                <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={username} onChange={(event) => setUsername(event.target.value)} required />
              </label>
            </>
          )}

          <label className="block text-sm font-medium text-slate-700">
            E-mail
            <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Senha
            <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
          </label>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button className="w-full rounded-xl bg-brand-700 px-4 py-3 font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Enviando...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <button className="mt-6 text-sm font-medium text-brand-700" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} type="button">
          {mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho conta'}
        </button>
      </section>
    </main>
  );
}
