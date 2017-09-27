import express from 'express';
import bodyParser from 'body-parser';
import getCardsController from './controllers/cards/get';
import addCardController from './controllers/cards/add';
import deleteCardController from './controllers/cards/delete';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/cards', getCardsController);
app.post('/cards', addCardController);
app.delete('/cards/:id', deleteCardController);

export default app;
