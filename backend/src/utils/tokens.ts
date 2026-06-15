import jwt from 'jsonwebtoken';
import { env } from '../lib/env.js';

export function createAuthToken(userId: string) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as { sub: string };
}
