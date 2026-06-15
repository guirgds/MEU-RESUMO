const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

export async function getHealth() {
  const response = await fetch(`${apiUrl}/api/health`);
  return response.json() as Promise<{ status: string; service: string }>;
}
