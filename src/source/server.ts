import express from 'express';
import { productsRouter } from './routers/products.js';

const app = express();
const PORT = 5001;

app.use('/products', productsRouter)

app.listen(PORT, `Your listening to port ${PORT}`);