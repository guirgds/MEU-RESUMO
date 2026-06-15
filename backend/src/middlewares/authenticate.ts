import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { verifyAuthToken } from '../utils/tokens.js';

export async function authenticate(request: Request, response: Response, next: NextFunction) {
  try {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      return response.status(401).json({ message: 'Token de autenticação não informado.' });
    }

    const token = authorization.replace('Bearer ', '');
    const payload = verifyAuthToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, username: true, email: true, bio: true, avatarUrl: true }
    });

    if (!user) {
      return response.status(401).json({ message: 'Usuário não encontrado.' });
    }

    request.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
}
