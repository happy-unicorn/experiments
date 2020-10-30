import { Router } from 'express';
import { redirect } from '../controllers/redirect';

const redirectRouter = Router();

redirectRouter.get('/:code', redirect);

export default redirectRouter;