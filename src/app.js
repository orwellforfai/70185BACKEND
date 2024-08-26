// Imports
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

// App Express
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', productsRouter);
app.use('/api', cartRouter);

//Server Definition
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
