import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/auth';
import { validate } from '../utils/validate';

const authRouter = Router();

authRouter.post(
    '/register',
    validate([]),
    register
);
authRouter.post(
    '/login',
    validate([]),
    login
);

export default authRouter;