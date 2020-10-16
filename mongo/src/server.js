import express from 'express';

const app = express();

app.get('/test', (request, response) => {
    const a = 0;
    response.json({
       hello: 'world'
    });
});

app.listen(8080, () => {
    console.log('Server started!');
});