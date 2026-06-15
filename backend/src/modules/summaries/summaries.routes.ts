import { AttachmentType } from '@prisma/client';
import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
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

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (_request, file, callback) => {
      const extension = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
      callback(null, uniqueName);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    const isAllowed = file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/') || file.mimetype === 'application/pdf';

    callback(null, isAllowed);
  }
});

function getAttachmentType(mimeType: string) {
  if (mimeType.startsWith('image/')) {
    return AttachmentType.IMAGE;
  }

  if (mimeType.startsWith('audio/')) {
    return AttachmentType.AUDIO;
  }

  if (mimeType === 'application/pdf') {
    return AttachmentType.PDF;
  }

  return AttachmentType.FILE;
}

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

summariesRouter.post(
  '/:summaryId/attachments',
  authenticate,
  upload.single('file'),
  asyncHandler(async (request, response) => {
    const summary = await prisma.summary.findUnique({ where: { id: request.params.summaryId } });

    if (!summary) {
      return response.status(404).json({ message: 'Resumo não encontrado.' });
    }

    if (summary.authorId !== request.user!.id) {
      return response.status(403).json({ message: 'Você não pode anexar arquivos a este resumo.' });
    }

    if (!request.file) {
      return response.status(400).json({ message: 'Arquivo não enviado ou formato não permitido.' });
    }

    const attachment = await prisma.summaryAttachment.create({
      data: {
        summaryId: summary.id,
        type: getAttachmentType(request.file.mimetype),
        url: `/uploads/${request.file.filename}`,
        fileName: request.file.originalname
      }
    });

    return response.status(201).json(attachment);
  })
);
