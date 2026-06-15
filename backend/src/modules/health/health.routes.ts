import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  return response.json({ status: 'ok', service: 'meu-resumo-api' });
});
