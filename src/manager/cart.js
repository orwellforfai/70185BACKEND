import fs from 'fs';

const PATH = './src/files/cart.json';


class CartManager {

    constructor() {
        this.carts = [];   // propiedad carts que arranca como array vacío
        this.ultId = 0;     // propiedad ultId que arranca en 0
        if(!fs.existsSync(PATH)){
            this.init();
        } else {
            console.log("Carts file found")
        }
    }

    async init() {
        //Aquí voy a crear el archivo
        await fs.promises.writeFile(PATH, JSON.stringify([]))

        // //dentro del constructor, en cada instancia de CartManager, se debe leer el archivo de carritos y cargarlo
        // await this.cargarCarrito()

    }
    async cargarCarrito() {
        try {
            const data = await fs.readFile(PATH,'utf-8')
            this.carts = JSON.parse(data)
            if (this.carts.length > 0) {                                    // verifico si hay algo en el array carts
                this.ultId = Math.max(...this.carts.map(cart => cart.id))  // si hay algo, busco el id más alto y lo guardo en ultId

            }
        } catch (error) {
            console.log("Error", error)

        }

    }

    async crearCarrito() {
        const nuevoCarrito = {
            id: this.ultId + 1,
            timestamp: Date.now(),
            products: []
        }
        this.carts.push(nuevoCarrito)
        this.ultId++
        // hay que guardarlo en el archivo
        await this.guardarCarritos()
        return nuevoCarrito

    }


   async guardarCarritos() {
        try {
            await fs.promises.writeFile(PATH, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.log("Error", error);
        }
    }



    async getCarritoById(carritoId) {
        try {
            const carrito = this.carts.find(cart => cart.id === carritoId)
            if (!carrito) {
                return {
                    error: 'carrito no encontrado'
                }
            }
        } catch (error) {
            console.log("Error", error)
        }
    }


}

export default CartManager;
