import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../../lib/env.js';
import { prisma } from '../../lib/prisma.js';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRouter.post('/register', async (request, response) => {
  const data = registerSchema.parse(request.body);
  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      passwordHash
    },
    select: { id: true, name: true, username: true, email: true, createdAt: true }
  });

  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: '7d' });

  return response.status(201).json({ user, token });
});

authRouter.post('/login', async (request, response) => {
  const data = loginSchema.parse(request.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    return response.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);

  if (!passwordMatches) {
    return response.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: '7d' });

  return response.json({
    user: { id: user.id, name: user.name, username: user.username, email: user.email },
    token
  });
});
