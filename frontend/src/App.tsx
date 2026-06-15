import { useEffect, useState } from 'react';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { clearStoredToken, getCurrentUser, getStoredToken } from './services/api';
import type { User } from './types/auth';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setIsLoadingSession(false);
      return;
    }

    getCurrentUser(token)
      .then((result) => setUser(result.user))
      .catch(() => clearStoredToken())
      .finally(() => setIsLoadingSession(false));
  }, []);

  if (isLoadingSession) {
    return <main className="grid min-h-screen place-items-center text-slate-600">Carregando sessão...</main>;
  }

  if (!user) {
    return <AuthPage onAuthenticated={setUser} />;
  }

  return <HomePage user={user} onLogout={() => { clearStoredToken(); setUser(null); }} />;
}
