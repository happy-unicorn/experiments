import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './apiRouter';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api', apiRouter);

(async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB successfully!');
        app.listen(8080, () => {
            console.log('Server started in Docker container!');
        });
    } catch (error) {
        console.log(`Server error: ${error.message}!`);
        process.exit(1);
    }
})();