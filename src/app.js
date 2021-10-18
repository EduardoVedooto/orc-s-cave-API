import express from 'express';
import cors from 'cors';

import * as categoryController from './controllers/categoryController.js';
import * as gameController from './controllers/gameController.js'
import * as customerController from './controllers/customerController.js'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', categoryController.getCategories);

app.post('/categories', categoryController.postCategories);

app.get('/games', gameController.getGames);

app.post('/games', gameController.postGame);

app.get('/customers', customerController.getCustomers);

app.get('/customers/:id', customerController.getCustomerById);

app.post('/customers', customerController.postCustomer);

app.put('/customers/:id', customerController.putCustomer);

app.get('/rentals', (req, res)=>{
    res.sendStatus(501);
});

app.post('/rentals', (req, res)=>{
    res.sendStatus(501);
});

app.get('/rentals/:id/return', (req, res)=>{
    res.sendStatus(501);
});

app.delete('/rentals/:id', (req, res)=>{
    res.sendStatus(501);
});

export default app;
