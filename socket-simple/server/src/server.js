import http from 'http';
import express from 'express';
import socket from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = socket(server);
(async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB successfully!');
        server.listen(8080, () => {
            console.log('Server started in Docker container!');
        });
    } catch (error) {
        console.log(`Server error: ${error.message}!`);
        process.exit(1);
    }
})();

const rooms = new Map([

]);

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

io.on('connect', (socket) => {
    console.log('connect');

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});
