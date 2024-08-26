import fs from 'fs';

const PATH = './src/files/productos.json';


export default class ProductManager {

    constructor(){
        if(!fs.existsSync(PATH)){
            this.init();
        }else{
            console.log("Products file found")
        }
    }
    async init(){
        //Aquí voy a crear el archivo
        await fs.promises.writeFile(PATH,JSON.stringify([]))
    }

    generateID = () => {
        let prod = this.getProducts()
        if (prod.length === 0) return 1
        return prod[prod.length - 1].id + 1
    }

    addProduct(title, description,code, price, status,stock,category,thumbnail) {

        const lista = this.getProducts()
        const id = this.generateID()
        console.log("muestro ID", id)
        const product = {id,title, description,code, price, status,stock,category,thumbnail}
        console.log("producto a agregar",product)
        // Valido que el producto tenga todos los campos
        if (!title || !description || !code || !price ||!status ||!stock || !category || !thumbnail) {
            return console.log('Error: Todos los campos son obligatorios')
        }
        //Valido que el producto ingresado no exista
        const productExists = lista.some((product) => product.code === code)
        console.log("producto existe ?", productExists)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            lista.push(product)
            fs.writeFileSync(PATH, JSON.stringify(lista, null, '\t'))
        }
    }

    getProducts() {
        return JSON.parse(fs.readFileSync(PATH, 'utf-8'))
    }

    getProductById(id) {
        const products = this.getProducts()
        const product = products.find(product => product.id === parseInt(id))
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
        } else {
            console.log("Muestro el producto con el id", id);
            return product
        }
    }


    updateProduct = (id, title, description, price, image, code, stock) => {
        const list = this.getProducts();
        const productIndex = list.findIndex((p) => p.id === parseInt(id));
        if (productIndex === -1) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const product = list[productIndex];
        const updatedProduct = {
            ...product,
            title: title !== undefined ? title : product.title,
            description: description !== undefined ? description : product.description,
            price: price !== undefined ? price : product.price,
            image: image !== undefined ? image : product.image,
            code: code !== undefined ? code : product.code,
            stock: stock !== undefined ? stock : product.stock
        };
        list[productIndex] = updatedProduct;
        fs.writeFileSync(PATH, JSON.stringify(list, null, '\t'));
        console.log('Producto actualizado correctamente');
    }
    deleteProduct = (id) => {
        const product = this.getProducts()
        const resultado = product.find(product => product.id === parseInt(id))
        console.log(resultado)
        if (!resultado) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const newProduct = product.filter(product => product.id !== parseInt(id))
        fs.writeFileSync(PATH, JSON.stringify(newProduct, null, '\t'))
        console.log('Producto eliminado correctamente')
    }
}


