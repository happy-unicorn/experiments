import { Router } from 'express';
import { create, all, one } from '../controllers/link';
import { check } from 'express-validator';
import { validate } from '../utils/validate';
import auth from '../middlewares/auth';

const linkRouter = Router();

linkRouter.post('/create', auth, create);
linkRouter.get('/', auth, all);
linkRouter.get('/:id', auth, one);

export default linkRouter;
