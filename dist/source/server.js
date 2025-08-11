import express from 'express';
import { productsRouter } from './routers/products.js';
const app = express();
const PORT = 80;
app.use('/products', productsRouter);
app.listen(PORT, 'localhost', () => console.log(`You are listening to port ${PORT}`));
//# sourceMappingURL=server.js.map