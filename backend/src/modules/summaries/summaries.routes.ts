import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';

export const summariesRouter = Router();

summariesRouter.get('/', async (_request, response) => {
  const summaries = await prisma.summary.findMany({
    where: { visibility: 'PUBLIC' },
    include: {
      author: { select: { id: true, name: true, username: true, avatarUrl: true } },
      subject: true,
      topic: true,
      attachments: true
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return response.json(summaries);
});
