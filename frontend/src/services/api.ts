import type { AuthResponse, User } from '../types/auth';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';
const tokenKey = 'meu-resumo-token';

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Erro ao comunicar com a API.');
  }

  return data as T;
}

export function getStoredToken() {
  return localStorage.getItem(tokenKey);
}

export function storeToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export function clearStoredToken() {
  localStorage.removeItem(tokenKey);
}

export async function getHealth() {
  return apiRequest<{ status: string; service: string }>('/api/health');
}

export async function registerUser(payload: { name: string; username: string; email: string; password: string }) {
  return apiRequest<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function loginUser(payload: { email: string; password: string }) {
  return apiRequest<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function getCurrentUser(token: string) {
  return apiRequest<{ user: User }>('/api/auth/me', { token });
}
