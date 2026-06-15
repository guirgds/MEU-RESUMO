import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes.js';
import { healthRouter } from '../modules/health/health.routes.js';
import { subjectsRouter } from '../modules/subjects/subjects.routes.js';
import { summariesRouter } from '../modules/summaries/summaries.routes.js';

export const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/subjects', subjectsRouter);
router.use('/summaries', summariesRouter);
