import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/auth';
import { validate } from '../utils/validate';

const authRouter = Router();

authRouter.post(
    '/register',
    validate([
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters').isLength({ min: 6 })
    ]),
    register
);
authRouter.post(
    '/login',
    validate([
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters').isLength({ min: 6 })
    ]),
    login
);

export default authRouter;