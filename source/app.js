import express from 'express';
import bodyParser from 'body-parser';
import cards from './cards';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/cards', cards.get);
app.post('/cards', cards.add);
app.delete('/cards/:id', cards.del);

export default app;
