import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { errorHandler } from './middlewares/error-handler.js';
import { router } from './routes/index.js';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api', router);
app.use(errorHandler);
