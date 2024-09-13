import express   from "express";
import ProductManager from '../manager/productos.js';

const viewsRouter = express.Router();

const productManager = new ProductManager()


viewsRouter.get('/', (req, res) => {
    res.render('main', {title: 'Curso Backend', message: 'Comision 70185!'});
});

viewsRouter.get('/product', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render('Home', { title: 'Product Page', message: 'Products', products });
    } catch (err) {
        res.status(500).send('Error retrieving product');

    }}
)
// viewsRouter.get('/realTimeProducts', async (req, res) => {
//     try {
//
//         // const product = await productManager.getProducts()
//         res.render("realTimeProducts", {product });
//     } catch (err) {
//         res.status(500).send('Error retrieving product');
//
//     }}
// )
viewsRouter.get("/realTimeProducts",  (req, res) => {
    res.render("realTimeProducts");
})

export default viewsRouter;