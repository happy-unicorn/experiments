import { Router } from 'express';
import authRouter from './routes/auth';
import linkRouter from './routes/link';
import redirectRouter from './routes/redirect';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/links', linkRouter);
apiRouter.use('/t', redirectRouter);

export default apiRouter;