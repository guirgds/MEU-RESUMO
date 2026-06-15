import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { asyncHandler } from '../../middlewares/async-handler.js';

export const summariesRouter = Router();

const createSummarySchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']).default('PUBLIC'),
  subjectId: z.string().optional(),
  topicId: z.string().optional()
});

summariesRouter.get(
  '/',
  asyncHandler(async (_request, response) => {
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
  })
);

summariesRouter.post(
  '/',
  authenticate,
  asyncHandler(async (request, response) => {
    const data = createSummarySchema.parse(request.body);

    const summary = await prisma.summary.create({
      data: {
        title: data.title,
        content: data.content,
        visibility: data.visibility,
        authorId: request.user!.id,
        subjectId: data.subjectId,
        topicId: data.topicId
      },
      include: {
        author: { select: { id: true, name: true, username: true, avatarUrl: true } },
        subject: true,
        topic: true,
        attachments: true
      }
    });

    return response.status(201).json(summary);
  })
);
