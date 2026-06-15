import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';

export const subjectsRouter = Router();

subjectsRouter.get('/', async (_request, response) => {
  const subjects = await prisma.subject.findMany({
    include: { topics: true },
    orderBy: { name: 'asc' }
  });

  return response.json(subjects);
});
