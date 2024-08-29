import express   from "express";
import CartManager from '../manager/cart.js';


const router = express.Router();

const cartManager = new CartManager()

// cartsRouter.post('/:cid/product/:pid',async(req,res)=>{
//     //Extraer los parámetros
//     const {cid,pid} = req.params;
//     const {quantity} = req.body;
//     //Supongamos el producto pid:4
//
//     /**
//      * Pregúntate:
//      *
//      *¿Debería dejar pasar...?
//      * 1. Un carrito que no existe
//      * 2. Un producto que no existe
//      * 3. Si el producto ya existe. ¿Cómo lo vas a controlar?
//      */
// })

//rutas
router.get('/carts/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    try {
        const carrito = await cartManager.getCarritoById(id)
        console.log("carrito", carrito)
        response.send(carrito)

    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }

})
router.post('/carts', async (request, response) => {
        try {
            const nuevoCarrito = await cartManager.createCart()
            response.send(nuevoCarrito)
        } catch (error) {
            console.log("Error", error)
            response.send("Error")
        }

    }
)

router.post('/carts/:id/product/:id_producto', async (request, response) => {
    const id = parseInt(request.params.id)
    const id_producto = parseInt(request.params.id_producto)

    let cantidad = parseInt(request.body.cantidad)

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(id, id_producto, cantidad)
        response.send(actualizarCarrito)


    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})


export default router;