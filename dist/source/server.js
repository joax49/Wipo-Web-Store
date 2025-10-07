import express from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { productsRouter } from './routers/products.js';
import { protectedProductsRouter } from './routers/protectedProducts.js';
import { authRouter } from './routers/authRouter.js';
import { postProductsController } from './controllers/protectedProductsController.js';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 3000;
// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);
//Constructing the middleware for uploading images
const uploadsLocation = await path.join(__dirname, "uploads/");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsLocation);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, `${basename}${ext}`);
    }
});
const upload = multer({
    storage
});
app.use('/images', express.static(uploadsLocation));
//Standard middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
//Extending the limit for the file size
app.use(express.json({ "limit": '50mb' }));
app.use(express.urlencoded({ "limit": "50mb", "extended": true }));
// app.use(cors({
//     origin: "https://wipo.jxmtz.xyz", 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     //credentials: true, // if using cookies/auth headers
// }));
//Serving the HTML file from public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/protectedProducts/postProducts', upload.single('image'), postProductsController);
app.use('/products', productsRouter);
app.use('/protectedProducts', protectedProductsRouter);
app.use('/auth', authRouter);
app.listen(PORT, 'localhost', () => console.log(`You are listening to port ${PORT}`));
//# sourceMappingURL=server.js.map