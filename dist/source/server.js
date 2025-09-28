import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { productsRouter } from './routers/products.js';
const app = express();
const PORT = 3000;
// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));
// app.use(cors({
//     origin: "https://wipo.jxmtz.xyz", 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     //credentials: true, // if using cookies/auth headers
// }));
//Serving the HTML file from public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/products', productsRouter);
app.listen(PORT, 'localhost', () => console.log(`You are listening to port ${PORT}`));
//# sourceMappingURL=server.js.map