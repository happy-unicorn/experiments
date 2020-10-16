import express from 'express';
import rootRouter from './rootRouter';


const app = express();

app.use(rootRouter);

app.listen(8080, () => {
    console.log('Server started!');
});