import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';

export async function register(request, response) {
    try {
        const { email, password } = request.body;
        if (await User.findOne({ email })) {
            return response.status(400).json({ message: 'User already exists' });
        }
        const user = new User({
            email,
            password: await bcrypt.hash(password, 10)
        });
        await user.save();
        response.status(201).json({ message: 'User created' });
    } catch (error) {
        response.status(500).json({
            message: "Something went wrong"
        });
    }
}

export async function login(request, response) {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: 'User is not found' })
        }
        if (!await bcrypt.compare(password, user.password)) {
            return response.status(401).json({ message: 'Wrong password' })
        }
        const token = await jsonwebtoken.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        );
        response.json({
            token
        })
    } catch (error) {
        response.status(500).json({
            message: "Something went wrong"
        });
    }
}