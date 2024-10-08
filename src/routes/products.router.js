import express from 'express';
import mongoose from 'mongoose';
import ProductManager from '../manager/productos.js';

const router = express.Router();


const productManager = new ProductManager()

// Rutas
router.get('/', (request, response) => {
    response.send('Comision 70185 - Backend')

})

router.get('/products', async (request, response) => {
    try {
        let limit = request.query.limit;
        const products = productManager.getProducts()
        if (limit) {
            const data = products.slice(0, parseInt(limit))
            response.send(data);

        } else {
            response.send(products)
        }
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

router.get('/products/:id', async (request, response) => {
    try {
        const id = request.params.id
        const data = productManager.getProductById(id)
        response.send({
            data
        })
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

// router.post('/products', async (request, response,) => {
//     try {
//         const {title, description, code, price, status, stock, category, thumbnail} = request.body
//         productManager.addProduct(title, description, code, price, status, stock, category, thumbnail)
//         response.send('Producto agregado correctamente')
//     } catch (error) {
//         console.log("Error", error)
//         response.send("Error")
//     }
// })

router.put('/products/:id', async (request, response) => {
    console.log("Metodo PUT")
    const {id} = request.params
    console.log("id a modificar", id)
    const body = request.body

    console.log("Body", body)
    try {

        const data = await productManager.updateProduct(parseInt(id), body.title, body.description, body.price, body.image, body.code, body.stock)
        response.send({
            message: "Metodo PUT OK",
            data: data
        })
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

// router.delete('/products/:id', async (request, response) => {
//     try {
//         const id = request.params.id
//         const data = await productManager.deleteProduct(id)
//
//         response.send({
//             message: "Metodo DELETE OK",
//             data: data
//         })
//     } catch (error) {
//         console.log("Error", error)
//         response.send("Error")
//     }
// })


//Agrego estos dos post para usarlos con Socket io
router.post('/products', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body;
        const producto = { title, description, code, price, status, stock, category, thumbnail };
        console.log(producto)
        console.log(typeof producto)
        await productManager.addProduct(producto);

        const io = req.app.get('io');
        io.emit('productos', await productManager.getProducts());

        res.status(201).send('Producto agregado');
    } catch (err) {
        console.error("Error", err);
        res.status(500).send('Error al agregar producto');
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }
        await productManager.deleteProduct(id);

        const io = req.app.get('io');
        io.emit('productos', await productManager.getProducts());

        res.status(200).send('Producto eliminado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar producto');
    }
});



export default router;