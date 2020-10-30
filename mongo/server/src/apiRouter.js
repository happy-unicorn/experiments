import { Router } from 'express';
import authRouter from './routes/auth';
import linkRouter from './routes/link';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/links', linkRouter);

export default apiRouter;