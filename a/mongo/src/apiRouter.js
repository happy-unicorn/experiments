import { Router } from 'express';
import authRouter from './routes/auth';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;