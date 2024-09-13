// Imports
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import ProductManager from "./manager/productos.js";


// App Express
const app = express();

// Product Manager
const productManager = new ProductManager();

// Set up Handlebars
app.engine('handlebars', engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', viewsRouter);
app.use('/api', productsRouter);
app.use('/api', cartRouter);


// Server Definition
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(httpServer);

// Websocket use
io.on("connection", async (socket) => {
    console.log("Un cliente conectado");

    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        socket.emit("productos", await productManager.getProducts());
    });

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        socket.emit("productos", await productManager.getProducts());
    });
});