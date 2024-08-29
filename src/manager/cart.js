import fs from 'fs';

const PATH = './src/files/cart.json';


export default class CartManager {

    constructor() {
        this.carts = this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(PATH)) {
            const data = fs.readFileSync(PATH, 'utf-8');
            return JSON.parse(data);
        } else {
            return [];
        }
    }


    generateID() {
        if (this.carts.length === 0) return 1;
        return this.carts[this.carts.length - 1].id + 1;
    }


    async createCart() {
        const id = this.generateID();
        const nuevoCarrito = {
            id,
            timestamp: Date.now(),
            products: []
        };
        this.carts.push(nuevoCarrito);
        await this.saveCarts();
        return nuevoCarrito;
    }

    async saveCarts() {
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

    async agregarProductoAlCarrito(carritoId, productId, cantidad) {
        try {
            const carrito = this.carts.find(cart => cart.id === carritoId)
            if (!carrito) {
                return {
                    error: 'carrito no encontrado'
                }
            }
            const producto = {
                id: productId,
                cantidad
            }
            carrito.products.push(producto)
            await this.saveCarts()
            return carrito
        } catch (error) {
            console.log("Error", error)
        }
    }


}
