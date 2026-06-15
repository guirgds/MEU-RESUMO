import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'Dados inválidos.',
      issues: error.flatten().fieldErrors
    });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: 'Token inválido ou expirado.' });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    return response.status(409).json({ message: 'Já existe um registro com esses dados.' });
  }

  console.error(error);

  return response.status(500).json({ message: 'Erro interno do servidor.' });
}
