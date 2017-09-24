import express from 'express';
import cards from './cards';

const app = express();

app.use(express.static('public'));

app.get('/cards', cards.get);
app.post('/cards', cards.add);

export default app;
